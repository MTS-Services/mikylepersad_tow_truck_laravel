import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { UserCog, LogOut, CheckCircle, Trash2, Clock, Circle, ArrowLeft, Search, ChevronLeft, ChevronRight, Filter, Plus, X, Edit2 } from 'lucide-react';

interface Driver {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    service_area_id: number | null;
    service_area: string;
    is_approved: boolean;
    is_online: boolean;
    approved_by: string | null;
    approved_at: string | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedDrivers {
    data: Driver[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

interface Props {
    drivers: PaginatedDrivers;
    serviceAreas: Record<number, string>;
    filters: {
        search: string;
        status: string;
    };
}

export default function Drivers({ drivers, serviceAreas, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

    const addForm = useForm({
        name: '',
        email: '',
        phone_number: '',
        service_area_id: '',
        password: '',
        is_approved: false,
    });

    const editForm = useForm({
        name: '',
        email: '',
        phone_number: '',
        service_area_id: '',
        password: '',
        is_approved: false,
    });

    const handleLogout = () => {
        router.post(route('admin.logout'));
    };

    const handleApprove = (driverId: number) => {
        if (confirm('Are you sure you want to approve this driver?')) {
            router.post(route('admin.drivers.approve', driverId));
        }
    };

    const handleDelete = (driverId: number) => {
        if (confirm('Are you sure you want to remove this driver? This action cannot be undone.')) {
            router.delete(route('admin.drivers.destroy', driverId));
        }
    };

    const handleSearch = () => {
        router.get(route('admin.drivers'), { search: searchTerm, status: statusFilter }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleStatusChange = (status: string) => {
        setStatusFilter(status);
        router.get(route('admin.drivers'), { search: searchTerm, status }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        router.get(route('admin.drivers'), {}, { preserveState: true });
    };

    const goToPage = (url: string | null) => {
        if (url) {
            router.visit(url, { preserveState: true, preserveScroll: true });
        }
    };

    const openAddModal = () => {
        addForm.reset();
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
        addForm.reset();
    };

    const handleAddDriver = (e: React.FormEvent) => {
        e.preventDefault();
        addForm.post(route('admin.drivers.store'), {
            onSuccess: () => closeAddModal(),
        });
    };

    const openEditModal = (driver: Driver) => {
        setEditingDriver(driver);
        editForm.setData({
            name: driver.name,
            email: driver.email,
            phone_number: driver.phone_number,
            service_area_id: driver.service_area_id?.toString() || '',
            password: '',
            is_approved: driver.is_approved,
        });
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditingDriver(null);
        editForm.reset();
    };

    const handleEditDriver = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingDriver) return;
        editForm.put(route('admin.drivers.update', editingDriver.id), {
            onSuccess: () => closeEditModal(),
        });
    };

    const pendingDrivers = drivers.data.filter(d => !d.is_approved);
    const approvedDrivers = drivers.data.filter(d => d.is_approved);

    return (
        <>
            <Head title="Driver Management" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
                <nav className="bg-white border-b border-slate-200 shadow-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                                    <UserCog className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-900">Driver Management</h1>
                                    <p className="text-sm text-slate-600">Tow Truck Directory</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={openAddModal}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Driver</span>
                                </button>
                                <a
                                    href={route('admin.dashboard')}
                                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className="font-medium">Dashboard</span>
                                </a>
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

                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    {/* Search and Filter Bar */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => handleStatusChange(e.target.value)}
                                        className="pl-9 pr-8 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                                    >
                                        <option value="">All Status</option>
                                        <option value="approved">Approved</option>
                                        <option value="pending">Pending</option>
                                        <option value="online">Online</option>
                                    </select>
                                </div>
                                <button
                                    onClick={handleSearch}
                                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                >
                                    Search
                                </button>
                                {(filters.search || filters.status) && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="mt-3 text-sm text-slate-600">
                            Showing {drivers.from || 0} to {drivers.to || 0} of {drivers.total} drivers
                        </div>
                    </div>

                    {pendingDrivers.length > 0 && (
                        <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-xl mb-6">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-6 h-6 text-amber-600" />
                                    <div>
                                        <h3 className="text-lg font-bold text-amber-900">Pending Approvals</h3>
                                        <p className="text-amber-700">{pendingDrivers.length} driver{pendingDrivers.length !== 1 ? 's' : ''} waiting for approval</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
                                <div className="p-6 border-b border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900">Pending Drivers</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Driver</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Contact</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Service Area</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Registered</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {pendingDrivers.map((driver) => (
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
                                                    <td className="px-6 py-4 text-sm text-slate-600">
                                                        {driver.created_at}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => handleApprove(driver.id)}
                                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                                            >
                                                                <CheckCircle className="w-4 h-4" />
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(driver.id)}
                                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 animate-in fade-in slide-in-from-bottom duration-700">
                        <div className="p-6 border-b border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900">Approved Drivers ({approvedDrivers.length})</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Driver</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Service Area</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Approved</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {approvedDrivers.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                                No approved drivers yet
                                            </td>
                                        </tr>
                                    ) : (
                                        approvedDrivers.map((driver) => (
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
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                        driver.is_online
                                                            ? 'bg-emerald-100 text-emerald-700'
                                                            : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                        <Circle className={`w-2 h-2 ${driver.is_online ? 'fill-emerald-500' : 'fill-slate-400'}`} />
                                                        {driver.is_online ? 'Online' : 'Offline'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-slate-600">{driver.approved_at}</div>
                                                    {driver.approved_by && (
                                                        <div className="text-xs text-slate-500">by {driver.approved_by}</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => openEditModal(driver)}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(driver.id)}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Remove
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {drivers.last_page > 1 && (
                            <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-slate-600 text-sm">
                                    Page {drivers.current_page} of {drivers.last_page}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => goToPage(drivers.links[0]?.url)}
                                        disabled={drivers.current_page === 1}
                                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    {drivers.links.slice(1, -1).map((link, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => goToPage(link.url)}
                                            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : 'border border-slate-200 hover:bg-slate-100 text-slate-700'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}

                                    <button
                                        onClick={() => goToPage(drivers.links[drivers.links.length - 1]?.url)}
                                        disabled={drivers.current_page === drivers.last_page}
                                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Driver Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={closeAddModal}></div>
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl">
                            <div className="flex items-center justify-between p-6 border-b border-slate-200">
                                <h3 className="text-xl font-bold text-slate-900">Add New Driver</h3>
                                <button onClick={closeAddModal} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                            <form onSubmit={handleAddDriver} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                                    <input
                                        type="text"
                                        value={addForm.data.name}
                                        onChange={e => addForm.setData('name', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                    {addForm.errors.name && <p className="mt-1 text-sm text-red-600">{addForm.errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                                    <input
                                        type="email"
                                        value={addForm.data.email}
                                        onChange={e => addForm.setData('email', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                    {addForm.errors.email && <p className="mt-1 text-sm text-red-600">{addForm.errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                                    <input
                                        type="text"
                                        value={addForm.data.phone_number}
                                        onChange={e => addForm.setData('phone_number', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                    {addForm.errors.phone_number && <p className="mt-1 text-sm text-red-600">{addForm.errors.phone_number}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Area *</label>
                                    <select
                                        value={addForm.data.service_area_id}
                                        onChange={e => addForm.setData('service_area_id', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select a service area</option>
                                        {Object.entries(serviceAreas).map(([id, name]) => (
                                            <option key={id} value={id}>{name}</option>
                                        ))}
                                    </select>
                                    {addForm.errors.service_area_id && <p className="mt-1 text-sm text-red-600">{addForm.errors.service_area_id}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Password *</label>
                                    <input
                                        type="password"
                                        value={addForm.data.password}
                                        onChange={e => addForm.setData('password', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                        minLength={8}
                                    />
                                    {addForm.errors.password && <p className="mt-1 text-sm text-red-600">{addForm.errors.password}</p>}
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_approved_add"
                                        checked={addForm.data.is_approved}
                                        onChange={e => addForm.setData('is_approved', e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="is_approved_add" className="text-sm font-medium text-slate-700">
                                        Approve immediately
                                    </label>
                                </div>
                                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                                    <button
                                        type="button"
                                        onClick={closeAddModal}
                                        className="px-4 py-2.5 text-slate-700 hover:bg-slate-100 font-medium rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={addForm.processing}
                                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {addForm.processing ? 'Adding...' : 'Add Driver'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Driver Modal */}
            {showEditModal && editingDriver && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={closeEditModal}></div>
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl">
                            <div className="flex items-center justify-between p-6 border-b border-slate-200">
                                <h3 className="text-xl font-bold text-slate-900">Edit Driver</h3>
                                <button onClick={closeEditModal} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                            <form onSubmit={handleEditDriver} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                                    <input
                                        type="text"
                                        value={editForm.data.name}
                                        onChange={e => editForm.setData('name', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                    {editForm.errors.name && <p className="mt-1 text-sm text-red-600">{editForm.errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                                    <input
                                        type="email"
                                        value={editForm.data.email}
                                        onChange={e => editForm.setData('email', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                    {editForm.errors.email && <p className="mt-1 text-sm text-red-600">{editForm.errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                                    <input
                                        type="text"
                                        value={editForm.data.phone_number}
                                        onChange={e => editForm.setData('phone_number', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                    {editForm.errors.phone_number && <p className="mt-1 text-sm text-red-600">{editForm.errors.phone_number}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Area *</label>
                                    <select
                                        value={editForm.data.service_area_id}
                                        onChange={e => editForm.setData('service_area_id', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select a service area</option>
                                        {Object.entries(serviceAreas).map(([id, name]) => (
                                            <option key={id} value={id}>{name}</option>
                                        ))}
                                    </select>
                                    {editForm.errors.service_area_id && <p className="mt-1 text-sm text-red-600">{editForm.errors.service_area_id}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Password (leave blank to keep current)</label>
                                    <input
                                        type="password"
                                        value={editForm.data.password}
                                        onChange={e => editForm.setData('password', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        minLength={8}
                                    />
                                    {editForm.errors.password && <p className="mt-1 text-sm text-red-600">{editForm.errors.password}</p>}
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_approved_edit"
                                        checked={editForm.data.is_approved}
                                        onChange={e => editForm.setData('is_approved', e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="is_approved_edit" className="text-sm font-medium text-slate-700">
                                        Approved
                                    </label>
                                </div>
                                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                                    <button
                                        type="button"
                                        onClick={closeEditModal}
                                        className="px-4 py-2.5 text-slate-700 hover:bg-slate-100 font-medium rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={editForm.processing}
                                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {editForm.processing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
