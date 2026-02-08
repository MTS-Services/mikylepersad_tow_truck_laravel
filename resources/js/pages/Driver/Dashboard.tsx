import { Head, Link, router, useForm } from '@inertiajs/react';
import { Truck, LogOut, Circle, MapPin, Phone, Mail, Save } from 'lucide-react';
import FileUpload from '@/components/file-upload';
import InputError from '@/components/input-error';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import PasswordChangeModal from '@/components/PasswordChangeModal';



interface Driver {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    service_area_id: number;
    service_area: string;
    is_online: boolean;
    avatar?: string;
    avatar_url?: string;
}

interface ServiceArea {
    id: number;
    name: string;
}

interface Props {
    driver: Driver;
    serviceAreas: ServiceArea[];
}

export default function DriverDashboard({ driver, serviceAreas }: Props) {
    const [existingFiles, setExistingFiles] = useState<any[]>([]);
    const [isOnline, setIsOnline] = useState(driver.is_online);

    const { data, setData, post, processing, errors, reset } = useForm({
        phone_number: '',
        service_area_id: '',
        avatar: null as File | null,
        _method: 'PATCH',
    });

      useEffect(() => {
        if (driver) {
            setData({
                phone_number: driver.phone_number || '',
                service_area_id: driver.service_area_id || '',
                avatar: null,
                _method: 'PATCH',
            });

            // Update existing files whenever information changes
            if (driver.avatar_url) {
                setExistingFiles([{
                    id: driver.id,
                    url: `${driver.avatar_url}`,
                    name: driver.avatar?.replace(/^.*[\\\/]/, ''),
                    mime_type: 'image/*',
                    path: driver.avatar,
                }]);
            } else {
                setExistingFiles([]);
            }
        }
    }, [driver]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // @ts-ignore - Inertia will handle FormData correctly
        post(route('driver.update-profile'), {
            forceFormData: true,
            onSuccess: () => {

                setData('avatar', null);
                reset('avatar');
                setExistingFiles([]);
                toast.success('Profile updated successfully.');
            },
            onError: () => {
                toast.error('Failed to update profile.');
            }
        });
    };

     const handleRemoveExisting = () => {
        if (confirm('Are you sure you want to remove this file? You must upload a new file to save the changes.')) {
            setExistingFiles([]);
        }
    };

    const handleLogout = () => {
        router.post(route('driver.logout'));
    };

    const handleToggleOnline = () => {
        router.post(route('driver.toggle-online'), {}, {
            preserveScroll: true,
            onSuccess: () => {
                setIsOnline(!isOnline);
            },
        });
    };

    return (
        <>
            <Head title="Driver Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-slate-50">
                <nav className="bg-white border-b border-slate-200 shadow-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                    <Truck className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-900">Driver Dashboard</h1>
                                    <p className="text-sm text-slate-600">Welcome back, {driver.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <PasswordChangeModal auth_type='driver' />
                                <Link
                                    href="/"
                                    className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 font-medium"
                                >
                                    View Directory
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-8 border border-slate-200 animate-in fade-in slide-in-from-top duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Online Status</h2>
                                    <p className="text-slate-600">Toggle your availability to receive customer requests</p>
                                </div>
                                <button
                                    onClick={handleToggleOnline}
                                    className={`relative inline-flex h-14 w-28 items-center rounded-full transition-all duration-300 shadow-lg ${
                                        isOnline
                                            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                                            : 'bg-slate-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-10 w-10 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                                            isOnline ? 'translate-x-16' : 'translate-x-2'
                                        }`}
                                    >
                                        <Circle className={`w-10 h-10 p-2 ${isOnline ? 'text-green-600' : 'text-slate-400'}`} />
                                    </span>
                                </button>
                            </div>

                            <div className={`flex items-center gap-3 p-4 rounded-xl ${
                                isOnline
                                    ? 'bg-green-50 border-2 border-green-200'
                                    : 'bg-slate-50 border-2 border-slate-200'
                            }`}>
                                <Circle className={`w-4 h-4 ${isOnline ? 'fill-green-500 text-green-500' : 'fill-slate-400 text-slate-400'}`} />
                                <div>
                                    <p className={`font-semibold ${isOnline ? 'text-green-900' : 'text-slate-700'}`}>
                                        {isOnline ? 'You are currently ONLINE' : 'You are currently OFFLINE'}
                                    </p>
                                    <p className={`text-sm ${isOnline ? 'text-green-700' : 'text-slate-600'}`}>
                                        {isOnline
                                            ? 'Customers can see you in the directory and contact you'
                                            : 'You are not visible to customers in the directory'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 animate-in fade-in slide-in-from-bottom duration-700">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile Information</h2>
                            <p className="text-slate-600">Update your contact details and service area</p>
                        </div>


                        <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-medium">Email Address</p>
                                    <p className="text-lg font-semibold text-slate-900">{driver.email}</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500">Email cannot be changed. Contact admin if you need to update it.</p>
                        </div>




                        <form onSubmit={submit} className="space-y-6">
                            <div className='w-1/2 mx-auto'>
                                <FileUpload
                                    value={data.avatar}
                                    onChange={(file) => setData('avatar', file as File | null)}
                                    existingFiles={existingFiles}
                                    onRemoveExisting={handleRemoveExisting}
                                    accept="video/*,image/*"
                                    maxSize={500}
                                />
                                <InputError message={errors.avatar} />
                            </div>
                            <div>
                                <label htmlFor="phone_number" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="phone_number"
                                        type="tel"
                                        value={data.phone_number}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900"
                                        placeholder="1868-XXX-XXXX"
                                        required
                                    />
                                </div>
                                {errors.phone_number && (
                                    <p className="mt-2 text-sm text-red-600 animate-in fade-in slide-in-from-top duration-300">
                                        {errors.phone_number}
                                    </p>
                                )}
                                <p className="mt-2 text-sm text-slate-500">This number will be displayed to customers</p>
                            </div>

                            <div>
                                <label htmlFor="service_area_id" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Service Area
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <select
                                        id="service_area_id"
                                        value={data.service_area_id}
                                        onChange={(e) => setData('service_area_id', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 appearance-none bg-white"
                                        required
                                    >
                                        {serviceAreas.map((area) => (
                                            <option key={area.id} value={area.id}>
                                                {area.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.service_area_id && (
                                    <p className="mt-2 text-sm text-red-600 animate-in fade-in slide-in-from-top duration-300">
                                        {errors.service_area_id}
                                    </p>
                                )}
                                <p className="mt-2 text-sm text-slate-500">Select the primary area where you provide services</p>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? 'Saving Changes...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 animate-in fade-in duration-700 delay-300">
                        <h3 className="text-lg font-bold text-blue-900 mb-2">💡 Tips for Success</h3>
                        <ul className="space-y-2 text-sm text-blue-800">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>Keep your phone number updated so customers can reach you easily</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>Toggle your status to Online when you're available to take requests</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>Online drivers appear first in the public directory</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>Make sure your service area is accurate for better customer matching</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
