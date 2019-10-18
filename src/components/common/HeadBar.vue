<template>
 <div class="head-bar">
     <span>{{logo}}</span>
 </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props: {
    logo: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.head-bar{
    width: 100%;
    height: 60px;
    background: rgb(20, 19, 19);
    color: #ffffff;
}
</style>
