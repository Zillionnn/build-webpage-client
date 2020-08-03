<template>
  <div class="page">
    <v-render></v-render>
  </div>
</template>

<script>
import Vue from 'vue'
import * as api from '@/api'
// import env from '@/config/env'
import {$http} from '@/service/requestService.js'

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
  watch: {
    '$route' (val, old) {
      console.log(val)
      this.selectedPage()
    }
  },
  created () {
    console.log('###########TEMPLATE PAGE################')
    this.selectedPage()
    const _self = this
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
          // 按照tag Name 生成组件
          this.page.components.map(function (e) {
            if (e.info.tagName === 'v-echart') {
              return createElement(e.info.tagName, {
                attrs: {
                  ...e.info.attrs
                },
                props: {
                  // 为了echart 的属性
                  options: e.info.props.options
                },
                style: {
                  ...e.info.style,
                  ...e,
                  top: e.y + 'px',
                  left: e.x + 'px',
                  width: e.width + 'px',
                  height: e.height + 'px',
                  transform: `rotate(${e.rotate}deg)`
                }
              },
              e.info.content)
            } else {
              return createElement(e.info.tagName, {
                attrs: {
                  ...e.info.attrs
                },
                // 组件的props
                props: e.info.props ? e.info.props : {},
                // 样式
                style: {
                  ...e.info.style,
                  ...e,
                  top: e.y + 'px',
                  left: e.x + 'px',
                  width: e.width + 'px',
                  height: e.height + 'px',
                  transform: `rotate(${e.rotate}deg)`
                },
                // event
                on: {
                  changePage: (p) => {
                    _self.doEvent(e, p)
                  },
                  // TODO
                  click: () => {}
                }
              },
              _self.returnChild(e.info))
            }
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
    returnChild (info) {
      console.log(info)
      if (info.hasOwnProperty('dataSource') && info.dataSource) {
        return info.dataSource.data
      } else {
        console.log(info)
        return info.content
      }
    },

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

    // selectedPage (page) {
    //   // this.activePage = page.page_id
    //   console.log(this.$route)
    //   api.base.pageDetail(this.$route.meta.page_id).then(res => {
    //     this.page = res.data.data
    //     this.page.components = this.page.components.map(e => {
    //       return JSON.parse(e)
    //     })
    //   })
    // },
    // 选中一个页面
    async selectedPage (page) {
      const res = await api.base.pageDetail(this.$route.meta.page_id)

      this.page = res.data.data
      const components = [...this.page.components]
      this.page.components = []
      for (let i = 0; i < components.length; i++) {
        const e = components[i]
        const jsonObj = JSON.parse(e)
        // 有数据源
        if (jsonObj.info.dataSource !== undefined && jsonObj.info.dataSource) {
          // 接口method get post delete put
          const method = jsonObj.info.dataSource.method
          // 接口url
          const url = jsonObj.info.dataSource.url

          const r = await $http[method](url)
          jsonObj.info.dataSource.data = r.data
          // 生成数据
          this.generateData(jsonObj, r)

          this.page.components.push(jsonObj)
        } else {
          this.page.components.push(JSON.parse(e))
        }
      }
      // this.page.components = this.page.components.map(e => {
      //   const jsonObj = JSON.parse(e)

      // })
      // for (let i = 0; i < this.page.components.length; i++) {
      //   const e = this.page.components[i]
      // }

      console.log(this.page.components)
    },

    async generateData (component, dataSource) {
      console.log('generateData>>>>>>', component, dataSource)
      // 饼图的数据
      if (component.type.indexOf('pie') > -1) {
        component.info.props.options.series = []

        let serie = {
          name: '',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: dataSource.data.data
        }
        component.info.props.options.series.push(serie)
        console.log('SUB DATA SOURCE PIE', component.info.props.options)
      } else if (component.type.indexOf('chart') > -1) {
        let type = ''
        // 柱状图 
        if (component.type.indexOf('bar') > -1) {
          type = 'bar'
        } else {
          type = 'line'
        }
        // 以下配置echart option
        component.info.props.options.xAxis.data = dataSource.data.map(
          e => {
            return e[0]
          }
        )
        const seriesNameList = component.info.props.options.series.map(e => {
          return e.name
        })
        component.info.props.options.series = []
        const item = dataSource.data[0]
        console.log(item)
        for (let i = 1; i < item.length; i++) {
          const data = dataSource.data.map(e => {
            return e[i]
          })
          let serie = {
            name: seriesNameList[i - 1],
            type: type,
            barWidth: '30%',
            barGap: '0%',
            smooth: true,
            data: data
          }
          component.info.props.options.series.push(serie)
        }
        console.log(component.info.props.options)
      }

      console.log(this.page)
    },

    // TODO 执行event
    doEvent (component, p) {
      // 翻页
      console.log(component)
      if (component.eventList[0].eventType === 1) {
        this.resetData(component, p)
      }
    },

    /**
     * 组件事件重新render data
     */
    resetData (currentBox, p) {
      const method = currentBox.info.dataSource.method
      const url = currentBox.info.dataSource.url + `?offset=${p * 10}&limit=${10}`
      const r = $http[method](url)
      currentBox.info.dataSource.data = r.data
    }
    // ######################### methods#################
  }
}
</script>

<style scoped>
.page{
  position: relative;
  width: 100%;
  box-sizing: border-box;
}
</style>
