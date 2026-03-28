import { FormEvent } from 'react';
import { useForm, usePage } from '@inertiajs/react';

interface StepProps {
    onNext: () => void;
    workCenters: string[];
    initialData?: any;
}

export default function Step1({ onNext, workCenters, initialData }: StepProps) {
    const { data, setData, post, processing, errors, transform } = useForm({
        date_of_seperation: initialData?.date_of_seperation || '',
        work_center: initialData?.work_center || '',
        place_of_posting: initialData?.place_of_posting || '',
        seperation_reason: initialData?.seperation_reason || '',
        bank_and_branch: initialData?.bank_and_branch || '',
        seperation_benefits: initialData?.seperation_benefits || '',
        savingaccount_No: initialData?.savingaccount_No || '',
        dependants_no: initialData?.dependants_no || '',
        ifsc_code: initialData?.ifsc_code || '',
        gross_annual_income: initialData?.gross_annual_income || '',

        pan: initialData?.pan || '',
        contractor_name:  initialData?.contractor_name || '',
        work_years_contact: initialData?.work_years_contact || '',
        total_years_in_ongc_different_contact: initialData?.total_years_in_ongc_different_contact || '',
        funding_source: initialData?.funding_source || '',

    });

    const { auth } = usePage().props as any;
 
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        transform((data) => ({
            step: 1,
            step1: data,
        }));

        post('/sahayog-request/save-step', {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onNext();
            },
        });
    };

    return (
        <form id="step1-form" onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Applicant Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(errors).length > 0 && (
                    <div className="col-span-full rounded-md bg-red-50 p-4 mb-4">
                        <div className="text-sm text-red-700">
                            Please correct the errors below before proceeding.
                        </div>
                    </div>
                )}

                {/* Trashed code for reference, not to be added back in the future. */}
                {/* @if(auth()->user()->date_of_joining_ongc==null) 
                            <div class="form-group" id="joiningField">
                                <label for="joiningDate">Date of Joining ONGC:</label>
                                <input wire:model.live="doj_ongc" type="date"
                                    class="form-control  @error('doj_ongc') is-invalid @enderror" id="joiningDate" />
                                @error('doj_ongc')
                                <div class="invalid-feedback">
                                    <strong>{{ $message }}</strong>
                                </div>
                                @enderror
                            </div>
                            @endif */}

                {/* <label className="space-y-1 text-sm">
                    Date of Joining ONGC:
                    <input
                        type="date"
                        value={formData.doj_ongc || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('doj_ongc', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                </label> */}







            {auth?.user?.employee_type === 'contractor' ? (
                
            <>
                {/* Visible this ection if the  */}
                <label className="space-y-1 text-sm">
                    PAN Number:
                    <input
                        type="text"
                        value={data.pan}
                        onChange={(e) => setData('pan', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                    {errors.pan && <p className="text-red-600 text-xs mt-1">{errors.pan}</p>}
                </label>

                <label className="space-y-1 text-sm">
                    Name of the Firm/Contract:
                    <input
                        type="text"
                        value={data.contractor_name}
                        onChange={(e) => setData('contractor_name', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                    {errors.contractor_name && <p className="text-red-600 text-xs mt-1">{errors.contractor_name}</p>}
                </label>

                <label className="space-y-1 text-sm">
                    No of years worked under current contact:
                    <input
                        type="text"
                        value={data.work_years_contact}
                        onChange={(e) => setData('work_years_contact', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                    {errors.work_years_contact && <p className="text-red-600 text-xs mt-1">{errors.work_years_contact}</p>}
                </label>
                <label className="space-y-1 text-sm">
                    Total years worked for ONGC under different contact*:
                    <input
                        type="text"
                        value={data.total_years_in_ongc_different_contact}
                        onChange={(e) => setData('total_years_in_ongc_different_contact', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                    {errors.total_years_in_ongc_different_contact && <p className="text-red-600 text-xs mt-1">{errors.total_years_in_ongc_different_contact}</p>}
                </label>


                <label className="space-y-1 text-sm">
                    Source of Funding*:
                    <input
                        type="text"
                        value={data.funding_source}
                        onChange={(e) => setData('funding_source', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                    {errors.funding_source && <p className="text-red-600 text-xs mt-1">{errors.funding_source}</p>}
                </label>
            </>
                
            ) : (
                <>
                    <label className="space-y-1 text-sm">
                        Place of Posting * :
                        <input
                            type="text"
                            value={data.place_of_posting}
                            onChange={(e) => setData('place_of_posting', e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                        />
                        {errors.place_of_posting && <p className="text-red-600 text-xs mt-1">{errors.place_of_posting}</p>}
                    </label>

                    <label className="space-y-1 text-sm">
                        Reason for Separation(Retirement/Vol.Retirment/Death/Resignation):
                        <input
                            type="text"
                            value={data.seperation_reason}
                            onChange={(e) => setData('seperation_reason', e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                        />
                        {errors.seperation_reason && <p className="text-red-600 text-xs mt-1">{errors.seperation_reason}</p>}
                    </label>
                    <label className="space-y-1 text-sm">
                        Total benefits recieved on seperation:
                        <input
                            type="text"
                            value={data.seperation_benefits}
                            onChange={(e) => setData('seperation_benefits', e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                        />
                        {errors.seperation_benefits && <p className="text-red-600 text-xs mt-1">{errors.seperation_benefits}</p>}
                    </label>
                </>
            )}
                

                












                <label className="space-y-1 text-sm">
                    Date of Separation:
                    <input
                        type="date"
                        value={data.date_of_seperation}
                        onChange={(e) => setData('date_of_seperation', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                    {errors.date_of_seperation && <p className="text-red-600 text-xs mt-1">{errors.date_of_seperation}</p>}
                </label>

                <label className="space-y-1 text-sm">
                    Work center where file is retained:
                    <select
                        value={data.work_center}
                        onChange={(e) => setData('work_center', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    >
                        <option value="">Select Location</option>
                        {workCenters.map((center) => (
                            <option key={center} value={center}>{center}</option>
                        ))}
                    </select>
                    {errors.work_center && <p className="text-red-600 text-xs mt-1">{errors.work_center}</p>}
                </label>

                <label className="space-y-1 text-sm">
                    Name of Bank and Branch *:
                    <input
                        type="text"
                        value={data.bank_and_branch}
                        onChange={(e) => setData('bank_and_branch', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                    {errors.bank_and_branch && <p className="text-red-600 text-xs mt-1">{errors.bank_and_branch}</p>}
                </label>








                <label className="space-y-1 text-sm">
                    Savings Bank Account No *:
                    <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={20} value={data.savingaccount_No}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ''); // allow only digits
                                setData('savingaccount_No', value);
                            }} className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40" />
                    {errors.savingaccount_No && <p className="text-red-600 text-xs mt-1">{errors.savingaccount_No}</p>}
                </label>
                <label className="space-y-1 text-sm">
                    No. of Dependents (with relationship) *:
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={data.dependants_no}
                        onChange={(e) => setData('dependants_no', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                    {errors.dependants_no && <p className="text-red-600 text-xs mt-1">{errors.dependants_no}</p>}
                </label>







                <label className="space-y-1 text-sm">
                    IFSC Code of Bank Branch *:
                    <input
                        type="text"
                        value={data.ifsc_code}
                        onChange={(e) => setData('ifsc_code', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                    {errors.ifsc_code && <p className="text-red-600 text-xs mt-1">{errors.ifsc_code}</p>}
                </label>

                <label className="space-y-1 text-sm">
                    Gross Annual Income *:
                    <input
                        type="number"
                        value={data.gross_annual_income}
                        onChange={(e) => setData('gross_annual_income', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                    {errors.gross_annual_income && <p className="text-red-600 text-xs mt-1">{errors.gross_annual_income}</p>}
                </label>

            </div>
        </form>
    );
}
