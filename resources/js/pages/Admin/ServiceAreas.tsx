import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Search, ChevronLeft, ChevronRight, Edit2, Trash2 } from 'lucide-react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface ServiceAreaItem {
    id: number;
    name: string;
    is_active: boolean;
    created_at_formatted: string;
}

interface PaginatedServiceAreas {
    data: ServiceAreaItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

interface Props {
    serviceAreas: PaginatedServiceAreas;
    filters: {
        search: string;
    };
}

export default function ServiceAreas({ serviceAreas, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [editingArea, setEditingArea] = useState<ServiceAreaItem | null>(null);

    const addForm = useForm({
        name: '',
        is_active: true,
    });

    const editForm = useForm({
        name: '',
        is_active: true,
    });

    const handleSearch = () => {
        router.get(route('admin.service-areas.index'), { search: searchTerm }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        router.get(route('admin.service-areas.index'), {}, { preserveState: true });
    };

    const handleAddSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addForm.post(route('admin.service-areas.store'), {
            onSuccess: () => addForm.reset('name', 'is_active'),
        });
    };

    const openEdit = (area: ServiceAreaItem) => {
        setEditingArea(area);
        editForm.setData({
            name: area.name,
            is_active: area.is_active,
        });
    };

    const closeEdit = () => {
        setEditingArea(null);
        editForm.reset();
    };

    const handleEditSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!editingArea) return;
        editForm.put(route('admin.service-areas.update', editingArea.id), {
            onSuccess: () => closeEdit(),
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Remove this service area?')) {
            router.delete(route('admin.service-areas.destroy', id));
        }
    };

    const goToPage = (url: string | null) => {
        if (url) {
            router.visit(url, { preserveState: true, preserveScroll: true });
        }
    };

    return (
        <>
            <Head title="Service Area Management" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
                <nav className="bg-white border-b border-slate-200 shadow-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                                    <Plus className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-900">Service Area Management</h1>
                                    <p className="text-sm text-slate-600">Tow Truck Directory</p>
                                </div>
                            </div>
                            <Link
                                href={route('admin.dashboard')}
                                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span className="font-medium">Back to Dashboard</span>
                            </Link>
                        </div>
                    </div>
                </nav>

                <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    placeholder="Search areas"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Search
                            </button>
                            {(filters.search || searchTerm) && (
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <form className="rounded-2xl border border-slate-200 p-5" onSubmit={handleAddSubmit}>
                                <h3 className="text-lg font-semibold text-slate-900 mb-3">Add Area</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={addForm.data.name}
                                            onChange={(e) => addForm.setData('name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                            checked={addForm.data.is_active}
                                            onChange={(e) => addForm.setData('is_active', e.target.checked)}
                                        />
                                        <label htmlFor="is_active" className="text-sm text-slate-700">Active</label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors"
                                    >
                                        Add Area
                                    </button>
                                </div>
                            </form>
                            <form className="rounded-2xl border border-slate-200 p-5" onSubmit={handleEditSubmit}>
                                <h3 className="text-lg font-semibold text-slate-900 mb-3">{editingArea ? 'Edit Area' : 'Select area to edit'}</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={editForm.data.name}
                                            onChange={(e) => editForm.setData('name', e.target.value)}
                                            disabled={!editingArea}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="edit_is_active"
                                            className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                            checked={editForm.data.is_active}
                                            onChange={(e) => editForm.setData('is_active', e.target.checked)}
                                            disabled={!editingArea}
                                        />
                                        <label htmlFor="edit_is_active" className="text-sm text-slate-700">Active</label>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={!editingArea}
                                            className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeEdit}
                                            className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
                        <div className="p-6 border-b border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900">All Service Areas</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Active</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Added</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {serviceAreas.data.map(area => (
                                        <tr key={area.id} className="hover:bg-slate-50 transition-colors duration-150">
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-900">{area.name}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {area.is_active ? 'Active' : 'Inactive'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{area.created_at_formatted}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => openEdit(area)}
                                                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all duration-200"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(area.id)}
                                                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-200"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {serviceAreas.last_page > 1 && (
                            <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                                <span className="text-sm text-slate-600">Showing {serviceAreas.from} to {serviceAreas.to} of {serviceAreas.total}</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => goToPage(serviceAreas.links[0]?.url)}
                                        disabled={serviceAreas.current_page === 1}
                                        className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-50"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    {serviceAreas.links.slice(1, -1).map((link, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => goToPage(link.url)}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium ${link.active ? 'bg-blue-600 text-white' : 'border border-slate-200 text-slate-600'}`}
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => goToPage(serviceAreas.links[serviceAreas.links.length - 1]?.url)}
                                        disabled={serviceAreas.current_page === serviceAreas.last_page}
                                        className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-50"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
