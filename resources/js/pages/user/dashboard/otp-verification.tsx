import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, CheckCircle } from 'lucide-react';

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
        otp: ['', '', '', '', '', ''],
    });

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        
        const newOtp = [...data.otp];
        newOtp[index] = value;
        setData('otp', newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !data.otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        const otpArray = pastedData.split('');
        const newOtp = [...data.otp];
        
        otpArray.forEach((char, idx) => {
            if (idx < 6 && /^\d$/.test(char)) {
                newOtp[idx] = char;
            }
        });
        
        setData('otp', newOtp);
        
        // Focus last filled or next empty
        const lastFilledIndex = newOtp.findLastIndex(val => val !== '');
        if (lastFilledIndex < 5) {
            inputRefs.current[lastFilledIndex + 1]?.focus();
        } else {
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = data.otp.join('');
        if (otpString.length !== 6) {
            setData('otp', [...data.otp]);
            return;
        }
        post('/verify-otp', {
            preserveScroll: true,
            
        });
    };

    useEffect(() => {
        if (errors.otp) {
            const timer = setTimeout(() => clearErrors('otp'), 3000);
            return () => clearTimeout(timer);
        }
    }, [errors.otp, clearErrors]);

    // Focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

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
                            
                            {/* OTP Input Fields */}
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-center gap-3 mb-6">
                                    {data.otp.map((digit, index) => (
                                        <Input
                                            key={index}
                                            
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={index === 0 ? handlePaste : undefined}
                                            className="w-14 h-14 text-center text-xl font-semibold border-2 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 rounded-xl bg-white text-gray-800"
                                        />
                                    ))}
                                </div>
                                
                                {errors.otp && (
                                    <p className="text-center text-xs text-red-500 font-medium mb-4 animate-in fade-in">
                                        {errors.otp}
                                    </p>
                                )}
                                
                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={processing || data.otp.some(d => !d)}
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
                                        className="text-sm text-[#E65F2B] hover:text-[#C44A1F] transition-colors"
                                    >
                                        Resend OTP
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