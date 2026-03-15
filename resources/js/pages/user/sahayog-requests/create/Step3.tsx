import { ChangeEvent } from 'react';

interface StepProps {
    formData: Record<string, string>;
    onChange: (field: string, value: string) => void;
}

const requiredDocs: Record<string, string[]> = {
    Medical: [
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

export default function Step3({ formData, onChange }: StepProps) {
    const selected = formData.financialOption || '';
    const docs = requiredDocs[selected] || [];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Step 3: Financial Documents</h3>

            <label className="space-y-1 text-sm block">
                Select Financial Option
                <select
                    value={formData.financialOption || ''}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange('financialOption', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                >
                    <option value="">Please Select</option>
                    <option value="Medical">Medical Treatement</option>
                    <option value="Higher Education">Pursuing Higher Education (Maximum can take is 2.5Lac)</option>
                    <option value="Daughter Marriage">Marriage of Dependent Daughter (Maximum can take is 50000)</option>
                    <option value="other">Any other purpose - Furnish Details</option>
                </select>
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
                        value={formData.otherDetails || ''}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange('otherDetails', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                        rows={4}
                        placeholder="Leave a comment here"
                    />
                </div>
            )}

            <label className="space-y-1 text-sm block">
                Amount needed
                <div className="flex rounded-lg border border-gray-200 focus-within:border-[#E65F2B] focus-within:ring-[#E65F2B]/40 items-center overflow-hidden">
                    <span className="px-3 py-2 bg-gray-100 text-gray-700">₹</span>
                    <input
                        type="number"
                        value={formData.amount || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('amount', e.target.value)}
                        className="w-full border-none px-3 py-2 focus:outline-none"
                        id="moneyInput"
                        placeholder="Enter amount"
                        aria-label="Amount (to the nearest Indian Rupees)"
                    />
                </div>
            </label>
            <div id="message" className="my-1 rounded-md border border-orange-300 bg-orange-50 px-3 py-2 text-sm text-orange-800">
                Your level is eligible for maximum amount of 5.00 lakh
            </div>
        </div>
    );
}
