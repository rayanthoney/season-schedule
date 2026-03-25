import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Globe, Trophy, ExternalLink, Info, Plus, Sun, Cloud, CloudRain, Thermometer } from 'lucide-react';
import type { Tournament } from './data';
import { getGoogleCalendarLink, getICalData, parseTournamentDates } from './utils/calendar';
import { fetchWeather, type WeatherData } from './utils/weather';

interface TournamentModalProps {
    tournament: Tournament | null;
    isOpen: boolean;
    onClose: () => void;
}

const TournamentModal: React.FC<TournamentModalProps> = ({ tournament, isOpen, onClose }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loadingWeather, setLoadingWeather] = useState(false);

    useEffect(() => {
        if (isOpen && tournament) {
            setLoadingWeather(true);
            const { start } = parseTournamentDates(tournament.dates);
            fetchWeather(tournament.city, start).then(data => {
                setWeather(data);
                setLoadingWeather(false);
            });
        }
    }, [isOpen, tournament]);

    if (!tournament) return null;

    const handleDownloadICal = () => {
        const data = getICalData(tournament);
        const blob = new Blob([data], { type: 'text/calendar;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${tournament.name.replace(/\s+/g, '_')}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-slate-900 border border-white/10 shadow-2xl"
                    >
                        {/* Header / Banner */}
                        <div className="relative h-32 bg-linear-to-r from-cyfair-dark to-cyfair-blue/40">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.1),transparent)]" />
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white/60 hover:text-white hover:bg-black/40 transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Container */}
                        <div className="px-8 pb-10 -mt-12 relative">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyfair-cyan text-cyfair-dark text-[10px] font-black uppercase tracking-widest shadow-lg mb-6">
                                <Trophy className="w-3 h-3" />
                                Tournament Details
                            </div>

                            <h2 className="text-3xl font-black italic text-white uppercase tracking-tight mb-2">
                                {tournament.name}
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8 mt-8">
                                {/* Left Column: Info */}
                                <div className="space-y-6">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-cyfair-cyan shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Dates</p>
                                            <p className="text-white font-medium">{tournament.dates}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-cyfair-red shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Location</p>
                                            <p className="text-white font-medium">{tournament.location}</p>
                                        </div>
                                    </div>

                                    {tournament.note && (
                                        <div className="flex items-start gap-3">
                                            <Info className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Note</p>
                                                <p className="text-white/60 italic text-sm">{tournament.note}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column: Venues & Links */}
                                <div className="space-y-6">
                                    {tournament.venues && tournament.venues.length > 0 && (
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Maps & Venues</p>
                                            <div className="flex flex-col gap-2">
                                                {tournament.venues.map((venue, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={venue.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyfair-cyan/30 hover:bg-white/10 transition-all group"
                                                    >
                                                        <span className="text-sm text-white/80 font-medium">
                                                            {venue.label || (tournament.venues!.length > 1 ? `Venue ${idx + 1}` : "View in Maps")}
                                                        </span>
                                                        <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-cyfair-cyan transition-colors" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {!tournament.venues && (
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${tournament.name} ${tournament.location}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyfair-cyan/30 hover:bg-white/10 transition-all group"
                                        >
                                            <span className="text-sm text-white/80 font-medium">Search in Maps</span>
                                            <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-cyfair-cyan transition-colors" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Weather & Travel Outlook */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                                            <Thermometer className="w-3 h-3" />
                                            Weather Outlook
                                        </p>
                                        {loadingWeather ? (
                                            <div className="h-6 w-32 bg-white/5 animate-pulse rounded" />
                                        ) : weather ? (
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl font-black text-white">{weather.high}°</span>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Conditions</span>
                                                    <span className="text-xs font-bold text-cyfair-cyan uppercase tracking-wider">{weather.condition}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-white/40 italic">Forecast unavailable</span>
                                        )}
                                    </div>
                                    <div className="p-3 rounded-xl bg-white/5">
                                        {weather?.icon === 'sun' && <Sun className="w-8 h-8 text-yellow-500" />}
                                        {weather?.icon === 'cloud' && <Cloud className="w-8 h-8 text-white/40" />}
                                        {weather?.icon === 'cloud-rain' && <CloudRain className="w-8 h-8 text-cyfair-cyan" />}
                                        {!weather && <Sun className="w-8 h-8 text-white/10" />}
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                                    <p className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                                        <Info className="w-3 h-3" />
                                        Travel Advisory
                                    </p>
                                    <p className="text-xs text-white/60 leading-relaxed italic">
                                        {weather?.condition === 'Hot' ? 'Extreme heat expected. Ensure players stay hydrated.' :
                                            weather?.condition === 'Humid' ? 'High humidity expected. Bring extra recovery fluids.' :
                                                'Standard travel conditions expected for this region.'}
                                    </p>
                                </div>
                            </div>

                            {/* Calendar Section */}
                            <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3 ml-1 flex items-center gap-2">
                                    <Plus className="w-3 h-3" />
                                    Add to Calendar
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <a
                                        href={getGoogleCalendarLink(tournament)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-wider transition-all"
                                    >
                                        Google
                                    </a>
                                    <button
                                        onClick={handleDownloadICal}
                                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-wider transition-all"
                                    >
                                        Apple / Outlook (.ics)
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-white/5">
                                {tournament.bracketUrl && (
                                    <a
                                        href={tournament.bracketUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-cyfair-red text-white font-black uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg shadow-cyfair-red/20"
                                    >
                                        View Brackets
                                    </a>
                                )}
                                {tournament.websiteUrl && (
                                    <a
                                        href={tournament.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 text-white font-black uppercase tracking-widest hover:bg-white/20 transition-colors border border-white/10"
                                    >
                                        <Globe className="w-4 h-4" />
                                        Tournament Site
                                    </a>
                                )}
                                {!tournament.bracketUrl && !tournament.websiteUrl && (
                                    <div className="w-full text-center py-4 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                        <p className="text-xs font-bold uppercase tracking-widest text-white/20 italic">
                                            Brackets and full schedule will be available closer to event date
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TournamentModal;
