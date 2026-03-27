import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, CheckCircle, XCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
    {
        title: 'OTP Verification',
        href: '#',
    },
];

export default function OTPVerification() {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        otp: '',
    });

    const [resendCooldown, setResendCooldown] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOtpChange = (value: string) => {
        // Only allow digits and limit to 6 characters
        const cleaned = value.replace(/[^\d]/g, '').slice(0, 6);
        setData('otp', cleaned);
        
        // Clear error when user starts typing
        if (errors.otp) {
            clearErrors('otp');
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/[^\d]/g, '').slice(0, 6);
        setData('otp', pastedData);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.otp.length !== 6) {
            return;
        }
        post('/verify-otp', {
            preserveScroll: true,
        });
    };

    useEffect(() => {
        if (errors.otp) {
            const timer = setTimeout(() => clearErrors('otp'), 2000);
            return () => clearTimeout(timer);
        }
    }, [errors.otp, clearErrors]);

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleResendOtp = () => {
        if (resendCooldown > 0) return;

        router.post('/resend-otp', {}, {
            preserveScroll: true,
            onSuccess: () => {
                setResendCooldown(60);
            },
        });
    };

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);
    
    const { flash, success, error: pageError } = usePage<any>().props;

    const [visibleSuccess, setVisibleSuccess] = useState<string | null>(null);
    const [visibleError, setVisibleError] = useState<string | null>(null);

    useEffect(() => {
        const msg = flash?.success || success;
        if (msg) {
            setVisibleSuccess(msg);
            const timer = setTimeout(() => setVisibleSuccess(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success, success]);

    useEffect(() => {
        const msg = flash?.error || pageError;
        if (msg) {
            setVisibleError(msg);
            const timer = setTimeout(() => setVisibleError(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [flash?.error, pageError]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="OTP Verification" />
            
            <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                <div className="w-full max-w-md">
                    {/* OTP Card */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E65F2B]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                        
                        <div className="relative p-8">
                            {/* Flash Messages */}
                            {visibleSuccess && (
                                <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <p className="text-sm font-medium text-green-800">{visibleSuccess}</p>
                                </div>
                            )}
                            
                            {visibleError && (
                                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 flex items-center gap-3">
                                    <XCircle className="h-5 w-5 text-red-600" />
                                    <p className="text-sm font-medium text-red-800">{visibleError}</p>
                                </div>
                            )}
                            
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="rounded-full bg-[#E65F2B]/10 p-4">
                                    <Shield className="h-8 w-8 text-[#E65F2B]" />
                                </div>
                            </div>
                            
                            {/* Title */}
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                                OTP Verification
                            </h2>
                            
                            <p className="text-center text-gray-500 text-sm mb-8">
                                Please enter the 6-digit verification code sent to your registered mobile number
                            </p>
                            
                            {/* OTP Input Field */}
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-center mb-6">
                                    <Input
                                        ref={inputRef}
                                        type="text"
                                        inputMode="numeric"
                                        value={data.otp}
                                        onChange={(e) => handleOtpChange(e.target.value)}
                                        onPaste={handlePaste}
                                        placeholder="Enter 6-digit OTP"
                                        className="w-full h-14 text-center text-xl font-semibold border-2 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 rounded-xl bg-white text-gray-800"
                                        autoComplete="off"
                                    />
                                </div>
                                
                                {errors.otp && (
                                    <p className="text-center text-xs text-red-500 font-medium mb-4 animate-in fade-in">
                                        {errors.otp}
                                    </p>
                                )}
                                
                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={processing || data.otp.length !== 6}
                                    className="w-full h-12 rounded-xl bg-[#E65F2B] hover:bg-[#C44A1F] text-white shadow-sm hover:shadow transition-all duration-300 gap-2 disabled:opacity-50"
                                >
                                    {processing ? (
                                        'Verifying...'
                                    ) : (
                                        <>
                                            <CheckCircle className="h-4 w-4" />
                                            Verify OTP
                                        </>
                                    )}
                                </Button>
                                
                                {/* Resend Link */}
                                <div className="text-center mt-6">
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={processing || resendCooldown > 0}
                                        className="text-sm text-[#E65F2B] hover:text-[#C44A1F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {resendCooldown > 0
                                            ? `Resend in ${resendCooldown}s`
                                            : 'Resend OTP'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}