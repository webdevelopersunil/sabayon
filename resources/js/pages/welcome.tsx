import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { 
    Menu, X, ChevronRight, Heart, GraduationCap, Stethoscope, Users, Phone, Mail, MapPin,
    ExternalLink, ArrowRight, Quote, Calendar, CheckCircle, FileText, Award, Shield, TrendingUp,
    Home, Briefcase, DollarSign, ChevronLeft, Star, Sparkles, Globe, Clock, Building2, 
    HandHeart, Building, PhoneCall, MailOpen, Facebook, Twitter, Linkedin,
    Play, Pause, UserCircle, HelpCircle, MessageCircle, Eye, Zap, Target, Layers, 
    CircleDollarSign, Landmark, PiggyBank, School, Microscope, Bot, Cpu, Radar, Satellite,
    Network, Gauge, Activity, CircuitBoard, ZapOff, Rocket, Atom, Binary, CloudLightning
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Particle background component (light version)
const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
        }> = [];
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };
        
        const initParticles = () => {
            particles = [];
            const particleCount = Math.floor(window.innerWidth / 20);
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 1,
                    color: `rgba(230, 95, 43, ${Math.random() * 0.3 + 0.1})`
                });
            }
        };
        
        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        window.addEventListener('resize', resize);
        resize();
        animate();
        
        return () => window.removeEventListener('resize', resize);
    }, []);
    
    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.4 }} />;
};

// Glitch text effect component (light version)
const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => {
    return (
        <div className={`relative inline-block ${className}`}>
            <span className="relative z-10 text-gray-800">{text}</span>
            <span className="absolute left-0 top-0 w-full h-full text-[#E65F2B] opacity-40 animate-glitch-1 pointer-events-none" style={{ clipPath: 'inset(0 0 0 0)' }}>
                {text}
            </span>
            <span className="absolute left-0 top-0 w-full h-full text-orange-400 opacity-40 animate-glitch-2 pointer-events-none" style={{ clipPath: 'inset(0 0 0 0)' }}>
                {text}
            </span>
        </div>
    );
};

// Leader messages
const leaderMessages = [
    {
        id: 1,
        name: "Arun Kumar Singh",
        title: "Chairman & CEO, ONGC",
        message: "The future of energy is not just about extraction—it's about empowering people. Sahayog is our quantum leap into a future where no ONGC family member is left behind. We're building a network of care that spans across generations.",
        image: "https://images.unsplash.com/photo-1560252872-0cdc1df8fa5c?auto=format&fit=crop&w=400&q=80",
        signature: "Arun Kumar Singh",
        quote: "Energizing futures, powering dreams."
    },
    {
        id: 2,
        name: "Smt. Promila Dubey",
        title: "Director (HR), ONGC",
        message: "We're not just supporting employees; we're architecting an ecosystem of wellbeing. Using smart analytics, we anticipate needs before they arise. The Sahayog scheme is our technology-driven commitment to human potential.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        signature: "Promila Dubey",
        quote: "Human potential, amplified by technology."
    },
    {
        id: 3,
        name: "Shri. Rajesh Kumar",
        title: "Director (Finance), ONGC",
        message: "Smart finance, transparent processes, and human-centered solutions. The financial backbone of Sahayog is built for the future. Every rupee is tracked, every impact measured, every life transformed.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
        signature: "Rajesh Kumar",
        quote: "Smart finance for a brighter future."
    }
];

