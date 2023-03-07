import * as GetLocation from "expo-location";

export default async function locationApi() {
  try {
    let { status } = await GetLocation.requestForegroundPermissionsAsync();
    if (status !== "granted") {
		throw new Error("Permission to access location was denied");
    }

   const location =  GetLocation.getCurrentPositionAsync(
	{},
   )
	return location
  } catch (error) {
	if (error.code === "PERMISSION_DENIED") {
		throw new Error("Permission to access location was denied");
	  } else if (error.code === "TIMEOUT") {
		throw new Error("Location request timed out");
	  } else {
		throw new Error("An error occurred while fetching location data");
	  }  }
}


