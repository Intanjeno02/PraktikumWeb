"use client";

import { useState } from "react";

interface DayForecast {
  day: string;
  date: string;
  title: string;
  highC: number;
  lowC: number;
  description: string;
  precip: string;
  wind: string;
  uv: string;
  uvLevel: "Low" | "Moderate" | "High";
  iconAlt: string;
  iconType: "sun-cloud" | "rain" | "clear-sun";
}

interface CityWeather {
  name: string;
  province: string;
  country: string;
  coords: string;
  condition: string;
  tempC: number;
  feelsC: number;
  highC: number;
  lowC: number;
  wind: string;
  windSpeed: number;
  windDir: string;
  humidity: string;
  pressure: string;
  clouds: string;
  dewPoint: string;
  aqi: number;
  aqiStatus: string;
  uvIndex: number;
  cloudBase: string;
  iconAlt: string;
  forecast: DayForecast[];
}

const WEATHER_REGISTRY: Record<string, CityWeather> = {
  Bandung: {
    name: "Bandung",
    province: "West Java",
    country: "Indonesia",
    coords: "Elevation 768m • Lat -6.91, Lon 107.60",
    condition: "Scattered Cumulus Clouds",
    tempC: 27,
    feelsC: 29,
    highC: 30,
    lowC: 21,
    wind: "14 km/h ENE",
    windSpeed: 14,
    windDir: "ENE (68°)",
    humidity: "68%",
    pressure: "1012 hPa",
    clouds: "42% (Fair Sky)",
    dewPoint: "20°C",
    aqi: 38,
    aqiStatus: "Good",
    uvIndex: 5.4,
    cloudBase: "1,450m AGL",
    iconAlt: "Golden sun partially visible behind bright fluffy white cumulus cloud",
    forecast: [
      {
        day: "Tomorrow",
        date: "Sat, Oct 03",
        title: "Passing Fluffy Clouds & Mild Breeze",
        highC: 29,
        lowC: 21,
        description: "Morning blue skies transitioning to comfortable scattered cumulus during early afternoon.",
        precip: "15%",
        wind: "12 km/h",
        uv: "UV 6 Mod",
        uvLevel: "Moderate",
        iconAlt: "Sun shining through scattered puffy cumulus clouds",
        iconType: "sun-cloud",
      },
      {
        day: "In 2 Days",
        date: "Sun, Oct 04",
        title: "Afternoon Cloudburst & Light Rain",
        highC: 26,
        lowC: 20,
        description: "Overcast stratocumulus banks forming by 14:00 with localized cooling showers.",
        precip: "70%",
        wind: "18 km/h",
        uv: "UV 4 Low",
        uvLevel: "Low",
        iconAlt: "Dark silver rain cloud with visible gentle raindrops",
        iconType: "rain",
      },
      {
        day: "In 3 Days",
        date: "Mon, Oct 05",
        title: "Clear Azure Skies & Radiant Sun",
        highC: 30,
        lowC: 22,
        description: "High pressure dome delivering unobstructed bright blue skies and warm afternoon heat.",
        precip: "5%",
        wind: "10 km/h",
        uv: "UV 8 High",
        uvLevel: "High",
        iconAlt: "Radiant golden sun with glowing rays under bright open sky",
        iconType: "clear-sun",
      },
    ],
  },
  Jakarta: {
    name: "Jakarta",
    province: "DKI Jakarta",
    country: "Indonesia",
    coords: "Elevation 8m • Lat -6.20, Lon 106.84",
    condition: "Bright Hazy Sky & Warm Sunshine",
    tempC: 32,
    feelsC: 36,
    highC: 34,
    lowC: 25,
    wind: "18 km/h NNE",
    windSpeed: 18,
    windDir: "NNE (30°)",
    humidity: "74%",
    pressure: "1009 hPa",
    clouds: "30% (Hazy Sunshine)",
    dewPoint: "24°C",
    aqi: 92,
    aqiStatus: "Moderate",
    uvIndex: 7.8,
    cloudBase: "1,200m AGL",
    iconAlt: "Bright glowing sun shining in a soft blue hazy coastal sky",
    forecast: [
      {
        day: "Tomorrow",
        date: "Sat, Oct 03",
        title: "Warm Sunshine & Humid Coastal Breeze",
        highC: 33,
        lowC: 26,
        description: "Persistent coastal warmth with high humidity and bright blue intervals throughout the day.",
        precip: "20%",
        wind: "16 km/h",
        uv: "UV 8 High",
        uvLevel: "High",
        iconAlt: "Sun shining bright with slight coastal haze",
        iconType: "clear-sun",
      },
      {
        day: "In 2 Days",
        date: "Sun, Oct 04",
        title: "Scattered Cirrus Clouds",
        highC: 34,
        lowC: 25,
        description: "Delicate high-altitude ice-crystal clouds giving soft filtered sunshine.",
        precip: "10%",
        wind: "14 km/h",
        uv: "UV 7 High",
        uvLevel: "High",
        iconAlt: "Sun partially filtered through delicate cirrus cloud wisps",
        iconType: "sun-cloud",
      },
      {
        day: "In 3 Days",
        date: "Mon, Oct 05",
        title: "Isolated Evening Thunderstorm",
        highC: 31,
        lowC: 24,
        description: "Rapid convection building cumulonimbus formations by dusk with brief thunder.",
        precip: "65%",
        wind: "22 km/h",
        uv: "UV 5 Mod",
        uvLevel: "Moderate",
        iconAlt: "Dark stormy cloud with rain drops",
        iconType: "rain",
      },
    ],
  },
  Tokyo: {
    name: "Tokyo",
    province: "Kanto",
    country: "Japan",
    coords: "Elevation 40m • Lat 35.67, Lon 139.65",
    condition: "Crisp Azure Sky with Gentle Breeze",
    tempC: 21,
    feelsC: 21,
    highC: 23,
    lowC: 15,
    wind: "11 km/h SE",
    windSpeed: 11,
    windDir: "SE (135°)",
    humidity: "52%",
    pressure: "1018 hPa",
    clouds: "15% (Clear Sky)",
    dewPoint: "11°C",
    aqi: 22,
    aqiStatus: "Excellent",
    uvIndex: 4.2,
    cloudBase: "2,200m AGL",
    iconAlt: "Vibrant sun shining in crisp autumn clear blue sky",
    forecast: [
      {
        day: "Tomorrow",
        date: "Sat, Oct 03",
        title: "Clear Autumn Sunshine",
        highC: 22,
        lowC: 14,
        description: "Pleasant mild conditions with pristine blue sky visibility stretching towards Mount Fuji.",
        precip: "0%",
        wind: "9 km/h",
        uv: "UV 4 Low",
        uvLevel: "Low",
        iconAlt: "Clear bright sun in deep blue sky",
        iconType: "clear-sun",
      },
      {
        day: "In 2 Days",
        date: "Sun, Oct 04",
        title: "Light Cirrus Veil",
        highC: 20,
        lowC: 13,
        description: "Thin white cloud veils filtering afternoon sunlight, remaining dry and calm.",
        precip: "5%",
        wind: "12 km/h",
        uv: "UV 3 Low",
        uvLevel: "Low",
        iconAlt: "Gentle sun behind white veil clouds",
        iconType: "sun-cloud",
      },
      {
        day: "In 3 Days",
        date: "Mon, Oct 05",
        title: "Gentle Pacific Cloud Cover",
        highC: 19,
        lowC: 12,
        description: "Maritime stratus clouds moving in from Tokyo Bay with cool seasonal breeze.",
        precip: "25%",
        wind: "15 km/h",
        uv: "UV 3 Low",
        uvLevel: "Low",
        iconAlt: "Low cloud deck with filtered daylight",
        iconType: "sun-cloud",
      },
    ],
  },
  London: {
    name: "London",
    province: "Greater London",
    country: "United Kingdom",
    coords: "Elevation 11m • Lat 51.50, Lon -0.12",
    condition: "Overcast Stratocumulus with Soft Mist",
    tempC: 15,
    feelsC: 14,
    highC: 17,
    lowC: 10,
    wind: "22 km/h WSW",
    windSpeed: 22,
    windDir: "WSW (240°)",
    humidity: "82%",
    pressure: "1015 hPa",
    clouds: "85% (Overcast)",
    dewPoint: "12°C",
    aqi: 28,
    aqiStatus: "Good",
    uvIndex: 2.1,
    cloudBase: "800m AGL",
    iconAlt: "Thick gray and silver stratocumulus clouds with soft mist",
    forecast: [
      {
        day: "Tomorrow",
        date: "Sat, Oct 03",
        title: "Intermittent Light Drizzle",
        highC: 16,
        lowC: 9,
        description: "Typical autumn moisture with sporadic fine mist and high cloud density.",
        precip: "60%",
        wind: "20 km/h",
        uv: "UV 2 Low",
        uvLevel: "Low",
        iconAlt: "Gray cloud dropping light intermittent rain",
        iconType: "rain",
      },
      {
        day: "In 2 Days",
        date: "Sun, Oct 04",
        title: "Passing Cloud Banks & Sun Breaks",
        highC: 17,
        lowC: 10,
        description: "Alternating shadows and bright breaks in cloud layer over the Thames.",
        precip: "30%",
        wind: "18 km/h",
        uv: "UV 3 Low",
        uvLevel: "Low",
        iconAlt: "Sun peaking out between rolling gray clouds",
        iconType: "sun-cloud",
      },
      {
        day: "In 3 Days",
        date: "Mon, Oct 05",
        title: "Chilly Morning Fog Clearing",
        highC: 15,
        lowC: 8,
        description: "Dense river fog burning off by midday to yield pale blue afternoon sky.",
        precip: "10%",
        wind: "11 km/h",
        uv: "UV 2 Low",
        uvLevel: "Low",
        iconAlt: "Sun burning through morning mist",
        iconType: "sun-cloud",
      },
    ],
  },
  "San Francisco": {
    name: "San Francisco",
    province: "California",
    country: "United States",
    coords: "Elevation 16m • Lat 37.77, Lon -122.41",
    condition: "Coastal Marine Fog Clearing to Sun",
    tempC: 18,
    feelsC: 17,
    highC: 20,
    lowC: 12,
    wind: "24 km/h WNW",
    windSpeed: 24,
    windDir: "WNW (295°)",
    humidity: "76%",
    pressure: "1014 hPa",
    clouds: "55% (Marine Layer)",
    dewPoint: "13°C",
    aqi: 32,
    aqiStatus: "Good",
    uvIndex: 5.6,
    cloudBase: "650m AGL",
    iconAlt: "Sun breaking through morning Pacific marine layer fog over the bay",
    forecast: [
      {
        day: "Tomorrow",
        date: "Sat, Oct 03",
        title: "Breezy Afternoon Sunshine",
        highC: 21,
        lowC: 13,
        description: "Crisp Pacific wind pushing coastal fog out to sea by 11:30 AM.",
        precip: "5%",
        wind: "26 km/h",
        uv: "UV 6 Mod",
        uvLevel: "Moderate",
        iconAlt: "Sun with swift white coastal clouds",
        iconType: "sun-cloud",
      },
      {
        day: "In 2 Days",
        date: "Sun, Oct 04",
        title: "Dense Morning Marine Fog",
        highC: 18,
        lowC: 12,
        description: "Thick fog hugging the Golden Gate before partial afternoon clearing.",
        precip: "15%",
        wind: "22 km/h",
        uv: "UV 4 Low",
        uvLevel: "Low",
        iconAlt: "Thick fog bank rolling across hills",
        iconType: "sun-cloud",
      },
      {
        day: "In 3 Days",
        date: "Mon, Oct 05",
        title: "Pristine Bay Blue Skies",
        highC: 22,
        lowC: 13,
        description: "Dry offshore winds clearing the entire bay area for uninterrupted sunlight.",
        precip: "0%",
        wind: "14 km/h",
        uv: "UV 6 Mod",
        uvLevel: "Moderate",
        iconAlt: "Radiant golden sun with open clear sky",
        iconType: "clear-sun",
      },
    ],
  },
};

