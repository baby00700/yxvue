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
  methods: {
    getdata: function () {
      console.log('456')
    }
  }
}
</script>
