export interface Venue {
    name?: string;
    url?: string;
    label?: string;
}

export interface Tournament {
    id: string;
    name: string;
    dates: string;
    location: string;
    city: string;
    state: string;
    note?: string;
    status: 'upcoming' | 'final' | 'ongoing';
    venues?: Venue[];
    bracketUrl?: string;
    websiteUrl?: string;
    description?: string;
}

export const SEASON_SCHEDULE: Tournament[] = [
    {
        id: '1',
        name: 'Ball Out Tournament',
        dates: 'March 8–10, 2026',
        location: 'Albuquerque, NM',
        city: 'Albuquerque',
        state: 'NM',
        status: 'final',
        venues: [
            { url: "https://maps.app.goo.gl/z9BEyCL84TqzvifNA", label: "Venue 1" },
            { url: "https://maps.app.goo.gl/Q1tCFLUUrdaWJspk9", label: "Venue 2" }
        ]
    },
    {
        id: '2',
        name: 'CyFair March Mania Shootout',
        dates: 'March 13–15, 2026',
        location: 'Albuquerque, NM',
        city: 'Albuquerque',
        state: 'NM',
        status: 'final',
        venues: [
            { url: "https://maps.app.goo.gl/ACZNDha3hsURxE5n8", label: "Venue 1" },
            { url: "https://maps.app.goo.gl/mcysfKCLS4zawHfs8", label: "Venue 2" }
        ]
    },
    {
        id: '3',
        name: 'West Mesa Spring Youth Tournament',
        dates: 'March 19–22, 2026',
        location: 'Albuquerque, NM',
        city: 'Albuquerque',
        state: 'NM',
        status: 'ongoing',
        venues: [
            { url: "https://maps.app.goo.gl/xWbvPPwDqAcTRGQAA" }
        ],
        bracketUrl: "https://tourneymachine.com/Public/Results/Division.aspx?IDTournament=h20260305171628914c7ed7b0bcd524b&IDDivision=h20260305171917813ab1fb16d499046",
        websiteUrl: "https://tourneymachine.com/Public/Results/Division.aspx?IDTournament=h20260305171628914c7ed7b0bcd524b&IDDivision=h20260305171917813ab1fb16d499046"
    },
    {
        id: '4',
        name: '3rd Annual Spring Warm-Up 2026',
        dates: 'March 26–29, 2026',
        location: 'Albuquerque, NM',
        city: 'Albuquerque',
        state: 'NM',
        status: 'upcoming',
        venues: [
            { url: "https://maps.app.goo.gl/UUzBFyFZiyFtB7BW8", label: "Venue 1" },
            { url: "https://maps.app.goo.gl/mcysfKCLS4zawHfs8", label: "Venue 2" }
        ],
        bracketUrl: "https://tourneymachine.com/Public/Results/Division.aspx?IDTournament=h20260115032207775deeca1b0b34141&IDDivision=h20260301153018425defa374ecf424a",
        websiteUrl: "https://tourneymachine.com/Public/Results/Division.aspx?IDTournament=h20260115032207775deeca1b0b34141&IDDivision=h20260301153018425defa374ecf424a"
    },
    {
        id: '5',
        name: 'Don Haskins Memorial Tournament',
        dates: 'April 17–19, 2026',
        location: 'West Texas – El Paso',
        city: 'El Paso',
        state: 'TX',
        status: 'upcoming'
    },
    {
        id: '6',
        name: 'Matador',
        dates: 'April 24–26, 2026',
        location: 'Albuquerque, NM Metro Area',
        city: 'Albuquerque',
        state: 'NM',
        status: 'upcoming'
    },
    {
        id: '7',
        name: 'Salsa Slam',
        dates: 'April 30 – May 3, 2026',
        location: 'Albuquerque, NM Metro Area',
        city: 'Albuquerque',
        state: 'NM',
        status: 'upcoming'
    },
    {
        id: '8',
        name: 'CyFair Invitational',
        dates: 'May 9–10, 2026',
        location: 'Frisco, TX',
        city: 'Frisco',
        state: 'TX',
        status: 'upcoming',
        venues: [
            { url: "https://maps.app.goo.gl/b1Fb5HUCwYrpKx4L7" }
        ]
    },
    {
        id: '9',
        name: 'Nike Girls EYBL Session 2',
        dates: 'May 15–17, 2026',
        location: 'New Orleans, LA',
        city: 'New Orleans',
        state: 'LA',
        status: 'upcoming',
        venues: [
            { url: "https://maps.app.goo.gl/XYMZsiFeQ8rUFkZ37" }
        ]
    },
    {
        id: '10',
        name: 'New Mexico Games Basketball Tournament',
        dates: 'May 22-25, 2026',
        location: 'Albuquerque, NM',
        city: 'Albuquerque',
        state: 'NM',
        status: 'upcoming',
        venues: [
            { url: "https://maps.app.goo.gl/yCSvZL64vC4KoqK8A" }
        ],
        bracketUrl: "https://tourneymachine.com/Public/Results/Tournament.aspx?IDTournament=h202508031339425928342dc5bec4f47",
        websiteUrl: "https://tourneymachine.com/Public/Results/Tournament.aspx?IDTournament=h202508031339425928342dc5bec4f47"
    },
    {
        id: '11',
        name: 'Lobo Camp',
        dates: 'June 19–21, 2026',
        location: 'Albuquerque, NM Metro Area',
        city: 'Albuquerque',
        state: 'NM',
        status: 'upcoming'
    },
    {
        id: '12',
        name: 'Summer Tip Off Invitational',
        dates: 'June 26-28, 2026',
        location: 'Albuquerque, NM Metro Area',
        city: 'Albuquerque',
        state: 'NM',
        status: 'upcoming'
    },
    {
        id: '13',
        name: 'Nike Girls EYBL Session 2 (Las Vegas)',
        dates: 'July 10–13, 2026',
        location: 'Las Vegas, NV',
        city: 'Las Vegas',
        state: 'NV',
        status: 'upcoming',
        venues: [
            { url: "https://maps.app.goo.gl/ynne8WAS7nCnMnkF6" }
        ]
    },
    {
        id: '14',
        name: 'Nike Girls EYBL Session 3 Nike Nationals',
        dates: 'July 24–27, 2026',
        location: 'Chicago, IL',
        city: 'Chicago',
        state: 'IL',
        status: 'upcoming',
        venues: [
            { url: "https://maps.app.goo.gl/dZeppZLbqHr9DmfU9" }
        ]
    },
    {
        id: '15',
        name: 'World Latino',
        dates: 'July 31 – August 2, 2026',
        location: 'West Texas – El Paso',
        city: 'El Paso',
        state: 'TX',
        note: 'Team tradition/Wet and Wild',
        status: 'upcoming'
    }
];
