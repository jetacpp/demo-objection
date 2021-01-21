<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
const { Model } = require('objection');
// import {remote} from 'electron'
const {remote} = window.require('electron')
const Person = require('./Person')
const Movie = require('./Movie')

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    Model.knex(remote.getGlobal('knex'));

    // eslint-disable-next-line no-unused-vars
    async function demo() {
      await Person.query().insert({id: 1, firstName: 'peter', lastName: 'chao'})
      await Movie.query().insert({id: 2, name: 'epic'})

      const peter = await Person.query().findById(1)
      await peter.$relatedQuery('movies').relate(2).then(n => console.log('peter -> epic', n))
      await Person.query().findById(1).withGraphFetched('movies').then( p => console.log(p))

      await Movie.query().insert({id: 3, name: 'titan'})
      await Person.query().findById(1).withGraphFetched('movies').then( p => console.log(p))
    }


    demo()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
