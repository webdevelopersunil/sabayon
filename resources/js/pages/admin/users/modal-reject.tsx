import { useForm } from '@inertiajs/react';
import { X, AlertTriangle } from 'lucide-react';
import { useEffect, type FormEvent } from 'react';
import type { User } from './index';

type ModalRejectProps = {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
};

export default function ModalReject({ isOpen, onClose, user }: ModalRejectProps) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        reason: '',
    });

    useEffect(() => {
        if (isOpen) {
            reset();
            clearErrors();
        }
    }, [isOpen]);

    if (!isOpen || !user) {
        return null;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(`/admin/users/${user.id}/reject`, {
            onSuccess: () => onClose(),
            preserveScroll: true,
        });
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Reject User Verification</h2>
                                <p className="text-sm text-gray-500">Are you sure you want to reject this user?</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm font-medium text-yellow-800">
                            Notice: This action will mark the user's verification status as 'Rejected'.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                                Rejection Reason <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="reason"
                                value={data.reason}
                                onChange={(e) => setData('reason', e.target.value)}
                                placeholder="Provide a clear reason for rejecting the user's verification..."
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-all outline-none text-sm min-h-[100px]"
                                required
                            />
                            {errors.reason && <p className="text-xs text-red-500 mt-1.5 animate-in fade-in">{errors.reason}</p>}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={onClose} disabled={processing} className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors">Cancel</button>
                            <button type="submit" disabled={processing || !data.reason} className="px-4 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">{processing ? 'Rejecting...' : 'Confirm Reject'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}