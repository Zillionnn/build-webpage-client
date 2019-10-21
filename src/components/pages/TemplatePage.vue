<template>
  <div class="page">
    {{this.$route.name}}
    <v-render></v-render>
  </div>
</template>

<script>
import Vue from 'vue'
import {$http} from '@/service/requestService.js'

export default {
  name: 'TemplatePage',
  components: {},
  data () {
    return {
      webJson: []
    }
  },

  created () {
    this.getWebJson()
    console.log('###########TEMPLATE PAGE################')
    Vue.component('v-render', {
      render: createElement => {
        console.log('componentInfo')
        console.log(this.webJson)
        return createElement(
          'div',
          this.webJson.map(function (e) {
            return createElement(e.type, {...e.property}, e.name)
          })
        )
      },
      props: {
        componentInfo: {
          type: Object,
          required: false
        }
      },
      mount () {
        console.log('render', 'mou')
      }
    })
  },

  methods: {
    getWebJson () {
      $http.get('http://127.0.0.1:3000/api/v1/webjson')
        .then(res => {
          this.webJson = res.data.data
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>
</style>
