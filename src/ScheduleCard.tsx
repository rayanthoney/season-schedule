import React from 'react';
import { Calendar, MapPin, Info, Trophy, ExternalLink } from 'lucide-react';
import type { Tournament } from './data';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const ScheduleCard: React.FC<{
    tournament: Tournament;
    onClick: () => void;
}> = ({ tournament, onClick }) => {
    const isFinal = tournament.status === 'final';
    const isOngoing = tournament.status === 'ongoing';

    return (
        <div
            onClick={onClick}
            className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
            {/* Background effect */}
            <div className={cn(
                "absolute inset-0 transition-opacity duration-300 opacity-20",
                isFinal ? "bg-slate-700" : isOngoing ? "bg-cyfair-cyan" : "bg-cyfair-dark"
            )} />

            <div className="glass-card relative p-5 flex flex-col md:flex-row md:items-center gap-6">
                {/* Date Section */}
                <div className={cn(
                    "shrink-0 flex md:flex-col items-center gap-3 md:w-32 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4",
                    isFinal && "opacity-50"
                )}>
                    <Calendar className="w-5 h-5 text-cyfair-cyan" />
                    <div className="flex flex-col md:items-center">
                        <span className="text-sm font-bold text-white uppercase tracking-wider">
                            {tournament.dates.split(',')[0]}
                        </span>
                        <span className="text-xs text-white/50">{tournament.dates.split(',')[1] || '2026'}</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="grow space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyfair-cyan transition-colors">
                            {tournament.name}
                        </h3>
                        {isOngoing && (
                            <span className="px-2 py-0.5 rounded-full bg-cyfair-cyan/20 text-cyfair-cyan text-[10px] font-bold uppercase tracking-widest animate-pulse border border-cyfair-cyan/30">
                                Live Now
                            </span>
                        )}
                        {isFinal && (
                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest border border-white/20">
                                Completed
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        {tournament.venues && tournament.venues.length > 0 ? (
                            <div className="flex flex-wrap items-center gap-3">
                                {tournament.venues.map((venue, idx) => (
                                    <a
                                        key={idx}
                                        href={venue.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-sm text-white/70 hover:text-cyfair-cyan transition-colors bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 hover:border-cyfair-cyan/30"
                                    >
                                        <MapPin className="w-3.5 h-3.5 text-cyfair-red" />
                                        <span>{venue.label || (tournament.venues!.length > 1 ? `Venue ${idx + 1}` : tournament.location)}</span>
                                        <ExternalLink className="w-3 h-3 opacity-40" />
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${tournament.name} ${tournament.location}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm text-white/70 hover:text-cyfair-cyan transition-colors"
                            >
                                <MapPin className="w-4 h-4 text-cyfair-red" />
                                <span>{tournament.location}</span>
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                            </a>
                        )}
                        {tournament.note && (
                            <div className="flex items-center gap-1.5 text-sm text-white/40">
                                <Info className="w-4 h-4" />
                                <span className="italic">{tournament.note}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action/Badge Section */}
                <div className="shrink-0 flex items-center justify-end gap-4 md:w-32">
                    <div className="flex items-center gap-2">
                        <Trophy className={cn(
                            "w-5 h-5 transition-transform group-hover:scale-110",
                            isFinal ? "text-white/20" : "text-cyfair-cyan/40"
                        )} />
                    </div>
                </div>
            </div>
        </div>
    );
};
