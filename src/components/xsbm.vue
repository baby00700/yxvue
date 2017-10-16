<template>
  <div class="spage">
    <div class="xinxibiaoti">
      <div class="xinxi-tubiao"></div>
      <div class="xinxi-wenzi">完善个人基本信息</div>
    </div>
    <div class="biao-xinxi">
      <div class="biao-con">
        <ul>
          <li class="xinxi-list"><span class="xinxi-title">考生号</span><span class="xinxi-con">20160302102</span></li>
          <li class="xinxi-list"><span class="xinxi-title">姓名</span><span class="xinxi-con">张三</span></li>
          <li class="xinxi-list"><span class="xinxi-title">性别</span><span class="xinxi-con">女</span></li>
          <li class="xinxi-list"><span class="xinxi-title">录取学院</span><span class="xinxi-con">软件工程学院</span></li>
          <li class="xinxi-list"><span class="xinxi-title">录取专业</span><span class="xinxi-con">计算机信息管理</span></li>
          <li class="xinxi-list"><span class="xinxi-title">身份证号</span><span class="xinxi-con">360121199812147786</span></li>
          <li class="xinxi-list"><span class="xinxi-title">出生日期</span><span class="xinxi-con">19981214</span></li>
          <li class="xinxi-list"><span class="xinxi-title">政治面貌</span><span class="xinxi-con">共青团员</span></li>
          <li class="xinxi-list"><span class="xinxi-title">是否单招</span><span class="xinxi-con">否</span></li>
          <li class="xinxi-list"><span class="xinxi-title">培养层次</span><span class="xinxi-con">培养层次</span></li>
        </ul>
      </div>
    </div>
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

<style scoped>
  .spage{
    width:100%;
    position:relative;
  }

  .xinxibiaoti{
    width: 100%;
    height: 50px;
    border-top: 1px solid #eee;

    position: relative;
    margin-top:15px;
    background-color:#fff;
  }
  .xinxi-tubiao{
    width: 36px;
    height: 36px;
    border: 1px solid #eee;
    position: absolute;
    left: 10px;
    top: 7px;
    border-radius: 18px;
    background-image:url(../../static/img/wanshanxinxi.png);
    -webkit-background-size: 100% 100%;
    background-size:100% 100%;
  }

  .xinxi-wenzi{
    height: 40px;
    line-height: 40px;
    position: absolute;
    top: 6px;
    left: 55px;
    font-size: 12pt;
  }

  .biao-xinxi{

    border:1px solid #eee;
  }

  .xinxi-list{
    display: block;
    width:100%;
    height:45px;
    border-bottom:1px solid #eee;
    background-color:#fff;
    color:#555;
  }
  .xinxi-title{
    line-height:45px;
    margin-left:10px;
    font-size:11pt;
    float:left;
  }
  .xinxi-con{
    line-height:45px;
    float: right;
    margin-right:10px;
    font-size:11pt;
  }
</style>
