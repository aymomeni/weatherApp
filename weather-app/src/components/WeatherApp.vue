<template>
    <v-container>
      <v-row>
        <v-col>
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
            ></gmap-marker>
          </gmap-map>
          </v-card>
        </v-col>
        <v-col>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Calories
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in weatherData"
                :key="item.name"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
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
      weatherData: {
        location: 'N/A',
        condition: 'N/A',
        temperature: 'N/A',
        humidity: 'N/A',
        sunrise: 'N/A',
        sunset: 'Time unavailable',
        windSpeed: 'WindSpeed unabailable',
        windDirection: 'N/A'
      },
      locPlaces: [],
      existingPlace: null
    };
  },
 
  mounted() {
    // this.locateGeoLocation();
    this.getWeatherInformation();
  },
 
  methods: {
    async getWeatherInformation() {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.tempLocation.lat}&lon=${this.tempLocation.lng}&appid=6d78fcf2b6ddf4f00ae680a37639b3d6`;

      const weatherResponse = await axios.get(url);
      console.log('>>> weatherResponse', weatherResponse);
      //res.status(200).json(weatherResponse.data)
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