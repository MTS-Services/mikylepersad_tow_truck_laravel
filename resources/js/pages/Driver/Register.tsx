import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Lock, Mail, Truck, User, Phone, MapPin } from 'lucide-react';

interface ServiceArea {
    id: number;
    name: string;
}

interface Props {
    serviceAreas: ServiceArea[];
}

export default function DriverRegister({ serviceAreas }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        service_area_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('driver.register.post'));
    };

    return (
        <>
            <Head title="Driver Registration" />
            
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-slate-50 flex items-center justify-center p-4 py-12">
                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom duration-700">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl mb-4 shadow-2xl animate-in zoom-in duration-500">
                            <Truck className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-2">Join Our Network</h1>
                        <p className="text-slate-600">Register as a tow truck driver</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900"
                                        placeholder="John Doe"
                                        required
                                        autoFocus
                                    />
                                </div>
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600 animate-in fade-in slide-in-from-top duration-300">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900"
                                        placeholder="driver@example.com"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 animate-in fade-in slide-in-from-top duration-300">
                                        {errors.email}
                                    </p>
                                )}
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
                                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900"
                                        placeholder="1868-XXX-XXXX"
                                        required
                                    />
                                </div>
                                {errors.phone_number && (
                                    <p className="mt-2 text-sm text-red-600 animate-in fade-in slide-in-from-top duration-300">
                                        {errors.phone_number}
                                    </p>
                                )}
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
                                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 appearance-none bg-white"
                                        required
                                    >
                                        <option value="">Select your service area</option>
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
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600 animate-in fade-in slide-in-from-top duration-300">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {processing ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="mt-6 text-center space-y-3">
                            <div className="text-sm text-slate-600">
                                Already have an account?{' '}
                                <a
                                    href={route('driver.login')}
                                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                                >
                                    Sign in here
                                </a>
                            </div>
                            <a
                                href="/"
                                className="block text-sm text-slate-500 hover:text-slate-700 transition-colors duration-200"
                            >
                                ← Back to Directory
                            </a>
                        </div>
                    </div>

                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-center text-sm text-blue-800">
                        <p className="font-semibold mb-1">📋 Note</p>
                        <p>Your account will be reviewed by an admin before you can start receiving requests.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
