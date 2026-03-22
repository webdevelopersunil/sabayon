import { Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { Menu, X, Atom } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WelcomeHeader({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage().props as any;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200' : 'bg-white/80 backdrop-blur-sm'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#E65F2B]/20 rounded-xl blur-lg group-hover:blur-2xl transition-all" />
                            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#E65F2B] to-[#FF6B35] flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                                <Atom className="h-6 w-6 text-white animate-spin-slow" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-[#E65F2B] to-[#FF6B35] bg-clip-text text-transparent font-['Space_Mono']">
                                ONGC Sahayog<span className="text-xs align-top">™</span>
                            </h1>
                            <p className="text-xs text-gray-500 font-mono">Employee Welfare Trust • Since 1995</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Home', 'Assistance', 'How to Apply', 'Contact'].map((item) => (
                            <a 
                                key={item} 
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-sm font-medium text-gray-600 hover:text-[#E65F2B] transition-colors relative group font-mono"
                            >
                                <span className="relative z-10">{item}</span>
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#E65F2B] to-transparent group-hover:w-full transition-all duration-500" />
                            </a>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="relative group overflow-hidden px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E65F2B] to-[#FF6B35] text-white text-sm font-medium hover:shadow-md transition-all"
                            >
                                <span className="relative z-10">Dashboard</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="text-sm font-medium text-gray-600 hover:text-[#E65F2B] transition-colors px-4 py-2"
                                >
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="relative group overflow-hidden px-6 py-2.5 rounded-xl border border-[#E65F2B] text-[#E65F2B] text-sm font-medium hover:bg-[#E65F2B] hover:text-white transition-all"
                                    >
                                        <span className="relative z-10">Register</span>
                                    </Link>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
                    <div className="px-4 py-4 space-y-3">
                        {['Home', 'Assistance', 'How to Apply', 'Contact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="block text-sm text-gray-600 hover:text-[#E65F2B] py-2 font-mono">
                                {item}
                            </a>
                        ))}
                        <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                            {auth.user ? (
                                <Link href={dashboard()} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E65F2B] text-white text-sm font-medium">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={login()} className="text-center text-sm font-medium text-gray-600 hover:text-[#E65F2B] px-4 py-2">
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link href={register()} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#E65F2B] text-[#E65F2B] text-sm font-medium">
                                            Register
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}