export default function Page() {
  const [activeCityKey, setActiveCityKey] = useState<string>("Bandung");
  const [isFahrenheit, setIsFahrenheit] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [announcement, setAnnouncement] = useState<string>(
    "Welcome to SkyWatch. Bandung weather loaded."
  );

  const currentWeather = WEATHER_REGISTRY[activeCityKey] ?? WEATHER_REGISTRY["Bandung"];

  const cToF = (c: number): number => Math.round((c * 9) / 5 + 32);
  const formatTemp = (c: number): string => `${isFahrenheit ? cToF(c) : c}°${isFahrenheit ? "F" : "C"}`;
  const getTempNumber = (c: number): number => (isFahrenheit ? cToF(c) : c);

  const handleCitySelect = (cityName: string) => {
    if (WEATHER_REGISTRY[cityName]) {
      setActiveCityKey(cityName);
      const data = WEATHER_REGISTRY[cityName];
      setAnnouncement(
        `Weather updated for ${cityName}: ${data.condition}, ${formatTemp(data.tempC)}.`
      );
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const matchedKey = Object.keys(WEATHER_REGISTRY).find(
      (key) => key.toLowerCase() === query
    );

    if (matchedKey) {
      handleCitySelect(matchedKey);
      setSearchQuery("");
    } else {
      setAnnouncement(`City "${searchQuery}" not found. Showing ${currentWeather.name}.`);
    }
  };

  const toggleUnits = () => {
    const nextState = !isFahrenheit;
    setIsFahrenheit(nextState);
    setAnnouncement(
      `Temperature unit switched to ${nextState ? "Fahrenheit" : "Celsius"}.`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-white text-slate-900 font-sans antialiased selection:bg-sky-200 selection:text-sky-950 flex flex-col">
      {/* ------------------------------------------------------------------- */}
      {/* WCAG 2.4.1: Accessible Skip to Content Link                         */}
      {/* ------------------------------------------------------------------- */}
      <a
        href="#main-weather-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3 focus:bg-sky-800 focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
      >
        Skip to main weather content
      </a>

      {/* WCAG 4.1.3: Live Announcer for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* =================================================================== */}
      {/* 1. HEADER (WCAG Landmark: role="banner")                            */}
      {/* =================================================================== */}
      <header
        role="banner"
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-xs transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1D Layout via Flexbox: Site Title, Nav, & Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between py-3.5 sm:py-4 gap-3 sm:gap-6">
            
            {/* Brand / Logo Area */}
            <div className="flex items-center justify-between w-full sm:w-auto">
              <a
                href="#overview"
                className="flex items-center gap-3 text-sky-900 group focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:outline-none rounded-lg p-1"
                aria-label="SkyWatch Home - Clear Skies and Cloud Intelligence"
              >
                {/* Cloud & Sun Brand Icon (Informative or Decorative) */}
                <span
                  className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-400 text-white flex items-center justify-center shadow-md shadow-sky-300/50 group-hover:scale-105 transition-transform"
                  aria-hidden="true"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-sky-950 flex items-center gap-1.5">
                    SkyWatch
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold tracking-wider">
                      LIVE
                    </span>
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    Atmospheric & Cloud Intel
                  </span>
                </div>
              </a>

              {/* Mobile Quick Unit Switcher */}
              <div className="sm:hidden flex items-center">
                <button
                  type="button"
                  onClick={toggleUnits}
                  aria-label="Switch temperature units between Celsius and Fahrenheit"
                  aria-pressed={isFahrenheit}
                  className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:outline-none hover:bg-sky-100 transition-colors"
                >
                  {isFahrenheit ? "°F active" : "°C active"}
                </button>
              </div>
            </div>

            {/* Semantic Navigation Landmark (WCAG 1.3.1) */}
            <nav role="navigation" aria-label="Main Weather Navigation" className="w-full sm:w-auto">
              <ul className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 text-sm font-semibold text-slate-700">
                <li>
                  <a
                    href="#overview"
                    className="px-3 py-1.5 rounded-lg text-sky-900 bg-sky-100/90 font-bold focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:outline-none transition-colors"
                    aria-current="page"
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#forecast-section"
                    className="px-3 py-1.5 rounded-lg hover:text-sky-800 hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:outline-none transition-colors"
                  >
                    3-Day Forecast
                  </a>
                </li>
                <li>
                  <a
                    href="#metrics-section"
                    className="px-3 py-1.5 rounded-lg hover:text-sky-800 hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:outline-none transition-colors"
                  >
                    Atmosphere
                  </a>
                </li>
                <li>
                  <a
                    href="#advisories-section"
                    className="px-3 py-1.5 rounded-lg hover:text-sky-800 hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:outline-none transition-colors"
                  >
                    Advisories
                  </a>
                </li>
              </ul>
            </nav>

            {/* Desktop Action Controls: Unit Switcher & Refresh */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={isFahrenheit}
                onClick={toggleUnits}
                aria-label="Toggle temperature unit between Celsius and Fahrenheit"
                className="flex items-center bg-sky-100 text-sky-900 px-3.5 py-1.5 rounded-xl border border-sky-200 text-sm font-bold hover:bg-sky-200/80 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:outline-none transition-all shadow-xs"
              >
                <span className="text-xs uppercase mr-2 text-slate-700 font-semibold" aria-hidden="true">
                  Unit:
                </span>
                <span className="text-sky-950 font-bold">
                  {isFahrenheit ? "°F (Imperial)" : "°C (Metric)"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleCitySelect(activeCityKey)}
                aria-label={`Refresh weather data for ${currentWeather.name}`}
                className="p-2 rounded-xl text-sky-800 hover:text-sky-950 hover:bg-sky-100 border border-sky-200/80 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:outline-none transition-colors"
                title="Refresh observations"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* =================================================================== */}
      {/* 2. SEARCH & LOCATION ACTION BAR (1D Flexbox)                        */}
      {/* =================================================================== */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Search Form with Explicit Accessible Label (WCAG 1.3.1) */}
            <form
              role="search"
              aria-label="Search weather location"
              onSubmit={handleSearchSubmit}
              className="w-full lg:max-w-md"
            >
              <div className="relative flex items-center">
                <label htmlFor="city-search-input" className="sr-only">
                  Search city or location name
                </label>
                <div
                  className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <svg
                    className="w-5 h-5 text-sky-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <input
                  id="city-search-input"
                  type="search"
                  name="location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city (e.g., Bandung, Jakarta, Tokyo)..."
                  autoComplete="off"
                  className="w-full pl-10 pr-24 py-2.5 bg-white/95 text-slate-900 placeholder:text-slate-600 text-sm font-medium rounded-xl border border-sky-300 focus:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-950 focus-visible:outline-none shadow-inner transition-colors"
                />

                <button
                  type="submit"
                  aria-label="Search weather for entered city"
                  className="absolute right-1.5 px-3 py-1.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick Switch Location Pills (1D Flexbox) */}
            <div className="w-full lg:w-auto flex flex-wrap items-center justify-start lg:justify-end gap-2 text-xs">
              <span className="font-semibold text-sky-100 mr-1 hidden sm:inline" id="quick-locations-label">
                Quick select:
              </span>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-labelledby="quick-locations-label"
              >
                {Object.keys(WEATHER_REGISTRY).map((city) => {
                  const isActive = activeCityKey === city;
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleCitySelect(city)}
                      aria-pressed={isActive}
                      aria-label={`View weather observation for ${city}`}
                      className={`px-3 py-1.5 rounded-full font-semibold border transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${
                        isActive
                          ? "bg-white text-sky-900 border-white shadow-sm"
                          : "bg-white/20 hover:bg-white/30 text-white border-white/30"
                      }`}
                    >
                      {city}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. MAIN WEATHER CONTENT (WCAG Landmark: role="main")                 */}
      {/* =================================================================== */}
      <main
        id="main-weather-content"
        role="main"
        className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8"
      >
        {/* Top-Level Heading for Screen Reader Hierarchy (WCAG 1.3.1) */}
        <h1 className="sr-only">Live Sky Weather Dashboard and Atmospheric Conditions</h1>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 1: Current Weather Overview                               */}
        {/* ----------------------------------------------------------------- */}
        <section
          id="overview"
          role="region"
          aria-labelledby="current-conditions-heading"
          className="relative"
        >
          <h2 id="current-conditions-heading" className="sr-only">
            Current Weather Conditions
          </h2>

          {/* Main Weather Card Article (Theme: Bright Blue Sky & Clouds) */}
          <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-sky-400 to-blue-600 text-white shadow-xl shadow-sky-400/20 border border-sky-300/40 p-6 sm:p-8 lg:p-10 transition-all">
            
            {/* Cloud Backdrop Accents */}
            <div
              className="absolute -top-12 -right-12 w-64 h-64 bg-white/20 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-16 -left-12 w-80 h-80 bg-sky-200/25 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              
              {/* Left Column: Location, Time & Condition */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold tracking-wider uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" aria-hidden="true" />
                    <span>Live Observation</span>
                  </span>
                  <span className="text-xs sm:text-sm text-sky-100 font-medium">
                    Synoptic Station Feed
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-xs">
                    {currentWeather.name}, {currentWeather.province}
                  </h3>
                  <p className="text-sky-100 text-sm sm:text-base font-medium mt-1">
                    {currentWeather.country} • {currentWeather.coords}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1 rounded-xl bg-white/25 backdrop-blur-sm text-sm font-semibold border border-white/40">
                    {currentWeather.condition}
                  </span>
                  <span className="text-xs sm:text-sm text-sky-100 flex items-center gap-1 font-medium">
                    <svg
                      className="w-4 h-4 text-sky-200"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Feels like{" "}
                    <strong className="font-bold text-white">
                      {formatTemp(currentWeather.feelsC)}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Right Column: Temperature Display & Big Weather Illustration */}
              <div className="flex items-center gap-6 sm:gap-8 self-center lg:self-auto bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/25">
                {/* Informative Icon with Descriptive alt (WCAG 1.1.1) */}
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 64 64"
                    className="w-full h-full drop-shadow-md"
                    role="img"
                    aria-label={currentWeather.iconAlt}
                  >
                    <title>{currentWeather.iconAlt}</title>
                    <defs>
                      <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FDE047" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </linearGradient>
                      <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#BAE6FD" />
                      </linearGradient>
                    </defs>
                    <circle cx="28" cy="28" r="14" fill="url(#sunGrad)" />
                    <path
                      d="M46 48a12 12 0 0 0 0-24 11.8 11.8 0 0 0-3.3.4A15 15 0 0 0 15 35a11 11 0 0 0 3 21.6h28z"
                      fill="url(#cloudGrad)"
                    />
                  </svg>
                </div>

                <div className="text-left">
                  <div className="flex items-baseline">
                    <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                      {getTempNumber(currentWeather.tempC)}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold ml-1 text-sky-100">
                      °{isFahrenheit ? "F" : "C"}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-sky-100 font-medium mt-1 flex items-center gap-3">
                    <span>
                      H: <strong className="text-white font-bold">{formatTemp(currentWeather.highC)}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      L: <strong className="text-white font-bold">{formatTemp(currentWeather.lowC)}</strong>
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Micro Summary Row (1D Flexbox) */}
            <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/15">
                <span className="text-xs text-sky-100 block font-medium">Wind Flow</span>
                <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">
                  {currentWeather.wind}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/15">
                <span className="text-xs text-sky-100 block font-medium">Humidity</span>
                <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">
                  {currentWeather.humidity}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/15">
                <span className="text-xs text-sky-100 block font-medium">Barometer</span>
                <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">
                  {currentWeather.pressure}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/15">
                <span className="text-xs text-sky-100 block font-medium">Cloud Base</span>
                <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">
                  {currentWeather.cloudBase}
                </span>
              </div>
            </div>

          </article>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 2: 3-Day Forecast (Responsive Grid System)                */}
        {/* Mobile: grid-cols-1, Tablet: sm:grid-cols-2, Desktop: lg:grid-cols-3*/}
        {/* ----------------------------------------------------------------- */}
        <section
          id="forecast-section"
          role="region"
          aria-labelledby="forecast-heading"
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b border-sky-100 pb-3">
            <div>
              <h2 id="forecast-heading" className="text-xl sm:text-2xl font-bold text-sky-950">
                3-Day Sky Forecast
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                Synoptic cloud progression, thermal shifts, and precipitation likelihood.
              </p>
            </div>
            <span className="text-xs font-semibold text-sky-800 bg-sky-100 px-3 py-1 rounded-full self-start sm:self-auto">
              Multi-Day Outlook
            </span>
          </div>

          {/* 2D Mobile-First Grid System */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentWeather.forecast.map((fc, index) => (
              <article
                key={fc.day}
                className={`bg-white/90 backdrop-blur-xs rounded-2xl p-5 sm:p-6 border border-sky-200/80 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between ${
                  index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                      {fc.day}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">{fc.date}</span>
                  </div>

                  {/* Card Subheading (WCAG 1.3.1 Hierarchy) */}
                  <h3 className="text-lg font-bold text-slate-900 mt-3">{fc.title}</h3>

                  {/* Forecast SVG Icon & Temp Details */}
                  <div className="flex items-center gap-4 my-4">
                    <div className="w-14 h-14 flex-shrink-0">
                      {fc.iconType === "rain" ? (
                        <svg
                          viewBox="0 0 64 64"
                          className="w-full h-full"
                          role="img"
                          aria-label={fc.iconAlt}
                        >
                          <title>{fc.iconAlt}</title>
                          <path
                            d="M48 40a11 11 0 0 0 0-22 10.8 10.8 0 0 0-3.1.4A14 14 0 0 0 18 28a10 10 0 0 0 3 19.8h27z"
                            fill="#94A3B8"
                          />
                          <line x1="24" y1="48" x2="20" y2="56" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
                          <line x1="34" y1="48" x2="30" y2="56" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
                          <line x1="44" y1="48" x2="40" y2="56" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      ) : fc.iconType === "clear-sun" ? (
                        <svg
                          viewBox="0 0 64 64"
                          className="w-full h-full"
                          role="img"
                          aria-label={fc.iconAlt}
                        >
                          <title>{fc.iconAlt}</title>
                          <circle cx="32" cy="32" r="16" fill="#F59E0B" />
                          <path
                            d="M32 4v6M32 54v6M4 32h6M54 32h6M12.2 12.2l4.2 4.2M47.6 47.6l4.2 4.2M12.2 51.8l4.2-4.2M47.6 16.4l4.2-4.2"
                            stroke="#F59E0B"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 64 64"
                          className="w-full h-full"
                          role="img"
                          aria-label={fc.iconAlt}
                        >
                          <title>{fc.iconAlt}</title>
                          <circle cx="32" cy="24" r="14" fill="#F59E0B" />
                          <path
                            d="M48 50a10 10 0 0 0 0-20 9.8 9.8 0 0 0-2.8.4A13 13 0 0 0 20 38a9 9 0 0 0 3 18h25z"
                            fill="#BAE6FD"
                          />
                        </svg>
                      )}
                    </div>

                    <div>
                      <div className="text-2xl font-extrabold text-slate-900">
                        {formatTemp(fc.highC)}
                      </div>
                      <div className="text-xs font-semibold text-slate-700">
                        Low: {formatTemp(fc.lowC)}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {fc.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-sky-100 flex items-center justify-between text-xs text-slate-700">
                  <span className="flex items-center gap-1 font-semibold text-sky-900">
                    <svg className="w-4 h-4 text-sky-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                    </svg>
                    Precip: {fc.precip}
                  </span>
                  <span className="font-semibold text-slate-800">Wind: {fc.wind}</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded border ${
                      fc.uvLevel === "High"
                        ? "text-rose-800 bg-rose-50 border-rose-200"
                        : fc.uvLevel === "Moderate"
                        ? "text-amber-800 bg-amber-50 border-amber-200"
                        : "text-emerald-800 bg-emerald-50 border-emerald-200"
                    }`}
                  >
                    {fc.uv}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 3: Atmospheric Highlights (Responsive Grid System)         */}
        {/* Mobile: grid-cols-1, Tablet: sm:grid-cols-2, Desktop: lg:grid-cols-3*/}
        {/* ----------------------------------------------------------------- */}
        <section
          id="metrics-section"
          role="region"
          aria-labelledby="metrics-heading"
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b border-sky-100 pb-3">
            <div>
              <h2 id="metrics-heading" className="text-xl sm:text-2xl font-bold text-sky-950">
                Atmospheric & Sky Highlights
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                Live calibrated readings across wind dynamics, ozone quality, and solar radiation.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-700">6 Sensors Calibrated</span>
          </div>

          {/* 2D Mobile-First Grid System */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Metric 1: Wind Dynamics */}
            <article className="bg-white/95 rounded-2xl p-5 border border-sky-100 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-sky-100 text-sky-700" aria-hidden="true">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    Wind Flow & Vector
                  </h3>
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    {currentWeather.windDir.split(" ")[0]}
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {currentWeather.windSpeed}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">km/h</span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  Gentle breeze with localized gusts reaching up to {currentWeather.windSpeed + 5} km/h.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <span>Turbulence: Low</span>
                <span className="font-semibold text-sky-800">Heading: {currentWeather.windDir}</span>
              </div>
            </article>

            {/* Metric 2: Air Quality Index */}
            <article className="bg-white/95 rounded-2xl p-5 border border-sky-100 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700" aria-hidden="true">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Air Quality Index (AQI)
                  </h3>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                      currentWeather.aqiStatus === "Good" || currentWeather.aqiStatus === "Excellent"
                        ? "text-emerald-800 bg-emerald-100 border-emerald-200"
                        : "text-amber-800 bg-amber-100 border-amber-200"
                    }`}
                  >
                    {currentWeather.aqiStatus} ({currentWeather.aqi})
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className={`text-3xl font-extrabold ${
                      currentWeather.aqiStatus === "Good" || currentWeather.aqiStatus === "Excellent"
                        ? "text-emerald-700"
                        : "text-amber-700"
                    }`}
                  >
                    {currentWeather.aqi}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">US AQI Standard</span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  Air quality is clean and satisfactory with negligible respiratory concern.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <span>PM2.5: 8.4 µg/m³</span>
                <span className="font-semibold text-emerald-800">Clean Atmospheric Layer</span>
              </div>
            </article>

            {/* Metric 3: Solar UV Index */}
            <article className="bg-white/95 rounded-2xl p-5 border border-sky-100 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700" aria-hidden="true">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Solar UV Radiation
                  </h3>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                    Index {currentWeather.uvIndex}
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-amber-700">
                    {currentWeather.uvIndex}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">of 12 Max</span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  Sun protection advised during midday hours (11:00 AM - 14:30 PM).
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <span>SPF 30+ Recommended</span>
                <span className="font-semibold text-slate-800">Peak: 12:45 PM</span>
              </div>
            </article>

            {/* Metric 4: Cloud Base & Altitude */}
            <article className="bg-white/95 rounded-2xl p-5 border border-sky-100 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-sky-100 text-sky-700" aria-hidden="true">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                      </svg>
                    </span>
                    Cloud Ceiling & Base
                  </h3>
                  <span className="text-xs font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full border border-sky-200">
                    Cumulus Humilis
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-sky-900">
                    {currentWeather.cloudBase}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  High cloud ceiling with {currentWeather.clouds}. Safe aviation and ground visibility.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <span>Visibility: 10+ km</span>
                <span className="font-semibold text-sky-900">Deck: Stable</span>
              </div>
            </article>

            {/* Metric 5: Humidity & Dew Point */}
            <article className="bg-white/95 rounded-2xl p-5 border border-sky-100 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700" aria-hidden="true">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 2a.75.75 0 01.75.75v.258a33.155 33.155 0 014.28 1.488.75.75 0 01-.66 1.344 31.657 31.657 0 00-3.62-1.266v13.676a.75.75 0 01-1.5 0V4.574a31.657 31.657 0 00-3.62 1.266.75.75 0 01-.66-1.344 33.155 33.155 0 014.28-1.488V2.75A.75.75 0 0110 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Humidity & Dew Point
                  </h3>
                  <span className="text-xs font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full border border-sky-200">
                    Balanced
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {currentWeather.humidity}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">Relative</span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  Dew point sits around {currentWeather.dewPoint} for pleasant comfort with minimal moisture stickiness.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <span>Dew Point: {currentWeather.dewPoint}</span>
                <span className="font-semibold text-sky-800">Pressure: {currentWeather.pressure}</span>
              </div>
            </article>

            {/* Metric 6: Solar Day Cycle */}
            <article className="bg-white/95 rounded-2xl p-5 border border-sky-100 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-orange-100 text-orange-700" aria-hidden="true">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.184c-.622-.117-1.196-.342-1.676-.662A1 1 0 006.2 12.83C7.14 13.456 8.01 14 9 14h2a1 1 0 100-2H9c-.33 0-.66-.11-1-.31a2.83 2.83 0 01-.83-.82V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Solar Day & Golden Hour
                  </h3>
                  <span className="text-xs font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-200">
                    11h 56m daylight
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-sky-50/70 p-2.5 rounded-xl border border-sky-100">
                    <span className="text-[11px] font-bold text-slate-600 uppercase block">Sunrise</span>
                    <span className="text-base font-extrabold text-slate-900">05:42 AM</span>
                  </div>
                  <div className="bg-orange-50/70 p-2.5 rounded-xl border border-orange-100">
                    <span className="text-[11px] font-bold text-slate-600 uppercase block">Sunset</span>
                    <span className="text-base font-extrabold text-slate-900">17:48 PM</span>
                  </div>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-2">
                  Golden hour starts at 17:10 PM with warm horizon cloud reflections.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <span>Dawn: 05:21 AM</span>
                <span className="font-semibold text-slate-800">Dusk: 18:09 PM</span>
              </div>
            </article>

          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* 4. ASIDE COMPONENT (WCAG Landmark: role="complementary")           */}
        {/* ----------------------------------------------------------------- */}
        <aside
          id="advisories-section"
          role="complementary"
          aria-labelledby="aside-heading"
          className="rounded-3xl bg-gradient-to-r from-sky-100 via-sky-50 to-blue-50 border border-sky-200 p-6 sm:p-8 shadow-xs"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-sky-200/70">
            <div className="flex items-center gap-3">
              <span
                className="p-2.5 rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-600/30"
                aria-hidden="true"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div>
                <h2 id="aside-heading" className="text-lg sm:text-xl font-bold text-sky-950">
                  Sky Watchers&apos; Advisory &amp; Daily Tips
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  Practical guidelines tailored for current cloud coverage, humidity, and thermal metrics.
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-sky-200 text-sky-900 text-xs font-bold self-start md:self-auto">
              Active Sky Bulletin
            </span>
          </div>

          {/* 1D Flexbox / Grid of Tips */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <article className="bg-white/95 rounded-2xl p-4 border border-sky-200/60 shadow-xs flex items-start gap-3.5">
              <span
                className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center flex-shrink-0 font-bold text-sm"
                aria-hidden="true"
              >
                1
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Outdoor Activities</h3>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                  High cloud ceiling makes it ideal for running, cycling, and city commuting before late dusk.
                </p>
              </div>
            </article>

            <article className="bg-white/95 rounded-2xl p-4 border border-sky-200/60 shadow-xs flex items-start gap-3.5">
              <span
                className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center flex-shrink-0 font-bold text-sm"
                aria-hidden="true"
              >
                2
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Clothing & Gear</h3>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                  Breathable cotton clothing with UV sunglasses. Pack a light windbreaker for breezy evenings.
                </p>
              </div>
            </article>

            <article className="bg-white/95 rounded-2xl p-4 border border-sky-200/60 shadow-xs flex items-start gap-3.5">
              <span
                className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center flex-shrink-0 font-bold text-sm"
                aria-hidden="true"
              >
                3
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Hydration & Sun</h3>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                  UV Index reaches {currentWeather.uvIndex}. Reapply sunscreen if spending over 30 minutes in direct sunshine.
                </p>
              </div>
            </article>

          </div>
        </aside>

      </main>

      {/* =================================================================== */}
      {/* 5. FOOTER (WCAG Landmark: role="contentinfo")                       */}
      {/* =================================================================== */}
      <footer role="contentinfo" className="bg-sky-950 text-white mt-12 border-t border-sky-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {/* Top Footer 1D Flexbox */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-sky-900">
            
            <div className="flex items-center gap-3">
              <span
                className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-black"
                aria-hidden="true"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                </svg>
              </span>
              <div>
                <span className="text-base font-bold text-white tracking-tight">
                  SkyWatch Meteorology
                </span>
                <p className="text-xs text-sky-300 font-medium">
                  Next.js & React TSX • WCAG 2.2 Accessible Dashboard
                </p>
              </div>
            </div>

            {/* Footer Navigation Links */}
            <nav aria-label="Footer Legal & Accessibility Navigation">
              <ul className="flex flex-wrap items-center gap-4 text-xs font-semibold text-sky-200">
                <li>
                  <a
                    href="#overview"
                    className="hover:text-white focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none rounded p-1 transition-colors"
                  >
                    Accessibility Statement
                  </a>
                </li>
                <li>
                  <a
                    href="#metrics-section"
                    className="hover:text-white focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none rounded p-1 transition-colors"
                  >
                    Sensor Calibration
                  </a>
                </li>
                <li>
                  <a
                    href="#forecast-section"
                    className="hover:text-white focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none rounded p-1 transition-colors"
                  >
                    Synoptic Models
                  </a>
                </li>
                <li>
                  <a
                    href="#advisories-section"
                    className="hover:text-white focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none rounded p-1 transition-colors"
                  >
                    Weather Alerts
                  </a>
                </li>
              </ul>
            </nav>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-sky-300 font-medium gap-3">
            <p>© 2026 SkyWatch Meteorologic Systems. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
              <span>WCAG 2.2 AA Contrast & ARIA Landmarks Verified</span>
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
