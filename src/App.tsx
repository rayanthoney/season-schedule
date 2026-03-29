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
    <div className="min-h-screen bg-v3-surface text-slate-100 selection:bg-v3-red/30 selection:text-white">
      {/* Hero Header: Asymmetrical Monolith */}
      <div className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40 border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-linear-to-b from-v3-blue/20 to-v3-surface" />
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(189,195,247,0.1),transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-16 md:gap-24">
            {/* Logo area with special lighting highlight */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-8 logo-highlight opacity-30 group-hover:opacity-50 transition-opacity" />
              <img
                src={logo}
                alt="CyFair Elite NM Logo"
                className="w-56 md:w-80 h-auto relative drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              />
            </div>

            <div className="text-center md:text-left pt-4 space-y-8 flex-1">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-v3-surface-low border-l-2 border-v3-red shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-v3-red animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-v3-red">Official Season Portal</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter text-white uppercase leading-[0.85] font-display">
                  SEASON <br />
                  <span className="text-v3-cyan text-glow-cyan">SCHEDULE</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-xl font-medium leading-relaxed font-body">
                  Your home for CyFair Elite NM 2026 season details. Keeping parents and players connected to the schedule and our mission for excellence.
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
                <a
                  href="https://www.instagram.com/cyfairelitenewmexico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/ig flex items-center gap-4 px-8 py-4 rounded-sm bg-v3-surface-high hover:bg-v3-surface-highest transition-all shadow-2xl border border-white/5"
                >
                  <div className="p-2.5 rounded-sm bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] group-hover/ig:scale-110 transition-transform shadow-lg shadow-black/50">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-white">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </div>
                  <div className="text-left font-display">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 leading-none mb-1">Latest News</p>
                    <p className="text-base font-bold uppercase text-white group-hover/ig:text-v3-cyan transition-colors leading-none tracking-wider">@cyfairelitenm</p>
                  </div>
                </a>

                {/* Vertical Stat Pulse (v3 Signature) */}
                <div className="hidden lg:flex items-center gap-10 px-10 border-l border-white/10 opacity-30">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Club Region</p>
                    <p className="text-sm font-bold uppercase text-white">Southwest</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Season Year</p>
                    <p className="text-sm font-bold uppercase text-white">2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Tonal Partitioning */}
      <main className="max-w-7xl mx-auto px-6 py-20 relative z-20">
        {/* Toolbar: Carved Inset Style */}
        <div className="bg-v3-surface-lowest p-5 rounded-sm flex flex-col lg:flex-row lg:items-center justify-between gap-10 shadow-inner border border-white/5 mb-20">
          <div className="flex items-center gap-2">
            <div className="flex p-1 bg-v3-surface-low rounded-sm">
              {(['all', 'upcoming', 'past'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-8 py-3 rounded-sm text-xs font-bold uppercase tracking-[0.2em] transition-all relative font-display ${activeFilter === filter
                    ? 'bg-v3-blue text-v3-cyan shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="relative group flex-1 max-w-2xl">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-v3-red/50 group-focus-within:bg-v3-red transition-all" />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-v3-cyan transition-colors" />
            <input
              type="text"
              placeholder="SEARCH TOURNAMENTS..."
              className="w-full bg-v3-surface-low rounded-sm py-5 pl-16 pr-6 text-xs font-bold uppercase tracking-[0.3em] focus:outline-none focus:bg-v3-surface-high transition-all placeholder:text-white/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Schedule Grid: Air-Gap Separation */}
        <div className="grid grid-cols-1 gap-4">
          {filteredTournaments.length > 0 ? (
            filteredTournaments.map((tournament) => (
              <ScheduleCard
                key={tournament.id}
                tournament={tournament}
                onClick={() => openModal(tournament)}
              />
            ))
          ) : (
            <div className="text-center py-32 bg-v3-surface-low rounded-sm border border-dashed border-white/5">
              <Calendar className="w-16 h-16 text-white/5 mx-auto mb-8" />
              <p className="text-white/20 font-bold uppercase tracking-[0.3em] text-sm italic">No tournaments found for {activeFilter.toUpperCase()}</p>
            </div>
          )}
        </div>

        {/* Footer: Asymmetrical Layout */}
        <footer className="mt-40 pt-16 border-t border-white/5">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 opacity-30 hover:opacity-100 transition-opacity duration-700">
            <div className="flex items-center gap-6">
              <img src={logo} alt="Cyfair Elite" className="h-12 w-auto grayscale brightness-200" />
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white leading-none">CyFair Elite New Mexico</p>
                <p className="text-xs font-medium uppercase tracking-widest text-slate-500">CyFair Elite New Mexico Basketball • 2026 Season</p>
              </div>
            </div>

            <div className="flex items-center gap-12 md:gap-24">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-v3-cyan">Home Base</p>
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.1em]">
                  <MapPin className="w-4 h-4 text-v3-red" />
                  Albuquerque, NM
                </div>
              </div>
              <div className="space-y-2 text-right lg:text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-v3-red">Follow Us</p>
                <a
                  href="https://www.instagram.com/cyfairelitenewmexico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-bold uppercase tracking-[0.1em] hover:text-v3-cyan transition-colors"
                >
                  IG Feed
                </a>
              </div>
            </div>
          </div>
          <div className="mt-20 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/10 italic">
              Cyfair Elite New Mexico Basketball © 2026 • Committed to Excellence
            </p>
          </div>
        </footer>
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
