import { useState } from 'react';
import { X } from 'lucide-react';

interface AdminUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminUpdateModal({ isOpen, onClose }: AdminUpdateModalProps) {
    const [activeTab, setActiveTab] = useState<'hr' | 'trust'>('hr');

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

                <div className="flex border-b border-gray-100 px-6">
                    <button
                        type="button"
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'hr' ? 'border-[#E65F2B] text-[#E65F2B]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'}`}
                        onClick={() => setActiveTab('hr')}
                    >
                        HR Status
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'trust' ? 'border-[#E65F2B] text-[#E65F2B]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'}`}
                        onClick={() => setActiveTab('trust')}
                    >
                        Trust Admin Status
                    </button>
                </div>

                <form className="p-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
                    {activeTab === 'hr' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Request Status <span className="text-red-500">*</span>
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        HR Details
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white shadow-sm focus:border-[#E65F2B] focus:ring focus:ring-[#E65F2B]/20 transition-all text-sm px-4 py-2.5 border" 
                                        placeholder="Enter HR details" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    HR Comments <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    rows={4} 
                                    className="w-full rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white shadow-sm focus:border-[#E65F2B] focus:ring focus:ring-[#E65F2B]/20 transition-all text-sm px-4 py-2.5 border resize-none" 
                                    required 
                                    placeholder="Enter HR comments..." 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Attachment Uploaded
                                </label>
                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-[#E65F2B]/30 transition-all bg-gray-50/30">
                                    <input 
                                        type="file" 
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#E65F2B]/10 file:text-[#E65F2B] hover:file:bg-[#E65F2B]/20 transition-all cursor-pointer" 
                                    />
                                    <p className="text-xs text-gray-400 mt-2">Upload supporting documents (PDF, JPG, PNG - Max 5MB)</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'trust' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Forwarded to Trust Admin?
                                    </label>
                                    <div className="flex items-center gap-4 mt-3">
                                        <label className="flex items-center gap-2 text-sm text-gray-700">
                                            <input type="radio" name="forwarded" value="yes" className="text-[#E65F2B] focus:ring-[#E65F2B]" />
                                            Yes
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-gray-700">
                                            <input type="radio" name="forwarded" value="no" className="text-[#E65F2B] focus:ring-[#E65F2B]" />
                                            No
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Payment Status
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white shadow-sm focus:border-[#E65F2B] focus:ring focus:ring-[#E65F2B]/20 transition-all text-sm px-4 py-2.5 border" 
                                        placeholder="Enter payment status" 
                                    />
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Trust Admin Details
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white shadow-sm focus:border-[#E65F2B] focus:ring focus:ring-[#E65F2B]/20 transition-all text-sm px-4 py-2.5 border" 
                                        placeholder="Enter Trust Admin details" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Trust Admin Comments
                                </label>
                                <textarea 
                                    rows={4} 
                                    className="w-full rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white shadow-sm focus:border-[#E65F2B] focus:ring focus:ring-[#E65F2B]/20 transition-all text-sm px-4 py-2.5 border resize-none" 
                                    placeholder="Enter Trust Admin comments..." 
                                />
                            </div>
                        </div>
                    )}
                    
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