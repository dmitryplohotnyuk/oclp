<template>
  <div>
    <v-toolbar dark class="primary">
      <v-toolbar-title>
        <v-icon>mdi-atom</v-icon>
        ПАО "КСЗ"
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/" class="primary">
           Архив диаграм
        </v-btn>
      </v-toolbar-items>
       <v-toolbar-items>
        <v-btn to="/realtime" class="primary">
           В реальном времени
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {};
</script>