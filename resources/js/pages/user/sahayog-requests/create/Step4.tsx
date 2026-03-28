import { ChangeEvent, FormEvent } from 'react';
import { useForm, usePage } from '@inertiajs/react';

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
    const { step4, wizardDataId } = usePage().props as any;
    const initialExistingFiles = Array.isArray(step4) ? step4 : [];

    const { data, setData, post, processing, errors: formErrors, transform } = useForm({
        cliamearlier: '',
        timelimit: '',
        files: [] as File[],
        existing_files: initialExistingFiles.map((f: any) => f.id) as number[],
    });

    const errors = formErrors as Record<string, string | undefined>;
    const visibleExistingFiles = initialExistingFiles.filter((f: any) => data.existing_files.includes(f.id));

    const onFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const next = Array.from(e.target.files);
        if (data.files.length + next.length + data.existing_files.length > 5) {
            alert('You can upload a maximum of 5 files.');
            return;
        }
        setData('files', [...data.files, ...next]);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        transform((data) => ({
            wizard_data_id: wizardDataId,
            step: 4,
            step4: data,
        }));

        post('/sahayog-request/save-step', {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => onSubmit(),
        });
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
                <label className="block text-sm font-medium text-gray-700">Upload documents (multiple allowed, max 5)</label>
                <input type="file" multiple onChange={onFilesChange} className={`block w-full text-sm text-gray-500 file:border-0 file:bg-[#E65F2B]/10 file:px-3 file:py-2 file:rounded-md file:text-[#4B1F06] cursor-pointer ${errors['step4.files'] ? 'border border-red-500 bg-red-50 rounded-md' : ''}`} />
                {errors['step4.files'] && <p className="text-xs text-red-600 mt-1">{errors['step4.files']}</p>}
                {Object.keys(errors).filter(k => k.startsWith('step4.files.')).map(k => (
                    <p key={k} className="text-xs text-red-600 mt-1">{errors[k]}</p>
                ))}

                {(data.files.length > 0 || visibleExistingFiles.length > 0) && (
                    <div className="rounded-lg border border-gray-200 bg-white p-3 text-sm">
                        <div className="font-medium text-gray-700">Files You Have Uploaded ({data.files.length + visibleExistingFiles.length}/5)</div>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {visibleExistingFiles.map((file: any) => (
                                <li key={`existing-${file.id}`} className="flex items-center justify-between gap-3">
                                    <span className="truncate">{file.attachment.split('/').pop()}</span>
                                    <button
                                        type="button"
                                        onClick={() => setData('existing_files', data.existing_files.filter((id: number) => id !== file.id))}
                                        className="text-xs text-red-600 hover:text-red-700 whitespace-nowrap"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                            {data.files.map((file, idx) => (
                                <li key={`${file.name}-${idx}`} className="flex items-center justify-between gap-3">
                                    <span className="truncate">{file.name} <span className="text-xs text-gray-400">(New)</span></span>
                                    <button
                                        type="button"
                                        onClick={() => setData('files', data.files.filter((_, i) => i !== idx))}
                                        className="text-xs text-red-600 hover:text-red-700 whitespace-nowrap"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className={`space-y-2 rounded-xl border p-3 text-sm ${errors['step4.cliamearlier'] || errors['step4.timelimit'] ? 'border-red-300 bg-red-50' : 'border-orange-300 bg-orange-50'}`}>
                <div className="font-semibold text-orange-800">Declarations</div>
                <div className="space-y-3 mt-2">
                    <label className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            checked={data.cliamearlier === '1'}
                            onChange={(e) => setData('cliamearlier', e.target.checked ? '1' : '')}
                            className={`mt-1 rounded border-gray-300 text-[#E65F2B] focus:ring-[#E65F2B]/40 ${errors['step4.cliamearlier'] ? 'border-red-500' : ''}`}
                        />
                        <span>I have not preferred this invoice/claim earlier.</span>
                    </label>
                    {errors['step4.cliamearlier'] && <p className="text-xs text-red-600 ml-6">{errors['step4.cliamearlier']}</p>}
                    
                    <label className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            checked={data.timelimit === '1'}
                            onChange={(e) => setData('timelimit', e.target.checked ? '1' : '')}
                            className={`mt-1 rounded border-gray-300 text-[#E65F2B] focus:ring-[#E65F2B]/40 ${errors['step4.timelimit'] ? 'border-red-500' : ''}`}
                        />
                        <span>I have preferred the invoice/Claim within the prescribed time limit as per the Sahayog Scheme.</span>
                    </label>
                    {errors['step4.timelimit'] && <p className="text-xs text-red-600 ml-6">{errors['step4.timelimit']}</p>}
                </div>
            </div>
        </form>
    );
}
