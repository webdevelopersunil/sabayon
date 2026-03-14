import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, FileText, Save, Send } from 'lucide-react';
import { useState } from 'react';

export default function SahayogRequestCreatePage({ title, steps }: { title: string; steps: string[] }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        field1: '',
        field2: '',
        comments: ''
    });

    // ONGC Brand Colors
    const ongcColors = {
        primary: '#E65F2B', // ONGC Orange/Red
        primaryLight: '#FDE6DD', // Light orange background
        primaryDark: '#C44A1F', // Darker orange for hover
    };

    return (
        <AppLayout>
            <Head title={title} />
            
            {/* Background decorative elements - Light theme with ONGC colors */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E65F2B]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative p-6 space-y-6 max-w-7xl mx-auto">
                {/* Header with glass effect - Light theme */}
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
                                        {title}
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Complete the multi-step form to create a new Sahayog request
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <Link 
                            href="/dashboard" 
                            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all duration-300 text-gray-700"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Dashboard</span>
                        </Link>
                    </div>

                    {/* Progress indicator with ONGC color */}
                    <div className="mt-6 flex items-center gap-2">
                        {steps.map((_, index) => (
                            <div key={index} className="flex-1">
                                <div className={`h-2 rounded-full transition-all duration-500 ${
                                    index + 1 <= currentStep 
                                        ? 'bg-[#E65F2B]' 
                                        : 'bg-gray-200'
                                }`} />
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                        Step {currentStep} of {steps.length}
                    </div>
                </div>

                {/* Steps Grid with enhanced cards - Light theme */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map((step, i) => {
                        const stepNumber = i + 1;
                        const isActive = stepNumber === currentStep;
                        const isCompleted = stepNumber < currentStep;
                        
                        return (
                            <div
                                key={step}
                                className={`group relative cursor-pointer transition-all duration-300 ${
                                    isActive ? 'scale-105' : 'hover:scale-102'
                                }`}
                                onClick={() => setCurrentStep(stepNumber)}
                            >
                                {/* Glow effect for active step */}
                                {isActive && (
                                    <div className="absolute -inset-0.5 bg-[#E65F2B]/20 rounded-xl blur-md transition duration-500" />
                                )}
                                
                                {/* Main card */}
                                <div className={`relative overflow-hidden rounded-xl border p-4 h-full transition-all duration-500 bg-white ${
                                    isActive 
                                        ? 'border-[#E65F2B] shadow-md' 
                                        : isCompleted
                                        ? 'border-green-200 bg-green-50/50'
                                        : 'border-gray-200 hover:border-[#E65F2B]/50 hover:shadow-sm'
                                }`}>
                                    
                                    {/* Background blobs - Light */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#E65F2B]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className={`text-xs uppercase font-semibold flex items-center gap-1 ${
                                                    isCompleted ? 'text-green-600' : 'text-gray-400'
                                                }`}>
                                                    Step {stepNumber}
                                                    {isCompleted && <CheckCircle className="h-3 w-3" />}
                                                </div>
                                                <div className={`mt-1 text-sm font-medium ${
                                                    isActive ? 'text-[#E65F2B]' : 'text-gray-700'
                                                }`}>{step}</div>
                                            </div>
                                            
                                            {/* Step indicator */}
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                                isActive 
                                                    ? 'bg-[#E65F2B] text-white' 
                                                    : isCompleted
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-gray-200 text-gray-500'
                                            }`}>
                                                {isCompleted ? <CheckCircle className="h-3 w-3" /> : stepNumber}
                                            </div>
                                        </div>
                                        
                                        <p className="mt-3 text-xs text-gray-400">
                                            {isCompleted 
                                                ? '✓ Completed' 
                                                : isActive 
                                                ? '● Current step' 
                                                : 'Click to start'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Form Section with ONGC styling - Light theme */}
                <div className="relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-0.5 bg-[#E65F2B]/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                    
                    {/* Main form card */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        
                        {/* Background blobs - Light */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-[#E65F2B]/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E65F2B]/5 rounded-full blur-2xl" />
                        
                        <div className="relative z-10">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                                <Sparkles className="h-4 w-4 text-[#E65F2B]" />
                                Step {currentStep}: {steps[currentStep - 1]}
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Field 1 */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Field 1</label>
                                    <input 
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-all outline-none text-gray-800 placeholder-gray-400"
                                        placeholder="Enter value for field 1"
                                        value={formData.field1}
                                        onChange={(e) => setFormData({...formData, field1: e.target.value})}
                                    />
                                </div>
                                
                                {/* Field 2 */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Field 2</label>
                                    <input 
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-all outline-none text-gray-800 placeholder-gray-400"
                                        placeholder="Enter value for field 2"
                                        value={formData.field2}
                                        onChange={(e) => setFormData({...formData, field2: e.target.value})}
                                    />
                                </div>
                                
                                {/* Comments - Full width */}
                                <div className="col-span-1 md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Comments</label>
                                    <textarea 
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-all outline-none text-gray-800 placeholder-gray-400"
                                        placeholder="Enter your comments here..."
                                        rows={4}
                                        value={formData.comments}
                                        onChange={(e) => setFormData({...formData, comments: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Form navigation buttons - ONGC colors */}
                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                                        disabled={currentStep === 1}
                                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all duration-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                                        <span>Previous</span>
                                    </button>
                                    
                                    <button 
                                        onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
                                        disabled={currentStep === steps.length}
                                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E65F2B] hover:bg-[#C44A1F] text-white shadow-sm hover:shadow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span>Next</span>
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                {currentStep === steps.length && (
                                    <button className="group inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow transition-all duration-300">
                                        <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        <span>Submit Request</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Progress Indicator */}
                <div className="flex items-center justify-end gap-2 text-xs text-gray-400">
                    <Save className="h-3 w-3" />
                    <span>Auto-saved at {new Date().toLocaleTimeString()}</span>
                </div>
            </div>

            <style>{`
                .hover\:scale-102:hover {
                    transform: scale(1.02);
                }
            `}</style>
        </AppLayout>
    );
}