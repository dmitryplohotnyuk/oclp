<template>
   <v-container fluid grid-list-md>
     <v-layout align-center justify-center>
      <v-flex text-xs-center xs12>
        <v-alert :value="true" type="warning" v-if="error">
          {{error}}
        </v-alert>
      </v-flex>
    </v-layout>

    <v-layout align-center justify-center>
      <v-flex xs3>
        <v-select
          v-model="termoPech"
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
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Отмена</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs2>
         <v-btn  :disabled="accessButton" @click="loadData" text class="primary">Загрузить</v-btn>
      </v-flex>
    </v-layout>

    <v-layout align-center justify-center wrap>
        <v-flex xs5 v-for="(item,i) in dataTerm"
            :key="i">
           <v-card>
              <v-card-text>
                <b>{{item.name}}</b>
              </v-card-text>
              <v-card-actions>
                <v-container>
                  <v-layout>
                    <v-flex>Стандартная диаграмма:</v-flex>
                    <v-flex>
                      <v-btn @click="printPage(item.url)">
                        <v-icon>mdi-printer-settings</v-icon>Печать
                      </v-btn>
                      <v-btn @click="openPage(item.url)">
                        <v-icon>mdi-folder-open-outline</v-icon>Открыть
                      </v-btn>
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex>Увеличенная диаграмма:</v-flex>
                    <v-flex>
                      <v-btn @click="printPage(item.urlZoom)">
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

    <v-layout align-center justify-center v-show="false">
      <v-flex text-xs-center xs9>
        <v-expansion-panels multiple>
          <v-expansion-panel
            v-for="(item,i) in dataTerm"
            :key="i"
          >
            <v-expansion-panel-header><b>{{item.name}}</b></v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-layout>
                <v-flex>
                  Стандартная диаграмма:
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex>
                  Увеличенная диаграмма:
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-flex>
    </v-layout>

   </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      terms: [
        { text: "Термопечь №7", value: "7" },
        { text: "Термопечь №9", value: "9" },
        { text: "Термопечь №10", value: "10" }
      ],
      date: new Date(new Date() - 24*3600*1000).toISOString().substr(0, 10),
      menu: false,
      termoPech: null,
      dataTerm: [
        {
          name: 'Термопара №1',
          url: 'http://localhost:8080',
          urlZoom: 'http://emmielba.ddns.net/api/'
        },
        {
          name: 'Термопара №2',
          url: 'url',
          urlZoom: 'url-zoom'
        },
        {
          name: 'Термопара №3',
          url: 'url',
          urlZoom: 'url-zoom'
        },
        {
          name: 'Термопара №4',
          url: 'url',
          urlZoom: 'url-zoom'
        }
      ]
    }
  },
  computed: {
      accessButton() {
        return this.termoPech == null ? true : false
      },
      ...mapGetters('singleReport', [
      'reportStatus',
      'error'
      ])
  },
  methods: {
    printPage(url) {
      let windowForPrint = window.open(url);
      windowForPrint.print();
    },
    openPage(url) {
      window.open(url);
    },
    loadData() {
      this.$store.dispatch('singleReport/LOAD_STATUS', null, { root: true });
    },
  }
}
</script>
