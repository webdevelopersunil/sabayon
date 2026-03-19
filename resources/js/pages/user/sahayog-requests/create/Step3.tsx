import { ChangeEvent, FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

interface StepProps {
    onNext: () => void;
    initialData?: any;
}
 
const requiredDocs: Record<string, string[]> = {
    'Medical': [
        'Latest proof of employment such as photocopy of Identity card, pay slip, certificate from the contractor or any other valid proof.',
        'Dependency declaration/certificate in case of parents/spouse.',
        'Copy of ration card showing parents/spouse’s name.',
        'Proof of medical treatment i.e. Discharge summary or Proof of Hospitalization or Doctor\'s prescription.',
        'Original medical bills.',
        'In case of wards, copy of school leaving certificate/ration card/voter ID etc indicating the name of the wards.',
        'Source of funding in cases where large amount of reimbursement is sought.',
    ],
    'Higher Education': [
        'Latest proof of employment such as photocopy of Identity card, pay slip, certificate from the contractor or any other valid proof.',
        'Fee structure & copy of identity card of institution/bonafide student certificate from institution.',
        'Original fee receipts.',
        'Proof of medical treatment i.e. Discharge summary or Proof of Hospitalization or Doctor\'s prescription.',
        'Source of funding.',
        'Photocopy of mark sheet of previous examination in case of release of subsequent instalment of approved financial grant.',
        'Copy of school leaving certificate/ration card indicating name of ward(s).',
    ],
    'Daughter Marriage': [
        'Latest proof of employment such as photocopy of Identity card, pay slip, certificate from the contractor or any other valid proof.',
        'Proof of dependency such as copy of school leaving certificate/ration card/voter ID etc indicating the name of daughter or any other valid proof.',
        'Marriage invitation card.',
        'Photograph of marriage.',
        'Marriage Registration Certificate from local or any other Govt. authorities or certificate from the religious institution where the marriage was solemnized.',
    ],
};

export default function Step3({ onNext, initialData }: StepProps) {
    const { data, setData, post, transform, errors: formErrors, processing } = useForm({
        financialOption: initialData?.financialoptions || '',
        otherDetails: initialData?.other_details || '',
        amount: initialData?.requested_amount || '',
    });

    const errors = formErrors as Record<string, string | undefined>;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        transform((data) => ({
            step: 3,
            step3: data,
        }));

        post('/sahayog-request/save-step', {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => onNext(),
        });
    };

    const selected = data.financialOption || '';
    const docs = requiredDocs[selected] || [];

    return (
        <form id="step3-form" onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Step 3: Financial Documents</h3>

            <label className="space-y-1 text-sm block">
                Select Financial Option
                <select
                    value={data.financialOption}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setData('financialOption', e.target.value)}
                    className={`w-full rounded-lg border px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40 ${errors['step3.financialOption'] ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                >
                    <option value="">Please Select</option>
                    <option value="Medical">Medical Treatement</option>
                    <option value="Higher Education">Pursuing Higher Education (Maximum can take is 2.5Lac)</option>
                    <option value="Daughter Marriage">Marriage of Dependent Daughter (Maximum can take is 50000)</option>
                    <option value="other">Any other purpose - Furnish Details</option>
                </select>
                {errors['step3.financialOption'] && (
                    <p className="text-xs text-red-600 mt-1">{errors['step3.financialOption']}</p>
                )}
            </label>



            {docs.length > 0 && (
                <div className="rounded-xl border border-orange-300 bg-orange-50 p-3">
                    <div className="mb-2 font-semibold text-orange-800">Documents Required{selected === 'Medical' ? ' Medical treatment' : selected === 'Higher Education' ? ' Higher Education' : selected === 'Daughter Marriage' ? ' for Marriage of Dependent Daughter' : ''}:</div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {docs.map((doc, idx) => (
                            <li key={idx}>{doc}</li>
                        ))}
                    </ul>
                </div>
            )}

            {selected === 'other' && (
                <div className="space-y-2">
                    <label htmlFor="otherDetails" className="text-sm font-medium text-gray-700">Mention the details</label>
                    <textarea
                        id="otherDetails"
                        value={data.otherDetails}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData('otherDetails', e.target.value)}
                        className={`w-full rounded-lg border px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40 ${errors['step3.otherDetails'] ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                        rows={4}
                        placeholder="Leave a comment here"
                    />
                    {errors['step3.otherDetails'] && (
                        <p className="text-xs text-red-600 mt-1">{errors['step3.otherDetails']}</p>
                    )}
                </div>
            )}

            <label className="space-y-1 text-sm block">
                Amount needed
                <div className={`flex rounded-lg border focus-within:border-[#E65F2B] focus-within:ring-[#E65F2B]/40 items-center overflow-hidden ${errors['step3.amount'] ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                    <span className={`px-3 py-2 text-gray-700 ${errors['step3.amount'] ? 'bg-red-100' : 'bg-gray-100'}`}>₹</span>
                    <input
                        type="number"
                        value={data.amount}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setData('amount', e.target.value)}
                        className={`w-full border-none px-3 py-2 focus:outline-none ${errors['step3.amount'] ? 'bg-red-50' : ''}`}
                        id="moneyInput"
                        placeholder="Enter amount"
                        aria-label="Amount (to the nearest Indian Rupees)"
                    />
                </div>
                {errors['step3.amount'] && (
                    <p className="text-xs text-red-600 mt-1">{errors['step3.amount']}</p>
                )}
            </label>
            <div id="message" className="my-1 rounded-md border border-orange-300 bg-orange-50 px-3 py-2 text-sm text-orange-800">
                Your level is eligible for maximum amount of 5.00 lakh
            </div>
        </form>
    );
}
