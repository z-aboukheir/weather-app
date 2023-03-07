export default async function weatherApi(latitude, longitude) {
  try {
    if (!latitude || !longitude) {
      throw new Error("Latitude and longitude are required");
    }
    const api = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&past_days=5`;
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }
    const data = await response.json();
    if (!data) {
      throw new Error("Weather data not available");
    }
    return data;
  } catch (error) {
    throw error;
  }
}
