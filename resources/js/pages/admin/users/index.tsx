import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import { 
    Search, 
    ChevronLeft, 
    ChevronRight, 
    Eye, 
    CheckCircle2, 
    XCircle,
    UserCheck,
    UserX,
    FileText,
    AlertCircle,
    Filter,
    Download,
    Home,
    Users,
    Shield
} from 'lucide-react';

// Breadcrumb configuration
const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Verify Users', href: '/admin/verify-users' },
];

const getStatusClass = (status: string) => {
    if (status === 'Approved') {
        return 'bg-green-50 text-green-700 border-green-200';
    }
    if (status === 'Rejected') {
        return 'bg-red-50 text-red-700 border-red-200';
    }
    return 'bg-yellow-50 text-yellow-700 border-yellow-200';
};

const getStatusIcon = (status: string) => {
    switch(status) {
        case 'Approved':
            return <CheckCircle2 className="h-3.5 w-3.5" />;
        case 'Rejected':
            return <XCircle className="h-3.5 w-3.5" />;
        default:
            return <AlertCircle className="h-3.5 w-3.5" />;
    }
};

type User = {
    id: number;
    name: string;
    cpf_no: string;
    email: string;
    designation: string;
    mobileno: string;
    admin_verified: boolean;
};

type Props = {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        total: number;
        from: number;
        to: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        search?: string;
        status?: string;
    };
    stats: {
        total: number;
        approved: number;
        pending: number;
        retired: number;
    };
};

