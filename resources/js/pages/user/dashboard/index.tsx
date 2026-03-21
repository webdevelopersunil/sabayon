import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, History, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            {/* Background decorative elements - Light theme with ONGC colors */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E65F2B]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Search Section - Light theme with ONGC colors */}
                <div className="flex justify-center relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E65F2B]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                    
                    <div className="relative p-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 rounded-lg bg-[#E65F2B]/10">
                                <Search className="h-5 w-5 text-[#E65F2B]" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Quick Search via Request Number
                            </h2>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input 
                                    placeholder="Enter request number (e.g., SAH-2024-001)" 
                                    className="pl-10 h-12 bg-white border-2 border-gray-200 focus:border-[#E65F2B] focus:ring-[#E65F2B]/20 rounded-xl text-gray-800 placeholder-gray-400"
                                /> 
                            </div>
                            <Button className="h-12 px-8 rounded-xl bg-[#E65F2B] hover:bg-[#C44A1F] text-white shadow-sm hover:shadow transition-all duration-300 gap-2">
                                Search
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <p className="mt-3 text-sm text-gray-500">
                            Enter the request number to quickly access any Sahayog request
                        </p>
                    </div>
                </div>

                {/* Two Column Layout - Centered with max-width container */}
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                        {/* Left Block - Fill/Complete Sahayog Request */}
                        <Link 
                            href="/sahayog-request/create" 
                            className="block group relative"
                        >
                            <div className="absolute -inset-0.5 bg-[#E65F2B]/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                            <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 hover:border-[#E65F2B]/30 transition-all duration-500 shadow-sm hover:shadow-md">
                                
                                {/* Background pattern - Light */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E65F2B]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#E65F2B]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 delay-100" />
                                
                                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-[#E65F2B]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                                        <div className="relative rounded-full bg-[#E65F2B] p-5 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            <FileText className="h-10 w-10 text-white" />
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold mb-3 text-gray-800">
                                        Fill/Complete Sahayog Request
                                    </h3>
                                    
                                    <p className="text-gray-500 mb-6 max-w-xs">
                                        Create a new Sahayog request or complete a pending one with our streamlined form
                                    </p>
                                    
                                    <div className="flex items-center gap-2 text-[#E65F2B] font-medium group-hover:gap-4 transition-all duration-300">
                                        <span>Get Started</span>
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                    
                                    {/* Feature list */}
                                    <div className="mt-6 w-full pt-6 border-t border-gray-100">
                                        <div className="flex justify-center gap-4 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Sparkles className="h-3 w-3 text-[#E65F2B]" /> Quick form
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Sparkles className="h-3 w-3 text-[#E65F2B]" /> Auto-save
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Sparkles className="h-3 w-3 text-[#E65F2B]" /> 5 min
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Right Block - Previous Details of Sahayog Requests */}
                        <Link 
                            href="/sahayog-requests/history" 
                            className="block group relative"
                        >
                            <div className="absolute -inset-0.5 bg-[#E65F2B]/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                            <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 hover:border-[#E65F2B]/30 transition-all duration-500 shadow-sm hover:shadow-md">
                                
                                {/* Background pattern - Light */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E65F2B]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#E65F2B]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 delay-100" />
                                
                                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-[#E65F2B]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                                        <div className="relative rounded-full bg-[#E65F2B] p-5 shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                                            <History className="h-10 w-10 text-white" />
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold mb-3 text-gray-800">
                                        Previous Sahayog Requests
                                    </h3>
                                    
                                    <p className="text-gray-500 mb-6 max-w-xs">
                                        View and manage your past Sahayog requests with detailed history and status tracking
                                    </p>
                                    
                                    <div className="flex items-center gap-2 text-[#E65F2B] font-medium group-hover:gap-4 transition-all duration-300">
                                        <span>View History</span>
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                    
                                    {/* Stats preview */}
                                    <div className="mt-6 w-full pt-6 border-t border-gray-100">
                                        <div className="flex justify-center gap-6">
                                            <div className="text-center">
                                                <div className="text-sm font-semibold text-gray-800">24</div>
                                                <div className="text-xs text-gray-400">Total</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-semibold text-green-600">12</div>
                                                <div className="text-xs text-gray-400">Completed</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-semibold text-yellow-600">8</div>
                                                <div className="text-xs text-gray-400">Pending</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Footer Section with ONGC colors - Light theme */}
                {/* <footer className="mt-auto rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="p-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                            
                            <div>
                                <h3 className="font-semibold text-lg mb-4 text-gray-800">Other Links</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/sitemap" className="text-gray-500 hover:text-[#E65F2B] transition-colors text-sm">
                                            Sitemap
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy-policy" className="text-gray-500 hover:text-[#E65F2B] transition-colors text-sm">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/terms-of-use" className="text-gray-500 hover:text-[#E65F2B] transition-colors text-sm">
                                            Terms of Use
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/disclaimer" className="text-gray-500 hover:text-[#E65F2B] transition-colors text-sm">
                                            Disclaimer
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            
                            <div className="md:col-span-2">
                                <h3 className="font-semibold text-lg mb-4 text-gray-800">Reach Us</h3>
                                <div className="space-y-4">
                                    
                                    <div className="flex gap-3">
                                        <div className="shrink-0 mt-0.5">
                                            <div className="p-1.5 rounded-lg bg-[#E65F2B]/10">
                                                <div className="h-4 w-4 text-[#E65F2B]" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-gray-700">Registered Office:</p>
                                            <p className="text-sm text-gray-500">
                                                ONGC Welfare Trust, 6th Floor A-Wing,<br />
                                                B S Negi Bhawan, Dehradun, 248003
                                            </p>
                                        </div>
                                    </div>

                                    
                                    <div className="flex gap-3">
                                        <div className="shrink-0 mt-0.5">
                                            <div className="p-1.5 rounded-lg bg-[#E65F2B]/10">
                                                <div className="h-4 w-4 text-[#E65F2B]" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Telephone No. 011-26750998
                                            </p>
                                        </div>
                                    </div>

                                    
                                    <div className="flex gap-3">
                                        <div className="shrink-0 mt-0.5">
                                            <div className="p-1.5 rounded-lg bg-[#E65F2B]/10">
                                                <div className="h-4 w-4 text-[#E65F2B]" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Fax No: 011-26750991 / 26129091
                                            </p>
                                        </div>
                                    </div>

                                    
                                    <div className="flex gap-3">
                                        <div className="shrink-0 mt-0.5">
                                            <div className="p-1.5 rounded-lg bg-[#E65F2B]/10">
                                                <div className="h-4 w-4 text-[#E65F2B]" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">
                                                For registering any grievances, please visit ONGC Grievance portal:
                                            </p>
                                            <a 
                                                href="https://grievance.ongc.co.in" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-sm text-[#E65F2B] hover:underline inline-flex items-center gap-1"
                                            >
                                                https://grievance.ongc.co.in
                                                <ArrowRight className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="hidden md:block">
                                <div className="bg-[#E65F2B]/5 rounded-lg p-4 text-center border border-[#E65F2B]/10">
                                    <p className="text-xs text-gray-500">ONGC Welfare Trust</p>
                                    <p className="text-sm font-medium text-[#E65F2B] mt-1">Sahayog Portal</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="pt-6 border-t border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-xs text-gray-400">
                                    © {new Date().getFullYear()} ONGC Welfare Trust. All rights reserved.
                                </p>
                                <div className="flex gap-4">
                                    <Link href="/sitemap" className="text-xs text-gray-400 hover:text-[#E65F2B] transition-colors">
                                        Sitemap
                                    </Link>
                                    <Link href="/privacy-policy" className="text-xs text-gray-400 hover:text-[#E65F2B] transition-colors">
                                        Privacy
                                    </Link>
                                    <Link href="/terms-of-use" className="text-xs text-gray-400 hover:text-[#E65F2B] transition-colors">
                                        Terms
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer> */}
            </div>

            <style>{`
                .duration-1500 {
                    transition-duration: 1500ms;
                }
            `}</style>
        </AppLayout>
    );
}