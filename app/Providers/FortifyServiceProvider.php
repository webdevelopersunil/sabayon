<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Role;
use App\Models\Admin;
use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use LdapRecord\Container;
use GuzzleHttp\Client;

use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Support\Facades\Auth;


class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureActions();
        $this->configureViews();
        $this->configureRateLimiting();

        if (config('custom.use_custom_auth')) {
            
            Fortify::authenticateUsing(function ($request) {

                $username = strtoupper($request->input('cpf_no'));
                $password = $request->input('password');

                
                if(request()->employee_type!=='contractor')
                {
                    if($request->employee_type=='active')
                    {
                        $isFound    =   $this->ldapRecord($username);
                        
                        if (!$isFound) {
                            throw ValidationException::withMessages([
                                'cpf_no' => 'User not found',
                            ]);
                        }

                        try {
                            $connection = Container::getDefaultConnection();
                            
                            if ($connection->auth()->attempt($isFound['dn'], $password)) {
                                
                                $user = User::firstOrCreate([
                                    'cpf_no' => $username
                                ],
                                [
                                    'name' => strtolower($isFound['cn'][0]),
                                    'password' => bcrypt($request->password),
                                    'email' => $isFound['mail'][0],
                                    // 'mobileno'=>$data['user']['mobileNo']??'N/A',
                                    'mobileno' => $isFound['telephonenumber'][0],
                                    'employee_type'=>$request->employee_type,
                                    'designation'=>$isFound['title'][0],
                                    'location'=>$isFound['physicaldeliveryofficename'][0],
                                    'date_of_joining_ongc'=> !empty($isFound['ongcjoiningdate'][0]) ? $isFound['ongcjoiningdate'][0] : now()->subYear()->format('Y-m-d'),
                                    'admin_verified'=>true
                                ]);

                                // Assign the 'user' role using Eloquent Models
                                if ($role = Role::where('name', 'user')->first()) {
                                    $user->roles()->syncWithoutDetaching([$role->id]);
                                }
                                
                                // Generate OTP
                                app(\App\Services\OtpService::class)->generateOtp($user, 'login', 300);

                                // Set temporary session for unauthenticated user trying to log in
                                $token = \Illuminate\Support\Str::random(64);
                                session([
                                    'login_auth_user_id' => $user->id,
                                    'login_auth_token' => $token
                                ]);

                                throw new \Illuminate\Http\Exceptions\HttpResponseException(
                                    redirect()->route('login.otp', ['token' => $token])->with('success', 'OTP sent to your registered contact.')
                                );
                            }
                        } catch (\Illuminate\Http\Exceptions\HttpResponseException $e) {
                            throw $e;
                        } catch (Exception $e) {
                            // Allow it to fall through to Fortify's default failed login response, or log the error
                            return $e->getMessage(); // For debugging, remove in production
                        }
                    }else{

                        // /implement this here

                        $url = 'https://bandhan.ongc.co.in/o/bandhan-api/getUserByCPFNumber';
                        $body = ['cpfNo' => $username];

                        $client = new Client();

                        dd($client);

                        try
                        {
                            $response = $client->post($url,
                            [
                                'auth' => [$username, $password], // Basic Authentication
                                'json' => $body, // Request body as JSON
                            ]);
                            if ($response->getStatusCode() === 200)
                            {
                                $user = User::firstOrCreate([
                                    'cpf_no' => $username
                                ], [
                                    'name' => $username,
                                    'password' => bcrypt($password),
                                    'employee_type' => 'contractor',
                                    'admin_verified' => true
                                ]);

                                if ($role = Role::where('name', 'user')->first()) {
                                    $user->roles()->syncWithoutDetaching([$role->id]);
                                }
                                
                                // Generate OTP
                                app(\App\Services\OtpService::class)->generateOtp($user, 'login', 300);

                                // Set temporary session for unauthenticated user trying to log in
                                $token = \Illuminate\Support\Str::random(64);
                                session([
                                    'login_auth_user_id' => $user->id,
                                    'login_auth_token' => $token
                                ]);

                                throw new \Illuminate\Http\Exceptions\HttpResponseException(
                                    redirect()->route('login.otp', ['token' => $token])->with('success', 'OTP sent to your registered contact.')
                                );
                            }

                        }
                        catch (\Illuminate\Http\Exceptions\HttpResponseException $e)
                        {
                            throw $e;
                        }
                        catch (Exception $e)
                        {
                            throw ValidationException::withMessages([
                                'cpf_no' => "You have entered wrong Username or Password"
                            ]);
                        }










                    }
                }
            });
        } else {
            Fortify::authenticateUsing(function ($request) {
                $user = User::where(Fortify::username(), $request->input(Fortify::username()))->first();

                if ($user && \Illuminate\Support\Facades\Hash::check($request->password, $user->password)) {
                    // Generate OTP
                    app(\App\Services\OtpService::class)->generateOtp($user, 'login', 300);

                    // Set temporary session for unauthenticated user trying to log in
                    $token = \Illuminate\Support\Str::random(64);
                    session([
                        'login_auth_user_id' => $user->id,
                        'login_auth_token' => $token
                    ]);

                    throw new \Illuminate\Http\Exceptions\HttpResponseException(
                        redirect()->route('login.otp', ['token' => $token])->with('success', 'OTP sent to your registered contact.')
                    );
                }
            });
        }

    }

    public function ldapRecord($cpfNo)
    {
        try {
            $connection = Container::getConnection('default');

            $record = $connection->query()->findBy('samaccountname', $cpfNo);

            return $record;

        } catch (Exception $e) {
            throw ValidationException::withMessages([
                'cpf_no' => 'Cannot connect to LDAP server',
            ]);
        }
    }

    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::createUsersUsing(CreateNewUser::class);
    }

    /**
     * Configure Fortify views.
     */
    private function configureViews(): void
    {
        Fortify::loginView(function (Request $request) {
            if (Auth::guard('admin')->check()) {
                return redirect()->route('admin.dashboard');
            }
            return Inertia::render('auth/login', [
                'canResetPassword' => Features::enabled(Features::resetPasswords()),
                'canRegister' => Features::enabled(Features::registration()),
                'status' => $request->session()->get('status'),
            ]);
        });

        Fortify::resetPasswordView(fn (Request $request) => Inertia::render('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]));

        Fortify::requestPasswordResetLinkView(fn (Request $request) => Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::verifyEmailView(fn (Request $request) => Inertia::render('auth/verify-email', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::registerView(function () {
            if (Auth::guard('admin')->check()) {
                return redirect()->route('admin.dashboard');
            }

            $locations = Admin::where('designation', 'HR-ER')
                ->pluck('location');

            return Inertia::render('auth/register', [
                'locations' => $locations
            ]);
        });

        Fortify::twoFactorChallengeView(fn () => Inertia::render('auth/two-factor-challenge'));

        Fortify::confirmPasswordView(fn () => Inertia::render('auth/confirm-password'));
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });
    }
}
