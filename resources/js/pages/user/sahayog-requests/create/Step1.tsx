import { ChangeEvent } from 'react';

interface StepProps {
    formData: Record<string, string>;
    onChange: (field: string, value: string) => void;
}

export default function Step1({ formData, onChange }: StepProps) {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Step 1: Applicant Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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

                <label className="space-y-1 text-sm">
                    Date of Separation:
                    <input
                        type="date"
                        value={formData.date_of_seperation || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('date_of_seperation', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                </label>

                <label className="space-y-1 text-sm">
                    Work center where file is retained:
                    <select
                        value={formData.work_center || ''}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange('work_center', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    >
                        <option value="">Select Location</option>
                        <option value="Location A">Location A</option>
                        <option value="Location B">Location B</option>
                        <option value="Location C">Location C</option>
                    </select>
                </label>






                <label className="space-y-1 text-sm">
                    Place of Posting * :
                    <input
                        type="text"
                        value={formData.place_of_posting || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('place_of_posting', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                </label>
                <label className="space-y-1 text-sm">
                    Reason for Separation(Retirement/Vol.Retirment/Death/Resignation):
                    <input
                        type="text"
                        value={formData.seperation_reason || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('seperation_reason', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                </label>





                <label className="space-y-1 text-sm">
                    Name of Bank and Branch *:
                    <input
                        type="text"
                        value={formData.bank_and_branch || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('bank_and_branch', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                </label>
                <label className="space-y-1 text-sm">
                    Total benefits recieved on seperation:
                    <input
                        type="text"
                        value={formData.seperation_benefits || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('seperation_benefits', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                </label>








                <label className="space-y-1 text-sm">
                    Savings Bank Account No *:
                    <input
                        type="text"
                        value={formData.savingaccount_No || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('savingaccount_No', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                </label>
                <label className="space-y-1 text-sm">
                    No. of Dependents (with relationship) *:
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={formData.dependants_no || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('dependants_no', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                </label>







                <label className="space-y-1 text-sm">
                    IFSC Code of Bank Branch *:
                    <input
                        type="text"
                        value={formData.ifsc_code || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('ifsc_code', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                </label>

                <label className="space-y-1 text-sm">
                    Gross Annual Income *:
                    <input
                        type="number"
                        value={formData.gross_annual_income || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('gross_annual_income', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#E65F2B] focus:ring-[#E65F2B]/40"
                    />
                </label>

            </div>
        </div>
    );
}
