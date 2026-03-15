import { ChangeEvent } from 'react';

interface StepProps {
    formData: Record<string, string>;
    onChange: (field: string, value: string) => void;
}

export default function Step1({ formData, onChange }: StepProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Category of Applicant</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="space-y-1 text-sm">
                    Date of Seperation :
                    <input
                        type='date'
                        value={formData.dateOfSeparation || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('dateOfSeparation', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                        placeholder="Enter date of separation"
                    />
                </label>
                <label className="space-y-1 text-sm">
                    Employee ID
                    <input
                        value={formData.employeeId || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('employeeId', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                        placeholder="ONGC12345"
                    />
                </label>
            </div>
            <label className="space-y-1 text-sm block">
                Department
                <input
                    value={formData.department || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('department', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    placeholder="Operations"
                />
            </label>
        </div>
    );
}
