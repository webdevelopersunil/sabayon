import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState, useEffect, useRef } from 'react';
import { 
    Search, 
    Eye, 
    ChevronLeft, 
    ChevronRight,
    Calendar,
    Filter,
    Download,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    FileQuestion
} from 'lucide-react';

import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
    {
        title: 'Sahayog Requests',
        href: dashboard(),
    },
    {
        title: 'Sahayog Request History',
        href: dashboard(),
    },
];

interface HistoryProps {
    requests: any;
    filters: { search?: string; status?: string };
}

export default function SahayogRequestListPage( { requests, filters }: HistoryProps ) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const isFirstRender = useRef(true);

    // Automatically submit a new Inertia request when filters change
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            router.get(
                window.location.pathname, // Stays on the current route automatically
                { search, status },
                { preserveState: true, replace: true, preserveScroll: true }
            );
        }, 300); // 300ms debounce prevents spamming the server while typing

        return () => clearTimeout(timeoutId);
    }, [search, status]);

    const mapStatusToBadge = (hrStatus: string, basicStatus: string) => {
        const combined = hrStatus || basicStatus;
        if (combined === 'Complete' || combined === 'Approved') return 'Accepted';
        if (combined === 'Rejected') return 'Rejected';
        return 'Under-Review';
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            'Accepted': { 
                bg: 'bg-green-50', 
                text: 'text-green-700', 
                border: 'border-green-200',
                icon: CheckCircle,
                label: 'Accepted'
            },
            'Rejected': { 
                bg: 'bg-red-50', 
                text: 'text-red-700', 
                border: 'border-red-200',
                icon: XCircle,
                label: 'Rejected'
            },
            'Under-Review': { 
                bg: 'bg-yellow-50', 
                text: 'text-yellow-700', 
                border: 'border-yellow-200',
                icon: AlertCircle,
                label: 'Under Review'
            }
        };
        
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Under-Review'];
        const Icon = config.icon;
        
        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} ${config.border} border`}>
                <Icon className="h-3.5 w-3.5" />
                {config.label}
            </span>
        );
    };

    // Function to safely display title with fallback
    const displayTitle = (title: string, id: string) => {
        if (title && title.trim() !== '') {
            return title;
        }
        return (
            <span className="flex items-center gap-1.5 text-gray-400 italic">
                <FileQuestion className="h-3.5 w-3.5" />
                No title provided
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sahayog Request History" />
            
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E65F2B]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative p-6 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm p-6 mb-6">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="group">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#E65F2B]/20 rounded-lg blur-xl" />
                                    <div className="relative rounded-lg bg-[#E65F2B] p-2.5 shadow-md">
                                        <Calendar className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">
                                        Sahayog Request History
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        View and manage all your past Sahayog requests
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <Link 
                            href="/dashboard" 
                            className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all duration-300 text-gray-700"
                        >
                            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Dashboard</span>
                        </Link>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by Request ID..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-all outline-none text-gray-800 placeholder-gray-400"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-all outline-none text-gray-700 bg-white"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">All Statuses</option>
                                <option value="Draft">Draft</option>
                                <option value="Under-Process">Under Process</option>
                                <option value="Complete">Complete</option>
                            </select>
                            <button className="px-4 py-2.5 rounded-lg border border-gray-200 hover:border-[#E65F2B]/30 hover:bg-gray-50 transition-all text-gray-600">
                                <Filter className="h-5 w-5" />
                            </button>
                            <button className="px-4 py-2.5 rounded-lg bg-[#E65F2B]/10 text-[#E65F2B] hover:bg-[#E65F2B]/20 transition-all">
                                <Download className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <p className="text-xs text-gray-500">Total Requests</p>
                            <p className="text-xl font-semibold text-gray-800">{requests?.total || 0}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                            <p className="text-xs text-green-600">Accepted</p>
                            <p className="text-xl font-semibold text-green-700">
                                {requests?.data?.filter((r: any) => mapStatusToBadge(r.hr_status, r.status) === 'Accepted').length || 0}
                            </p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                            <p className="text-xs text-yellow-600">Under Review</p>
                            <p className="text-xl font-semibold text-yellow-700">
                                {requests?.data?.filter((r: any) => mapStatusToBadge(r.hr_status, r.status) === 'Under-Review').length || 0}
                            </p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                            <p className="text-xs text-red-600">Rejected</p>
                            <p className="text-xl font-semibold text-red-700">
                                {requests?.data?.filter((r: any) => mapStatusToBadge(r.hr_status, r.status) === 'Rejected').length || 0}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Table Section - Centered with max-width */}
                <div className="flex justify-center">
                    <div className="w-full max-w-6xl">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left table-fixed">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="w-[100px] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    Index
                                                </div>
                                            </th>
                                            <th className="w-[400px] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Request Number
                                            </th>
                                            <th className="w-[120px] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    Created At
                                                </div>
                                            </th>
                                            <th className="w-[130px] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Admin Status
                                            </th>
                                            <th className="w-[100px] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {requests?.data?.length > 0 ? (
                                            requests.data.map((request: any, index: number) => {
                                                const displayId = `REQ-${String().padStart(4, '0')}`;
                                                const mappedStatus = mapStatusToBadge(request.hr_status, request.status);
                                                const itemIndex = (requests.current_page - 1) * requests.per_page + index + 1;
                                                
                                                return (
                                                    <tr 
                                                        key={request.id} 
                                                        className="group hover:bg-gray-50/50 transition-colors"
                                                    >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-[#E65F2B]/10 flex items-center justify-center shrink-0">
                                                            <span className="text-xs font-semibold text-[#E65F2B]">
                                                                #{itemIndex}
                                                            </span>
                                                        </div>
                                                        <span className="font-mono text-sm font-medium text-gray-800 truncate" title={displayId}>
                                                            {displayId}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="min-w-[250px] max-w-[350px]">
                                                        <div className="text-sm font-medium text-gray-800 break-words">
                                                            {displayTitle(`Sahayog Request (Step ${request.step})`, displayId)}
                                                        </div>
                                                        <p className="text-xs text-gray-400 mt-0.5 truncate" title={displayId}>
                                                            ID: {displayId}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Clock className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                                        <span className="truncate">
                                                            {new Date(request.created_at).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="min-w-[110px]">
                                                        {getStatusBadge(mappedStatus)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <Link
                                                        href={`/sahayog-requests/view/${request.id}`}
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E65F2B]/10 text-[#E65F2B] hover:bg-[#E65F2B] hover:text-white transition-all duration-300 group/btn whitespace-nowrap"
                                                    >
                                                        <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform shrink-0" />
                                                        <span className="text-sm font-medium">View</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                    No requests found matching your filters.
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
                                        Showing <span className="font-medium text-gray-700">{requests?.from || 0}</span> to{' '}
                                        <span className="font-medium text-gray-700">{requests?.to || 0}</span>{' '}
                                        of <span className="font-medium text-gray-700">{requests?.total || 0}</span> results
                                    </p>
                                    
                                    {requests?.links && requests.links.length > 3 && (
                                        <div className="flex items-center gap-1">
                                            {requests.links.map((link: any, i: number) => {
                                                const isPrevious = i === 0;
                                                const isNext = i === requests.links.length - 1;
                                                
                                                if (isPrevious) {
                                                    return (
                                                        <Link
                                                            key={i}
                                                            href={link.url || '#'}
                                                            preserveScroll
                                                            preserveState
                                                            className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:border-[#E65F2B]/30 hover:text-[#E65F2B] transition-all mr-1 ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
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
                                                            href={link.url || '#'}
                                                            preserveScroll
                                                            preserveState
                                                            className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:border-[#E65F2B]/30 hover:text-[#E65F2B] transition-all ml-1 ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                                        >
                                                            Next
                                                            <ChevronRight className="h-4 w-4" />
                                                        </Link>
                                                    );
                                                }
                                                
                                                return (
                                                    <Link
                                                        key={i}
                                                        href={link.url || '#'}
                                                        preserveScroll
                                                        preserveState
                                                        className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                                                            link.active
                                                                ? 'bg-[#E65F2B] text-white shadow-md'
                                                                : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                                                        } ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Footer */}
                {/* <div className="mt-6 flex justify-end gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:border-[#E65F2B]/30 hover:text-[#E65F2B] transition-all">
                        Export as CSV
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E65F2B] text-white text-sm hover:bg-[#C44A1F] transition-all shadow-sm">
                        <Download className="h-4 w-4" />
                        Download Report
                    </button>
                </div> */}
            </div>
        </AppLayout>
    );
}