// Assistance categories
const assistanceCategories = [
    {
        id: 1,
        title: "Quantum Marriage Support",
        shortTitle: "Marriage Support",
        description: "Experience a wedding that combines tradition with modern financial solutions. Our comprehensive program ensures your daughter's celebration is both meaningful and stress-free.",
        icon: Heart,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-600",
        borderColor: "border-rose-200",
        features: ["Up to ₹5,00,000 assistance", "Wedding planning support", "Flexible disbursement"],
        image: "https://images.unsplash.com/photo-1511285568649-4b6416b4f9b1?auto=format&fit=crop&w=800&q=80",
        stat: "1,200+ Families Supported"
    },
    {
        id: 2,
        title: "Neural Education Initiative",
        shortTitle: "Education Support",
        description: "Unlock academic potential with scholarships, tuition aid, and educational resources. Supporting children's education, professional courses, and skill development.",
        icon: GraduationCap,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        borderColor: "border-blue-200",
        features: ["School fee coverage", "Higher education loans", "Merit scholarships"],
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        stat: "3,500+ Students Benefited"
    },
    {
        id: 3,
        title: "Cybernetic Healthcare",
        shortTitle: "Healthcare Support",
        description: "Comprehensive healthcare support for employees and family members, covering treatments, surgeries, and critical illnesses with advanced care options.",
        icon: Stethoscope,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        borderColor: "border-emerald-200",
        features: ["Cashless treatment", "Critical illness cover", "Family floater option"],
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
        stat: "₹45Cr+ Disbursed"
    },
    {
        id: 4,
        title: "Smart Habitat Initiative",
        shortTitle: "Housing Support",
        description: "Support for home purchase, construction, or renovation. Building tomorrow's homes today with smart features and sustainable solutions.",
        icon: Home,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        borderColor: "border-amber-200",
        features: ["Home loan subsidies", "Construction support", "Renovation grants"],
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
        stat: "850+ Homes Supported"
    }
];

// Stats data
const statsData = [
    { label: "Employees Covered", value: 35000, suffix: "+", icon: Users, color: "text-orange-600", bgIcon: "bg-orange-50" },
    { label: "Family Members", value: 150000, suffix: "+", icon: Heart, color: "text-rose-600", bgIcon: "bg-rose-50" },
    { label: "Amount Disbursed", value: 250, prefix: "₹", suffix: "Cr+", icon: CircleDollarSign, color: "text-emerald-600", bgIcon: "bg-emerald-50" },
    { label: "Active Schemes", value: 8, suffix: "", icon: Award, color: "text-blue-600", bgIcon: "bg-blue-50" }
];

// Futuristic metrics
const futuristicMetrics = [
    { label: "Response Time", value: "<1", unit: "hr", icon: Zap, trend: "Quick" },
    { label: "Digital Verified", value: "100", unit: "%", icon: Shield, trend: "Secure" },
    { label: "Success Rate", value: "94", unit: "%", icon: Radar, trend: "High" },
    { label: "Data Security", value: "256", unit: "bit", icon: Cpu, trend: "Enterprise" }
];

