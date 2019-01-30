
<template>
    <q-layout class="column justify-center ">
        <h5 class="row col-10 text-center justify-center text-weight-bold">Weather of 5 cities with High and Low Temperature for the last 24h</h5>
        <div class="row justify-center gutter-md q-pa-md">
          <city v-for="(city,$index) in cities" :key="$index" :city="city" @updated="getCurrent(city.name)"/>
        </div>
    </q-layout>
</template>

<script>
import city from '../components/city'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/database'

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'bookmrk-ntttam.firebaseapp.com',
  databaseURL: 'https://bookmrk-ntttam.firebaseio.com/',
}
firebase.initializeApp(config)
// Get a reference to the database service
var database = firebase.database()
export default {
  components: {city},
  data () {
    return {
      // initialize City data with coordinates and images
      cities: [
        {
          name: 'Tokyo',
          lat: '35.6584421',
          lon: '139.7328635',
          temp: '',
          lTemp: '',
          hTemp: '',
          lastUpdate: '',
          image: require('../assets/Tokyo.jpg')
        },
        {
          name: 'Helsinki',
          lat: '60.1697530',
          lon: '24.9490830',
          temp: '',
          lTemp: '',
          hTemp: '',
          lastUpdate: '',
          image: require('../assets/Helsinki.jpg')
        },
        {
          name: 'New York',
          lat: '40.7406905',
          lon: '-73.9938438',
          temp: '',
          lTemp: '',
          hTemp: '',
          lastUpdate: '',
          image: require('../assets/NY.jpg')
        },
        {
          name: 'Amsterdam',
          lat: '52.3650691',
          lon: '4.9040238',
          temp: '',
          lTemp: '',
          hTemp: '',
          lastUpdate: '',
          image: require('../assets/Amsterdam.jpg')
        },
        {
          name: 'Dubai',
          lat: '25.092535',
          lon: '55.1562243',
          temp: '',
          lTemp: '',
          hTemp: '',
          lastUpdate: '',
          image: require('../assets/Dubai.jpg')
        }
      ]
    }
  },
  name: 'weather',
  methods: {
    // Get weather data from openWeather Api
    getCurrent (name) {
      var vm = this
      var lastUpdate = new Date().getTime()
      vm.cities.forEach(city => {
        if (city.name === name) {
          axios
            .get('https://www.ntttam.com/weatherFive/'+city.name)
            .then(res => {
              const data = JSON.parse(res.data.body)
              // get current Temperature from API
              city.temp = Math.round(data.main.temp)
              city.lastUpdate = vm.convertMilisecondsToDate(lastUpdate)
              // insert into database
              firebase
                .database()
                .ref(city.name + '/')
                .push()
                .set({
                  time: lastUpdate,
                  temp: city.temp
                })
              // get Highest and Lowest Temperature from database
              city = this.get_High_Low_Temp(city.name, lastUpdate, city)
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    // convert to date and time from milisecond
    convertMilisecondsToDate (miliseconds) {
      var result
      var fullDate = new Date(miliseconds)
      result =
        fullDate.getHours() +
        ':' +
        fullDate.getMinutes() +
        ':' +
        fullDate.getSeconds() +
        ' on ' +
        fullDate.getDate() +
        '/' +
        (fullDate.getMonth() + 1) +
        '/' +
        fullDate.getFullYear()
      return result.toString()
    },
    // Calculate highest and lowest temperatures within 24 hours
    get_High_Low_Temp (name, time, c) {
      var city = c
      database.ref(name + '/').on('value', snapshots => {
        var time24hour = 1000 * 60 * 60 * 24 // 24 hours in miliseconds
        var highest = c.temp
        var lowest = c.temp
        snapshots.forEach(snapshot => {
          // Lowest Temp
          if (
            snapshot.val().time >= time - time24hour &&
            snapshot.val().temp < lowest
          ) {
            lowest = snapshot.val().temp
          }
          // Highest Temp
          if (
            snapshot.val().time >= time - time24hour &&
            snapshot.val().temp > highest
          ) {
            highest = snapshot.val().temp
          }
        })
        city.lTemp = lowest
        city.hTemp = highest
        return city
      })
    },

    get_latest_update () {
      var vm = this
      // Load latest entry from the database of each city
      vm.cities.forEach(city => {
        firebase
          .database()
          .ref(city.name + '/')
          .orderByChild('time')
          .limitToLast(1)
          .once('value')
          .then(snapshots => {
            snapshots.forEach(snap => {
              city.temp = snap.val().temp
              city.lastUpdate = vm.convertMilisecondsToDate(snap.val().time)
              city = vm.get_High_Low_Temp(city.name, snap.val().time, city)
            })
          })
      })
    },
  },
  mounted () {
    this.get_latest_update()
    console.log(process.env.KEY)
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
