import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    CheckCircle, 
    XCircle, 
    AlertCircle, 
    ArrowLeft, 
    Download,
    FileText,
    Image,
    File,
    FileSpreadsheet,
    Eye,
    ChevronDown,
    User,
    Calendar,
    Clock,
    MessageCircle,
    IndianRupee,
    Building2
} from 'lucide-react';
import { useState } from 'react';

import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import UpdateRequestModal from './update-request-modal';
import AdminUpdateModal from './admin-update-modal';

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
        title: 'Sahayog Request Details',
        href: dashboard(),
    }
];

const statusStyles: Record<string, string> = {
    'Approved': 'bg-green-50 text-green-700 border-green-200',
    'Rejected': 'bg-red-50 text-red-700 border-red-200',
    'Under-Process': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'Returned': 'bg-orange-50 text-orange-700 border-orange-200',
};

function StatusPill({ status }: { status: string }) {
    const Icon = status === 'Approved' ? CheckCircle : status === 'Rejected' ? XCircle : AlertCircle;
    
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border ${statusStyles[status] || statusStyles['Under-Process']}`}>
            <Icon className="h-3.5 w-3.5" />
            {status}
        </span>
    );
}

// Helper function to get file icon based on type
const getFileIcon = (type: string) => {
    const fileType = type.toLowerCase();
    if (fileType.includes('pdf')) return <FileText className="h-5 w-5 text-red-500" />;
    if (fileType.includes('image') || fileType.includes('jpg') || fileType.includes('png')) return <Image className="h-5 w-5 text-blue-500" />;
    if (fileType.includes('excel') || fileType.includes('xls')) return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
    return <File className="h-5 w-5 text-gray-500" />;
};

export default function SahayogRequestView({ 
    id,
    applicationDetails = [],
    basicInformation = [],
    financialDetails = [],
    attachments = [],
    hrUpdate = { status: 'Under-Process', review_date: 'N/A', comments: 'Awaiting review.', updated_by: 'N/A' }
}: { 
    id: string; 
    applicationDetails: Array<{ label: string; value: string }>; 
    basicInformation: Array<{ label: string; value: string }>; 
    financialDetails: Array<{ label: string; value: string }>; 
    attachments: Array<{ name: string; type: string; url?: string; size?: string; uploadedAt?: string }>;
    hrUpdate?: {
        status: string;
        review_date: string;
        comments: string;
        updated_by: string;
        attachment_url?: string;
        attachment_name?: string;
    }
}) {
    const [expandedAttachments, setExpandedAttachments] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const { flash } = usePage<any>().props;

    const toggleAttachment = (name: string) => {
        setExpandedAttachments(prev =>
            prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Sahayog Request ${id}`} />
            
            {/* Background decorative elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E65F2B]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 p-6 max-w-7xl mx-auto space-y-6">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <p className="text-sm font-medium text-green-800">{flash.success}</p>
                    </div>
                )}
                
                {flash?.error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-center gap-3">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <p className="text-sm font-medium text-red-800">{flash.error}</p>
                    </div>
                )}

                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="group">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#E65F2B]/20 rounded-lg blur-xl" />
                                    <div className="relative rounded-lg bg-[#E65F2B] p-2.5 shadow-md">
                                        <FileText className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">
                                        Sahayog Request Details
                                    </h1>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm text-gray-500">Request ID:</span>
                                        <span className="text-sm font-mono font-medium text-[#E65F2B] bg-[#E65F2B]/10 px-2 py-0.5 rounded">
                                            {id}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#E65F2B] text-white hover:bg-[#C44A1F] transition-all text-sm font-medium shadow-sm"
                            >
                                Update Status
                            </button>

                            <button 
                                onClick={() => setIsAdminModalOpen(true)}
                                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all text-sm font-medium shadow-sm"
                            >
                                View Admin Updates
                            </button>
                            <Link 
                                href="/sahayog-requests/history" 
                                className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all duration-300 text-gray-700 text-sm font-medium"
                            >
                                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                                <span>Back to History</span>
                            </Link>
                        </div>
                        
                        
                    </div>
                </div>

                {/* Two Column Layout for Application & Financial Details */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Application Details Block */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E65F2B]/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E65F2B]/5 rounded-full blur-2xl" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <User className="h-5 w-5 text-[#E65F2B]" />
                                            Application Details
                                        </h2>
                                        <p className="text-xs text-gray-400 mt-0.5">Personal & employment information</p>
                                    </div>
                                    <StatusPill status={hrUpdate.status} />
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {applicationDetails.map((item, index) => (
                                        <div 
                                            key={index} 
                                            className="rounded-lg border border-gray-100 p-3 hover:border-[#E65F2B]/20 hover:bg-gray-50/50 transition-all"
                                        >
                                            <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                                            <div className="text-sm font-medium text-gray-800 break-words">
                                                {item.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Basic Information Details Block */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E65F2B]/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E65F2B]/5 rounded-full blur-2xl" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-[#E65F2B]" />
                                            Basic Information
                                        </h2>
                                        <p className="text-xs text-gray-400 mt-0.5">Seperation and dependent details</p>
                                    </div>
                                    <StatusPill status={hrUpdate.status} />
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {basicInformation.map((item, index) => (
                                        <div 
                                            key={index} 
                                            className="rounded-lg border border-gray-100 p-3 hover:border-[#E65F2B]/20 hover:bg-gray-50/50 transition-all"
                                        >
                                            <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                                            <div className="text-sm font-medium text-gray-800 break-words">
                                                {item.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Financial Assistance Details Block */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E65F2B]/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E65F2B]/5 rounded-full blur-2xl" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <IndianRupee className="h-5 w-5 text-[#E65F2B]" />
                                            Financial Assistance Details
                                        </h2>
                                        <p className="text-xs text-gray-400 mt-0.5">Amount & payment information</p>
                                    </div>
                                    <StatusPill status={hrUpdate.status} />
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {financialDetails.map((item, index) => (
                                        <div 
                                            key={index} 
                                            className="rounded-lg border border-gray-100 p-3 hover:border-[#E65F2B]/20 hover:bg-gray-50/50 transition-all"
                                        >
                                            <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                                            <div className="text-sm font-medium text-gray-800 break-words">
                                                {item.label.includes('Amount') ? (
                                                    <span className="text-green-600 font-semibold">{item.value}</span>
                                                ) : item.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>

                {/* Attachments Block */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E65F2B]/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E65F2B]/5 rounded-full blur-2xl" />
                        
                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-[#E65F2B]" />
                                        Attachments
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {attachments.length} document(s) uploaded by user
                                    </p>
                                </div>
                                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E65F2B]/10 text-[#E65F2B] hover:bg-[#E65F2B] hover:text-white transition-all duration-300 group/btn">
                                    <Download className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">Download All</span>
                                </button>
                            </div>
                            
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {attachments.map((att, index) => (
                                    <div 
                                        key={index} 
                                        className="group/doc relative rounded-xl border border-gray-200 bg-gray-50/50 p-4 hover:border-[#E65F2B]/30 hover:shadow-sm transition-all cursor-pointer"
                                        onClick={() => toggleAttachment(att.name)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-white shadow-sm">
                                                {getFileIcon(att.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-800 truncate" title={att.name}>
                                                    {att.name}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                                    <span>{att.type}</span>
                                                    {att.size && (
                                                        <>
                                                            <span>•</span>
                                                            <span>{att.size}</span>
                                                        </>
                                                    )}
                                                </div>
                                                {att.uploadedAt && (
                                                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                                                        <Clock className="h-3 w-3" />
                                                        <span>{att.uploadedAt}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <button className="opacity-0 group-hover/doc:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-[#E65F2B]/10">
                                                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${expandedAttachments.includes(att.name) ? 'rotate-180' : ''}`} />
                                            </button>
                                        </div>
                                        
                                        {/* Expanded preview */}
                                        {expandedAttachments.includes(att.name) && (
                                            <div className="mt-3 pt-3 border-t border-gray-200">
                                                <div className="flex items-center justify-between">
                                                    {/* <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <Eye className="h-3.5 w-3.5" />
                                                        <span>Document Preview</span>
                                                    </div> */}
                                                    <a 
                                                        href={att.url || '#'}
                                                        download={att.name}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-[#E65F2B] hover:underline flex items-center gap-1"
                                                    >
                                                        <Download className="h-3 w-3" />
                                                        Download
                                                    </a>
                                                </div>
                                                <div className="mt-2 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <FileText className="h-8 w-8 text-gray-300" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* HR-ER Update Block */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E65F2B]/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E65F2B]/5 rounded-full blur-2xl" />
                        
                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <Building2 className="h-5 w-5 text-[#E65F2B]" />
                                        HR-ER Update
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-0.5">Human Resources & Employee Relations</p>
                                </div>
                                <StatusPill status={hrUpdate.status} />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="rounded-lg border border-gray-100 p-4 hover:border-[#E65F2B]/20 transition-all">
                                    <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        HR Review Date
                                    </div>
                                    <div className="text-sm font-medium text-gray-800">{hrUpdate.review_date}</div>
                                </div>
                                <div className="rounded-lg border border-gray-100 p-4 hover:border-[#E65F2B]/20 transition-all">
                                    <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                                        <MessageCircle className="h-3 w-3" />
                                        ER Comments
                                    </div>
                                    <div className="text-sm font-medium text-gray-800">{hrUpdate.comments}</div>
                                </div>
                                <div className="rounded-lg border border-gray-100 p-4 hover:border-[#E65F2B]/20 transition-all">
                                    <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        Updated By
                                    </div>
                                    <div className="text-sm font-medium text-gray-800">{hrUpdate.updated_by}</div>
                                </div>
                                {hrUpdate.attachment_url && (
                                    <div className="rounded-lg border border-gray-100 p-4 hover:border-[#E65F2B]/20 transition-all">
                                        <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                                            <Download className="h-3 w-3" />
                                            HR Attachment
                                        </div>
                                        <a 
                                            href={hrUpdate.attachment_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-[#E65F2B] hover:underline break-all"
                                        >
                                            {hrUpdate.attachment_name || 'View Attachment'}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Update Block */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E65F2B]/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E65F2B]/5 rounded-full blur-2xl" />
                        
                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <IndianRupee className="h-5 w-5 text-[#E65F2B]" />
                                        Payment Update
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-0.5">Trust payment status and comments</p>
                                </div>
                                <StatusPill status={hrUpdate.status} />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="rounded-lg border border-gray-100 p-4 hover:border-[#E65F2B]/20 transition-all">
                                    <div className="text-xs text-gray-400 mb-1">Payment Amount</div>
                                    <div className="text-lg font-semibold text-green-600">₹80,000</div>
                                </div>
                                <div className="rounded-lg border border-gray-100 p-4 hover:border-[#E65F2B]/20 transition-all">
                                    <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Payment Date
                                    </div>
                                    <div className="text-sm font-medium text-gray-800">05 February 2025</div>
                                </div>
                                <div className="md:col-span-2 rounded-lg border border-gray-100 p-4 hover:border-[#E65F2B]/20 transition-all">
                                    <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                                        <MessageCircle className="h-3 w-3" />
                                        Trust In-charge Comment
                                    </div>
                                    <div className="text-sm font-medium text-gray-800 bg-gray-50 p-3 rounded-lg">
                                        "Approved for disbursement after verification of all documents. Payment to be processed within 3 working days."
                                    </div>
                                    <div className="mt-2 text-xs text-gray-400 flex items-center gap-2">
                                        <User className="h-3 w-3" />
                                        <span>Verified by: Dr. S. Verma (Trust In-charge)</span>
                                        <span>•</span>
                                        <Clock className="h-3 w-3" />
                                        <span>05 Feb 2025, 10:30 AM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons Footer */}
                {/* <div className="flex justify-end gap-3 pt-4">
                    <button className="px-6 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all text-sm font-medium">
                        Print Details
                    </button>
                    <button className="px-6 py-2.5 rounded-lg bg-[#E65F2B] text-white hover:bg-[#C44A1F] transition-all text-sm font-medium shadow-sm">
                        Download Report
                    </button>
                </div> */}
            </div>

            {/* Update Status Modal */}
            <UpdateRequestModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                request_id={id}
            />
            {/* Admin Update Modal */}
            <AdminUpdateModal 
                isOpen={isAdminModalOpen} 
                onClose={() => setIsAdminModalOpen(false)} 
            />
        </AppLayout>
    );
}