// Application steps
const applicationSteps = [
    { number: 1, title: "Check Eligibility", description: "Verify your eligibility based on employment status and service years.", icon: Shield, color: "blue" },
    { number: 2, title: "Gather Documents", description: "Collect required documents including identity proof and service records.", icon: FileText, color: "amber" },
    { number: 3, title: "Submit Application", description: "Complete the online application form with accurate details.", icon: Briefcase, color: "green" },
    { number: 4, title: "Verification", description: "Your application undergoes verification by HR and Welfare departments.", icon: Shield, color: "purple" },
    { number: 5, title: "Approval & Disbursement", description: "Upon approval, funds are disbursed directly to your account.", icon: DollarSign, color: "rose" }
];

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentLeader, setCurrentLeader] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [animatedStats, setAnimatedStats] = useState(statsData.map(() => 0));

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animate stats
    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        statsData.forEach((stat, idx) => {
            let currentStep = 0;
            const targetValue = stat.value;
            const increment = targetValue / steps;
            const timer = setInterval(() => {
                if (currentStep < steps) {
                    setAnimatedStats(prev => {
                        const newStats = [...prev];
                        newStats[idx] = Math.min(Math.floor(increment * currentStep), targetValue);
                        return newStats;
                    });
                    currentStep++;
                } else {
                    setAnimatedStats(prev => {
                        const newStats = [...prev];
                        newStats[idx] = targetValue;
                        return newStats;
                    });
                    clearInterval(timer);
                }
            }, duration / steps);
            return () => clearInterval(timer);
        });
    }, []);

    // Auto-rotate leaders
    useEffect(() => {
        if (isAutoPlaying) {
            autoPlayRef.current = setInterval(() => {
                setCurrentLeader((prev) => (prev + 1) % leaderMessages.length);
            }, 6000);
        }
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [isAutoPlaying]);

    const handlePrevLeader = () => {
        setCurrentLeader((prev) => (prev - 1 + leaderMessages.length) % leaderMessages.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const handleNextLeader = () => {
        setCurrentLeader((prev) => (prev + 1) % leaderMessages.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <>
            <Head title="ONGC Sahayog | Employee Welfare Trust">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700|inter:400,500,600,700|space-mono:400,700" rel="stylesheet" />
            </Head>
            
            {/* Light Background with subtle grid */}
            <div className="fixed inset-0 bg-gradient-to-br from-white via-orange-50/30 to-white overflow-hidden">
                {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(230,95,43,0.08)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)"/%3E%3C/svg%3E')] opacity-30" /> */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
                <ParticleBackground />
                
                {/* Subtle light beams */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative min-h-screen text-gray-800 font-['Inter']">
                {/* Navigation */}
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

                {/* Hero Section */}
                <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-5xl mx-auto">
                            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full border border-orange-200 mb-6 animate-fade-in">
                                <Bot className="h-4 w-4 text-[#E65F2B]" />
                                <span className="text-xs font-semibold text-[#E65F2B] uppercase tracking-wider font-mono">ONGC Welfare Trust</span>
                                <Sparkles className="h-3 w-3 text-[#E65F2B]" />
                            </div>
                            
                            <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-slide-up">
                                <GlitchText text="Caring for Our" className="text-gray-800" />
                                <span className="block mt-2">
                                    <span className="bg-gradient-to-r from-[#E65F2B] via-[#FF6B35] to-[#E65F2B] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                        ONGC Family
                                    </span>
                                </span>
                            </h1>
                            
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-slide-up animation-delay-200 font-mono">
                                Providing comprehensive financial assistance and support to our employees and their families 
                                through the Sahayog scheme. Smart, transparent, and always there for you.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
                                <Link
                                    href={register()}
                                    className="relative group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#E65F2B] to-[#FF6B35] text-white font-semibold shadow-md hover:shadow-lg transition-all overflow-hidden"
                                >
                                    <span className="relative z-10">Apply for Assistance</span>
                                    <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                </Link>
                                <a
                                    href="#assistance"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-[#E65F2B] text-[#E65F2B] font-semibold hover:bg-[#E65F2B] hover:text-white transition-all group"
                                >
                                    Explore Schemes
                                    <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                            {statsData.map((stat, idx) => {
                                const StatIcon = stat.icon;
                                return (
                                    <div key={idx} className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#E65F2B]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                                        <div className="relative bg-white rounded-2xl border border-gray-200 p-6 text-center hover:border-[#E65F2B]/30 hover:shadow-lg transition-all">
                                            <div className={`inline-flex p-3 rounded-xl ${stat.bgIcon} mb-4 group-hover:scale-110 transition-transform`}>
                                                <StatIcon className={`h-6 w-6 ${stat.color}`} />
                                            </div>
                                            <div className="text-3xl font-bold text-gray-800 mb-1 font-mono">
                                                {stat.prefix}{animatedStats[idx].toLocaleString()}{stat.suffix}
                                            </div>
                                            <div className="text-sm text-gray-500 font-mono">{stat.label}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {futuristicMetrics.map((metric, idx) => {
                                const MetricIcon = metric.icon;
                                return (
                                    <div key={idx} className="bg-gray-50 rounded-xl border border-gray-200 p-3 text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <MetricIcon className="h-4 w-4 text-[#E65F2B]" />
                                            <span className="text-xs text-gray-500 font-mono">{metric.label}</span>
                                        </div>
                                        <div className="text-xl font-bold text-gray-800 font-mono">
                                            {metric.value}{metric.unit}
                                        </div>
                                        <div className="text-xs text-emerald-600">{metric.trend}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Leaders Section */}
                <section className="py-20 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full border border-orange-200 mb-4">
                                <Users className="h-4 w-4 text-[#E65F2B]" />
                                <span className="text-xs font-semibold text-[#E65F2B] font-mono">Leadership Messages</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                                Words from Our <span className="text-[#E65F2B]">Leadership</span>
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#E65F2B] to-orange-300 mx-auto rounded-full" />
                        </div>

                        <div className="relative max-w-5xl mx-auto">
                            {/* Navigation Buttons */}
                            <button
                                onClick={handlePrevLeader}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 lg:-translate-x-12 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:border-[#E65F2B] hover:text-[#E65F2B] transition-all z-10"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={handleNextLeader}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 lg:translate-x-12 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:border-[#E65F2B] hover:text-[#E65F2B] transition-all z-10"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>

                            {/* Auto-play Toggle */}
                            <button
                                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                                className="absolute -top-12 right-0 flex items-center gap-1 text-xs text-gray-400 hover:text-[#E65F2B] transition-colors font-mono"
                            >
                                {isAutoPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                                <span>{isAutoPlaying ? 'Auto' : 'Manual'}</span>
                            </button>

                            {/* Slider */}
                            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                                <div 
                                    className="flex transition-transform duration-700 ease-out"
                                    style={{ transform: `translateX(-${currentLeader * 100}%)` }}
                                >
                                    {leaderMessages.map((leader) => (
                                        <div key={leader.id} className="w-full flex-shrink-0 p-8 lg:p-10">
                                            <div className="grid lg:grid-cols-3 gap-8">
                                                <div className="lg:col-span-1 flex flex-col items-center">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-[#E65F2B]/20 to-orange-200/30 rounded-2xl blur-lg" />
                                                        <img
                                                            src={leader.image}
                                                            alt={leader.name}
                                                            className="relative w-40 h-40 rounded-2xl object-cover border-4 border-white shadow-md"
                                                        />
                                                        <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-[#E65F2B] rounded-full flex items-center justify-center shadow-md">
                                                            <Quote className="h-5 w-5 text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="text-center mt-6">
                                                        <h3 className="font-bold text-gray-800">{leader.name}</h3>
                                                        <p className="text-sm text-[#E65F2B] font-medium">{leader.title}</p>
                                                        <p className="text-xs text-gray-400 mt-2 italic">"{leader.quote}"</p>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-2">
                                                    <div className="mb-6">
                                                        <div className="flex items-center gap-1 text-[#E65F2B] mb-4">
                                                            <span className="text-5xl font-serif opacity-50">"</span>
                                                            <span className="text-xs font-mono text-gray-400">MESSAGE</span>
                                                        </div>
                                                        <p className="text-gray-600 leading-relaxed text-lg">
                                                            {leader.message}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                                        <div className="h-px w-12 bg-[#E65F2B]"></div>
                                                        <span className="text-sm text-gray-500 font-medium">{leader.signature}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dots */}
                            <div className="flex justify-center gap-2 mt-6">
                                {leaderMessages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentLeader(index);
                                            setIsAutoPlaying(false);
                                            setTimeout(() => setIsAutoPlaying(true), 10000);
                                        }}
                                        className={`h-2 rounded-full transition-all ${
                                            index === currentLeader 
                                                ? 'w-6 bg-[#E65F2B]' 
                                                : 'w-2 bg-gray-300 hover:bg-[#E65F2B]/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Assistance Section */}
                <section id="assistance" className="py-20 relative bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full border border-orange-200 mb-4">
                                <HandHeart className="h-4 w-4 text-[#E65F2B]" />
                                <span className="text-xs font-semibold text-[#E65F2B] font-mono">Support Programs</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                                Financial Assistance Under <span className="text-[#E65F2B]">Sahayog Scheme</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Comprehensive support for various life events and needs of our employees and their families
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {assistanceCategories.map((category, idx) => {
                                const Icon = category.icon;
                                return (
                                    <div key={category.id} className={`group relative ${idx % 2 === 1 ? 'lg:mt-8' : ''}`}>
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E65F2B]/10 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                                        <div className={`relative bg-white rounded-2xl border ${category.borderColor} overflow-hidden shadow-sm hover:shadow-lg transition-all`}>
                                            <div className="grid md:grid-cols-2">
                                                <div className="p-6 lg:p-8">
                                                    <div className={`inline-flex items-center gap-2 ${category.iconBg} px-3 py-1.5 rounded-full mb-4`}>
                                                        <Icon className={`h-4 w-4 ${category.iconColor}`} />
                                                        <span className={`text-xs font-semibold ${category.iconColor}`}>
                                                            {category.shortTitle}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{category.title}</h3>
                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {category.features.slice(0, 2).map((feature, i) => (
                                                            <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full border border-gray-200">
                                                                {feature}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center justify-between mt-4">
                                                        <span className="text-xs font-semibold text-gray-500">{category.stat}</span>
                                                        <Link
                                                            href={`/assistance/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                            className={`inline-flex items-center gap-1 text-sm font-medium ${category.iconColor} hover:gap-2 transition-all`}
                                                        >
                                                            Learn More
                                                            <ArrowRight className="h-3.5 w-3.5" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="relative h-48 md:h-auto">
                                                    <img
                                                        src={category.image}
                                                        alt={category.title}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-transparent" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Mission Statement */}
                        <div className="mt-16 text-center relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 bg-[#E65F2B]/5 rounded-full blur-3xl" />
                            </div>
                            <div className="relative bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                                <Quote className="h-8 w-8 text-[#E65F2B]/30 mx-auto mb-4" />
                                <p className="text-xl lg:text-2xl text-gray-700 italic max-w-4xl mx-auto font-light">
                                    "Providing financial support and a spectrum of assistance for diverse needs and challenges, 
                                    ensuring our ONGC family never faces difficulties alone."
                                </p>
                                <div className="mt-4 flex justify-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-[#E65F2B] fill-current" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Apply Section */}
                <section id="how-to-apply" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
                                    <Zap className="h-4 w-4 text-[#E65F2B]" />
                                    <span className="text-xs font-semibold text-[#E65F2B]">Simple Process</span>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                                    How to Apply For <span className="text-[#E65F2B]">Financial Aid</span>
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Our streamlined application process ensures you get the support you need quickly and efficiently. 
                                    Follow these simple steps to apply for any Sahayog scheme.
                                </p>
                                
                                <div className="space-y-4">
                                    {applicationSteps.map((step) => {
                                        const StepIcon = step.icon;
                                        const colorMap: Record<string, string> = {
                                            blue: "bg-blue-50 text-blue-600",
                                            amber: "bg-amber-50 text-amber-600",
                                            green: "bg-emerald-50 text-emerald-600",
                                            purple: "bg-purple-50 text-purple-600",
                                            rose: "bg-rose-50 text-rose-600"
                                        };
                                        const bgColor = colorMap[step.color] || "bg-orange-50 text-orange-600";
                                        
                                        return (
                                            <div key={step.number} className="group">
                                                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 group-hover:border-[#E65F2B]/30 group-hover:shadow-md transition-all">
                                                    <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center text-lg font-bold shadow-sm group-hover:scale-110 transition-transform`}>
                                                        {step.number}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-800 mb-1">{step.title}</h4>
                                                        <p className="text-sm text-gray-500">{step.description}</p>
                                                    </div>
                                                    <StepIcon className={`h-5 w-5 ${bgColor.split(' ')[1]} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E65F2B] to-[#FF6B35] text-white font-medium shadow-md hover:shadow-lg transition-all group"
                                    >
                                        Start Application
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <a
                                        href="#contact"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#E65F2B] text-[#E65F2B] font-medium hover:bg-[#E65F2B] hover:text-white transition-all group"
                                    >
                                        <Phone className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                                        Contact Support
                                    </a>
                                </div>
                            </div>
                            
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#E65F2B]/10 to-transparent rounded-3xl blur-3xl" />
                                <div className="relative bg-white rounded-3xl border border-gray-200 p-8 shadow-xl">
                                    <div className="relative overflow-hidden rounded-2xl mb-6">
                                        <img 
                                            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" 
                                            alt="Application Process"
                                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-4 border border-emerald-100">
                                            <Clock className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                                            <div className="text-2xl font-bold text-emerald-600">5 min</div>
                                            <div className="text-xs text-gray-500">Average time</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-100">
                                            <MessageCircle className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                                            <div className="text-2xl font-bold text-blue-600">24hr</div>
                                            <div className="text-xs text-gray-500">Initial response</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer id="contact" className="bg-gray-900 text-gray-300 mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
                            <div>
                                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    {['Sitemap', 'Privacy Policy', 'Terms of Use', 'Disclaimer'].map((link) => (
                                        <li key={link}>
                                            <a href={`/${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm hover:text-[#E65F2B] transition-colors">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="md:col-span-2">
                                <h3 className="text-white font-semibold mb-4">Reach Us</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Building2 className="h-5 w-5 text-[#E65F2B] shrink-0 mt-0.5" />
                                        <p className="text-sm">
                                            Registered Office: ONGC Welfare Trust, 6th Floor A-Wing,<br />
                                            B S Negi Bhawan, Dehradun, 248003
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <PhoneCall className="h-5 w-5 text-[#E65F2B] shrink-0" />
                                        <p className="text-sm">011-26750998 / 011-26750991</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MailOpen className="h-5 w-5 text-[#E65F2B] shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm mb-1">For grievances, please visit ONGC Grievance portal:</p>
                                            <a 
                                                href="https://grievance.ongc.co.in" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-sm text-[#E65F2B] hover:underline inline-flex items-center gap-1"
                                            >
                                                grievance.ongc.co.in
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="inline-flex items-center gap-2 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E65F2B] to-[#FF6B35] flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">O</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">ONGC Sahayog</p>
                                        <p className="text-xs text-gray-400">Welfare Trust</p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mb-4">
                                    © {new Date().getFullYear()} ONGC Welfare Trust.<br />
                                    All rights reserved.
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-xs text-gray-400">24/7 Support Available</span>
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <a href="#" className="text-gray-500 hover:text-[#E65F2B] transition-colors"><Facebook className="h-4 w-4" /></a>
                                    <a href="#" className="text-gray-500 hover:text-[#E65F2B] transition-colors"><Twitter className="h-4 w-4" /></a>
                                    <a href="#" className="text-gray-500 hover:text-[#E65F2B] transition-colors"><Linkedin className="h-4 w-4" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes glitch-1 {
                    0% { transform: translate(0); opacity: 0.4; }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                    100% { transform: translate(0); opacity: 0.4; }
                }
                @keyframes glitch-2 {
                    0% { transform: translate(0); opacity: 0.4; }
                    20% { transform: translate(2px, -2px); }
                    40% { transform: translate(2px, 2px); }
                    60% { transform: translate(-2px, -2px); }
                    80% { transform: translate(-2px, 2px); }
                    100% { transform: translate(0); opacity: 0.4; }
                }
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
                .animate-slide-up { animation: slide-up 0.6s ease-out forwards; opacity: 0; }
                .animate-glitch-1 { animation: glitch-1 0.3s infinite; }
                .animate-glitch-2 { animation: glitch-2 0.3s infinite; }
                .animate-gradient { background-size: 200% auto; animation: gradient 3s linear infinite; }
                .animate-spin-slow { animation: spin 8s linear infinite; }
                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-400 { animation-delay: 0.4s; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </>
    );
}