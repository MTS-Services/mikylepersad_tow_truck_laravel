import { Head, router, useForm, usePage } from '@inertiajs/react';
import { LayoutGrid, Mail, User, ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
    admin: {
        id: number;
        name: string;
        email: string;
    };
}

export default function AdminProfile({ admin }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string } };

    const form = useForm({
        name: admin.name,
        email: admin.email,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        form.put(route('admin.profile.update'));
    };

    return (
        <>
            <Head title="Admin Profile" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
                <nav className="bg-white border-b border-slate-200 shadow-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-900">Admin Profile</h1>
                                    <p className="text-sm text-slate-600">Update name or email</p>
                                </div>
                            </div>
                            <button
                                onClick={() => router.get(route('admin.dashboard'))}
                                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="container mx-auto px-4 py-12 max-w-3xl space-y-6">
                    {flash?.success && (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            {flash.success}
                        </div>
                    )}

                    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 space-y-6">
                        <div className="flex items-center gap-3 text-slate-500 text-sm uppercase tracking-[0.4em]">
                            <LayoutGrid className="w-4 h-4" />
                            <span>Profile settings</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="name">
                                    Full name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="name"
                                        type="text"
                                        value={form.data.name}
                                        onChange={(event) => form.setData('name', event.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        required
                                    />
                                </div>
                                {form.errors.name && (
                                    <p className="mt-1 text-xs text-red-600">{form.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
                                    Email address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={form.data.email}
                                        onChange={(event) => form.setData('email', event.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        required
                                    />
                                </div>
                                {form.errors.email && (
                                    <p className="mt-1 text-xs text-red-600">{form.errors.email}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={form.processing}
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 disabled:opacity-50"
                            >
                                Save changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
