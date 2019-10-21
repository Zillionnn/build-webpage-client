<template>
  <div class="page">
    {{this.$route.name}}
    <v-render></v-render>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'TemplatePage',
  components: {},
  data () {
    return {
      webJson: [
        {
          type: 'head-bar'
        },
        {
          type: 'v-button',
          name: '点击',
          property: {
            style: {
              color: 'red',
              fontSize: '14px',
              padding: '10px',
              width: '100px',
              position: 'absolute',
              left: '40px',
              top: '130px'
            },
            on: {
              click: () => {
                alert('click')
              }
            }

          }
        }
      ]
    }
  },

  created () {
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
  }
}
</script>

<style scoped>
</style>
