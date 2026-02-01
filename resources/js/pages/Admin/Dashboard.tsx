import { Head, router } from '@inertiajs/react';
import { Users, CheckCircle, Clock, Wifi, LogOut, UserCog } from 'lucide-react';

interface Stats {
    total_drivers: number;
    approved_drivers: number;
    pending_drivers: number;
    online_drivers: number;
}

interface Driver {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    service_area: string;
    is_approved: boolean;
    is_online: boolean;
    created_at: string;
}

interface Props {
    stats: Stats;
    recentDrivers: Driver[];
}

export default function AdminDashboard({ stats, recentDrivers }: Props) {
    const handleLogout = () => {
        router.post(route('admin.logout'));
    };

    return (
        <>
            <Head title="Admin Dashboard" />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
                <nav className="bg-white border-b border-slate-200 shadow-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                                    <UserCog className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
                                    <p className="text-sm text-slate-600">Tow Truck Directory</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 animate-in fade-in slide-in-from-left duration-500">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.total_drivers}</h3>
                            <p className="text-slate-600 text-sm font-medium">Total Drivers</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 animate-in fade-in slide-in-from-left duration-500 delay-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.approved_drivers}</h3>
                            <p className="text-slate-600 text-sm font-medium">Approved Drivers</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 animate-in fade-in slide-in-from-left duration-500 delay-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-amber-600" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.pending_drivers}</h3>
                            <p className="text-slate-600 text-sm font-medium">Pending Approval</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 animate-in fade-in slide-in-from-left duration-500 delay-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                    <Wifi className="w-6 h-6 text-emerald-600" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.online_drivers}</h3>
                            <p className="text-slate-600 text-sm font-medium">Online Now</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 animate-in fade-in slide-in-from-bottom duration-700">
                        <div className="p-6 border-b border-slate-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-900">Recent Drivers</h2>
                                <a
                                    href={route('admin.drivers.index')}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 text-sm"
                                >
                                    View All Drivers
                                </a>
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Driver</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Service Area</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Registered</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {recentDrivers.map((driver) => (
                                        <tr key={driver.id} className="hover:bg-slate-50 transition-colors duration-150">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900">{driver.name}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-slate-600">{driver.email}</div>
                                                <div className="text-sm text-slate-500">{driver.phone_number}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-700">{driver.service_area}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold w-fit ${
                                                        driver.is_approved 
                                                            ? 'bg-green-100 text-green-700' 
                                                            : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                        {driver.is_approved ? 'Approved' : 'Pending'}
                                                    </span>
                                                    {driver.is_approved && (
                                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold w-fit ${
                                                            driver.is_online 
                                                                ? 'bg-emerald-100 text-emerald-700' 
                                                                : 'bg-slate-100 text-slate-600'
                                                        }`}>
                                                            {driver.is_online ? 'Online' : 'Offline'}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {driver.created_at}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
