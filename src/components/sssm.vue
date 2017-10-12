<template>
  <p>{{msg}}</p>
</template>
<script>
export default {
  data: function () {
    return {msg: '宿舍扫码'}
  },
  created: function () {
    this.$store.commit('changeload', false)
    // alert(this.$store.state.loadIFshow)
    this.$emit('letrefresh')
  }
}
</script>