export default function AdminVerifyUsers({ users, filters, stats }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                '/admin/verify-users',
                { search: searchTerm, status: statusFilter !== 'all' ? statusFilter : undefined },
                { preserveState: true, replace: true }
            );
        }, 300); // 300ms debounce

        return () => clearTimeout(timeout);
    }, [searchTerm, statusFilter]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Verify Users" />
            
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E65F2B]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative p-6 w-full max-w-[70%] mx-auto space-y-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="group">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#E65F2B]/20 rounded-lg blur-xl" />
                                    <div className="relative rounded-lg bg-[#E65F2B] p-2.5 shadow-md">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">
                                        Verify Users
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Review Aadhar uploads and approve/reject user verifications
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <Link 
                            href="/admin" 
                            className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all duration-300 text-gray-700"
                        >
                            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Admin</span>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <p className="text-xs text-gray-500">Total Users</p>
                            <p className="text-xl font-semibold text-gray-800">{stats?.total || 0}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                            <p className="text-xs text-green-600">Approved</p>
                            <p className="text-xl font-semibold text-green-700">{stats?.approved || 0}</p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                            <p className="text-xs text-yellow-600">Pending</p>
                            <p className="text-xl font-semibold text-yellow-700">{stats?.pending || 0}</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                            <p className="text-xs text-blue-600">Retired</p>
                            <p className="text-xl font-semibold text-blue-700">{stats?.retired || 0}</p>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#E65F2B]/5 rounded-full blur-2xl" />
                    
                    <div className="relative px-6 py-5">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Users className="h-4 w-4 text-[#E65F2B]" />
                                    Search Users
                                </h3>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Search by ID, name, email, or department
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-3 flex-1 lg:max-w-2xl">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                        }}
                                        placeholder="Search by ID, name, email, department..."
                                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-all outline-none text-sm"
                                    />
                                </div>
                                
                                <select
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                    }}
                                    className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-all outline-none text-sm bg-white min-w-[140px]"
                                >
                                    <option value="all">All Status</option>
                                    <option value="verified">Approved</option>
                                    <option value="unverified">Pending</option>
                                </select>
                                
                                <button className="px-4 py-2.5 rounded-lg border border-gray-200 hover:border-[#E65F2B]/30 hover:bg-gray-50 transition-all text-gray-600">
                                    <Filter className="h-5 w-5" />
                                </button>
                                <button className="px-4 py-2.5 rounded-lg bg-[#E65F2B]/10 text-[#E65F2B] hover:bg-[#E65F2B]/20 transition-all">
                                    <Download className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E65F2B]/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E65F2B]/5 rounded-full blur-2xl" />
                        
                        <div className="relative z-10 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="w-[100px] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-2">
                                                Index
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">User Info</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User Details</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">Admin Verified</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">Registered</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center w-64">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.data.map((user, index) => {
                                        const itemIndex = (users.from || 1) + index;
                                        
                                        return (
                                        <tr key={user.id} className="group/row hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-[#E65F2B]/10 flex items-center justify-center shrink-0">
                                                        <span className="text-xs font-semibold text-[#E65F2B]">
                                                            #{itemIndex}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="relative">
                                                    <div className="h-14 w-14 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-gray-400 group-hover/row:border-[#E65F2B]/30 transition-all shadow-sm">
                                                        <Users className="h-6 w-6" />
                                                    </div>
                                                    {user.admin_verified && <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-800">{user.name}</div>
                                                <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                                                    <span className="font-mono">{user.cpf_no}</span>
                                                    <span>•</span>
                                                    <span>{user.email}</span>
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    {user.designation || 'N/A'} • {user.mobileno || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${getStatusClass(user.admin_verified ? 'Approved' : 'Pending')}`}>
                                                    {getStatusIcon(user.admin_verified ? 'Approved' : 'Pending')}
                                                    {user.admin_verified ? 'Approved' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <span className="text-gray-400">-</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="group/btn inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 hover:border-green-300 transition-all text-xs font-medium">
                                                        <UserCheck className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                                                        Verify
                                                    </button>
                                                    
                                                    <button className="group/btn inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 hover:border-red-300 transition-all text-xs font-medium">
                                                        <UserX className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                                                        Reject
                                                    </button>
                                                    
                                                    <button className="group/btn inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all text-xs font-medium">
                                                        <Eye className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                                                        View
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        );
                                    })}
                                    {users.data.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center">
                                                <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                                <p className="text-gray-500 font-medium">No users found</p>
                                                <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-gray-500">
                                    Showing <span className="font-medium text-gray-700">{users.from || 0}</span> to{' '}
                                    <span className="font-medium text-gray-700">
                                        {users.to || 0}
                                    </span>{' '}
                                    of <span className="font-medium text-gray-700">{users.total || 0}</span> users
                                </p>
                                
                                <div className="flex items-center gap-1">
                                    {users.links.map((link, i) => {
                                        const isPrev = link.label.includes('Previous');
                                        const isNext = link.label.includes('Next');

                                        if (isPrev) {
                                            return (
                                                <Link
                                                    key={i}
                                                    href={link.url || ''}
                                                    preserveState
                                                    preserveScroll
                                                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:border-[#E65F2B]/30 hover:text-[#E65F2B] transition-all ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                                                >
                                                    <ChevronLeft className="h-4 w-4" />
                                                    Previous
                                                </Link>
                                            );
                                        }

                                        if (isNext) {
                                            return (
                                                <Link
                                                    key={i}
                                                    href={link.url || ''}
                                                    preserveState
                                                    preserveScroll
                                                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:border-[#E65F2B]/30 hover:text-[#E65F2B] transition-all ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                                                >
                                                    Next
                                                    <ChevronRight className="h-4 w-4" />
                                                </Link>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={i}
                                                href={link.url || ''}
                                                preserveState
                                                preserveScroll
                                                className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                                                    link.active
                                                        ? 'bg-[#E65F2B] text-white shadow-md'
                                                        : 'text-gray-600 hover:bg-gray-100 border border-gray-200 bg-white'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:border-[#E65F2B]/30 hover:text-[#E65F2B] transition-all">
                        Export List
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-[#E65F2B] text-white text-sm hover:bg-[#C44A1F] transition-all shadow-sm">
                        Bulk Verify
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}