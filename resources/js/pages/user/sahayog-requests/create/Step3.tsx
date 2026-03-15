import { ChangeEvent } from 'react';

interface StepProps {
    formData: Record<string, string>;
    onChange: (field: string, value: string) => void;
}

export default function Step3({ formData, onChange }: StepProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Step 3: Review</h3>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="space-y-2 text-sm text-gray-700">
                    <div><span className="font-semibold">Full Name:</span> {formData.fullName || 'N/A'}</div>
                    <div><span className="font-semibold">Employee ID:</span> {formData.employeeId || 'N/A'}</div>
                    <div><span className="font-semibold">Department:</span> {formData.department || 'N/A'}</div>
                    <div><span className="font-semibold">Request Type:</span> {formData.requestType || 'N/A'}</div>
                    <div><span className="font-semibold">Amount:</span> {formData.amount || 'N/A'}</div>
                    <div><span className="font-semibold">Purpose:</span> {formData.purpose || 'N/A'}</div>
                </div>
            </div>
            <label className="space-y-1 text-sm block">
                Additional comments
                <textarea
                    value={formData.comments || ''}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange('comments', e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    placeholder="Any additional details"
                />
            </label>
        </div>
    );
}
