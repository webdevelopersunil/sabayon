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
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Search Section - Enhanced */}
                <div className="relative overflow-hidden rounded-2xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-br from-background via-background to-primary/5 flex justify-center">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                    
                    <div className="relative p-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Search className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Quick Search via Request Number
                            </h2>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input 
                                    placeholder="Enter request number (e.g., SAH-2024-001)" 
                                    className="pl-10 h-12 bg-background/50 backdrop-blur-sm border-2 focus:border-primary transition-all rounded-xl"
                                />
                            </div>
                            <Button className="h-12 px-8 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-primary/25 transition-all duration-300 gap-2">
                                Search
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <p className="mt-3 text-sm text-muted-foreground">
                            Enter the request number to quickly access any Sahayog request
                        </p>
                    </div>
                </div>

                

                {/* Two Column Layout - Centered with max-width container */}
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                        {/* Left Block - Fill/Complete Sahayog Request */}
                        <Link 
                            href="{{ route('sahayog-requests.create') }}" 
                            className="block group relative"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500" />
                            <div className="relative h-full overflow-hidden rounded-2xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-br from-background via-background to-primary/5 p-8 hover:border-transparent transition-all duration-500">
                                
                                {/* Animated background pattern */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 delay-100" />
                                
                                {/* Decorative lines */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                                
                                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                                        <div className="relative rounded-full bg-gradient-to-br from-primary to-primary/60 p-5 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            <FileText className="h-10 w-10 text-white" />
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                        Fill/Complete Sahayog Request
                                    </h3>
                                    
                                    <p className="text-muted-foreground mb-6 max-w-xs">
                                        Create a new Sahayog request or complete a pending one with our streamlined form
                                    </p>
                                    
                                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300">
                                        <span>Get Started</span>
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                    
                                    {/* Feature list */}
                                    <div className="mt-6 w-full pt-6 border-t border-border/50">
                                        <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Sparkles className="h-3 w-3" /> Quick form
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Sparkles className="h-3 w-3" /> Auto-save
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Sparkles className="h-3 w-3" /> 5 min
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
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/50 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500" />
                            <div className="relative h-full overflow-hidden rounded-2xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-br from-background via-background to-primary/5 p-8 hover:border-transparent transition-all duration-500">
                                
                                {/* Animated background pattern */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 delay-100" />
                                
                                {/* Decorative lines */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                                
                                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                                        <div className="relative rounded-full bg-gradient-to-br from-primary to-primary/60 p-5 shadow-xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                                            <History className="h-10 w-10 text-white" />
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                        Previous Sahayog Requests
                                    </h3>
                                    
                                    <p className="text-muted-foreground mb-6 max-w-xs">
                                        View and manage your past Sahayog requests with detailed history and status tracking
                                    </p>
                                    
                                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300">
                                        <span>View History</span>
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                    
                                    {/* Stats preview */}
                                    <div className="mt-6 w-full pt-6 border-t border-border/50">
                                        <div className="flex justify-center gap-6">
                                            <div className="text-center">
                                                <div className="text-sm font-semibold">24</div>
                                                <div className="text-xs text-muted-foreground">Total</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-semibold text-green-600">12</div>
                                                <div className="text-xs text-muted-foreground">Completed</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-semibold text-yellow-600">8</div>
                                                <div className="text-xs text-muted-foreground">Pending</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>

            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .duration-1500 {
                    transition-duration: 1500ms;
                }
            `}</style>
        </AppLayout>
    );
}