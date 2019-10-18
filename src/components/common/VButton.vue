<template>
  <button class="v-button" @click="doClick()">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'VButton',
  components: {},
  data () {
    return {}
  },
  methods: {
    doClick () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.v-button {
  outline: none;
  border: 0;
}
</style>
