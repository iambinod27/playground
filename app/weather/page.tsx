import SearchForm from "./SearchForm";

interface GeoResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    weather_code: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    is_day: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}

async function getCoordinates(city: string): Promise<GeoResult | null> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`,
  );
  const data = await res.json();
  return data.results?.[0] ?? null;
}

async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=7`,
    { next: { revalidate: 1800 } },
  );

  return res.json();
}

function weatherEmoji(code: number, isDay: number = 1) {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if (code <= 3) return isDay ? "⛅" : "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  return "⛈️";
}

function weatherLabel(code: number) {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Scattered showers";
  return "Thunderstorms";
}

function skyClass(code: number) {
  if (code === 0) return "sky-clear-day";
  if (code <= 3) return "sky-cloudy";
  if (code <= 48) return "sky-fog";
  if (code <= 67) return "sky-rain";
  if (code <= 77) return "sky-snow";
  if (code <= 82) return "sky-rain";
  return "sky-storm";
}

export default async function WeatherPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const { city = "Kathmandu" } = await searchParams;
  const location = await getCoordinates(city);

  if (!location) {
    return (
      <main className="sky-cloudy min-h-[calc(100vh-56px)] px-5 sm:px-8 py-10">
        <div className="max-w-xl mx-auto">
          <p className="font-mono text-[11px] tracking-[0.2em] text-white/70 mb-2">
            FORECAST
          </p>
          <h1 className="font-display text-3xl font-semibold text-white mb-5">
            Weather
          </h1>
          <SearchForm />
          <p className="text-white/90 mt-6">
            Couldn&apos;t find &ldquo;{city}&rdquo;. Try a different spelling or a nearby larger city.
          </p>
        </div>
      </main>
    );
  }

  const weather = await getWeather(location.latitude, location.longitude);

  // Find "now" using the city's own local time from the API, not the
  // server's clock — the server may be in a different timezone entirely.
  let nowIndex = weather.hourly.time.indexOf(weather.current.time);
  if (nowIndex === -1) {
    nowIndex = weather.hourly.time.findIndex((t) => t >= weather.current.time);
  }
  if (nowIndex === -1) nowIndex = 0;

  const next24hours = weather.hourly.time
    .map((t, i) => ({
      time: t,
      temp: weather.hourly.temperature_2m[i],
      code: weather.hourly.weather_code[i],
      isDay: weather.hourly.is_day[i],
    }))
    .slice(nowIndex, nowIndex + 24);

  const currentCode = weather.current.weather_code;
  const currentIsDay = weather.hourly.is_day[nowIndex] ?? 1;

  return (
    <main className={`${skyClass(currentCode)} min-h-[calc(100vh-56px)]`}>
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 space-y-10">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-white/70 mb-2">
            FORECAST
          </p>
          <h1 className="font-display text-3xl font-semibold text-white mb-5">
            Weather
          </h1>
          <SearchForm />
        </div>

        <div className="text-center">
          <p className="font-mono text-sm text-white/80">
            {location.name}, {location.country}
          </p>
          <p className="text-7xl my-2">
            {weatherEmoji(currentCode, currentIsDay)}
          </p>
          <p className="text-5xl font-display font-semibold text-white">
            {Math.round(weather.current.temperature_2m)}°C
          </p>
          <p className="text-white/80 mt-1">{weatherLabel(currentCode)}</p>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-white/70 mb-3">
            NEXT 24 HOURS
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 sm:-mx-8 sm:px-8 scrollbar-hide">
            {next24hours.map((h, i) => (
              <div
                key={h.time}
                className="shrink-0 w-16 flex flex-col items-center gap-1.5 bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl py-3"
              >
                <p className="text-xs text-white/70">
                  {i === 0
                    ? "Now"
                    : new Date(h.time).toLocaleTimeString([], {
                        hour: "numeric",
                      })}
                </p>
                <p className="text-xl">{weatherEmoji(h.code, h.isDay)}</p>
                <p className="text-sm font-semibold text-white">
                  {Math.round(h.temp)}°
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-white/70 mb-3">
            7-DAY FORECAST
          </p>
          <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm overflow-hidden">
            {weather.daily.time.map((day, i) => (
              <div
                key={day}
                className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 last:border-b-0"
              >
                <p className="text-sm w-24 text-white/90">
                  {new Date(day).toLocaleDateString([], {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xl">
                  {weatherEmoji(weather.daily.weather_code[i])}
                </p>
                <p className="text-sm text-white/80">
                  {Math.round(weather.daily.temperature_2m_min[i])}° /{" "}
                  {Math.round(weather.daily.temperature_2m_max[i])}°
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}