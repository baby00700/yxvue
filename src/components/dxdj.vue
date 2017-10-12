<template>
  <p>{{msg}}</p>
</template>
<script>
export default {
  data: function () {
    return {msg: '到校登记'}
  },
  created: function () {
    alert(this.$store.state.loadIFshow)
    // this.$store.commit('changeload', false)
    this.$emit('letrefresh')
  }
}
</script>
