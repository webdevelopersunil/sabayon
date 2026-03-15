import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { 
    Menu, 
    X, 
    ChevronRight, 
    Heart, 
    GraduationCap, 
    Stethoscope, 
    Users, 
    Phone, 
    Mail, 
    MapPin,
    ExternalLink,
    ArrowRight,
    Quote,
    Calendar,
    CheckCircle,
    FileText,
    Award,
    Shield,
    TrendingUp,
    Home,
    Briefcase,
    DollarSign,
    ChevronLeft,
    Star
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Sample leader messages for slider
const leaderMessages = [
    {
        id: 1,
        name: "Arun Kumar Singh",
        title: "Chairman & CEO, ONGC",
        message: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Assumenda neque atque quae architecto facere, numquam officiis non officia in ipsam, vel eius recusandae ad modi, odio eligendi nihil accusamus natus. Vitae eius hic, incidunt laborum quos ullam error numquam.",
        image: "https://images.unsplash.com/photo-1560252872-0cdc1df8fa5c?auto=format&fit=crop&w=200&q=80",
        signature: "Arun Kumar Singh"
    },
    {
        id: 2,
        name: "Smt. Promila Dubey",
        title: "Director (HR), ONGC",
        message: "Our commitment to employee welfare remains unwavering. The Sahayog scheme reflects our dedication to supporting our ONGC family in times of need. We believe in standing together and ensuring no one faces challenges alone.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
        signature: "Promila Dubey"
    },
    {
        id: 3,
        name: "Shri. Rajesh Kumar",
        title: "Director (Finance), ONGC",
        message: "Financial assistance under Sahayog is designed to provide meaningful support where it matters most. Whether it's education, medical needs, or family responsibilities, we're here to ensure our employees can focus on what matters without financial worries.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
        signature: "Rajesh Kumar"
    }
];

// Financial assistance categories
const assistanceCategories = [
    {
        id: 1,
        title: "Daughter Marriage Assistance",
        description: "Celebrate your daughter's wedding with confidence. Our program provides comprehensive financial support for marriage ceremonies, dowry, and related expenses.",
        icon: Heart,
        color: "pink",
        bgColor: "bg-pink-50",
        textColor: "text-pink-600",
        borderColor: "border-pink-200",
        features: ["Up to ₹5,00,000 assistance", "Wedding planning support", "Flexible disbursement"],
        image: "https://images.unsplash.com/photo-1511285568649-4b6416b4f9b1?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Education Assistance",
        description: "Unlock academic potential with scholarships, tuition aid, and educational resources for children's education, professional courses, and skill development.",
        icon: GraduationCap,
        color: "blue",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
        borderColor: "border-blue-200",
        features: ["School fee coverage", "Higher education loans", "Merit scholarships"],
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Medical Assistance",
        description: "Comprehensive healthcare support for employees and family members, covering treatments, surgeries, and critical illnesses without financial burden.",
        icon: Stethoscope,
        color: "green",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        borderColor: "border-green-200",
        features: ["Cashless treatment", "Critical illness cover", "Family floater option"],
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "Housing Assistance",
        description: "Support for home purchase, construction, or renovation, making the dream of owning a home a reality for ONGC employees.",
        icon: Home,
        color: "purple",
        bgColor: "bg-purple-50",
        textColor: "text-purple-600",
        borderColor: "border-purple-200",
        features: ["Home loan subsidies", "Construction support", "Renovation grants"],
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
    }
];

// Application steps
const applicationSteps = [
    {
        number: 1,
        title: "Check Eligibility",
        description: "Verify your eligibility criteria based on employment status, service years, and specific scheme requirements.",
        icon: CheckCircle
    },
    {
        number: 2,
        title: "Gather Documents",
        description: "Collect required documents including identity proof, service records, and scheme-specific paperwork.",
        icon: FileText
    },
    {
        number: 3,
        title: "Submit Application",
        description: "Fill out the online application form with accurate details and upload supporting documents.",
        icon: Briefcase
    },
    {
        number: 4,
        title: "Verification",
        description: "Your application undergoes verification by HR and ER departments for authenticity.",
        icon: Shield
    },
    {
        number: 5,
        title: "Approval & Disbursement",
        description: "Upon approval, funds are disbursed directly to your registered bank account.",
        icon: DollarSign
    }
];

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentLeader, setCurrentLeader] = useState(0);
    const [stats, setStats] = useState({
        employees: 35000,
        families: 150000,
        disbursed: 250,
        schemes: 8
    });

    // Auto-rotate leader messages
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentLeader((prev) => (prev + 1) % leaderMessages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <Head title="Welcome - ONGC Sahayog">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700|inter:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>
            
            {/* Background decorative elements */}
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#E65F2B]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            <div className="min-h-screen bg-white font-['Inter']">
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
                                <a href="#home" className="text-sm font-medium text-gray-700 hover:text-[#E65F2B] transition-colors relative group">
                                    Home
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E65F2B] group-hover:w-full transition-all duration-300"></span>
                                </a>
                                <a href="#assistance" className="text-sm font-medium text-gray-700 hover:text-[#E65F2B] transition-colors relative group">
                                    Assistance
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E65F2B] group-hover:w-full transition-all duration-300"></span>
                                </a>
                                <a href="#how-to-apply" className="text-sm font-medium text-gray-700 hover:text-[#E65F2B] transition-colors relative group">
                                    How to Apply
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E65F2B] group-hover:w-full transition-all duration-300"></span>
                                </a>
                                <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-[#E65F2B] transition-colors relative group">
                                    Contact
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E65F2B] group-hover:w-full transition-all duration-300"></span>
                                </a>
                            </div>

                            {/* Auth Buttons */}
                            <div className="hidden md:flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E65F2B] text-white text-sm font-medium hover:bg-[#C44A1F] transition-all shadow-sm hover:shadow-md relative overflow-hidden group"
                                    >
                                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative z-10">Dashboard</span>
                                        <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="text-sm font-medium text-gray-700 hover:text-[#E65F2B] transition-colors px-4 py-2"
                                        >
                                            Log in
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E65F2B] text-white text-sm font-medium hover:bg-[#C44A1F] transition-all shadow-sm hover:shadow-md relative overflow-hidden group"
                                            >
                                                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                <span className="relative z-10">Register</span>
                                                <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
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
                                <a href="#home" className="block text-sm text-gray-700 hover:text-[#E65F2B] py-2">Home</a>
                                <a href="#assistance" className="block text-sm text-gray-700 hover:text-[#E65F2B] py-2">Assistance</a>
                                <a href="#how-to-apply" className="block text-sm text-gray-700 hover:text-[#E65F2B] py-2">How to Apply</a>
                                <a href="#contact" className="block text-sm text-gray-700 hover:text-[#E65F2B] py-2">Contact</a>
                                <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                                    {auth.user ? (
                                        <Link
                                            href={dashboard()}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#E65F2B] text-white text-sm font-medium"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={login()}
                                                className="text-center text-sm font-medium text-gray-700 hover:text-[#E65F2B] px-4 py-2"
                                            >
                                                Log in
                                            </Link>
                                            {canRegister && (
                                                <Link
                                                    href={register()}
                                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#E65F2B] text-white text-sm font-medium"
                                                >
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

                {/* Hero Section with Stats */}
                <section id="home" className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-white to-orange-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-[#E65F2B]/10 px-4 py-2 rounded-full mb-4">
                                <Award className="h-4 w-4 text-[#E65F2B]" />
                                <span className="text-xs font-semibold text-[#E65F2B] uppercase tracking-wider">ONGC Welfare Trust</span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                                Caring for Our<br />
                                <span className="text-[#E65F2B]">ONGC Family</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Providing comprehensive financial assistance and support to our employees and their families through the Sahayog scheme.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-all">
                                <div className="text-3xl font-bold text-[#E65F2B] mb-2">{stats.employees.toLocaleString()}+</div>
                                <div className="text-sm text-gray-600">Employees Covered</div>
                            </div>
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-all">
                                <div className="text-3xl font-bold text-[#E65F2B] mb-2">{stats.families.toLocaleString()}+</div>
                                <div className="text-sm text-gray-600">Family Members</div>
                            </div>
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-all">
                                <div className="text-3xl font-bold text-[#E65F2B] mb-2">₹{stats.disbursed}Cr+</div>
                                <div className="text-sm text-gray-600">Amount Disbursed</div>
                            </div>
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-all">
                                <div className="text-3xl font-bold text-[#E65F2B] mb-2">{stats.schemes}</div>
                                <div className="text-sm text-gray-600">Active Schemes</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leaders Message Slider */}
                <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                                Messages from Our <span className="text-[#E65F2B]">Leaders</span>
                            </h2>
                            <div className="w-24 h-1 bg-[#E65F2B] mx-auto rounded-full"></div>
                        </div>

                        <div className="relative">
                            {/* Slider Controls */}
                            <button
                                onClick={() => setCurrentLeader((prev) => (prev - 1 + leaderMessages.length) % leaderMessages.length)}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#E65F2B] hover:text-[#E65F2B] transition-all z-10 shadow-sm"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setCurrentLeader((prev) => (prev + 1) % leaderMessages.length)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#E65F2B] hover:text-[#E65F2B] transition-all z-10 shadow-sm"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>

                            {/* Slider Content */}
                            <div className="relative overflow-hidden rounded-3xl">
                                <div 
                                    className="flex transition-transform duration-500 ease-out"
                                    style={{ transform: `translateX(-${currentLeader * 100}%)` }}
                                >
                                    {leaderMessages.map((leader) => (
                                        <div key={leader.id} className="w-full flex-shrink-0">
                                            <div className="bg-white rounded-3xl border border-gray-200 p-8 lg:p-12 shadow-xl">
                                                <div className="grid lg:grid-cols-3 gap-8 items-center">
                                                    <div className="lg:col-span-1">
                                                        <div className="relative">
                                                            <div className="absolute inset-0 bg-[#E65F2B]/20 rounded-2xl blur-2xl" />
                                                            <img
                                                                src={leader.image}
                                                                alt={leader.name}
                                                                className="relative w-48 h-48 rounded-2xl object-cover mx-auto border-4 border-white shadow-xl"
                                                            />
                                                            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#E65F2B] rounded-full flex items-center justify-center">
                                                                <Quote className="h-6 w-6 text-white" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="lg:col-span-2">
                                                        <div className="mb-6">
                                                            <h3 className="text-2xl font-bold text-gray-800">{leader.name}</h3>
                                                            <p className="text-[#E65F2B] font-medium">{leader.title}</p>
                                                        </div>
                                                        <p className="text-gray-600 leading-relaxed text-lg italic mb-6">
                                                            "{leader.message}"
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-px w-12 bg-[#E65F2B]"></div>
                                                            <span className="text-sm text-gray-500">{leader.signature}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dots Indicator */}
                            <div className="flex justify-center gap-2 mt-6">
                                {leaderMessages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentLeader(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            index === currentLeader 
                                                ? 'w-6 bg-[#E65F2B]' 
                                                : 'bg-gray-300 hover:bg-[#E65F2B]/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Financial Assistance Section */}
                <section id="assistance" className="py-16 lg:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-[#E65F2B]/10 px-4 py-2 rounded-full mb-4">
                                <TrendingUp className="h-4 w-4 text-[#E65F2B]" />
                                <span className="text-xs font-semibold text-[#E65F2B]">Support Programs</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                                Financial Assistance Under <span className="text-[#E65F2B]">Sahayog Scheme</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Comprehensive support for various life events and needs of our employees and their families
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {assistanceCategories.map((category, index) => {
                                const Icon = category.icon;
                                const isEven = index % 2 === 0;
                                return (
                                    <div key={category.id} className={`relative group ${isEven ? 'lg:translate-y-8' : ''}`}>
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E65F2B]/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                                        <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="p-6">
                                                    <div className={`inline-flex items-center gap-2 ${category.bgColor} px-3 py-1.5 rounded-full mb-4`}>
                                                        <Icon className={`h-4 w-4 ${category.textColor}`} />
                                                        <span className={`text-xs font-semibold ${category.textColor}`}>
                                                            {category.title.split(' ')[0]} Support
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{category.title}</h3>
                                                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                                                    <ul className="space-y-2 mb-4">
                                                        {category.features.map((feature, i) => (
                                                            <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                                                                <CheckCircle className={`h-3.5 w-3.5 ${category.textColor}`} />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <Link
                                                        href={`/assistance/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                        className={`inline-flex items-center gap-1 text-sm font-medium ${category.textColor} hover:gap-2 transition-all`}
                                                    >
                                                        Learn More
                                                        <ArrowRight className="h-3.5 w-3.5" />
                                                    </Link>
                                                </div>
                                                <div className="relative h-48 md:h-auto">
                                                    <img
                                                        src={category.image}
                                                        alt={category.title}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />
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
                                <div className="w-24 h-24 bg-[#E65F2B]/5 rounded-full blur-3xl"></div>
                            </div>
                            <p className="relative text-xl lg:text-2xl text-gray-700 italic max-w-4xl mx-auto font-light">
                                "Providing financial support and a spectrum of assistance for diverse needs and challenges, 
                                ensuring our ONGC family never faces difficulties alone."
                            </p>
                            <div className="mt-4 flex justify-center gap-1">
                                <Star className="h-4 w-4 text-[#E65F2B] fill-current" />
                                <Star className="h-4 w-4 text-[#E65F2B] fill-current" />
                                <Star className="h-4 w-4 text-[#E65F2B] fill-current" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Apply Section with 5 Steps */}
                <section id="how-to-apply" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-[#E65F2B]/10 px-4 py-2 rounded-full mb-4">
                                    <span className="text-xs font-semibold text-[#E65F2B]">Simple Process</span>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                                    How to Apply For <span className="text-[#E65F2B]">Financial Aid</span>
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Our streamlined application process ensures you get the support you need quickly and efficiently. 
                                    Follow these simple steps to apply for any Sahayog scheme.
                                </p>
                                
                                <div className="space-y-4">
                                    {applicationSteps.map((step, index) => {
                                        const StepIcon = step.icon;
                                        return (
                                            <div key={step.number} className="relative group">
                                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E65F2B]/10 to-transparent rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition duration-300" />
                                                <div className="relative flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 group-hover:border-[#E65F2B]/30 transition-all">
                                                    <div className="w-10 h-10 rounded-full bg-[#E65F2B] flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                                                        {step.number}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-800 mb-1">{step.title}</h4>
                                                        <p className="text-sm text-gray-500">{step.description}</p>
                                                    </div>
                                                    <StepIcon className="h-5 w-5 text-[#E65F2B]/30 group-hover:text-[#E65F2B]/60 transition-colors" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 flex gap-4">
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E65F2B] text-white font-medium hover:bg-[#C44A1F] transition-all shadow-lg hover:shadow-xl group"
                                    >
                                        Start Application
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href="#contact"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#E65F2B] text-[#E65F2B] font-medium hover:bg-[#E65F2B] hover:text-white transition-all group"
                                    >
                                        Contact Support
                                        <Phone className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#E65F2B]/20 to-transparent rounded-3xl blur-3xl" />
                                <div className="relative bg-white rounded-3xl border border-gray-200 p-8 shadow-2xl">
                                    <img 
                                        src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" 
                                        alt="Application Process"
                                        className="rounded-2xl mb-6"
                                    />
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="bg-green-50 rounded-xl p-3">
                                            <div className="text-2xl font-bold text-green-600">5 min</div>
                                            <div className="text-xs text-gray-500">Average time</div>
                                        </div>
                                        <div className="bg-blue-50 rounded-xl p-3">
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
                <footer id="contact" className="bg-gray-900 text-gray-300 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-8">
                            {/* Other Links */}
                            <div>
                                <h3 className="text-white font-semibold mb-4">Other Links</h3>
                                <ul className="space-y-2">
                                    <li><a href="/sitemap" className="hover:text-[#E65F2B] transition-colors text-sm">Sitemap</a></li>
                                    <li><a href="/privacy-policy" className="hover:text-[#E65F2B] transition-colors text-sm">Privacy Policy</a></li>
                                    <li><a href="/terms-of-use" className="hover:text-[#E65F2B] transition-colors text-sm">Terms of Use</a></li>
                                    <li><a href="/disclaimer" className="hover:text-[#E65F2B] transition-colors text-sm">Disclaimer</a></li>
                                </ul>
                            </div>

                            {/* Reach Us */}
                            <div className="md:col-span-2">
                                <h3 className="text-white font-semibold mb-4">Reach Us</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-[#E65F2B] shrink-0 mt-0.5" />
                                        <p className="text-sm">
                                            Registered Office: ONGC Welfare Trust, 6th Floor A-Wing,<br />
                                            B S Negi Bhawan, Dehradun, 248003
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-[#E65F2B] shrink-0" />
                                        <p className="text-sm">Telephone No. 011-26750998; Fax No. 011-26750991/ 26129091</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="h-5 w-5 text-[#E65F2B] shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm mb-1">For registering any grievances, please visit ONGC Grievance portal:</p>
                                            <a 
                                                href="https://grievance.ongc.co.in" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-sm text-[#E65F2B] hover:underline inline-flex items-center gap-1"
                                            >
                                                https://grievance.ongc.co.in
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Logo */}
                            <div className="text-center md:text-left">
                                <div className="inline-flex items-center gap-2">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#E65F2B] to-[#C44A1F] flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold text-2xl">O</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">ONGC Sahayog</p>
                                        <p className="text-xs text-gray-400">Welfare Trust</p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-4">
                                    © {new Date().getFullYear()} ONGC Welfare Trust.<br />
                                    All rights reserved.
                                </p>
                                <div className="mt-4 flex justify-center md:justify-start gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-xs text-gray-400">24/7 Support Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}