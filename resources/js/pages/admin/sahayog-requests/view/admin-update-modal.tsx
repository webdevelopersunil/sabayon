import { X } from 'lucide-react';

interface AdminUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminUpdateModal({ isOpen, onClose }: AdminUpdateModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Admin Updates</h3>
                        <p className="text-xs text-gray-500 mt-1">Update request details, status, and attachments</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <form className="p-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Status Update - Left Column */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status Update <span className="text-red-500">*</span>
                            </label>
                            <select 
                                className="w-full rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white shadow-sm focus:border-[#E65F2B] focus:ring focus:ring-[#E65F2B]/20 transition-all text-sm px-4 py-2.5 border" 
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Under-review">Under Review</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        {/* Amount Approved - Right Column */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Amount Approved
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                <input 
                                    type="number" 
                                    className="w-full rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white shadow-sm focus:border-[#E65F2B] focus:ring focus:ring-[#E65F2B]/20 transition-all text-sm pl-8 pr-4 py-2.5 border" 
                                    placeholder="0.00" 
                                />
                            </div>
                        </div>

                        {/* Update Sahayog Number - Full Width on mobile, half on desktop */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Update Sahayog Number
                            </label>
                            <input 
                                type="tel" 
                                className="w-full rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white shadow-sm focus:border-[#E65F2B] focus:ring focus:ring-[#E65F2B]/20 transition-all text-sm px-4 py-2.5 border" 
                                placeholder="Enter phone number" 
                            />
                            <p className="text-xs text-gray-400 mt-1">Contact number for further communication</p>
                        </div>
                    </div>

                    {/* Details of update - Full Width */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Details of update <span className="text-red-500">*</span>
                        </label>
                        <textarea 
                            rows={4} 
                            className="w-full rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white shadow-sm focus:border-[#E65F2B] focus:ring focus:ring-[#E65F2B]/20 transition-all text-sm px-4 py-2.5 border resize-none" 
                            required 
                            placeholder="Enter detailed information about this update..." 
                        />
                        <p className="text-xs text-gray-400 mt-1">Provide comprehensive details about the status change or update</p>
                    </div>

                    {/* Upload Attachment - Full Width */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Attachment
                        </label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-[#E65F2B]/30 transition-all bg-gray-50/30">
                            <input 
                                type="file" 
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#E65F2B]/10 file:text-[#E65F2B] hover:file:bg-[#E65F2B]/20 transition-all cursor-pointer" 
                            />
                            <p className="text-xs text-gray-400 mt-2">Upload supporting documents (PDF, JPG, PNG - Max 5MB)</p>
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-5 py-2.5 text-sm font-medium text-white bg-[#E65F2B] rounded-lg hover:bg-[#C44A1F] shadow-sm transition-all relative overflow-hidden group"
                        >
                            <span className="relative z-10">Save Changes</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}