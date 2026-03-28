import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { 
    Search, 
    Users, 
    CheckCircle2, 
    Clock3, 
    XCircle,
    UserCheck,
    UserX,
    TrendingUp,
    BarChart3,
    Bell,
    Settings,
    LogOut,
    ShieldCheck,
    FileText,
    ArrowRight
} from 'lucide-react';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
];

// Circular Progress Component
function CircularProgress({ 
    value, 
    total, 
    color, 
    label, 
    bgColor = 'bg-gray-100',
    size = 120 
}: { 
    value: number; 
    total: number; 
    color: string; 
    label: string;
    bgColor?: string;
    size?: number;
}) {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                    />
                    {/* Progress circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">{value}</span>
                    <span className="text-xs text-gray-500">of {total}</span>
                </div>
            </div>
            <span className="mt-2 text-sm font-medium text-gray-600">{label}</span>
        </div>
    );
}

export default function AdminDashboard({ 
    userName = "Admin User", 
    verifiedUsers = 156, 
    notVerifiedUsers = 42, 
    underProcess = 28, 
    approved = 95, 
    rejected = 12 
}: { 
    userName?: string; 
    verifiedUsers?: number; 
    notVerifiedUsers?: number; 
    underProcess?: number; 
    approved?: number; 
    rejected?: number; 
}) {
    
    const totalUsers = verifiedUsers + notVerifiedUsers;
    const totalRequests = underProcess + approved + rejected;

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        search: '',
    });

    useEffect(() => {
        if (errors.search) {
            const timer = setTimeout(() => clearErrors('search'), 2000);
            return () => clearTimeout(timer);
        }
    }, [errors.search, clearErrors]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.search.trim()) return;
        post('/admin/sahayog-requests/search/find', {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E65F2B]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative p-6 w-full max-w-[80%] mx-auto space-y-6">
                {/* Top Navigation Bar */}
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="relative px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#E65F2B]/20 rounded-lg blur-xl" />
                                    <div className="relative rounded-lg bg-[#E65F2B] p-2.5 shadow-md">
                                        <BarChart3 className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                                    <p className="text-xs text-gray-500">Manage and monitor Sahayog requests</p>
                                </div>
                            </div>
                            
                            {/* <div className="flex items-center gap-4">
                                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                                    <Bell className="h-5 w-5 text-gray-600" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#E65F2B] rounded-full"></span>
                                </button>
                                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                    <Settings className="h-5 w-5 text-gray-600" />
                                </button>
                                <div className="h-8 w-px bg-gray-200"></div>
                                <button className="flex items-center gap-3 group">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-700">{userName}</p>
                                        <p className="text-xs text-gray-400">Administrator</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-[#E65F2B]/10 flex items-center justify-center border-2 border-[#E65F2B]/20 group-hover:border-[#E65F2B] transition-colors">
                                        <span className="text-sm font-semibold text-[#E65F2B]">
                                            {userName.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Welcome Ribbon Bar */}
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#E65F2B]/10 to-transparent rounded-full blur-3xl" />
                    
                    <div className="relative px-6 py-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-[#E65F2B]/10">
                                    <Users className="h-6 w-6 text-[#E65F2B]" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium uppercase tracking-wider text-[#E65F2B]">Welcome back</span>
                                        <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">Active</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mt-1">
                                        Hello, {userName}! 👋
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        Here's what's happening with Sahayog requests today.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                                    <p className="text-xs text-gray-500">Last Login</p>
                                    <p className="text-sm font-medium text-gray-700">Today, 09:30 AM</p>
                                </div>
                                <button className="p-2 rounded-lg border border-gray-200 hover:border-[#E65F2B]/30 hover:bg-[#E65F2B]/5 transition-all">
                                    <LogOut className="h-4 w-4 text-gray-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar Ribbon */}
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#E65F2B]/5 rounded-full blur-2xl" />
                    
                    <div className="relative px-6 py-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Search className="h-4 w-4 text-[#E65F2B]" />
                                    Search Sahayog Request
                                </h3>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Enter request number to quickly access any Sahayog request
                                </p>
                            </div>
                            <form onSubmit={handleSearch} className="flex flex-col items-start gap-2 min-w-[300px]">
                                <div className="flex items-center gap-2 w-full">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={data.search}
                                            onChange={(e) => setData('search', e.target.value)}
                                            placeholder="Enter request number (e.g., SAH-2025-001)"
                                            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-all outline-none text-sm"
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="px-4 py-2.5 rounded-lg bg-[#E65F2B] text-white text-sm font-medium hover:bg-[#C44A1F] transition-colors shadow-sm whitespace-nowrap disabled:opacity-50"
                                    >
                                        Search
                                    </button>
                                </div>
                                {errors.search && (
                                    <p className="text-xs text-red-500 font-medium ml-1 animate-in fade-in">
                                        {errors.search}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout for Stats */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Users Verification Circle */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E65F2B]/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E65F2B]/5 rounded-full blur-2xl" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <Users className="h-5 w-5 text-[#E65F2B]" />
                                            User Verification Status
                                        </h2>
                                        <p className="text-xs text-gray-400 mt-0.5">Verified vs Non-verified users</p>
                                    </div>
                                    <span className="text-xs bg-[#E65F2B]/10 text-[#E65F2B] px-2 py-1 rounded-full">
                                        Total: {totalUsers}
                                    </span>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
                                    {/* Verified Users Circle */}
                                    <div className="flex flex-col items-center">
                                        <CircularProgress 
                                            value={verifiedUsers} 
                                            total={totalUsers} 
                                            color="#10b981" 
                                            label="Verified Users"
                                        />
                                        <div className="mt-3 flex items-center gap-1 text-sm">
                                            <UserCheck className="h-4 w-4 text-green-500" />
                                            <span className="font-medium text-gray-700">{verifiedUsers}</span>
                                            <span className="text-gray-400">verified</span>
                                        </div>
                                    </div>
                                    
                                    {/* Not Verified Users Circle */}
                                    <div className="flex flex-col items-center">
                                        <CircularProgress 
                                            value={notVerifiedUsers} 
                                            total={totalUsers} 
                                            color="#ef4444" 
                                            label="Non-verified Users"
                                        />
                                        <div className="mt-3 flex items-center gap-1 text-sm">
                                            <UserX className="h-4 w-4 text-red-500" />
                                            <span className="font-medium text-gray-700">{notVerifiedUsers}</span>
                                            <span className="text-gray-400">non-verified</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Stats Summary */}
                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                                        <p className="text-xs text-green-600">Verified %</p>
                                        <p className="text-lg font-semibold text-green-700">
                                            {totalUsers === 0 && verifiedUsers === 0
                                                ? 0
                                                : Math.round((verifiedUsers / totalUsers) * 100)
                                            }%
                                        </p>
                                    </div>
                                    <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                                        <p className="text-xs text-red-600">Non-verified %</p>
                                        <p className="text-lg font-semibold text-red-700">
                                            {totalUsers === 0
                                                ? 0
                                                : Math.round((notVerifiedUsers / totalUsers) * 100)
                                            }%
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons - Added here */}
                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <Link
                                        href="/admin/verify-users"
                                        className="group relative inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#E65F2B] text-white text-sm font-medium hover:bg-[#C44A1F] transition-all shadow-sm overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <ShieldCheck className="h-4 w-4 relative z-10" />
                                        <span className="relative z-10">Verify Users</span>
                                        <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    
                                    <Link
                                        href="/admin/sahayog-requests"
                                        className="group relative inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-[#E65F2B] text-[#E65F2B] text-sm font-medium hover:bg-[#E65F2B] hover:text-white transition-all overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-[#E65F2B] -translate-x-full  transition-transform duration-300" />
                                        <FileText className="h-4 w-4 relative z-10" />
                                        <span className="relative z-10">Sahayog Requests</span>
                                        <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Request Status Circle */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E65F2B]/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E65F2B]/5 rounded-full blur-2xl" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5 text-[#E65F2B]" />
                                            Request Status Distribution
                                        </h2>
                                        <p className="text-xs text-gray-400 mt-0.5">Current status of all Sahayog requests</p>
                                    </div>
                                    <span className="text-xs bg-[#E65F2B]/10 text-[#E65F2B] px-2 py-1 rounded-full">
                                        Total: {totalRequests}
                                    </span>
                                </div>
                                
                                <div className="flex flex-col items-center py-4">
                                    {/* Three Color Progress Circle */}
                                    <div className="relative w-48 h-48">
                                        <svg className="w-full h-full -rotate-90 transform">
                                            {/* Under Process Segment */}
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="80"
                                                fill="none"
                                                stroke="#eab308"
                                                strokeWidth="16"
                                                strokeDasharray={`${(underProcess / totalRequests) * 502.4} 502.4`}
                                                strokeDashoffset="0"
                                                strokeLinecap="round"
                                                className="transition-all duration-1000 ease-out"
                                            />
                                            {/* Approved Segment */}
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="80"
                                                fill="none"
                                                stroke="#22c55e"
                                                strokeWidth="16"
                                                strokeDasharray={`${(approved / totalRequests) * 502.4} 502.4`}
                                                strokeDashoffset={-((underProcess / totalRequests) * 502.4)}
                                                strokeLinecap="round"
                                                className="transition-all duration-1000 ease-out"
                                            />
                                            {/* Rejected Segment */}
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="80"
                                                fill="none"
                                                stroke="#ef4444"
                                                strokeWidth="16"
                                                strokeDasharray={`${(rejected / totalRequests) * 502.4} 502.4`}
                                                strokeDashoffset={-(((underProcess + approved) / totalRequests) * 502.4)}
                                                strokeLinecap="round"
                                                className="transition-all duration-1000 ease-out"
                                            />
                                        </svg>
                                        
                                        {/* Center Text */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-bold text-gray-800">{totalRequests}</span>
                                            <span className="text-xs text-gray-400">Total</span>
                                        </div>
                                    </div>
                                    
                                    {/* Legend */}
                                    <div className="grid grid-cols-3 gap-4 mt-6 w-full">
                                        <div className="flex flex-col items-center p-2 rounded-lg bg-yellow-50 border border-yellow-100">
                                            <Clock3 className="h-4 w-4 text-yellow-500 mb-1" />
                                            <span className="text-xs text-gray-500">Under Process</span>
                                            <span className="text-lg font-bold text-gray-800">{underProcess}</span>
                                            <span className="text-xs text-gray-400">{Math.round((underProcess / totalRequests) * 100)}%</span>
                                        </div>
                                        <div className="flex flex-col items-center p-2 rounded-lg bg-green-50 border border-green-100">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mb-1" />
                                            <span className="text-xs text-gray-500">Approved</span>
                                            <span className="text-lg font-bold text-gray-800">{approved}</span>
                                            <span className="text-xs text-gray-400">{Math.round((approved / totalRequests) * 100)}%</span>
                                        </div>
                                        <div className="flex flex-col items-center p-2 rounded-lg bg-red-50 border border-red-100">
                                            <XCircle className="h-4 w-4 text-red-500 mb-1" />
                                            <span className="text-xs text-gray-500">Rejected</span>
                                            <span className="text-lg font-bold text-gray-800">{rejected}</span>
                                            <span className="text-xs text-gray-400">{Math.round((rejected / totalRequests) * 100)}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Footer */}
                {/* <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                        <p className="text-xs text-gray-400">Today's Requests</p>
                        <p className="text-xl font-bold text-gray-800 mt-1">12</p>
                        <p className="text-xs text-green-600 mt-1">↑ 8% from yesterday</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                        <p className="text-xs text-gray-400">Pending Reviews</p>
                        <p className="text-xl font-bold text-gray-800 mt-1">{underProcess}</p>
                        <p className="text-xs text-yellow-600 mt-1">Requires attention</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                        <p className="text-xs text-gray-400">Completion Rate</p>
                        <p className="text-xl font-bold text-gray-800 mt-1">{Math.round((approved / totalRequests) * 100)}%</p>
                        <p className="text-xs text-green-600 mt-1">On track</p>
                    </div>
                </div> */}
            </div>
        </AppLayout>
    );
}