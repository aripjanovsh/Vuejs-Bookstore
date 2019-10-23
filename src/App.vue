<template>
  <v-app>
    <Header />
    <v-container>
      <v-content transition="slide-x-transition">
        <router-view></router-view>
      </v-content>
    </v-container>

  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
  name: 'App',
  components: {
    Header
  }
};
</script>
