<?php

namespace App\Services;

use App\Mail\SendOtpMail;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Services\OtpService;
use App\Models\VerificationOtp;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Mail\SahayogUpdateMail;
use App\Mail\SahayogStatusUpdationMail;
use App\Mail\UserStatusUpdateMail;
use App\Models\Admin;


class ManageNotificationService
{

    /**
     * Generate a random 6-digit OTP.
     *
     * @return boolean
     */
    public function sendOtp(){

        

        return true;
    }

    /**
     * Generate a random 6-digit OTP.
     *
     * @return boolean
     */
    public function sendNotificationOnStatusUpdation($wizard_data) : bool
    {
        $user = User::find($wizard_data->user_id);
        
        if($wizard_data->hr_status == 'Approved'){
            $subjectLine = 'Sahayog Request Approved';
            $tagline = "Your Sahayog request with request number {$wizard_data->request_no} has status updated to Approved successfully.";
            $flag = 'created';
        }else if($wizard_data->hr_status == 'Rejected'){
            $subjectLine = 'Sahayog Request Rejected';
            $tagline = "Your Sahayog request with request number {$wizard_data->request_no} has status updated to Rejected successfully.";
            $flag = 'rejected';
        }else if($wizard_data->hr_status == 'Returned'){
            $subjectLine = 'Sahayog Request Returned';
            $tagline = "Your Sahayog request with request number {$wizard_data->request_no} has status updated to Returned successfully.";
            $flag = 'returned';
        }
        
        // Dispatch the email with the OTP
        Mail::to($user->email)->send(new SahayogStatusUpdationMail( 
            fromUser: $user->email, 
            toUser: $user->email, 
            subjectLine: $subjectLine, 
            tagline: $tagline, 
            data: [
                'name' => $user->name,
                'email' => $user->email,
                'mobileno' => $user->mobileno,
                'request_number' => $wizard_data->request_no,
            ]
        ));

        return true;
    }

    public function sendSahayogRequestNotification($user, $wizard_data) : bool
    {
        if($wizard_data->status = "Complete"){
            
            $subjectLine = $tagline = $flag = '';
            
            $admin = Admin::where('location', $wizard_data->work_center)->first();
    
            if($wizard_data->updated_at == null){
                $subjectLine = 'Sahayog Request Created';
                $tagline = "Your Sahayog request with request number {$wizard_data->request_no} has been submitted successfully. Our team will review your application and get back to you shortly.";
                $flag = 'created';
    
            }else if($wizard_data->updated_at != null && $wizard_data->hr_status == 'Under-Process'){
                $subjectLine = 'Sahayog Request Updated';
                $tagline = 'Your Sahayog request has been updated. Please find the details below.';
                $flag = 'updated';
                
            }else if($wizard_data->hr_status == 'Rejected'){
                $subjectLine = 'Sahayog Request Rejected';
                $tagline = 'Your Sahayog request has been rejected. Please find the details below.';
                $flag = 'rejected';

            }else if($wizard_data->hr_status == 'Returned'){
                $subjectLine = 'Sahayog Request Returned';
                $tagline = 'Your Sahayog request has been returned. Please find the details below.';
                $flag = 'returned';

            }

                // Dispatch the email with the OTP
                Mail::to($user->email)->send(new SahayogUpdateMail( 
                    fromUser: $user->email, 
                    toUser: $admin->email, 
                    subjectLine: $subjectLine, 
                    tagline: $tagline, 
                    data: [
                        'name' => $user->name,
                        'email' => $user->email,
                        'mobileno' => $user->mobileno,
                        'request_number' => $wizard_data->request_no,
                    ]
                ));

                return true;
        }
        return false;
    }

    public function sendUserStatusUpdateNotification($user, $status, $reason) : bool
    {
        $subjectLine = 'User Status Update';
        $tagline = "Your account status has been updated to {$status}. Please contact support for more details.";
        
        // Dispatch the email with the OTP
        Mail::to($user->email)->send(new UserStatusUpdateMail( 
            fromUser: $user->email, 
            toUser: '', 
            subjectLine: $subjectLine, 
            tagline: $tagline, 
            data: [
                'name' => $user->name,
                'email' => $user->email,
                'mobileno' => $user->mobileno,
                'status' => $status,
                'reason' => $reason,
            ]
        ));

        return true;
    }
}