import { ChangeEvent, FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

interface Step4Props {
    onSubmit: () => void;
}

const docs = [
    'Latest proof of employment such as photocopy of Identity card, pay slip, certificate from the contractor or any other valid proof.',
    "Fee structure & copy of identity Card of the institution/bonafide student's certificate from the institution.",
    'Original fee receipts.',
    'Proof of medical treatment i.e. Discharge summary or Proof of Hospitalization or Doctor\'s prescription.',
    'Photocopy of mark sheet of previous examination in case of release of subsequent instalment of approved financial grant.',
    'Copy of school leaving certificate/ ration card indicating the name of ward(s).',
];

export default function Step4({ onSubmit }: Step4Props) {
    const { data, setData, post, processing } = useForm({
        cliamearlier: '',
        timelimit: '',
        files: [] as File[],
    });

    const onFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const next = Array.from(e.target.files);
        setData('files', [...data.files, ...next]);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(); // Depending on actual submit logic, you could do post('/api-endpoint') here.
    };

    return (
        <form id="step4-form" onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Step 4: Documents and Declarations</h3>
            <p className="text-sm text-gray-600">Please upload the required documents and confirm declarations below.</p>

            <div className="rounded-xl border border-orange-300 bg-orange-50 p-4">
                <p className="font-semibold text-orange-800 mb-2">Required Documents</p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {docs.map((doc, idx) => (
                        <li key={idx}>{doc}</li>
                    ))}
                </ul>
            </div>

            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Upload documents (multiple allowed)</label>
                <input type="file" multiple onChange={onFilesChange} className="block w-full text-sm text-gray-500 file:border-0 file:bg-[#E65F2B]/10 file:px-3 file:py-2 file:rounded-md file:text-[#4B1F06] cursor-pointer" />
                {data.files.length > 0 && (
                    <div className="rounded-lg border border-gray-200 bg-white p-3 text-sm">
                        <div className="font-medium text-gray-700">Files You Have Uploaded</div>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {data.files.map((file, idx) => (
                                <li key={`${file.name}-${idx}`} className="flex items-center justify-between gap-3">
                                    <span>{file.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => setData('files', data.files.filter((_, i) => i !== idx))}
                                        className="text-xs text-red-600 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="space-y-2 rounded-xl border border-orange-300 bg-orange-50 p-3 text-sm">
                <div className="font-semibold text-orange-800">Declarations</div>
                <label className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        checked={data.cliamearlier === '1'}
                        onChange={(e) => setData('cliamearlier', e.target.checked ? '1' : '')}
                        className="mt-1"
                    />
                    <span>I have not preferred this invoice/claim earlier.</span>
                </label>
                <label className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        checked={data.timelimit === '1'}
                        onChange={(e) => setData('timelimit', e.target.checked ? '1' : '')}
                        className="mt-1"
                    />
                    <span>I have preferred the invoice/Claim within the prescribed time limit as per the Sahayog Scheme.</span>
                </label>
            </div>
        </form>
    );
}
