<template>
  <v-app id="app">
    <v-app-bar dense app elevation="4">
      <v-app-bar-icon><v-icon class="mr-2">mdi-cloud-outline</v-icon></v-app-bar-icon>
      <v-app-bar-title>WeatherApp</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <WeatherApp/>
    </v-main>
  </v-app>
</template>

<script>
import WeatherApp from './components/WeatherApp';

export default {
  name: 'App',
  components: {
    WeatherApp,
  },
  data: () => ({ }),
};
</script>

<style>
#app {
   background-color: #E0E0E0;
}
</style>
