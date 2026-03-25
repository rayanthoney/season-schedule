import React, { useState } from 'react';
import { SEASON_SCHEDULE, type Tournament } from './data';
import { ScheduleCard } from './ScheduleCard';
import TournamentModal from './TournamentModal';
import { Calendar, MapPin, Search } from 'lucide-react';
import logo from './assets/cyfair-logo.png';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setIsModalOpen(true);
  };

  const filteredTournaments = SEASON_SCHEDULE.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === 'upcoming') return matchesSearch && (t.status === 'upcoming' || t.status === 'ongoing');
    if (activeFilter === 'past') return matchesSearch && t.status === 'final';
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyfair-cyan/30">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-cyfair-dark/80 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute inset-0 z-0 opacity-20 Mix-blend-overlay">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-950" />
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_70%)]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-r from-cyfair-cyan to-cyfair-red opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
            <img
              src={logo}
              alt="Cyfair Elite New Mexico Logo"
              className="w-48 md:w-64 h-auto relative drop-shadow-2xl"
            />
          </div>

          <div className="text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyfair-red/20 text-cyfair-red text-xs font-bold uppercase tracking-widest border border-cyfair-red/30">
              <span className="w-2 h-2 rounded-full bg-cyfair-red animate-pulse" />
              Girls Basketball
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none">
              Season <span className="text-cyfair-cyan text-glow-cyan">Schedule</span>
            </h1>
            <p className="text-lg text-white/60 max-w-xl font-medium">
              Catch the Cyfair Elite New Mexico girls in action as they compete across the southwest and beyond in the 2026 season.
            </p>
            <div className="flex justify-center md:justify-start pt-2">
              <a
                href="https://www.instagram.com/cyfairelitenewmexico?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="group/ig flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyfair-cyan/30 hover:bg-white/10 transition-all shadow-xl"
              >
                <div className="p-2 rounded-lg bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] group-hover/ig:scale-110 transition-transform shadow-lg shadow-cyfair-red/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-white"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 leading-none mb-1">Follow On</p>
                  <p className="text-sm font-black uppercase text-white group-hover/ig:text-cyfair-cyan transition-colors leading-none tracking-wider">Instagram</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 -mt-12 mb-20 relative z-20">
        {/* Toolbar */}
        <div className="glass-card mb-8 p-4 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
              {(['all', 'upcoming', 'past'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-wide transition-all ${activeFilter === filter
                    ? 'bg-cyfair-cyan text-cyfair-dark shadow-lg shadow-cyfair-cyan/20 -translate-y-px'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="relative group min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-cyfair-cyan transition-colors" />
            <input
              type="text"
              placeholder="Search tournaments or cities..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-cyfair-cyan focus:border-cyfair-cyan focus:bg-white/10 transition-all placeholder:text-white/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="space-y-4">
          {filteredTournaments.length > 0 ? (
            filteredTournaments.map((tournament) => (
              <ScheduleCard
                key={tournament.id}
                tournament={tournament}
                onClick={() => openModal(tournament)}
              />
            ))
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <Calendar className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/40 font-medium italic">No tournaments found matching your search.</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-16 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest underline decoration-cyfair-red decoration-2 underline-offset-4">
              <MapPin className="w-4 h-4" />
              Albuquerque, NM
            </div>
            <a
              href="https://www.instagram.com/cyfairelitenewmexico?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-cyfair-cyan transition-all transform hover:scale-110"
              aria-label="Follow us on Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-white/60">
              Cyfair Elite New Mexico Basketball © 2026
            </p>
          </div>
        </div>
      </main>

      <TournamentModal
        tournament={selectedTournament}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default App;
