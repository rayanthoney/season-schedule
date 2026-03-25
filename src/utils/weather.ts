export interface WeatherData {
    temp: number;
    high: number;
    low: number;
    condition: string;
    description: string;
    icon: string;
    humidity: number;
    isForecast: boolean;
    dateStr: string;
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Fallback Mock Data based on season (July/August trips) or Month View
const getMockWeather = (city: string, date: Date): WeatherData => {
    const month = date.getMonth(); // 0-11

    // High-level archetypes for our travel cities
    let high = 75;
    let low = 60;
    let condition = "Sunny";
    let description = "Clear skies";

    if (city.toLowerCase().includes("albuquerque") || city.toLowerCase().includes("el paso")) {
        // Southwest Summer
        high = month >= 5 ? 95 : 75;
        low = month >= 5 ? 68 : 50;
        condition = month >= 6 ? "Partly Cloudy" : "Sunny";
    } else if (city.toLowerCase().includes("new orleans")) {
        // Humid/Rainy
        high = 88;
        low = 74;
        condition = "Humid";
        description = "Thunderstorms possible";
    } else if (city.toLowerCase().includes("chicago")) {
        high = 82;
        low = 65;
        condition = "Sunny";
    } else if (city.toLowerCase().includes("las vegas")) {
        high = 105;
        low = 82;
        condition = "Hot";
    }

    return {
        temp: high - 5,
        high,
        low,
        condition,
        description,
        icon: condition === "Sunny" ? "sun" : condition === "Humid" ? "cloud-rain" : "cloud",
        humidity: month >= 5 ? 15 : 45,
        isForecast: false,
        dateStr: date.toLocaleDateString()
    };
};

export const fetchWeather = async (city: string, date: Date): Promise<WeatherData> => {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
        // Return mock data for dev without API key
        return new Promise((resolve) => {
            setTimeout(() => resolve(getMockWeather(city, date)), 500);
        });
    }

    try {
        // OpenWeather API call logic
        // For now, we hit the 5-day forecast for upcoming games
        // https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=imperial
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        return {
            temp: Math.round(data.main.temp),
            high: Math.round(data.main.temp_max),
            low: Math.round(data.main.temp_min),
            condition: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            isForecast: true,
            dateStr: date.toLocaleDateString()
        };
    } catch (error) {
        console.error("Weather fetch failed:", error);
        return getMockWeather(city, date);
    }
};
