<template>
<v-container>
    <v-layout>
        <v-flex xs3>
            <v-date-picker v-model="picker" :landscape="landscape" type="month"></v-date-picker>
        </v-flex>
        <v-flex xs9>
        <v-sheet height="500">
            <v-calendar
            color="primary"
            :now="date"
            :value="picker + '-01'"
            :events="events"
            :event-color="getEventColor"
            ></v-calendar>
        </v-sheet>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
        picker: new Date().toISOString().substr(0, 7),
        date: new Date().toISOString().substr(0, 10),
        landscape: false,
        events: [
            {
                name: 'Термопечт №7',
                start: '2019-08-02',
                color: 'red'
            },
            {
                name: 'Термопечт №10',
                start: '2019-08-03',
                color: 'blue'
            },
            {
                name: 'Термопечт №9',
                start: '2019-08-05',
                color: 'orange'
            },
        ],
    }),
    methods: {
        getEventColor (event) {
            return event.color
        }
    }
  }
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>