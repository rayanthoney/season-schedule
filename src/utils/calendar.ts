import type { Tournament } from '../data';

export const getGoogleCalendarLink = (tournament: Tournament) => {
    const { start, end } = parseTournamentDates(tournament.dates);
    const text = encodeURIComponent(tournament.name);
    const location = encodeURIComponent(tournament.location);
    const details = encodeURIComponent(`${tournament.note || ''}\n\nSchedule: ${tournament.bracketUrl || 'TBD'}`);

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${formatDateForGoogle(start)}/${formatDateForGoogle(end, true)}&details=${details}&location=${location}`;
};

export const getICalData = (tournament: Tournament) => {
    const { start, end } = parseTournamentDates(tournament.dates);
    const endPlusOne = new Date(end);
    endPlusOne.setDate(endPlusOne.getDate() + 1);

    return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${tournament.name}`,
        `LOCATION:${tournament.location}`,
        `DTSTART;VALUE=DATE:${formatDateForICal(start)}`,
        `DTEND;VALUE=DATE:${formatDateForICal(endPlusOne)}`,
        `DESCRIPTION:${tournament.note || ''} \\n\\nSchedule: ${tournament.bracketUrl || 'TBD'}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\n');
};

const formatDateForGoogle = (date: Date, isEnd: boolean = false) => {
    const d = new Date(date);
    // Google all-day events: start is inclusive, end is exclusive
    if (isEnd) d.setDate(d.getDate() + 1);
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '').split('T')[0];
};

const formatDateForICal = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '').split('T')[0];
};

// Robust parser for strings like "March 8–10, 2026" or "July 31 – August 2, 2026"
export const parseTournamentDates = (dateStr: string): { start: Date; end: Date } => {
    const currentYear = 2026;
    const cleanStr = dateStr.replace('–', '-').replace('—', '-'); // Normalize dashes

    // Example: "March 8-10, 2026"
    // Example: "July 31 - August 2, 2026"
    // Example: "May (TBD), 2026"

    if (cleanStr.includes('(TBD)')) {
        const monthStr = cleanStr.split(' ')[0];
        const start = new Date(`${monthStr} 1, ${currentYear}`);
        const end = new Date(`${monthStr} 1, ${currentYear}`);
        return { start, end };
    }

    const [datePart] = cleanStr.split(',');
    const parts = datePart.split('-').map(s => s.trim());

    if (parts.length === 1) {
        const d = new Date(`${parts[0]}, ${currentYear}`);
        return { start: d, end: d };
    }

    // Handle multi-month: "July 31 - August 2"
    const startPart = parts[0]; // "July 31"
    const endPart = parts[1];   // "August 2" or "10"

    const start = new Date(`${startPart}, ${currentYear}`);
    let end: Date;

    if (isNaN(Number(endPart))) {
        // endPart is "August 2"
        end = new Date(`${endPart}, ${currentYear}`);
    } else {
        // endPart is "10"
        const month = startPart.split(' ')[0];
        end = new Date(`${month} ${endPart}, ${currentYear}`);
    }

    return { start, end };
};
