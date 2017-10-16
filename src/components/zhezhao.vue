<template>
  <p>{{msg}}</p>
</template>
<script>
  export default {
    data: function () {
      return {msg: 'zhezhao  nonono'}
    },
    created:  function () {
      this.$store.commit('changeload', false)
      this.$emit('letrefresh')
    }
  }
</script>
