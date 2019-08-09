<template>
  <v-app>
    <app-header></app-header>
    <v-content>
        <router-view/>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppHeader from './views/AppHeader.vue';
import AppFooter from './views/AppFooter.vue';
export default {
  components: {
    AppHeader,
    AppFooter
  }
}

</script>
