import React from 'react';
import { Calendar, MapPin, Trophy, ExternalLink } from 'lucide-react';
import type { Tournament } from './data';

export const ScheduleCard: React.FC<{
    tournament: Tournament;
    onClick: () => void;
}> = ({ tournament, onClick }) => {
    const isFinal = tournament.status === 'final';
    const isOngoing = tournament.status === 'ongoing';

    return (
        <div
            onClick={onClick}
            className="group cursor-pointer relative overflow-hidden v3-card hover:bg-v3-surface-high border-l-2 border-transparent hover:border-v3-red shadow-2xl transition-all duration-500"
        >
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                        <span className={`v3-badge ${isOngoing ? 'bg-v3-cyan' : isFinal ? 'bg-white/10' : 'bg-v3-red'}`}>
                            {isOngoing ? 'IN PROGRESS' : isFinal ? 'FINAL' : 'UPCOMING'}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 truncate">
                            ID: CY-{tournament.id.slice(0, 8).toUpperCase()}
                        </span>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter text-white uppercase font-display group-hover:text-v3-cyan transition-colors">
                            {tournament.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-slate-400">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-v3-red" />
                                <span className="text-xs font-bold uppercase tracking-widest">{tournament.dates}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 text-v3-cyan" />
                                <span className="text-xs font-bold uppercase tracking-widest leading-none">{tournament.location}</span>
                            </div>
                            {tournament.venues && tournament.venues.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-3.5 h-3.5 text-v3-cyan/40" />
                                    <span className="text-xs font-bold uppercase tracking-widest leading-none text-white/20">{tournament.venues.length} SITES</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-10">
                    <div className="text-right hidden md:block border-r border-white/5 pr-8">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1 leading-none">Tournament Status</p>
                        <p className="text-sm font-black uppercase text-white font-display">
                            {isOngoing ? 'IN PROGRESS' : isFinal ? 'FINAL' : 'UPCOMING'}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-sm bg-v3-surface-highest flex items-center justify-center group-hover:bg-v3-red transition-all shadow-inner border border-white/5 group-hover:border-v3-red/30">
                            <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Kinetic Scanline */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-v3-red opacity-0 group-hover:opacity-40 transition-opacity" />
        </div>
    );
};
