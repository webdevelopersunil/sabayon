import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, ArrowRight, FileText, Send, Sparkles, Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import { dashboard } from '@/routes';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard() },
    { title: 'Sahayog Requests', href: dashboard() },
];

export default function SahayogRequestCreatePage({ title, steps, workCenters, step1, step2, step3, selectedBeneficiary }: { title: string; steps: string[]; workCenters: string[]; step1?: any; step2?: any; step3?: any; selectedBeneficiary?: string }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleNext = (nextStep: number) => {
        setIsTransitioning(true);
        // Using a timeout here to simulate a network request or validation processing.
        setTimeout(() => {
            setCurrentStep(nextStep);
            setIsTransitioning(false);
        }, 500);
    };

    const currentStepComponent = useMemo(() => {
        if (currentStep === 1) return <Step1 onNext={() => handleNext(2)} workCenters={workCenters} initialData={step1} />;
        if (currentStep === 2) return <Step2 onNext={() => handleNext(3)} initialData={step2} selectedBeneficiary={selectedBeneficiary} />;
        if (currentStep === 3) return <Step3 onNext={() => handleNext(4)} initialData={step3} />;
        return <Step4 onSubmit={() => console.log('Final submission completed')} />;
    }, [currentStep, workCenters, step1, step2, step3, selectedBeneficiary]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />

            <div className="relative p-6 space-y-6 max-w-5xl mx-auto">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm w-[1000px]">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-[#E65F2B] p-2">
                                <FileText className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                                <p className="text-sm text-gray-500">Complete the form step-by-step</p>
                            </div>
                        </div>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        >
                            <ArrowLeft className="h-4 w-4" /> Back
                        </Link>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                        {steps.map((step, idx) => {
                            const stepNum = idx + 1;
                            const active = stepNum === currentStep;
                            const completed = stepNum < currentStep;
                            return (
                                <div key={step} className={`rounded-lg p-2 text-center ${active ? 'bg-[#E65F2B] text-white' : completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                    <div className="font-semibold">Step {stepNum}</div>
                                    <div className="truncate">{step}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm w-[1000px]">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 text-lg font-semibold text-gray-800">
                            <Sparkles className="h-4 w-4 text-[#E65F2B]" /> {steps[currentStep - 1]}
                        </div>
                        <div className="text-xs text-gray-500">Step {currentStep} of {steps.length}</div>
                    </div>

                    {currentStepComponent}

                    <div className="mt-5 flex items-center justify-between gap-2">
                        <button
                            type="button"
                            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                            disabled={currentStep === 1 || isTransitioning}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {currentStep < steps.length ? (
                            <button
                                type="submit"
                                form={`step${currentStep}-form`}
                                disabled={isTransitioning}
                                className="inline-flex items-center rounded-lg bg-[#E65F2B] px-3 py-2 text-sm font-medium text-white hover:bg-[#C44A1F] disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {isTransitioning ? (
                                    <>
                                        <Loader2 className="inline h-4 w-4 mr-1 animate-spin" /> Processing...
                                    </>
                                ) : (
                                    <>
                                        Next <ArrowRight className="inline h-4 w-4 ml-1" />
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                form="step4-form"
                                disabled={isTransitioning}
                                className="inline-flex items-center rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {isTransitioning ? (
                                    <>
                                        <Loader2 className="inline h-4 w-4 mr-1 animate-spin" /> Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="inline h-4 w-4 mr-1" /> Submit Request
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
