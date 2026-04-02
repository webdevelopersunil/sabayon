import { Form, Head, Link } from '@inertiajs/react';
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
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import {
    Menu,
    X,
    Users,
    Building2,
    Phone,
    Mail,
    MapPin,
    ExternalLink,
    ArrowRight,
    ChevronRight,
    Fingerprint,
    Key,
    Globe
} from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loginType, setLoginType] = useState<'ongcian' | 'other'>('ongcian');
    const [selected, setSelected] = useState("active"); // default selected


    return (
        <>
            <Head title="Login - ONGC Sahayog" />

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
                                    href="/register"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E65F2B] text-white text-sm font-medium hover:bg-[#C44A1F] transition-all shadow-sm hover:shadow-md relative overflow-hidden group"
                                >
                                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative z-10">Register</span>
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
                                        href="/register"
                                        className="inline-flex items-center justify-center w-full gap-2 px-5 py-2.5 rounded-lg bg-[#E65F2B] text-white text-sm font-medium"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-[#E65F2B]/10 px-4 py-2 rounded-full mb-4">
                                <Building2 className="h-4 w-4 text-[#E65F2B]" />
                                <span className="text-xs font-semibold text-[#E65F2B] uppercase tracking-wider">Sahayog Trust</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                            <p className="text-sm text-gray-500">Sign in to access your Sahayog account</p>
                        </div>

                        {/* Login Type Tabs */}
                        <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
                            <button
                                onClick={() => setLoginType('ongcian')}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${loginType === 'ongcian'
                                    ? 'bg-white text-[#E65F2B] shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Fingerprint className="h-4 w-4" />
                                ONGCian Login
                            </button>
                            <button
                                onClick={() => setLoginType('other')}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${loginType === 'other'
                                    ? 'bg-white text-[#E65F2B] shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Users className="h-4 w-4" />
                                Other User
                            </button>
                        </div>

                        {/* Login Form */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
                            <Form
                                {...store.form()}
                                resetOnSuccess={['password']}
                                className="flex flex-col gap-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid gap-6">
                                            {/* Aadhar Number Field - Only for ONGCian */}
                                            {loginType === 'ongcian' && (
                                                <div className="grid gap-2">
                                                    <Label className="text-gray-700 font-medium mb-2">
                                                        Employee Type <span className="text-[#E65F2B]">*</span>
                                                    </Label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-[#E65F2B]/50 cursor-pointer transition-all">
                                                            <input
                                                                type="radio"
                                                                id="active"
                                                                name="employee_type"
                                                                value="active"
                                                                checked={selected === "active"}
                                                                onChange={(e) => setSelected(e.target.value)}
                                                                className="w-4 h-4 text-[#E65F2B] border-gray-300 focus:ring-[#E65F2B]"
                                                                required
                                                            />
                                                            <label htmlFor="active" className="cursor-pointer text-sm font-medium text-gray-700">
                                                                Active Employee (LDAP)
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-[#E65F2B]/50 cursor-pointer transition-all">
                                                            <input
                                                                type="radio"
                                                                id="retired"
                                                                name="employee_type"
                                                                checked={selected === "retired"}
                                                                onChange={(e) => setSelected(e.target.value)}
                                                                value="retired"
                                                                className="w-4 h-4 text-[#E65F2B] border-gray-300 focus:ring-[#E65F2B]"
                                                            />
                                                            <label htmlFor="retired" className="cursor-pointer text-sm font-medium text-gray-700">
                                                                Retired Employee
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <InputError message={errors.employee_type} className="mt-2" />
                                                    <Label htmlFor="cpf_no" className="text-gray-700">
                                                        CPF Number
                                                        <span className="text-[#E65F2B] ml-1">*</span>
                                                    </Label>
                                                    <div className="relative">
                                                        <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            id="cpf_no"
                                                            type="text"
                                                            name="cpf_no"
                                                            required={loginType === 'ongcian'}
                                                            autoFocus={loginType === 'ongcian'}
                                                            tabIndex={1}
                                                            placeholder="Enter 6-digit CPF"
                                                            maxLength={7}
                                                            className="pl-9 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20"
                                                        />
                                                    </div>
                                                    <InputError message={errors.cpf_no} />
                                                </div>
                                            )}

                                            {/* Email Field - Only for Other Users */}
                                            {loginType === 'other' && (
                                                <div className="grid gap-2">

                                                    <InputError message={errors.employee_type} className="mt-2" />
                                                    <Label htmlFor="aadhar" className="text-gray-700">
                                                        Aadhar Number
                                                        <span className="text-[#E65F2B] ml-1">*</span>
                                                    </Label>
                                                    <div className="relative">
                                                        <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            id="aadhar"
                                                            type="text"
                                                            name="aadhar"

                                                            tabIndex={1}
                                                            placeholder="XXXX XXXX XXXX"
                                                            className="pl-9 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20"
                                                        />
                                                    </div>
                                                    <InputError message={errors.aadhar} />
                                                </div>

                                            )}

                                            {/* Password Field - Common for both */}
                                            <div className="grid gap-2">
                                                <div className="flex items-center">
                                                    <Label htmlFor="password" className="text-gray-700">
                                                        Password
                                                        <span className="text-[#E65F2B] ml-1">*</span>
                                                    </Label>
                                                    {canResetPassword && (
                                                        <TextLink
                                                            href={request()}
                                                            className="ml-auto text-sm text-[#E65F2B] hover:text-[#C44A1F]"
                                                            tabIndex={5}
                                                        >
                                                            Forgot password?
                                                        </TextLink>
                                                    )}
                                                </div>
                                                <div className="relative">
                                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                                                    <PasswordInput
                                                        id="password"
                                                        name="password"
                                                        required
                                                        tabIndex={2}
                                                        autoComplete="current-password"
                                                        placeholder="Enter your password"
                                                        className="pl-9 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20"
                                                    />
                                                </div>
                                                <InputError message={errors.password} />
                                            </div>

                                            {/* Remember Me */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <Checkbox
                                                        id="remember"
                                                        name="remember"
                                                        tabIndex={3}
                                                        className="border-gray-300 data-[state=checked]:bg-[#E65F2B] data-[state=checked]:border-[#E65F2B]"
                                                    />
                                                    <Label htmlFor="remember" className="text-sm text-gray-600">
                                                        Remember me
                                                    </Label>
                                                </div>

                                                {/* Language Selector */}
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <Globe className="h-4 w-4" />
                                                    <select className="bg-transparent border-none outline-none text-sm cursor-pointer hover:text-[#E65F2B]">
                                                        <option value="en">English</option>
                                                        <option value="hi">हिन्दी</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Login Button */}
                                            <Button
                                                type="submit"
                                                className="mt-2 w-full bg-[#E65F2B] hover:bg-[#C44A1F] text-white py-6 text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                                                tabIndex={4}
                                                disabled={processing}
                                                data-test="login-button"
                                            >
                                                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                {processing && <Spinner className="mr-2" />}
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    Login
                                                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </Button>
                                        </div>

                                        {/* Additional Links */}
                                        <div className="space-y-3 text-center">
                                            {canRegister && (
                                                <div className="text-sm text-gray-500">
                                                    New User?{' '}
                                                    <TextLink
                                                        href={register()}
                                                        tabIndex={5}
                                                        className="text-[#E65F2B] hover:text-[#C44A1F] font-medium"
                                                    >
                                                        Sign up Here
                                                    </TextLink>
                                                </div>
                                            )}

                                            {canResetPassword && (
                                                <div className="text-sm">
                                                    <TextLink
                                                        href={request()}
                                                        tabIndex={6}
                                                        className="text-gray-400 hover:text-[#E65F2B] text-xs"
                                                    >
                                                        Forgot Password? Click Here
                                                    </TextLink>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </Form>

                            {status && (
                                <div className="mt-4 text-center text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg">
                                    {status}
                                </div>
                            )}
                        </div>

                        {/* Help Text */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400">
                                By logging in, you agree to our{' '}
                                <Link href="/terms" className="text-[#E65F2B] hover:underline">Terms</Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="text-[#E65F2B] hover:underline">Privacy Policy</Link>
                            </p>
                        </div>
                    </div>
                </main>

                {/* Footer - Simplified version of landing page footer */}
                <footer className="bg-gray-900 text-gray-300 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E65F2B] to-[#C44A1F] flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">O</span>
                                </div>
                                <span className="text-sm">© {new Date().getFullYear()} ONGC Welfare Trust</span>
                            </div>
                            <div className="flex gap-6">
                                <Link href="/privacy-policy" className="text-xs hover:text-[#E65F2B] transition-colors">Privacy</Link>
                                <Link href="/terms-of-use" className="text-xs hover:text-[#E65F2B] transition-colors">Terms</Link>
                                <Link href="/disclaimer" className="text-xs hover:text-[#E65F2B] transition-colors">Disclaimer</Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3" />
                                <span className="text-xs">24/7 Support: 011-26750998</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}