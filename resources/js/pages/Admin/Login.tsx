import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Lock, Mail, Shield } from 'lucide-react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.login.post'));
    };

    return (
        <>
            <Head title="Admin Login" />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom duration-700">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-4 shadow-2xl animate-in zoom-in duration-500">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
                        <p className="text-blue-200">Tow Truck Directory Management</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                        <form onSubmit={submit} className="space-y-6">
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
                                        className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900"
                                        placeholder="admin@example.com"
                                        required
                                        autoFocus
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 animate-in fade-in slide-in-from-top duration-300">
                                        {errors.email}
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
                                        className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900"
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

                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 transition-all duration-200"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-slate-600">
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {processing ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <a
                                href="/"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                            >
                                ← Back to Directory
                            </a>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-sm text-blue-200">
                        <p>Default credentials: admin@towtruck.com / password</p>
                    </div>
                </div>
            </div>
        </>
    );
}
