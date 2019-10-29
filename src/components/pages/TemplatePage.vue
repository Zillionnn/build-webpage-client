<template>
  <div class="page">
    {{this.$route.name}}
    <v-render></v-render>
  </div>
</template>

<script>
import Vue from 'vue'
import * as api from '@/api'
// import env from '@/config/env'

export default {
  name: 'TemplatePage',
  components: {},
  data () {
    return {
      page: {
        appId: '',
        name: '',
        components: []
      }
    }
  },

  created () {
    this.selectedPage()
    console.log('###########TEMPLATE PAGE################')
    Vue.component('v-render', {
      render: createElement => {
        console.log('componentInfo')
        console.log(this.page)
        return createElement(
          'div',
          {
            style: {
              position: 'relative',
              width: '100%',
              height: '100%'
            }
          },
          this.page.components.map(function (e) {
            return createElement(e.info.tagName, {
              ...e.info,
              style: {
                ...e.info.style,
                ...e,
                top: e.y + 'px',
                left: e.x + 'px',
                width: e.width + 'px',
                height: e.height + 'px'
              }
            },
            e.info.content)
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
    getPages () {
      api.base
        .appPageList(this.appId)
        .then(res => {
          this.pageList = res.data.data.map(e => {
            return {
              ...e,
              edit: false
            }
          })
        })
        .catch(err => {
          console.error(err)
        })
    },

    selectedPage (page) {
      // this.activePage = page.page_id
      api.base.pageDetail('11').then(res => {
        this.page = res.data.data
        this.page.components = this.page.components.map(e => {
          return JSON.parse(e)
        })
      })
    }
  }
}
</script>

<style scoped>
.page{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
