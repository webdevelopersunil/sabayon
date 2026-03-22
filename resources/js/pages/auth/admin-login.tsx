import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { request } from '@/routes/password';
import {
    Menu,
    X,
    Building2,
    Phone,
    ArrowRight,
    ChevronRight,
    Key,
    Shield,
    User,
    Lock,
    LogIn
} from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function AdminLogin({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        admin_id: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Admin Login - ONGC Sahayog" />

            {/* Background decorative elements */}
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#E65F2B]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="min-h-screen bg-white font-['Inter'] flex flex-col">
                {/* Simplified Navigation */}
                <nav className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#E65F2B]/20 rounded-lg blur-xl group-hover:blur-2xl transition-all" />
                                    <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-[#E65F2B] to-[#C44A1F] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                                        <span className="text-white font-bold text-2xl">O</span>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-800">ONGC Sahayog</h1>
                                    <p className="text-xs text-gray-500">Admin Portal</p>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-8">
                                <Link href="/" className="text-sm font-medium text-gray-700 hover:text-[#E65F2B] transition-colors relative group">
                                    Home
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E65F2B] group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link href="/#assistance" className="text-sm font-medium text-gray-700 hover:text-[#E65F2B] transition-colors relative group">
                                    Assistance
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E65F2B] group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link href="/#contact" className="text-sm font-medium text-gray-700 hover:text-[#E65F2B] transition-colors relative group">
                                    Contact
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E65F2B] group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6 text-gray-600" />
                                ) : (
                                    <Menu className="h-6 w-6 text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-200 bg-white">
                            <div className="px-4 py-4 space-y-3">
                                <Link href="/" className="block text-sm text-gray-700 hover:text-[#E65F2B] py-2">Home</Link>
                                <Link href="/#assistance" className="block text-sm text-gray-700 hover:text-[#E65F2B] py-2">Assistance</Link>
                                <Link href="/#contact" className="block text-sm text-gray-700 hover:text-[#E65F2B] py-2">Contact</Link>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Main Content - Centered Login Form */}
                <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-[#E65F2B]/10 px-4 py-2 rounded-full mb-4">
                                <Shield className="h-4 w-4 text-[#E65F2B]" />
                                <span className="text-xs font-semibold text-[#E65F2B] uppercase tracking-wider">Administrator Access</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
                            <p className="text-sm text-gray-500">Sign in to manage Sahayog portal</p>
                        </div>

                        {/* Login Form */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
                            <form onSubmit={submit} className="flex flex-col gap-6">
                                        <div className="grid gap-6">
                                            {/* Admin ID Field */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="admin_id" className="text-gray-700 font-medium">
                                                    Admin ID / Username
                                                    <span className="text-[#E65F2B] ml-1">*</span>
                                                </Label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        id="admin_id"
                                                        type="text"
                                                        name="admin_id"
                                                        value={data.admin_id}
                                                        onChange={(e) => setData('admin_id', e.target.value)}
                                                        required
                                                        autoFocus
                                                        tabIndex={1}
                                                        placeholder="Enter your admin username"
                                                        className="pl-9 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 h-12"
                                                    />
                                                </div>
                                                <InputError message={errors.admin_id} />
                                            </div>

                                            {/* Password Field */}
                                            <div className="grid gap-2">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="password" className="text-gray-700 font-medium">
                                                        Password
                                                        <span className="text-[#E65F2B] ml-1">*</span>
                                                    </Label>
                                                    {canResetPassword && (
                                                        <TextLink
                                                            href={request()}
                                                            className="text-sm text-[#E65F2B] hover:text-[#C44A1F]"
                                                            tabIndex={5}
                                                        >
                                                            Forgot password?
                                                        </TextLink>
                                                    )}
                                                </div>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                                                    <PasswordInput
                                                        id="password"
                                                        name="password"
                                                        value={data.password}
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        required
                                                        tabIndex={2}
                                                        autoComplete="current-password"
                                                        placeholder="Enter your password"
                                                        className="pl-9 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 h-12"
                                                    />
                                                </div>
                                                <InputError message={errors.password} />
                                            </div>

                                            {/* Remember Me & Help Links */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <Checkbox
                                                        id="remember"
                                                        name="remember"
                                                        checked={data.remember}
                                                        onCheckedChange={(checked) => setData('remember', checked === true)}
                                                        tabIndex={3}
                                                        className="border-gray-300 data-[state=checked]:bg-[#E65F2B] data-[state=checked]:border-[#E65F2B]"
                                                    />
                                                    <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                                                        Remember me
                                                    </Label>
                                                </div>
                                                <Link href="/admin/help" className="text-sm text-gray-400 hover:text-[#E65F2B] transition-colors">
                                                    Need help?
                                                </Link>
                                            </div>

                                            {/* Login Button */}
                                            <Button
                                                type="submit"
                                                className="mt-2 w-full bg-gradient-to-r from-[#E65F2B] to-[#C44A1F] hover:from-[#C44A1F] hover:to-[#E65F2B] text-white py-6 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                                                tabIndex={4}
                                                disabled={processing}
                                                data-test="login-button"
                                            >
                                                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                {processing ? (
                                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                                        <Spinner className="h-5 w-5" />
                                                        Authenticating...
                                                    </span>
                                                ) : (
                                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                                        <LogIn className="h-5 w-5" />
                                                        Login to Admin Portal
                                                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                )}
                                            </Button>
                                        </div>

                                        {/* Additional Links */}
                                        <div className="space-y-3 text-center pt-2">
                                            {canRegister && (
                                                <div className="text-sm text-gray-500">
                                                    New Administrator?{' '}
                                                    <TextLink
                                                        href={register()}
                                                        tabIndex={5}
                                                        className="text-[#E65F2B] hover:text-[#C44A1F] font-medium"
                                                    >
                                                        Request Access
                                                    </TextLink>
                                                </div>
                                            )}
                                        </div>
                            </form>

                            {status && (
                                <div className="mt-4 text-center text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg">
                                    {status}
                                </div>
                            )}
                        </div>

                        {/* Help Text */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400">
                                For administrative assistance, contact IT Support at{' '}
                                <a href="tel:011-26750998" className="text-[#E65F2B] hover:underline">011-26750998</a>
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                By logging in, you agree to our{' '}
                                <Link href="/terms" className="text-[#E65F2B] hover:underline">Terms of Use</Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="text-[#E65F2B] hover:underline">Privacy Policy</Link>
                            </p>
                        </div>
                    </div>
                </main>

                {/* Simplified Footer */}
                <footer className="bg-gray-900 text-gray-300 py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E65F2B] to-[#C44A1F] flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">O</span>
                                </div>
                                <span className="text-xs">© {new Date().getFullYear()} ONGC Welfare Trust</span>
                            </div>
                            <div className="flex gap-6">
                                <Link href="/privacy-policy" className="text-xs hover:text-[#E65F2B] transition-colors">Privacy</Link>
                                <Link href="/terms-of-use" className="text-xs hover:text-[#E65F2B] transition-colors">Terms</Link>
                                <Link href="/disclaimer" className="text-xs hover:text-[#E65F2B] transition-colors">Disclaimer</Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3" />
                                <span className="text-xs">Support: 011-26750998</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}