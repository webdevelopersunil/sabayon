import { ChangeEvent } from 'react';

interface StepProps {
    formData: Record<string, string>;
    onChange: (field: string, value: string) => void;
}

export default function Step2({ formData, onChange }: StepProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Step 2: Request details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="space-y-1 text-sm">
                    Request Type
                    <input
                        value={formData.requestType || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('requestType', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                        placeholder="Financial Assistance"
                    />
                </label>
                <label className="space-y-1 text-sm">
                    Amount Requested
                    <input
                        value={formData.amount || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('amount', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                        placeholder="120000"
                    />
                </label>
            </div>
            <label className="space-y-1 text-sm block">
                Purpose
                <textarea
                    value={formData.purpose || ''}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange('purpose', e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    placeholder="Describe why help is required"
                />
            </label>
        </div>
    );
}
