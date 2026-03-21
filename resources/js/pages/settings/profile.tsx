
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, Head, Link, usePage, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';

import { 
    User, Mail, Phone, MapPin, Calendar, Briefcase, Shield, 
    Camera, Save, Edit2, Clock, Award, Heart, 
    FileText, CheckCircle, AlertCircle, ArrowRight, 
    Building2, Globe, Linkedin, Twitter, Github, X
} from 'lucide-react';
import { useState, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
    {
        title: 'Profile',
        href: '#',
    },
];

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {

    const { auth, flash } = usePage<any>().props;

    const [isEditing, setIsEditing] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: auth.user.name || '',
        email: auth.user.email || '',
        aadhar_no: auth.user.aadhar_no || '',
        mobileno: auth.user.mobileno || '',
        designation: auth.user.designation || '',
        category: auth.user.category || '',
        location: auth.user.location || ''
    });
    
    const employee_id = auth.user.cpf_no || '';
    const join_date = auth.user.date_of_joining_ongc ? new Date(auth.user.date_of_joining_ongc).toLocaleDateString('en-GB') : 'N/A';

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch('/settings/profile', {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccess(true);
                setIsEditing(false);
                setTimeout(() => setShowSuccess(false), 3000);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Profile" />
            
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E65F2B]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Centered Container */}
                <div className="max-w-5xl mx-auto w-full space-y-6">
                    {/* Success Message */}
                    {showSuccess && (
                        <div className="animate-slide-in">
                            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <span>Profile updated successfully!</span>
                                </div>
                                <button onClick={() => setShowSuccess(false)} className="text-green-600 hover:text-green-800">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Error / Flash Message */}
                    {flash?.error && (
                        <div className="animate-slide-in">
                            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-red-600" />
                                    <span>{flash.error}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Profile Header with Avatar */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        {/* Cover Image */}
                        <div className="h-32 bg-gradient-to-r from-[#E65F2B]/20 to-orange-100/50" />
                        
                        <div className="relative px-6 pb-6">
                            {/* Avatar Section */}
                            <div className="flex flex-col sm:flex-row gap-6 -mt-12 mb-6">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-[#E65F2B]/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                                    <div className="relative">
                                        <div className="w-28 h-28 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-lg">
                                            {avatarPreview ? (
                                                <img 
                                                    src={avatarPreview} 
                                                    alt={data.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#E65F2B] to-orange-500 flex items-center justify-center">
                                                    <User className="h-12 w-12 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleAvatarClick}
                                            className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#E65F2B] text-white shadow-md hover:bg-[#C44A1F] transition-all"
                                        >
                                            <Camera className="h-4 w-4" />
                                        </button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex-1 mt-4 sm:mt-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
                                            <p className="text-gray-500">{data.designation} • {data.category}</p>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Briefcase className="h-4 w-4" />
                                                    Employee ID: {employee_id}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    Joined: {join_date}
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => setIsEditing(!isEditing)}
                                            variant={isEditing ? "outline" : "default"}
                                            className={!isEditing ? "bg-[#E65F2B] hover:bg-[#C44A1F]" : "border-[#E65F2B] text-[#E65F2B]"}
                                        >
                                            {isEditing ? (
                                                <>
                                                    <X className="h-4 w-4 mr-2" />
                                                    Cancel Edit
                                                </>
                                            ) : (
                                                <>
                                                    <Edit2 className="h-4 w-4 mr-2" />
                                                    Edit Profile
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
                                <div className="text-center p-3 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors">
                                    <div className="text-2xl font-bold text-[#E65F2B]">24</div>
                                    <div className="text-xs text-gray-500">Requests Made</div>
                                </div>
                                <div className="text-center p-3 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors">
                                    <div className="text-2xl font-bold text-green-600">18</div>
                                    <div className="text-xs text-gray-500">Approved</div>
                                </div>
                                <div className="text-center p-3 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors">
                                    <div className="text-2xl font-bold text-emerald-600">₹4,85,000</div>
                                    <div className="text-xs text-gray-500">Total Assistance</div>
                                </div>
                                <div className="text-center p-3 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors">
                                    <div className="text-2xl font-bold text-amber-600">8</div>
                                    <div className="text-xs text-gray-500">Years of Service</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E65F2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <form onSubmit={submit} className="relative p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 rounded-lg bg-[#E65F2B]/10">
                                    <User className="h-5 w-5 text-[#E65F2B]" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-700 flex items-center gap-2">
                                        <User className="h-4 w-4 text-[#E65F2B]" />
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={!isEditing}
                                        className={!isEditing ? "bg-gray-50" : ""}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-[#E65F2B]" />
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={!isEditing}
                                        className={!isEditing ? "bg-gray-50" : ""}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Aadhar Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="aadhar_no" className="text-gray-700 flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-[#E65F2B]" />
                                        Aadhar Number
                                    </Label>
                                    <Input
                                        id="aadhar_no"
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={12}
                                        minLength={12}
                                        value={data.aadhar_no}
                                        onChange={(e) => setData('aadhar_no', e.target.value.replace(/\D/g, ''))}
                                        disabled={!isEditing}
                                        className={!isEditing ? "bg-gray-50" : ""}
                                    />
                                    <InputError message={errors.aadhar_no} />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="mobileno" className="text-gray-700 flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-[#E65F2B]" />
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="mobileno"
                                        value={data.mobileno}
                                        onChange={(e) => setData('mobileno', e.target.value)}
                                        disabled={!isEditing}
                                        className={!isEditing ? "bg-gray-50" : ""}
                                    />
                                    <InputError message={errors.mobileno} />
                                </div>

                                {/* Employee ID */}
                                <div className="space-y-2">
                                    <Label htmlFor="employee_id" className="text-gray-700 flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-[#E65F2B]" />
                                        Employee ID
                                    </Label>
                                    <Input
                                        id="employee_id"
                                        value={employee_id}
                                        disabled={true}
                                        className="bg-gray-50"
                                    />
                                </div>

                                {/* Designation */}
                                <div className="space-y-2">
                                    <Label htmlFor="designation" className="text-gray-700 flex items-center gap-2">
                                        <Briefcase className="h-4 w-4 text-[#E65F2B]" />
                                        Designation
                                    </Label>
                                    <Input
                                        id="designation"
                                        value={data.designation}
                                        onChange={(e) => setData('designation', e.target.value)}
                                        disabled={!isEditing}
                                        className={!isEditing ? "bg-gray-50" : ""}
                                    />
                                    <InputError message={errors.designation} />
                                </div>

                                {/* Department */}
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-gray-700 flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-[#E65F2B]" />
                                        Department
                                    </Label>
                                    <Input
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        disabled={!isEditing}
                                        className={!isEditing ? "bg-gray-50" : ""}
                                    />
                                    <InputError message={errors.category} />
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-gray-700 flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-[#E65F2B]" />
                                        Location
                                    </Label>
                                    <Input
                                        id="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        disabled={!isEditing}
                                        className={!isEditing ? "bg-gray-50" : ""}
                                    />
                                    <InputError message={errors.location} />
                                </div>

                                {/* Join Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="join_date" className="text-gray-700 flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-[#E65F2B]" />
                                        Join Date
                                    </Label>
                                    <Input
                                        id="join_date"
                                        value={join_date}
                                        disabled={true}
                                        className="bg-gray-50"
                                    />
                                </div>
                            </div>

                            
                            {/* Social Links
                            <div className="mt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 rounded-lg bg-[#E65F2B]/10">
                                        <Globe className="h-5 w-5 text-[#E65F2B]" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Social Profiles</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-gray-700 flex items-center gap-2">
                                            <Linkedin className="h-4 w-4 text-blue-600" />
                                            LinkedIn
                                        </Label>
                                        <Input
                                            value={formData.linkedin}
                                            onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                                            disabled={!isEditing}
                                            placeholder="linkedin.com/in/username"
                                            className={!isEditing ? "bg-gray-50" : ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-700 flex items-center gap-2">
                                            <Twitter className="h-4 w-4 text-sky-500" />
                                            Twitter
                                        </Label>
                                        <Input
                                            value={formData.twitter}
                                            onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                                            disabled={!isEditing}
                                            placeholder="@username"
                                            className={!isEditing ? "bg-gray-50" : ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-700 flex items-center gap-2">
                                            <Github className="h-4 w-4 text-gray-700" />
                                            GitHub
                                        </Label>
                                        <Input
                                            value={formData.github}
                                            onChange={(e) => setFormData({...formData, github: e.target.value})}
                                            disabled={!isEditing}
                                            placeholder="github.com/username"
                                            className={!isEditing ? "bg-gray-50" : ""}
                                        />
                                    </div>
                                </div>
                            </div> */}

                            {/* Action Buttons */}
                            {isEditing && (
                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsEditing(false);
                                            reset();
                                        }}
                                        className="border-gray-300"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-[#E65F2B] hover:bg-[#C44A1F] gap-2"
                                    >
                                        <Save className="h-4 w-4" />
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slide-in {
                    from {
                        transform: translateY(-20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
            `}</style>
        </AppLayout>
    );
}