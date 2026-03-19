import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

interface Beneficiary {
    id?: number;
    name: string;
    relationship: string;
}

interface StepProps {
    onNext: () => void;
    initialData?: Beneficiary[];
    selectedBeneficiary?: string;
}

const relationships = [
    'Spouse',
    'Child',
    'Sister',
    'Father',
    'Mother',
    'Brother',
    'Father in Law',
    'Mother-in-Law',
    'Sister in Law (Husband sister for DOD)'
];

export default function Step2({ onNext, initialData, selectedBeneficiary }: StepProps) {
    const { data, setData, post, transform, errors: formErrors, processing } = useForm({
        beneficiaries: (initialData && initialData.length > 0) ? initialData : [{ name: '', relationship: '' }] as Beneficiary[],
        selected_beneficiary: selectedBeneficiary || '',
    });

    const errors = formErrors as Record<string, string | undefined>;

    const updateBeneficiary = (index: number, field: keyof Beneficiary, value: string) => {
        const next = data.beneficiaries.map((item, idx) => (idx === index ? { ...item, [field]: value } : item));
        setData('beneficiaries', next);
    };

    const addBeneficiary = () => {
        setData('beneficiaries', [...data.beneficiaries, { name: '', relationship: '' }]);
    };

    const removeBeneficiary = (index: number) => {
        if (data.beneficiaries.length <= 1) return;
        const beneficiaryToRemove = data.beneficiaries[index];
        const optionValue = beneficiaryToRemove.name && beneficiaryToRemove.relationship ? `${beneficiaryToRemove.name}-${beneficiaryToRemove.relationship}` : beneficiaryToRemove.name;
        
        const newBeneficiaries = data.beneficiaries.filter((_, idx) => idx !== index);
        // Also clear the selected_beneficiary if the user removes the one they had selected
        setData({ ...data, beneficiaries: newBeneficiaries, selected_beneficiary: data.selected_beneficiary === optionValue ? '' : data.selected_beneficiary });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        transform((data) => ({
            step: 2,
            step2: data,
        }));

        post('/sahayog-request/save-step', {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => onNext(),
        });
    };

    return (
        <form id="step2-form" onSubmit={handleSubmit} className="space-y-4">
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
                    {data.beneficiaries.map((beneficiary, index) => (
                        <div key={`beneficiary-${index}`} className="rounded-lg border border-gray-200 p-3 bg-gray-50">
                            <div className="flex items-start justify-between gap-2">
                                <p className="font-medium text-sm">Beneficiary {index + 1}</p>
                                <button
                                    type="button"
                                    onClick={() => removeBeneficiary(index)}
                                    disabled={data.beneficiaries.length === 1}
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
                                        className={`w-full rounded-lg border px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40 ${errors[`step2.beneficiaries.${index}.name`] ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                                        placeholder="Beneficiary name"
                                    />
                                    {errors[`step2.beneficiaries.${index}.name`] && (
                                        <p className="text-xs text-red-600 mt-1">{errors[`step2.beneficiaries.${index}.name`]}</p>
                                    )}
                                </label>
                                <label className="space-y-1 text-sm">
                                    Relationship with Applicant
                                    <select
                                        value={beneficiary.relationship}
                                        onChange={(e) => updateBeneficiary(index, 'relationship', e.target.value)}
                                        className={`w-full rounded-lg border px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40 ${errors[`step2.beneficiaries.${index}.relationship`] ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                                    >
                                        <option value="">Select relationship</option>
                                        {relationships.map((rel) => (
                                            <option key={rel} value={rel}>{rel}</option>
                                        ))}
                                    </select>
                                    {errors[`step2.beneficiaries.${index}.relationship`] && (
                                        <p className="text-xs text-red-600 mt-1">{errors[`step2.beneficiaries.${index}.relationship`]}</p>
                                    )}
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
                            value={data.selected_beneficiary}
                            onChange={(e) => setData('selected_beneficiary', e.target.value)}
                            className={`w-full rounded-lg border px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40 ${errors['step2.selected_beneficiary'] ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                        >
                            <option value="">Select an option</option>
                            {data.beneficiaries.map((beneficiary, index) => {
                                const optionValue = beneficiary.name && beneficiary.relationship ? `${beneficiary.name}-${beneficiary.relationship}` : beneficiary.name;
                                return optionValue ? (
                                    <option key={index} value={optionValue}>
                                        {beneficiary.name} {beneficiary.relationship ? `(${beneficiary.relationship})` : ''}
                                    </option>
                                ) : null;
                            })}
                        </select>
                        {errors['step2.selected_beneficiary'] && (
                            <p className="text-xs text-red-600 mt-1">{errors['step2.selected_beneficiary']}</p>
                        )}
                    </label>
                </div>

            </div>
        </form>
    );
}
