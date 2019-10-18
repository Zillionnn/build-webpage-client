<template>
  <div class="page">

     <v-render></v-render>

  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'home',
  components: {},
  data () {
    return {
      webJson: [
        {
          type: 'head-bar',
          event: null
        },
        {
          type: 'v-button',
          event: 'click',
          name: '点击'
        }
      ]
    }
  },
  created () {
    Vue.component('v-render', {
      render: (createElement) => {
        console.log('componentInfo')
        console.log(this.webJson)
        return createElement('div',
          this.webJson.map(function (e) {
            return createElement(e.type, e.name)
          })
        )
      },
      props: {
        componentInfo: {
          type: Object,
          required: true
        }
      },
      mount () {
        console.log('render', 'mou')
      }
    })
  }
}
</script>

<style scoped>
</style>
