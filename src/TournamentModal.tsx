import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, ExternalLink, Info, Sun, CloudRain } from 'lucide-react';
import type { Tournament } from './data';
import { getGoogleCalendarLink, getICalData, parseTournamentDates } from './utils/calendar';
import { fetchWeather, type WeatherData } from './utils/weather';

interface TournamentModalProps {
    tournament: Tournament | null;
    isOpen: boolean;
    onClose: () => void;
}

const TournamentModalContent: React.FC<{ tournament: Tournament, onClose: () => void }> = ({ tournament, onClose }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);

    // Derived loading state avoids synchronous setState in effects
    const loadingWeather = !weather;

    useEffect(() => {
        let active = true;
        const { start } = parseTournamentDates(tournament.dates);

        fetchWeather(tournament.city, start).then(data => {
            if (active) {
                setWeather(data);
            }
        });

        return () => { active = false; };
    }, [tournament]);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop: v3 Glass */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-v3-surface-lowest/90 backdrop-blur-3xl"
            />

            {/* Modal Content: Monolith Structure */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                className="relative w-full max-w-3xl overflow-hidden rounded-sm bg-v3-surface-low border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
                {/* Header Banner: Kinetic Gradient */}
                <div className="relative h-48 bg-v3-surface-highest overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-v3-blue/40 to-v3-surface-lowest" />
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_30%,rgba(189,195,247,0.3),transparent_70%)]" />

                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="v3-badge bg-v3-blue text-v3-cyan border border-v3-cyan/30">
                                TOURNAMENT DETAILS
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-[.3em] text-white/40">Region: {tournament.location.split(',')[1]?.trim().toUpperCase() || 'NM'}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter font-display leading-none">
                            {tournament.name}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-3 rounded-sm bg-white/5 text-white/40 hover:text-white hover:bg-v3-red transition-all border border-white/10 z-20 group"
                    >
                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                {/* Content Grid */}
                <div className="p-8 md:p-12 space-y-12 h-[60vh] overflow-y-auto custom-scrollbar">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Left Column: Telemetry */}
                        <div className="space-y-8">
                            <div className="bg-v3-surface-lowest p-6 border-l-2 border-v3-red">
                                <div className="flex items-center gap-4 mb-4">
                                    <Calendar className="w-4 h-4 text-v3-red" />
                                    <p className="text-[10px] font-bold uppercase tracking-[.4em] text-white/30 leading-none">TOURNAMENT DATES</p>
                                </div>
                                <p className="text-lg font-bold text-white uppercase tracking-wider font-display">{tournament.dates}</p>
                            </div>

                            <div className="bg-v3-surface-lowest p-6 border-l-2 border-v3-cyan">
                                <div className="flex items-center gap-4 mb-4">
                                    <MapPin className="w-4 h-4 text-v3-cyan" />
                                    <p className="text-[10px] font-bold uppercase tracking-[.4em] text-white/30 leading-none">EVENT LOCATION</p>
                                </div>
                                <p className="text-lg font-bold text-white uppercase tracking-wider font-display">{tournament.location}</p>
                            </div>

                            {tournament.note && (
                                <div className="bg-v3-surface-highest/20 p-6 italic shadow-inner">
                                    <div className="flex items-center gap-4 mb-3">
                                        <Info className="w-4 h-4 text-white/20" />
                                        <p className="text-[10px] font-bold uppercase tracking-[.4em] text-white/20 leading-none">TOURNAMENT NOTES</p>
                                    </div>
                                    <p className="text-sm text-white/50 leading-relaxed">{tournament.note}</p>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Logistics & Environmental */}
                        <div className="space-y-8">
                            {/* Weather Data */}
                            <div className="p-6 bg-v3-surface-highest/40 flex items-center justify-between group">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold uppercase tracking-[.4em] text-white/30 flex items-center gap-3">
                                        <Sun className="w-3 h-3 text-v3-red" />
                                        WEATHER FORECAST
                                    </p>
                                    {loadingWeather ? (
                                        <div className="h-8 w-32 bg-white/5 animate-pulse rounded-sm" />
                                    ) : weather ? (
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl font-black text-white font-display tracking-tight">{weather.high}°</span>
                                            <span className="text-xs font-bold text-v3-cyan uppercase tracking-[.2em]">{weather.condition}</span>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-white/20 italic tracking-widest uppercase">LOADING...</span>
                                    )}
                                </div>
                                <div className="p-4 bg-v3-surface-lowest group-hover:bg-v3-red transition-colors shadow-inner">
                                    {weather?.icon === 'cloud-rain' ? <CloudRain className="w-8 h-8 text-white" /> : <Sun className="w-8 h-8 text-white" />}
                                </div>
                            </div>

                            {/* Venue Telemetry */}
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold uppercase tracking-[.4em] text-white/30 leading-none ml-1">VENUE LOCATIONS</p>
                                <div className="space-y-2">
                                    {tournament.venues && tournament.venues.length > 0 ? (
                                        tournament.venues.map((venue, idx) => (
                                            <a
                                                key={idx}
                                                href={venue.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-4 bg-v3-surface-lowest hover:bg-white/5 border border-white/5 transition-all group"
                                            >
                                                <span className="text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-v3-cyan">
                                                    {venue.label || `SITE-V${idx + 1}`}
                                                </span>
                                                <ExternalLink className="w-4 h-4 text-white/10 group-hover:text-v3-cyan transition-colors" />
                                            </a>
                                        ))
                                    ) : (
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${tournament.name} ${tournament.location}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-4 bg-v3-surface-lowest hover:bg-white/5 border border-white/5 transition-all group"
                                        >
                                            <span className="text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-v3-cyan">VIEW ON MAP</span>
                                            <ExternalLink className="w-4 h-4 text-white/10 group-hover:text-v3-cyan transition-colors" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-12 border-t border-white/5">
                        <div className="flex flex-col gap-2">
                            <p className="text-[10px] font-bold uppercase tracking-[.4em] text-white/30 leading-none mb-2 ml-1">ADD TO CALENDAR</p>
                            <div className="flex gap-2">
                                <a
                                    href={getGoogleCalendarLink(tournament)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-3 p-4 bg-v3-surface-highest hover:bg-white/5 text-[10px] font-bold uppercase tracking-[.3em] border border-white/5 transition-all"
                                >
                                    GOOGLE
                                </a>
                                <button
                                    onClick={handleDownloadICal}
                                    className="flex-1 flex items-center justify-center gap-3 p-4 bg-v3-surface-highest hover:bg-white/5 text-[10px] font-bold uppercase tracking-[.3em] border border-white/5 transition-all"
                                >
                                    ICAL / ICS
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-[10px] font-bold uppercase tracking-[.4em] text-white/30 leading-none mb-2 ml-1">QUICK LINKS</p>
                            <div className="flex gap-2">
                                {tournament.bracketUrl ? (
                                    <a
                                        href={tournament.bracketUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center p-4 bg-v3-red text-white text-[10px] font-bold uppercase tracking-[.4em] shadow-[0_0_20px_rgba(237,28,36,0.2)] hover:shadow-v3-red/40 transition-all"
                                    >
                                        TOURNAMENT BRACKET
                                    </a>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center p-4 bg-white/5 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 italic">
                                        NOT AVAILABLE
                                    </div>
                                )}
                                {tournament.websiteUrl && (
                                    <a
                                        href={tournament.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center p-4 bg-v3-surface-lowest hover:bg-v3-blue text-[10px] font-bold uppercase tracking-[.4em] border border-white/10 transition-all"
                                    >
                                        OFFICIAL WEBSITE
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const TournamentModal: React.FC<TournamentModalProps> = ({ tournament, isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && tournament && (
                <TournamentModalContent
                    key={tournament.id}
                    tournament={tournament}
                    onClose={onClose}
                />
            )}
        </AnimatePresence>
    );
};

export default TournamentModal;
