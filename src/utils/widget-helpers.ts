/**
 * Map WMO Weather interpretation codes to emoji + description
 * @see https://open-meteo.com/en/docs#weathervariables
 */
export function mapWeatherCode(code: number): { icon: string; description: string }{
  const map: Record<number, { icon: string; description: string }> = {
    0: { icon: '☀️', description: 'Clear Sky' },
    1: { icon: '🌤️', description: 'Mainly Clear' },
    2: { icon: '⛅', description: 'Partly Cloudy' },
    3: { icon: '☁️', description: 'Overcast' },
    45: { icon: '🌫️', description: 'Foggy' },
    48: { icon: '🌫️', description: 'Rime Fog' },
    51: { icon: '🌦️', description: 'Light Drizzle' },
    53: { icon: '🌦️', description: 'Drizzle' },
    55: { icon: '🌧️', description: 'Dense Drizzle' },
    61: { icon: '🌧️', description: 'Light Rain' },
    63: { icon: '🌧️', description: 'Rain' },
    65: { icon: '🌧️', description: 'Heavy Rain' },
    71: { icon: '🌨️', description: 'Light Snow' },
    73: { icon: '🌨️', description: 'Snow' },
    75: { icon: '❄️', description: 'Heavy Snow' },
    80: { icon: '🌦️', description: 'Rain Showers' },
    81: { icon: '🌧️', description: 'Moderate Showers' },
    82: { icon: '⛈️', description: 'Violent Showers' },
    95: { icon: '⛈️', description: 'Thunderstorm' },
    96: { icon: '⛈️', description: 'Thunderstorm + Hail' },
    99: { icon: '⛈️', description: 'Thunderstorm + Heavy Hail' },
  };
  return map[code] || { icon: '🌡️', description: 'Unknown' };
}

/**
 * Compute relative time string like "2 hours ago", "3 days ago"
 */
export function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 30) return `${diffDay}d ago`;
  return `${Math.floor(diffDay / 30)}mo ago`;
}

