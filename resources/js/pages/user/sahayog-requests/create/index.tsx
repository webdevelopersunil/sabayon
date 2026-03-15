import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, ArrowRight, FileText, Send, Sparkles } from 'lucide-react';
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

export default function SahayogRequestCreatePage({ title, steps }: { title: string; steps: string[] }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Record<string, string>>({
        doj_ongc: '',
        date_of_seperation: '',
        place_of_posting: '',
        bank_and_branch: '',
        savingaccount_No: '',
        ifsc_code: '',
        work_center: '',
        seperation_reason: '',
        seperation_benefits: '',
        dependants_no: '',
        gross_annual_income: '',
        requestType: '',
        amount: '',
        purpose: '',
        comments: '',
        beneficiaries: JSON.stringify([{ name: '', relationship: '' }]),
    });

    const [beneficiaries, setBeneficiaries] = useState([{ name: '', relationship: '' }]);

    const currentStepComponent = useMemo(() => {
        const props = {
            formData,
            onChange: (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value })),
        };

        if (currentStep === 1) return <Step1 {...props} />;
        if (currentStep === 2)
            return (
                <Step2
                    {...props}
                    beneficiaries={beneficiaries}
                    onBeneficiariesChange={(next) => {
                        setBeneficiaries(next);
                        setFormData((prev) => ({ ...prev, beneficiaries: JSON.stringify(next) }));
                    }}
                />
            );
        if (currentStep === 3) return <Step3 {...props} />;
        return <Step4 />;
    }, [currentStep, formData]);

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
                            disabled={currentStep === 1}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {currentStep < steps.length ? (
                            <button
                                type="button"
                                onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}
                                className="rounded-lg bg-[#E65F2B] px-3 py-2 text-sm font-medium text-white hover:bg-[#C44A1F]"
                            >
                                Next <ArrowRight className="inline h-4 w-4 ml-1" />
                            </button>
                        ) : (
                            <button type="button" className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700">
                                <Send className="inline h-4 w-4 mr-1" /> Submit Request
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
