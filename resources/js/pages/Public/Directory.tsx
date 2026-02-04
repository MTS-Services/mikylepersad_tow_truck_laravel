import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import {
    MessageCircle,
    Phone,
    MapPin,
    Circle,
    Truck,
    Shield,
    Clock,
    Star,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Search,
    Users,
    Zap,
    Heart,
    Facebook,
    Instagram,
    Mail,
    PhoneCall,
    Menu,
    X,
    UserPlus,
    LogIn,
    UserCog
} from 'lucide-react';
import { SharedData } from '@/types';

interface Driver {
    id: number;
    name: string;
    phone_number: string;
    service_area: string;
    is_online: boolean;
    avatar?: string;
    avatar_url?: string;
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
    serviceAreas: string[];
    stats: {
        total_drivers: number;
        online_drivers: number;
        total_areas: number;
    };
    filters: {
        search: string;
        area: string;
    };
}

export default function Directory({ drivers, serviceAreas, stats, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedArea, setSelectedArea] = useState(filters.area || 'all');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { auth } = usePage<SharedData>().props;

    const formatPhoneForWhatsApp = (phone: string) => {
        return phone.replace(/\D/g, '');
    };

    const handleSearch = useCallback(() => {
        router.get('/', { search: searchTerm, area: selectedArea }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [searchTerm, selectedArea]);

    const handleAreaChange = (area: string) => {
        setSelectedArea(area);
        router.get('/', { search: searchTerm, area }, {
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
        setSelectedArea('all');
        router.get('/', {}, { preserveState: true });
    };

    const goToPage = (url: string | null) => {
        if (url) {
            router.visit(url, { preserveState: true, preserveScroll: true });
        }
    };

    return (
        <>
            <Head title="Tow Truck Directory - Trinidad & Tobago | 24/7 Emergency Towing Services" />

            <div className="min-h-screen bg-gradient-to-b from-[#031b24] via-[#042c37] to-[#0b4f5d]">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-gradient-to-r from-[#063547]/95 to-[#0f7c8c]/80 backdrop-blur-md border-b border-teal-800 shadow-lg">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-16 md:h-20">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-3 group text-white">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                    <Truck className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-lg md:text-xl font-bold leading-tight">Oncall<span className="text-teal-300">TT</span></h1>
                                    <p className="text-xs text-white/80 -mt-0.5">Trinidad & Tobago</p>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-8">
                                <Link href="#drivers" className="text-white hover:text-teal-200 font-medium transition-colors duration-200">Find Drivers</Link>
                                <Link href="#how-it-works" className="text-white hover:text-teal-200 font-medium transition-colors duration-200">How It Works</Link>
                                <Link href="#contact" className="text-white hover:text-teal-200 font-medium transition-colors duration-200">Contact</Link>
                            </nav>

                            {/* Auth Buttons */}
                            <div className="hidden md:flex items-center gap-3">
                               { auth.driver ? (
                                <>
                                <Link
                                    href="/driver/dashboard"
                                    className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white font-medium transition-colors duration-200"
                                >
                                    <UserCog className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                </>
                               ):(
                                <>
                                 <Link
                                    href="/driver/login"
                                    className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white font-medium transition-colors duration-200"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Driver Login
                                </Link>
                                <Link
                                    href="/driver/register"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Join as Driver
                                </Link>
                                </>
                               )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>

                        {/* Mobile Menu */}
                        {mobileMenuOpen && (
                            <div className="md:hidden py-4 border-t border-teal-600 animate-in fade-in slide-in-from-top duration-300">
                                <nav className="flex flex-col gap-2">
                                    <Link href="#drivers" className="px-4 py-2 text-slate-100 hover:text-teal-200 hover:bg-teal-700/40 rounded-lg font-medium transition-all">Find Drivers</Link>
                                    <Link href="#how-it-works" className="px-4 py-2 text-slate-100 hover:text-teal-200 hover:bg-teal-700/40 rounded-lg font-medium transition-all">How It Works</Link>
                                    <Link href="#contact" className="px-4 py-2 text-slate-100 hover:text-teal-200 hover:bg-teal-700/40 rounded-lg font-medium transition-all">Contact</Link>
                                    <hr className="my-2 border-slate-200" />
                                    <Link href="/driver/login" className="px-4 py-2 text-slate-100 hover:bg-slate-800 rounded-lg font-medium transition-all">Driver Login</Link>
                                    <Link href="/driver/register" className="mx-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center font-semibold rounded-xl shadow-lg">Join as Driver</Link>
                                </nav>
                            </div>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    {/* Gradient Background with Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0b3f4f] via-[#0f6f91] to-[#0ac9c9]"></div>

                    {/* Animated Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-orange-400/15 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    </div>

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>

                    {/* Truck Icon Pattern */}
                    <div className="absolute inset-0 opacity-[0.02]">
                        <div className="absolute top-10 left-[10%] transform rotate-12">
                            <Truck className="w-24 h-24 text-white" />
                        </div>
                        <div className="absolute top-1/4 right-[15%] transform -rotate-12">
                            <Truck className="w-20 h-20 text-white" />
                        </div>
                        <div className="absolute bottom-1/4 left-[20%] transform rotate-6">
                            <Truck className="w-16 h-16 text-white" />
                        </div>
                        <div className="absolute bottom-20 right-[25%] transform -rotate-6">
                            <Truck className="w-28 h-28 text-white" />
                        </div>
                    </div>

                    <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/30 rounded-full text-white text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom duration-500">
                                <Zap className="w-4 h-4" />
                                <span>24/7 Emergency Towing Services</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom duration-700">
                                Find Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">Tow Truck</span> Services in Trinidad
                            </h1>

                            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-100">
                                Connect with verified tow truck drivers instantly. Fast, reliable, and available when you need them most.
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-white">{stats.total_drivers}</div>
                                    <div className="text-teal-200 text-sm">Registered Drivers</div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 text-3xl md:text-4xl font-bold text-cyan-300">
                                        <Circle className="w-3 h-3 fill-green-400" />
                                        {stats.online_drivers}
                                    </div>
                                    <div className="text-teal-200 text-sm">Online Now</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-white">{stats.total_areas}</div>
                                    <div className="text-teal-200 text-sm">Service Areas</div>
                                </div>
                            </div>

                            {/* Search/Filter Box */}
                            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 max-w-3xl mx-auto animate-in fade-in zoom-in duration-700 delay-300 border border-white/40">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search by name or phone..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            className="w-full pl-12 pr-4 py-3.5 border border-white/40 rounded-xl focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-200 text-slate-900 bg-white/60"
                                        />
                                    </div>
                                    <div className="relative md:w-48">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <select
                                            value={selectedArea}
                                            onChange={(e) => handleAreaChange(e.target.value)}
                                            className="w-full pl-12 pr-10 py-3.5 border border-white/40 rounded-xl focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-200 text-slate-900 appearance-none bg-white/60 cursor-pointer"
                                        >
                                            <option value="all">All Areas</option>
                                            {serviceAreas.map(area => (
                                                <option key={area} value={area}>{area}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        className="px-6 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Wave Divider */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff"/>
                        </svg>
                    </div>
                </section>

                {/* Drivers Section - Directly below hero */}
                <section id="drivers" className="py-12 md:py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Available Tow Truck Drivers</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                <span className="inline-flex items-center gap-2">
                                    <Circle className="w-3 h-3 fill-green-500 text-green-500" />
                                    Online drivers appear first and are ready to assist you now
                                </span>
                            </p>
                        </div>

                        {drivers.data.length === 0 ? (
                            <div className="text-center py-16 animate-in fade-in duration-500">
                                <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                                    <Truck className="w-12 h-12 text-slate-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">No Drivers Found</h3>
                                <p className="text-slate-600 mb-6">
                                    {filters.search || filters.area !== 'all'
                                        ? 'Try adjusting your search or filter criteria'
                                        : 'No drivers are currently available. Please check back later.'}
                                </p>
                                {(filters.search || filters.area !== 'all') && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                    {drivers.data.map((driver: Driver, index: number) => (
                                        <div
                                            key={driver.id}
                                            className="group bg-slate-100/70 dark:bg-slate-900/60 rounded-2xl shadow-2xl hover:shadow-[0_25px_45px_rgba(0,0,0,0.25)] transition-all duration-500 overflow-hidden border border-white/30 hover:border-teal-300 animate-in fade-in slide-in-from-bottom"
                                            style={{ animationDelay: `${index * 75}ms` }}
                                        >
                                            {/* Card Header with Gradient */}
                                            <div className={`relative h-24 ${driver.is_online
                                                ? 'bg-gradient-to-r from-[#1ac6b7] via-[#04a0d0] to-[#096c93]'
                                                : 'bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800'}`}>
                                                <div className="absolute inset-0 bg-black/10"></div>
                                                <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                                                    driver.is_online
                                                        ? 'bg-white text-teal-600'
                                                        : 'bg-white/90 text-slate-500'
                                                }`}>
                                                    <span className={`w-2 h-2 rounded-full ${driver.is_online ? 'bg-teal-400 animate-pulse' : 'bg-slate-400'}`}></span>
                                                    {driver.is_online ? 'ONLINE' : 'OFFLINE'}
                                                </div>
                                                <div className="absolute -bottom-10 left-6">
                                                    <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white group-hover:scale-105 transition-transform duration-300">
                                                        <div className={`w-full h-full rounded-xl flex items-center justify-center text-2xl font-bold text-white ${
                                                            driver.is_online
                                                                ? 'bg-gradient-to-br from-teal-500 to-cyan-500'
                                                                : 'bg-gradient-to-br from-slate-500 to-slate-600'
                                                        }`}>
                                                            <img className="rounded-xl" src={driver.avatar_url} alt={driver.name} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-14 pb-6 px-6">
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-teal-400 transition-colors">
                                                    {driver.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-300 mb-4">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{driver.service_area}</span>
                                                </div>

                                                <div className="flex items-center gap-6 mb-6 text-xs text-slate-500 dark:text-slate-300">
                                                    <div className="flex items-center gap-1">
                                                        <Shield className="w-3.5 h-3.5 text-teal-400" />
                                                        <span>Verified</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                                                        <span>24/7</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-3.5 h-3.5 text-amber-400" />
                                                        <span>Professional</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <Link
                                                        href={`https://wa.me/${formatPhoneForWhatsApp(driver.phone_number)}?text=Hi, I need towing assistance. Are you available?`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#1ac6b7] to-[#0b5d8d] hover:from-[#13a29c] hover:to-[#0c4b73] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 group/btn"
                                                    >
                                                        <MessageCircle className="w-5 h-5 group-hover/btn:animate-bounce" />
                                                        <span>WhatsApp Now</span>
                                                    </Link>

                                                    <Link
                                                        href={`tel:${driver.phone_number}`}
                                                        className="flex items-center justify-center gap-3 w-full bg-white/70 hover:bg-white/90 text-slate-900 font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-inner"
                                                    >
                                                        <Phone className="w-5 h-5" />
                                                        <span>{driver.phone_number}</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {drivers.last_page > 1 && (
                                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <p className="text-slate-600 text-sm">
                                            Showing {drivers.from} to {drivers.to} of {drivers.total} drivers
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
                                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                        link.active
                                                            ? 'bg-orange-500 text-white'
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
                            </>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-[#01212b] via-[#053b4f] to-[#0c6b78] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/40 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500/30 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/30 rounded-full text-teal-200 text-sm font-medium mb-6">
                                <Truck className="w-4 h-4" />
                                <span>Join Our Network</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                                Are You a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">Tow Truck Driver?</span>
                            </h2>

                            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                                Join Trinidad's largest tow truck directory. Get connected with customers who need your services. Registration is free and takes less than 2 minutes.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/driver/register"
                                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                                >
                                    <UserPlus className="w-5 h-5" />
                                    Register Now - It's Free
                                </Link>
                                <Link
                                    href="/driver/login"
                                    className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300"
                                >
                                    <LogIn className="w-5 h-5" />
                                    Driver Login
                                </Link>
                            </div>

                            {/* Benefits */}
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Get More Customers</h4>
                                        <p className="text-slate-400 text-sm">Connect with people who need towing services in your area</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center shrink-0">
                                        <Zap className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Instant Contact</h4>
                                        <p className="text-slate-400 text-sm">Customers can reach you directly via WhatsApp or phone</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="w-10 h-10 bg-sky-500/20 rounded-lg flex items-center justify-center shrink-0">
                                        <Heart className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">100% Free</h4>
                                        <p className="text-slate-400 text-sm">No subscription fees, no hidden charges. Completely free!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer id="contact" className="bg-slate-900 text-white">
                    <div className="container mx-auto px-4 py-12 md:py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            {/* Brand */}
                            <div className="lg:col-span-1">
                                <div className="flex items-center gap-3 mb-4">
                                   <Link href="/" className="flex items-center gap-3 group text-white">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                            <Truck className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                        </div>
                                        <div className="hidden sm:block">
                                            <h1 className="text-lg md:text-xl font-bold leading-tight">Oncall<span className="text-teal-300">TT</span></h1>
                                            <p className="text-xs text-white/80 -mt-0.5">Trinidad & Tobago</p>
                                        </div>
                                    </Link>

                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    The #1 tow truck directory in Trinidad & Tobago. Connecting drivers with customers since 2024.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                                <ul className="space-y-2">
                                    <li><Link href="#drivers" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">Find Drivers</Link></li>
                                    <li><Link href="#how-it-works" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">How It Works</Link></li>
                                    <li><Link href="/driver/register" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">Register as Driver</Link></li>
                                    <li><Link href="/driver/login" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">Driver Login</Link></li>
                                </ul>
                            </div>

                            {/* Service Areas */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li>Port of Spain</li>
                                    <li>San Fernando</li>
                                    <li>Chaguanas</li>
                                    <li>Arima</li>
                                    <li>And more...</li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-slate-400 text-sm">
                                        <Mail className="w-5 h-5 text-orange-400" />
                                        <Link href="mailto:info@towtrucktt.com" className="hover:text-orange-400 transition-colors">info@towtrucktt.com</Link>
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-400 text-sm">
                                        <PhoneCall className="w-5 h-5 text-orange-400" />
                                        <Link href="tel:+18681234567" className="hover:text-orange-400 transition-colors">+1 (868) 123-4567</Link>
                                    </li>
                                </ul>

                                {/* Social */}
                                <div className="flex items-center gap-3 mt-6">
                                    <Link href="#" className="w-10 h-10 bg-slate-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-all duration-300">
                                        <Facebook className="w-5 h-5" />
                                    </Link>
                                    <Link href="#" className="w-10 h-10 bg-slate-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-all duration-300">
                                        <Instagram className="w-5 h-5" />
                                    </Link>
                                    <Link href="#" className="w-10 h-10 bg-slate-800 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all duration-300">
                                        <MessageCircle className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="mt-12 pt-8 border-t border-slate-800">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <p className="text-slate-500 text-sm">
                                    © {new Date().getFullYear()} TowTruckTT. All rights reserved. Design & Developed By <Link className='text-blue-500' href="https://maktechsolution.com/">MakTech Solutions</Link>
                                </p>
                                {auth.admin ?(
                                    <>
                                    <div className="flex items-center gap-6 text-sm">
                                    <Link href="/admin/dashboard" className="text-slate-500 hover:text-slate-400 transition-colors">Admin Dashboard</Link>
                                </div>
                                    </>
                                ):(
                                    <>
                                    <div className="flex items-center gap-6 text-sm">
                                    <Link href="/admin/login" className="text-slate-500 hover:text-slate-400 transition-colors">Admin Login</Link>
                                </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
