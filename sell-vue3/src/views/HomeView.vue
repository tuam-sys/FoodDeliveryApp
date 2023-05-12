<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  created() {
    axios.get('/api/data.json').then((res) => {
    // axios.get('http://localhost:8080/mock/data.json').then((res) => {
      console.log(res.data)
    })
  }
}
</script>
