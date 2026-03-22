import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
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

const sampleUsers = [
    {
        id: 'U-001',
        name: 'Amit Sharma',
        verified: 'Approved',
        rejectedAt: '',
        aadhar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
        email: 'amit.sharma@ongc.co.in',
        department: 'Production',
        mobile: '+91 98765 43210',
    },
    {
        id: 'U-002',
        name: 'Sita Devi',
        verified: 'Rejected',
        rejectedAt: '2026-03-10',
        aadhar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80',
        email: 'sita.devi@ongc.co.in',
        department: 'HR',
        mobile: '+91 98765 43211',
    },
    {
        id: 'U-003',
        name: 'Rahul Jain',
        verified: 'Pending',
        rejectedAt: '',
        aadhar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=80&q=80',
        email: 'rahul.jain@ongc.co.in',
        department: 'Finance',
        mobile: '+91 98765 43212',
    },
    {
        id: 'U-004',
        name: 'Neha Patel',
        verified: 'Approved',
        rejectedAt: '',
        aadhar: 'https://images.unsplash.com/photo-1542204165-94c19a76f102?auto=format&fit=crop&w=80&q=80',
        email: 'neha.patel@ongc.co.in',
        department: 'Engineering',
        mobile: '+91 98765 43213',
    },
    {
        id: 'U-005',
        name: 'Sunil Rao',
        verified: 'Pending',
        rejectedAt: '',
        aadhar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80',
        email: 'sunil.rao@ongc.co.in',
        department: 'IT',
        mobile: '+91 98765 43214',
    },
    {
        id: 'U-006',
        name: 'Priya Verma',
        verified: 'Rejected',
        rejectedAt: '2026-03-07',
        aadhar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
        email: 'priya.verma@ongc.co.in',
        department: 'Marketing',
        mobile: '+91 98765 43215',
    },
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

export default function AdminVerifyUsers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(1);
    const perPage = 5;

    const filtered = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        let filteredUsers = sampleUsers;
        
        // Apply search filter
        if (term) {
            filteredUsers = filteredUsers.filter((u) =>
                u.id.toLowerCase().includes(term) ||
                u.name.toLowerCase().includes(term) ||
                u.email.toLowerCase().includes(term) ||
                u.department.toLowerCase().includes(term)
            );
        }
        
        // Apply status filter
        if (statusFilter !== 'all') {
            filteredUsers = filteredUsers.filter((u) => 
                u.verified.toLowerCase() === statusFilter.toLowerCase()
            );
        }
        
        return filteredUsers;
    }, [searchTerm, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const stats = {
        total: sampleUsers.length,
        approved: sampleUsers.filter(u => u.verified === 'Approved').length,
        pending: sampleUsers.filter(u => u.verified === 'Pending').length,
        rejected: sampleUsers.filter(u => u.verified === 'Rejected').length,
    };

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
                            <p className="text-xl font-semibold text-gray-800">{stats.total}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                            <p className="text-xs text-green-600">Approved</p>
                            <p className="text-xl font-semibold text-green-700">{stats.approved}</p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                            <p className="text-xs text-yellow-600">Pending</p>
                            <p className="text-xl font-semibold text-yellow-700">{stats.pending}</p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                            <p className="text-xs text-red-600">Rejected</p>
                            <p className="text-xl font-semibold text-red-700">{stats.rejected}</p>
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
                                            setPage(1);
                                        }}
                                        placeholder="Search by ID, name, email, department..."
                                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-all outline-none text-sm"
                                    />
                                </div>
                                
                                <select
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        setPage(1);
                                    }}
                                    className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-all outline-none text-sm bg-white min-w-[140px]"
                                >
                                    <option value="all">All Status</option>
                                    <option value="approved">Approved</option>
                                    <option value="pending">Pending</option>
                                    <option value="rejected">Rejected</option>
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
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Aadhar Photo</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User Details</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">Admin Verified</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">Rejected At</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center w-64">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginated.map((user) => (
                                        <tr key={user.id} className="group/row hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="relative">
                                                    <img 
                                                        src={user.aadhar} 
                                                        alt="Aadhar" 
                                                        className="h-14 w-14 rounded-lg object-cover border-2 border-gray-200 group-hover/row:border-[#E65F2B]/30 transition-all shadow-sm"
                                                    />
                                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-800">{user.name}</div>
                                                <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                                                    <span className="font-mono">{user.id}</span>
                                                    <span>•</span>
                                                    <span>{user.email}</span>
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    {user.department} • {user.mobile}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${getStatusClass(user.verified)}`}>
                                                    {getStatusIcon(user.verified)}
                                                    {user.verified}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {user.rejectedAt ? (
                                                    <span className="text-red-600 font-medium">{user.rejectedAt}</span>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
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
                                    ))}
                                    {paginated.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center">
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
                                    Showing <span className="font-medium text-gray-700">{(page - 1) * perPage + 1}</span> to{' '}
                                    <span className="font-medium text-gray-700">
                                        {Math.min(page * perPage, filtered.length)}
                                    </span>{' '}
                                    of <span className="font-medium text-gray-700">{filtered.length}</span> users
                                </p>
                                
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:border-[#E65F2B]/30 hover:text-[#E65F2B] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Previous
                                    </button>
                                    
                                    <div className="flex items-center gap-1">
                                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                            let pageNum = i + 1;
                                            if (totalPages > 5 && page > 3) {
                                                pageNum = page - 3 + i;
                                            }
                                            if (pageNum <= totalPages) {
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => setPage(pageNum)}
                                                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                                                            page === pageNum
                                                                ? 'bg-[#E65F2B] text-white shadow-md'
                                                                : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                                                        }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                    
                                    <button
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:border-[#E65F2B]/30 hover:text-[#E65F2B] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
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