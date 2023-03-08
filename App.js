import { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
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

    locationApi()
      .then((location) => {
        getCity(location.coords.latitude, location.coords.longitude).then(
          (city) => setCity(city)
        );
        weatherApi(location.coords.latitude, location.coords.longitude).then(
          (data) => {
            setWeatherData(data);
            setLoading(false);
          }
        );
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        if (error.message == "Permission to access location was denied")
          setErrorLocation(true);
        if (!errorLocation) setError404(true);
      });
  }, []);

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
    <View style={styles.SafeAreaView}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.title}> {city}</Text>
            {weatherData.current_weather &&
              weatherData.current_weather.weathercode && (
                <Image
                  source={{
                    uri: weatherCodeImg(
                      weatherData.current_weather.weathercode
                    ),
                  }}
                  style={{ width: 100, height: 100 }}
                />
              )}
          </View>
          <Text style={{ fontSize: 40 }}>
            {weatherData.current_weather &&
              weatherData.current_weather.temperature}
            °C
          </Text>
        </View>
        <Text style={[styles.text, { textAlign: "center", paddingTop: 10 }]}>
          Meteo sur 7 jours:
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>Aujoud'hui</Text>

          {weatherData.current_weather &&
            weatherData.daily.temperature_2m_max && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri: weatherCodeImg(
                      weatherData.current_weather.weathercode
                    ),
                  }}
                  style={styles.image}
                />
                <Text>
                  {" "}
                  {weatherData.daily.temperature_2m_max[0]}°C /{" "}
                  {weatherData.daily.temperature_2m_min[0]}°C
                </Text>
              </View>
            )}
        </View>
        <View style={{flexDirection: "row"}}>
        {weatherData && weatherData.hourly && (
          <FlatList
            data={weatherData.hourly.time}
            renderItem={({ item, index }) => (
              <>
                <View style={{ flexDirection: "row"}}>
                  <Text style={{fontWeight:"bold"}}> {new Date(item).toLocaleDateString()} {""}</Text>
                 
                  <Text>
                    {new Date(item).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </>
            )}
            style={styles.containerlistContent}
          />
        )}

{weatherData && weatherData.hourly && (
          <FlatList
            data={weatherData.hourly.temperature_2m}
            renderItem={({ item, index }) => (
              <>
               <Text>{item}°C</Text>
              </>
            )}
            style={styles.containerlistContent}
          />
        )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    // alignItems: "center",
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 20,
  },
  image: {
    width: 70,
    height: 70,
  },
});
