import { ChangeEvent } from 'react';

interface Beneficiary {
    name: string;
    relationship: string;
}

interface StepProps {
    formData: Record<string, string>;
    onChange: (field: string, value: string) => void;
    beneficiaries: Beneficiary[];
    onBeneficiariesChange: (val: Beneficiary[]) => void;
}

const relationships = [
    'Spouse',
    'Child',
    'Parent',
    'Sibling',
    'Other',
];

export default function Step2({ formData, onChange, beneficiaries, onBeneficiariesChange }: StepProps) {
    const updateBeneficiary = (index: number, field: keyof Beneficiary, value: string) => {
        const next = beneficiaries.map((item, idx) => (idx === index ? { ...item, [field]: value } : item));
        onBeneficiariesChange(next);
    };

    const addBeneficiary = () => {
        onBeneficiariesChange([...beneficiaries, { name: '', relationship: '' }]);
    };

    const removeBeneficiary = (index: number) => {
        if (beneficiaries.length <= 1) return;
        onBeneficiariesChange(beneficiaries.filter((_, idx) => idx !== index));
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Step 2: Request details</h3>
            
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-md font-semibold text-gray-700">Beneficiaries (multiple allowed)</h4>
                    <button
                        type="button"
                        onClick={addBeneficiary}
                        className="rounded-md border border-[#E65F2B] bg-[#E65F2B]/10 px-3 py-1 text-xs font-medium text-[#E65F2B] hover:bg-[#E65F2B]/20"
                    >
                        + Add Beneficiary
                    </button>
                </div>
                <div className="space-y-3">
                    {beneficiaries.map((beneficiary, index) => (
                        <div key={`beneficiary-${index}`} className="rounded-lg border border-gray-200 p-3 bg-gray-50">
                            <div className="flex items-start justify-between gap-2">
                                <p className="font-medium text-sm">Beneficiary {index + 1}</p>
                                <button
                                    type="button"
                                    onClick={() => removeBeneficiary(index)}
                                    disabled={beneficiaries.length === 1}
                                    className="text-xs text-red-600 disabled:opacity-40"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <label className="space-y-1 text-sm">
                                    Name of Beneficiary
                                    <input
                                        type="text"
                                        value={beneficiary.name}
                                        onChange={(e) => updateBeneficiary(index, 'name', e.target.value)}
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                                        placeholder="Beneficiary name"
                                    />
                                </label>
                                <label className="space-y-1 text-sm">
                                    Relationship with Applicant
                                    <select
                                        value={beneficiary.relationship}
                                        onChange={(e) => updateBeneficiary(index, 'relationship', e.target.value)}
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                                    >
                                        <option value="">Select relationship</option>
                                        {relationships.map((rel) => (
                                            <option key={rel} value={rel}>{rel}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>

                <br />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="space-y-1 text-sm">
                        Select for whom Financial Assistance is required?*
                        <select
                            value={formData.assistance_for || ''}
                            onChange={(e) => onChange('assistance_for', e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                        >
                            <option value="">Select an option</option>
                            <option value="self">Self</option>
                            <option value="spouse">Spouse</option>
                            <option value="child">Child</option>
                            <option value="parent">Parent</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </div>

            </div>
        </div>
    );
}
