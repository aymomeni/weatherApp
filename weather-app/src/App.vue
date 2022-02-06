<template>
  <v-app id="app">
    <!-- <v-app-bar
      app
      color="secondary"
      dark
      hidden
    >
    <v-spacer></v-spacer>
    </v-app-bar> -->

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

  data: () => ({
    //
  }),
};
</script>

<style>

#app {
   background-color: #E0E0E0;
}
 
</style>
