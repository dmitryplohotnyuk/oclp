<template>
  <v-container fluid grid-list-md>
    <v-layout align-center justify-center>
      <v-flex text-xs-center xs9>
        <v-alert :value="true" type="warning" v-if="error">{{error}}</v-alert>
      </v-flex>
    </v-layout>

    <v-layout align-center justify-center>
      <v-flex xs3>
        <v-select
          v-model="termoPech"
          @change="resetStatus"
          :items="terms"
          label="Выбор термопечи"
          outline
        ></v-select>
      </v-flex>
      <v-flex xs3>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Выбор даты"
              prepend-icon="mdi-event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" locale="RU" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Отмена</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs2>
        <v-btn :disabled="accessButton" @click="loadData(payload)" text class="primary">Загрузить</v-btn>
      </v-flex>
    </v-layout>

    <v-layout align-center justify-center wrap v-if="reportStatus">
      <v-flex xs5 v-for="(item,i) in dataTerm" :key="i">
        <v-card>
          <v-card-text>
            <b>Термопара №{{item.name}}</b>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-layout mb-2>
                <v-flex>Стандартная диаграмма:</v-flex>
                <v-flex>
                  <v-btn @click="printPage(item.name, false)">
                    <v-icon>mdi-printer-settings</v-icon>Печать
                  </v-btn>
                  <v-btn @click="openPage(item.url)">
                    <v-icon>mdi-folder-open-outline</v-icon>Открыть
                  </v-btn>
                </v-flex>
              </v-layout>
              <hr />
              <v-layout mt-2>
                <v-flex>Увеличенная диаграмма:</v-flex>
                <v-flex>
                  <v-btn @click="printPage(item.name, true)">
                    <v-icon>mdi-printer-settings</v-icon>Печать
                  </v-btn>
                  <v-btn @click="openPage(item.urlZoom)">
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
    this.date = new Date(new Date() - 24 * 3600 * 1000).toISOString().substr(0, 10);
  },
  data() {
    return {
      terms: [
        { text: "Термопечь №7", value: "7" },
        { text: "Термопечь №9", value: "9" },
        { text: "Термопечь №10", value: "10" }
      ],
      date: null,
      menu: false,
      termoPech: null
    };
  },
  computed: {
    accessButton() {
      return this.termoPech == null ? true : false;
    },
    payload() {
      return {
        pech: this.termoPech,
        date: this.date
      };
    },
    ...mapGetters("singleReport", [
      "reportStatus",
      "error",
      "dataTerm",
      "frameUrl"
    ])
  },
  methods: {
    ...mapActions({
      loadData: "singleReport/LOAD_DATA",
      resetStatus: "singleReport/RESET_STATUS"
    }),
    printPage(termopara, zoom) {
      let url = this.frameUrl;
      url += "?zoom=" + zoom;
      url += "&pech=" + this.termoPech;
      url += "&date=" + this.date;
      url += "&termopara=" + termopara;
      let printPage = window.open(url);
      printPage.print();
    },
    openPage(url) {
      window.open(url);
    }
  },
  watch: {
    date() {
      this.resetStatus();
    }
  }
};
</script>
