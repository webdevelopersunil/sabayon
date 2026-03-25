import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { 
    Menu, 
    X, 
    User, 
    Mail, 
    Key,
    ChevronRight,
    Shield,
    CheckCircle,
    XCircle,
    Award,
    ArrowRight,
    Phone,
    FileText,
    CreditCard,
    Image as ImageIcon,
    FileSignature,
    MapPin
} from 'lucide-react';

export default function Register({ locations = [] }: { locations?: any[] }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { flash, errors: pageErrors } = usePage<any>().props;

    return (
        <>
            <Head title="Register - ONGC Sahayog" />
             
            {/* Background decorative elements */}
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#E65F2B]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            <div className="min-h-screen bg-white font-['Inter'] flex flex-col">
                {/* Navigation - Same as Landing Page */}
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
                                    <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
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
                    <div className="max-w-2xl w-full">
                        {/* Form Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-[#E65F2B]/10 px-4 py-2 rounded-full mb-4">
                                <Award className="h-4 w-4 text-[#E65F2B]" />
                                <span className="text-xs font-semibold text-[#E65F2B] uppercase tracking-wider">Join Sahayog Trust</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                                Create Your <span className="text-[#E65F2B]">Account</span>
                            </h1>
                            <p className="text-gray-500">
                                Register to access financial assistance and support from ONGC Welfare Trust
                            </p>
                        </div>

                        {/* Flash Messages */}
                        {flash?.success && (
                            <div className="rounded-xl border border-green-200 bg-green-50 p-4 flex items-center gap-3 mb-6">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <p className="text-sm font-medium text-green-800">{flash.success}</p>
                            </div>
                        )}
                        
                        {flash?.error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-center gap-3 mb-6">
                                <XCircle className="h-5 w-5 text-red-600" />
                                <p className="text-sm font-medium text-red-800">{flash.error}</p>
                            </div>
                        )}

                        {/* Validation Errors Summary */}
                        {pageErrors && Object.keys(pageErrors).length > 0 && (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-4 mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <XCircle className="h-5 w-5 text-red-600" />
                                    <p className="text-sm font-medium text-red-800">Please fix the following errors:</p>
                                </div>
                                <ul className="list-disc list-inside text-sm text-red-700 ml-8">
                                    {Object.values(pageErrors).map((error, index) => (
                                        <li key={index}>{error as string}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Registration Form */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
                            <Form
                                {...store.form()}
                                resetOnSuccess={['password', 'password_confirmation']}
                                disableWhileProcessing
                                className="flex flex-col gap-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid gap-5">
                                            <div className="grid gap-5 md:grid-cols-2">
                                                {/* Name Field */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="name" className="text-gray-700">
                                                        Full Name
                                                        <span className="text-[#E65F2B] ml-1">*</span>
                                                    </Label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            id="name"
                                                            type="text"
                                                            required
                                                            autoFocus
                                                            tabIndex={1}
                                                            autoComplete="name"
                                                            name="name"
                                                            placeholder="Enter your full name"
                                                            className="pl-9 h-12 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 rounded-lg"
                                                        />
                                                    </div>
                                                    <InputError message={errors.name} className="mt-1" />
                                                </div>

                                                {/* Email Field */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="email" className="text-gray-700">
                                                        Email Address
                                                        <span className="text-[#E65F2B] ml-1">*</span>
                                                    </Label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            required
                                                            tabIndex={2}
                                                            autoComplete="email"
                                                            name="email"
                                                            placeholder="email@example.com"
                                                            className="pl-9 h-12 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 rounded-lg"
                                                        />
                                                    </div>
                                                    <InputError message={errors.email} />
                                                </div>

                                                {/* Mobile Field */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="mobileno" className="text-gray-700">
                                                        Mobile Number
                                                        <span className="text-[#E65F2B] ml-1">*</span>
                                                    </Label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            id="mobileno"
                                                            type="tel"
                                                            required
                                                            tabIndex={3}
                                                            autoComplete="tel"
                                                            name="mobileno"
                                                            placeholder="Enter your mobile number"
                                                            className="pl-9 h-12 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 rounded-lg"
                                                        />
                                                    </div>
                                                    <InputError message={errors.mobileno} />
                                                </div>

                                                {/* EPF Field */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="epf_no" className="text-gray-700">
                                                        EPF Number
                                                    </Label>
                                                    <div className="relative">
                                                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            id="epf_no"
                                                            type="text"
                                                            tabIndex={4}
                                                            name="epf_no"
                                                        placeholder="XXX/XXX/XXXXXX/XX"
                                                        pattern="^[a-zA-Z0-9]{3}/[a-zA-Z0-9]{3}/[a-zA-Z0-9]{6}/[a-zA-Z0-9]{2}$"
                                                        title="Format must match: XXX/XXX/XXXXXX/XX"
                                                        maxLength={17}
                                                            className="pl-9 h-12 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 rounded-lg"
                                                        />
                                                    </div>
                                                <div className="text-xs text-gray-400 mt-1">Format: XXX/XXX/XXXXXX/XX</div>
                                                    <InputError message={errors.epf_no} />
                                                </div>

                                                {/* Aadhar No Field */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="aadhar_no" className="text-gray-700">
                                                        Aadhar Number
                                                        <span className="text-[#E65F2B] ml-1">*</span>
                                                    </Label>
                                                    <div className="relative">
                                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            id="aadhar_no"
                                                            type="text"
                                                            required
                                                            tabIndex={5}
                                                            name="aadhar_no"
                                                            placeholder="Enter your 12-digit Aadhar number"
                                                            className="pl-9 h-12 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 rounded-lg"
                                                        />
                                                    </div>
                                                    <InputError message={errors.aadhar_no} />
                                                </div>

                                                {/* Location Field */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="location" className="text-gray-700">
                                                        Location
                                                        <span className="text-[#E65F2B] ml-1">*</span>
                                                    </Label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <select
                                                            id="location"
                                                            required
                                                            tabIndex={6}
                                                            name="location"
                                                            className="flex w-full pl-9 h-12 border border-gray-200 bg-transparent py-1 text-base shadow-sm transition-colors focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E65F2B] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-lg"
                                                            defaultValue=""
                                                        >
                                                            <option value="" disabled>Select your location</option>
                                                            {locations.map((loc, idx) => {
                                                                const value = typeof loc === 'object' ? loc.location || loc.name : loc;
                                                                return <option key={idx} value={value}>{value}</option>;
                                                            })}
                                                        </select>
                                                    </div>
                                                    <InputError message={errors.location} />
                                                </div>

                                                {/* Aadhar Pic Field */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="aadhar_pic" className="text-gray-700">
                                                        Aadhar Picture
                                                        <span className="text-[#E65F2B] ml-1">*</span>
                                                    </Label>
                                                    <div className="relative">
                                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            id="aadhar_pic"
                                                            type="file"
                                                            accept="image/*,.pdf"
                                                            required
                                                            tabIndex={7}
                                                            name="aadhar_pic"
                                                            className="pl-9 h-12 py-2.5 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 rounded-lg text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-[#E65F2B]/10 file:text-[#E65F2B] hover:file:bg-[#E65F2B]/20 cursor-pointer"
                                                        />
                                                    </div>
                                                    <InputError message={errors.aadhar_pic} />
                                                </div>

                                                {/* Undertaking Field */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="principle_emp_undertaking" className="text-gray-700 text-sm">
                                                        Principle Emp Undertaking
                                                        <span className="text-[#E65F2B] ml-1">*</span>
                                                    </Label>
                                                    <div className="relative">
                                                        <FileSignature className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            id="principle_emp_undertaking"
                                                            type="file"
                                                            accept="image/*,.pdf"
                                                            required
                                                            tabIndex={8}
                                                            name="principle_emp_undertaking"
                                                            className="pl-9 h-12 py-2.5 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 rounded-lg text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-[#E65F2B]/10 file:text-[#E65F2B] hover:file:bg-[#E65F2B]/20 cursor-pointer"
                                                        />
                                                    </div>
                                                    <InputError message={errors.principle_emp_undertaking} />
                                                </div>

                                                {/* Password Field */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="password" className="text-gray-700">
                                                        Password
                                                        <span className="text-[#E65F2B] ml-1">*</span>
                                                    </Label>
                                                    <div className="relative">
                                                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                                                        <PasswordInput
                                                            id="password"
                                                            required
                                                            tabIndex={9}
                                                            autoComplete="new-password"
                                                            name="password"
                                                            placeholder="Create a strong password"
                                                            className="pl-9 h-12 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 rounded-lg"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                                        <Shield className="h-3 w-3" />
                                                        <span>Min 8 chars, 1 number & 1 special</span>
                                                    </div>
                                                    <InputError message={errors.password} />
                                                </div>

                                                {/* Confirm Password Field */}
                                                <div className="grid gap-2">
                                                    <Label htmlFor="password_confirmation" className="text-gray-700">
                                                        Confirm Password
                                                        <span className="text-[#E65F2B] ml-1">*</span>
                                                    </Label>
                                                    <div className="relative">
                                                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                                                        <PasswordInput
                                                            id="password_confirmation"
                                                            required
                                                            tabIndex={10}
                                                            autoComplete="new-password"
                                                            name="password_confirmation"
                                                            placeholder="Re-enter your password"
                                                            className="pl-9 h-12 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 rounded-lg"
                                                        />
                                                    </div>
                                                    <InputError message={errors.password_confirmation} />
                                                </div>
                                            </div>
                                            
                                            <input type="hidden" name="employee_type" value="retired" />

                                            {/* Terms Agreement */}
                                            <div className="flex items-start gap-2 mt-2">
                                                <CheckCircle className="h-4 w-4 text-[#E65F2B] shrink-0 mt-0.5" />
                                                <p className="text-xs text-gray-500">
                                                    By creating an account, you agree to our{' '}
                                                    <Link href="/terms" className="text-[#E65F2B] hover:underline">Terms of Use</Link>
                                                    {' '}and{' '}
                                                    <Link href="/privacy" className="text-[#E65F2B] hover:underline">Privacy Policy</Link>
                                                </p>
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                className="mt-4 w-full bg-[#E65F2B] hover:bg-[#C44A1F] text-white h-12 text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                                                tabIndex={11}
                                                data-test="register-user-button"
                                                disabled={processing}
                                            >
                                                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                {processing && <Spinner className="mr-2" />}
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    Create Account
                                                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </Button>
                                        </div>

                                        {/* Login Link */}
                                        <div className="text-center text-sm text-gray-500">
                                            Already have an account?{' '}
                                            <TextLink 
                                                href={login()} 
                                                tabIndex={12}
                                                className="text-[#E65F2B] hover:text-[#C44A1F] font-medium"
                                            >
                                                Log in here
                                            </TextLink>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>

                        {/* Help Text */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400">
                                Need help? Contact our support team at{' '}
                                <a href="tel:011-26750998" className="text-[#E65F2B] hover:underline">011-26750998</a>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}