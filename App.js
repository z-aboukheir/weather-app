import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import weatherCodeImg from "./functions/weatherCodeImg";
import weatherApi from "./services/weatherApi";
import locationApi from "./services/locationApi";
import getCity from "./services/getCity";

export default function App() {
  const [weatherData, setWeatherData] = useState({});
  const [errorLocation, setErrorLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [error404, setError404] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // (async () => {
    try {
      locationApi().then((location) => {
         getCity(
          location.coords.latitude,
          location.coords.longitude
        ).then((city)=>setCity(city))
        weatherApi(location.coords.latitude, location.coords.longitude).then(
          (data) => {
            setWeatherData(data);
            setLoading(false);
          }
        );
      });
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      if (error.message == "Permission to access location was denied")
        setErrorLocation(true);
      if (!errorLocation) setError404(true);
    }
    // })();
  }, []);

  console.log(weatherData);

  if (loading)
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <Text>Waiting...</Text>
      </SafeAreaView>
    );

  if (errorLocation)
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <Text> {errorLocation}</Text>
      </SafeAreaView>
    );

  if (error404)
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <Text>Erreur 404</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Text style={styles.texte}>{city}</Text>
      <Text style={styles.texte}>
        Température actuelle: {weatherData.current_weather.data[0]}°C
      </Text>
      <Text style={styles.texte}>
        {/*{weatherCodeImg(weatherData.daily.weathercode[1])}°C */}
      </Text>
      {/* <Text style={styles.texte}>
            Température maximale: {weatherData.daily[0].max_temperature}°C
          </Text>
          <Text style={styles.texte}>
            Température minimale: {weatherData.daily[0].min_temperature}°C
          </Text>       */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    // paddingTop: 40,
    // paddingLeft: 10,
  },
  titre: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  texte: {
    fontSize: 18,
    marginBottom: 8,
  },
});
