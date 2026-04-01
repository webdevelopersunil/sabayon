import { Form, Head, Link } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { LoaderCircle, ArrowLeft, ChevronRight, Shield, Key, Menu, X, User, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';

interface OTPVerificationProps {
    username?: string;
    email?: string;
    status?: string;
    error?: string;
}

export default function OTPVerification({ username = "rajesh.sharma@ongc.co.in", email, status, error }: OTPVerificationProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [processing, setProcessing] = useState(false);
    const [otpError, setOtpError] = useState<string | null>(null);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Handle OTP input change
    const handleOtpChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value.slice(0, 1);
        setOtp(newOtp);
        setOtpError(null);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        if (pastedData && /^\d+$/.test(pastedData) && pastedData.length <= 6) {
            const digits = pastedData.split('').slice(0, 6);
            const newOtp = [...otp];
            digits.forEach((digit, idx) => {
                newOtp[idx] = digit;
            });
            setOtp(newOtp);
            // Focus last filled input
            const lastIndex = Math.min(digits.length - 1, 5);
            inputRefs.current[lastIndex]?.focus();
        }
    };

    // Countdown timer for resend
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendDisabled && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            setResendDisabled(false);
            setCountdown(30);
        }
        return () => clearTimeout(timer);
    }, [resendDisabled, countdown]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join('');
        
        if (otpValue.length !== 6) {
            setOtpError('Please enter a valid 6-digit OTP');
            return;
        }
        
        setProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setProcessing(false);
            // Handle verification logic here
            console.log('Verifying OTP:', otpValue);
        }, 1500);
    };

    const handleResendOtp = () => {
        setResendDisabled(true);
        setCountdown(30);
        setOtp(['', '', '', '', '', '']);
        setOtpError(null);
        // Focus first input
        inputRefs.current[0]?.focus();
        // Call resend OTP API here
        console.log('Resending OTP...');
    };

    return (
        <>
            <Head title="OTP Verification - ONGC Sahayog" />
            
            {/* Background decorative elements */}
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#E65F2B]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            <div className="min-h-screen bg-white font-['Inter'] flex flex-col">
                {/* Navigation */}
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
                                    <p className="text-xs text-gray-500">Welfare Trust • Since 1995</p>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-8">
                                <Link href="/#home" className="text-sm font-medium text-gray-700 hover:text-[#E65F2B] transition-colors relative group">
                                    Home
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E65F2B] group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link href="/#assistance" className="text-sm font-medium text-gray-700 hover:text-[#E65F2B] transition-colors relative group">
                                    Assistance
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E65F2B] group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link href="/#how-to-apply" className="text-sm font-medium text-gray-700 hover:text-[#E65F2B] transition-colors relative group">
                                    How to Apply
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E65F2B] group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link href="/#contact" className="text-sm font-medium text-gray-700 hover:text-[#E65F2B] transition-colors relative group">
                                    Contact
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E65F2B] group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </div>

                            {/* Auth Buttons */}
                            <div className="hidden md:flex items-center gap-4">
                                <Link
                                    href="/login"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E65F2B] text-white text-sm font-medium hover:bg-[#C44A1F] transition-all shadow-sm hover:shadow-md relative overflow-hidden group"
                                >
                                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative z-10">Login</span>
                                </Link>
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                {mobileMenuOpen ? (
                                    <Menu className="h-6 w-6 text-gray-600" />
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
                                <Link href="/#home" className="block text-sm text-gray-700 hover:text-[#E65F2B] py-2">Home</Link>
                                <Link href="/#assistance" className="block text-sm text-gray-700 hover:text-[#E65F2B] py-2">Assistance</Link>
                                <Link href="/#how-to-apply" className="block text-sm text-gray-700 hover:text-[#E65F2B] py-2">How to Apply</Link>
                                <Link href="/#contact" className="block text-sm text-gray-700 hover:text-[#E65F2B] py-2">Contact</Link>
                                <div className="pt-4 border-t border-gray-100">
                                    <Link
                                        href="/login"
                                        className="inline-flex items-center justify-center w-full gap-2 px-5 py-2.5 rounded-lg bg-[#E65F2B] text-white text-sm font-medium"
                                    >
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Main Content - Centered Form */}
                <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full">
                        {/* Back to Login Link */}
                        <Link
                            href={login()}
                            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#E65F2B] transition-colors mb-6 group"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>

                        {/* Form Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-[#E65F2B]/10 px-4 py-2 rounded-full mb-4">
                                <Lock className="h-4 w-4 text-[#E65F2B]" />
                                <span className="text-xs font-semibold text-[#E65F2B] uppercase tracking-wider">Verify Identity</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                OTP <span className="text-[#E65F2B]">Verification</span>
                            </h1>
                            <p className="text-gray-500">
                                Enter the 6-digit code sent to your registered email
                            </p>
                        </div>

                        {/* Status/Error Message */}
                        {status && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                                <div className="flex items-center gap-2 justify-center">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <p className="text-sm font-medium text-green-700">{status}</p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                                <div className="flex items-center gap-2 justify-center">
                                    <AlertCircle className="h-4 w-4 text-red-600" />
                                    <p className="text-sm font-medium text-red-700">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* OTP Verification Form */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Username Field - Disabled */}
                                <div className="grid gap-2">
                                    <Label htmlFor="username" className="text-gray-700">
                                        Username / Email
                                        <span className="text-[#E65F2B] ml-1">*</span>
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="username"
                                            type="text"
                                            value={username}
                                            disabled
                                            className="pl-9 h-12 border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400">Verification code sent to this registered email</p>
                                </div>

                                {/* OTP Input Field - 6 Digits */}
                                <div className="grid gap-2">
                                    <Label htmlFor="otp" className="text-gray-700">
                                        Verification Code (OTP)
                                        <span className="text-[#E65F2B] ml-1">*</span>
                                    </Label>
                                    <div className="flex gap-2 justify-between">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => {
                                                    inputRefs.current[index] = el;
                                                }}
                                                type="text"
                                                inputMode="numeric"
                                                pattern="\d*"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onPaste={index === 0 ? handlePaste : undefined}
                                                className={`w-12 h-12 text-center text-xl font-semibold rounded-lg border ${
                                                    otpError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#E65F2B]'
                                                } focus:outline-none focus:ring-2 focus:ring-[#E65F2B]/20 transition-all`}
                                                autoFocus={index === 0}
                                            />
                                        ))}
                                    </div>
                                    {otpError && (
                                        <p className="text-sm text-red-500 mt-1">{otpError}</p>
                                    )}
                                </div>

                                {/* Resend OTP Section */}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Didn't receive code?</span>
                                    {resendDisabled ? (
                                        <span className="text-gray-400">
                                            Resend in <span className="font-medium text-[#E65F2B]">{countdown}</span> seconds
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleResendOtp}
                                            className="text-[#E65F2B] hover:text-[#C44A1F] font-medium transition-colors"
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </div>

                                {/* Security Note */}
                                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                    <Shield className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-700">
                                        The OTP is valid for 10 minutes. For security reasons, do not share this code with anyone.
                                    </p>
                                </div>

                                {/* Verify Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-[#E65F2B] hover:bg-[#C44A1F] text-white h-12 text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                                    disabled={processing}
                                >
                                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    {processing ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <LoaderCircle className="h-4 w-4 animate-spin" />
                                            <span>Verifying...</span>
                                        </div>
                                    ) : (
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Verify & Continue
                                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </div>

                        {/* Help Text */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400">
                                Need assistance? Contact our support team at{' '}
                                <a href="tel:011-26750998" className="text-[#E65F2B] hover:underline">011-26750998</a>
                            </p>
                        </div>
                    </div>
                </main>

                {/* Simple Footer */}
                <footer className="bg-gray-900 text-gray-300 py-4">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <p className="text-xs">
                            © {new Date().getFullYear()} ONGC Welfare Trust. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}