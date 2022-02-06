<template>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          lg="8"
          xl="8"
        >
          <v-card>
          <gmap-map
              :zoom="5"    
              :center="center"
              style="width:100%;  height: 600px;"
            >
            <gmap-marker
              :key="index"
              v-for="(m, index) in locationMarkers"
              :position="m.position"
              @click="center=m.position"
              :draggable="true"
              :clickable="true"
              @dragend="updateCoordinates"
            ></gmap-marker>
          </gmap-map>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          xl="4"
        >
          <v-simple-table
            dense
            light
          >
            <template v-slot:default>
              <tbody>
                <tr
                  v-for="item in weatherData"
                  :key="item.name"
                >
                  <td>{{ item.type }}</td>
                  <td>{{ item.value }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>

</template>
 
<script>
import axios from 'axios';
import moment from 'moment'

export default {
  name: "WeatherApp",
  data() {
    return {
      center: { 
        lat: 39.7392,
        lng: -104.9903
      },
      tempLocation: { lat: 40.6847488, lng: -111.8928896 },
      locationMarkers: [ { position: { lat: 40.6847488, lng: -111.8928896 } } ],
      weatherData: [],
      locPlaces: [],
      existingPlace: null
    };
  },
 
  mounted() {
    // this.locateGeoLocation();
    this.getWeatherInformation();
  },
 
  methods: {
    updateCoordinates(location) {
      this.tempLocation = {
          lat: location.latLng.lat(),
          lng: location.latLng.lng(),
      };
      this.getWeatherInformation();
    },
    async getWeatherInformation() {
      const url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${this.tempLocation.lat}&lon=${this.tempLocation.lng}&appid=6d78fcf2b6ddf4f00ae680a37639b3d6`;

      const weatherResponse = await axios.get(url);
      console.log('>>> weatherResponse', weatherResponse);
      // TODO: grab relevant info and store in this weather object
      // name of location
      if(weatherResponse.status === 200) {
        this.weatherData = [];
        this.weatherData.push({type: 'Location', value: weatherResponse.data.name});
        this.weatherData.push({type: 'Condition', value: weatherResponse.data.weather[0].description});
        this.weatherData.push({type: 'Temerature', value: weatherResponse.data.main.temp + ' °F'}); // TODO: convert to farenheit
        this.weatherData.push({type: 'Humidity', value: weatherResponse.data.main.humidity + ' %'});
        this.weatherData.push({type: 'Sunrise', value: moment.unix(weatherResponse.data.sys.sunrise).format("HH:mm") + ' am' }); // TODO: convert to local time
        this.weatherData.push({type: 'Sunset', value: moment.unix(weatherResponse.data.sys.sunset).format("HH:mm") + ' pm' });
        this.weatherData.push({type: 'Wind speed', value: weatherResponse.data.wind.speed + ' mph'});
        this.weatherData.push({type: 'Wind direction', value: weatherResponse.data.wind.deg + ' degrees' });
      }

      return ;
    },
    initMarker(loc) {
      this.existingPlace = loc;
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }
    },
    locateGeoLocation: function() {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
      });
    }
  }
};
</script>