import { useForm } from '@inertiajs/react';
import { X, CheckCircle } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import type { User } from './index';

type ModalAcceptProps = {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
};

export default function ModalAccept({ isOpen, onClose, user }: ModalAcceptProps) {
    const { post, processing, reset } = useForm({});
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (isOpen) {
            reset();
            setIsChecked(false);
        }
    }, [isOpen]);

    if (!isOpen || !user) {
        return null;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Note: You will need to create this route and controller method on your backend
        post(`/admin/users/${user.id}/approve`, {
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
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Approve User Verification</h2>
                                <p className="text-sm text-gray-500">Are you sure you want to approve this user?</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-800">
                            Notice: This action will mark the user's verification status as 'Approved'.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="approval-checkbox"
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-[#E65F2B] focus:ring-[#E65F2B]"
                                />
                            </div>
                            <div className="ml-3 text-sm"><label htmlFor="approval-checkbox" className="font-medium text-gray-700">I confirm I wish to approve this user's verification.</label></div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={onClose} disabled={processing} className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors">Cancel</button>
                            <button type="submit" disabled={processing || !isChecked} className="px-4 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">{processing ? 'Approving...' : 'Confirm Approve'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}