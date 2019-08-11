<template>
  <v-container fluid grid-list-md>
    <v-layout align-center justify-center>
      <v-flex text-xs-center xs9>
        <v-alert :value="true" type="warning" v-if="error">{{error}}</v-alert>
      </v-flex>
    </v-layout>

    <v-layout align-center justify-center>
      <v-flex xs3>
        <v-select v-model="termoPech" :items="terms" label="Выбор термопечи" outline></v-select>
      </v-flex>
    </v-layout>

    <v-layout align-center justify-center wrap v-if="termoPech">
      <v-flex xs5 v-for="(item,i) in data" :key="i">
        <v-card>
          <v-card-text>
            <b>Термопара №{{item.name}}</b>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-layout mb-2>
                <v-flex>Стандартная диаграмма:</v-flex>
                <v-flex>
                  <v-btn @click="openPage(item.name, false)">
                    <v-icon>mdi-folder-open-outline</v-icon>Открыть
                  </v-btn>
                </v-flex>
              </v-layout>
              <hr />
              <v-layout mt-2>
                <v-flex>Увеличенная диаграмма:</v-flex>
                <v-flex>
                  <v-btn @click="openPage(item.name, true)">
                    <v-icon>mdi-folder-open-outline</v-icon>Открыть
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  created() {
      this.loadTerms();
  },
  data() {
    return {
      termoPech: null
    };
  },
  computed: {
    ...mapGetters("realTime", ["error", "data", "terms", "frameUrl"])
  },
  methods: {
    ...mapActions({
      loadTerms: "realTime/LOAD_TERMS"
    }),
    openPage(termopara, zoom) {
      let url = this.frameUrl;
      url += "?zoom=" + zoom;
      url += "&task=data";
      url += "&pech=" + this.termoPech;
      url += "&termopara=" + termopara;
      window.open(url);
    }
  }
};
</script>
