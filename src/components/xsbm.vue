<template>
  <div>
   {{msg}}
  </div>
</template>
<script>
export default {
  data: function () {
    return { msg: '新生报名' }
  },
  created: function () {
    this.$store.commit('changeload', false)
    // alert(this.$store.state.loadIFshow)
    this.$emit('letrefresh')
  },
  methods: {
    getdata: function () {
      console.log('456')
    }
  }
}
</script>
