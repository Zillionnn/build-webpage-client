<template>
  <div>
    <table>
      <tr style="background:#cccccc;">
        <th v-for="(field,index) in data.list[0]" :key="index">系列{{index+1}}</th>
      </tr>
      <tr v-for="(row,index) in data.list" :key="index">
        <td v-for="(item, index) in row" :key="index">{{item}}</td>
      </tr>
    </table>
    <el-pagination
      v-if="showPagination"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      style="float:right;"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'VTable',
  components: {},
  props: {
    data: {
      type: Array,
      required: true,
      default: () => {
        return {
          total: 3,
          list: [
            [1, 2, 3],
            [3, 2, 3],
            [5, 7, 78]
          ]
        }
      }
    },
    // 配置信息
    showPagination: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      pagination: {
        currentPage: 1,
        total: this.data.total,
        pageSize: 10
      }
    }
  },
  methods: {
    // TODO 翻页
    handleCurrentChange (p) {
      this.$emit('changePage', p)
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  box-sizing: border-box;
}
tr {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
}
tr:nth-child(odd) {
  background: #e4e2e2;
}
th,
td {
  text-align: center;
}
</style>
