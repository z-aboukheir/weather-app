export default async function getCity(latitude, longitude) {
  try {
    if (!latitude || !longitude) {
      throw new Error("Latitude and longitude are required");
    }
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=ba6dc7803337496b8c837c2beff3eaa2`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Unable to fetch city");
    }
    const data = await response.json();
    if (!data) {
      throw new Error("geocode data not available");
    }
    const ville =
    data.results[0].components.village  ||  data.results[0].components.municipality  || data.results[0].components.city || data.results[0].components.town
    return ville;
  } catch (error) {
    throw error;
  }
}
