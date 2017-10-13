<template>
  <div id="app">
    <!--<transition  name="custom-classes-transition" enter-to-class="animated flip">-->
      <!--<loading v-if="loadIFshow"/>-->
    <!--</transition>-->
    <loading v-if="loadIFshow"/>
    <div class="header">
      <div class="liucheng-biaoti">
					<div class="liucheng-tubiao"></div>
					<div class="liucheng-wenzi">自助报到流程</div>
			</div>
      <div class="hengxiang">
					<div class="con">
						<div class="main">
							<div class="process">
								<ul class="wizard-steps headeroll">
									 <li v-for="(item,index) in LiuChengNAMEJiHe" class="headerlist"   @click='BackToLiucheng(index)' v-bind:class="{ activeClass2: index === vmLiuchengXH }">
                    <span class="step"  v-bind:class="{ activeClass: index === vmLiuchengXH }">{{index + 1}}</span>
										<span class="title" v-bind:class="{ activeClass1: index === vmLiuchengXH }">{{item}}</span>
                  </li>
								</ul>
							</div>
						</div>
					</div>
				</div>
    </div>
    <div class="router-view content middle">
       <transition  name="custom-classes-transition" enter-to-class="animated flip">
          <router-view @letrefresh="refreshfromvuex"></router-view>
       </transition>
    </div>
    <div class="footer">
      <div class="but" v-if="isshow" @click="gotoNext">下一步</div>
      <div class="gooutbut" v-if="gooutisshow" @click="gotoHome">返回主页</div>
    </div>
  </div>
</template>

<script>
import vue from 'vue'
import resource from 'vue-resource'
import loading from './components/loading'
vue.use(resource)
export default {
  name: 'app',
  data () {
    return {
      LiuChengIDJiHe: [],
      LiuChengNAMEJiHe: [],
      DangQianLiuChengID: '',
      DangQianLiuChengNAME: '',
      DangQianURL: '',
      DangQianLiuChengXH: '',
      isshow: true,
      activeClass: 'activeClass',
      vmLiuchengXH: '',
      loadIFshow: true,
      gooutisshow: false
    }
  },
  components: {
    loading
  },
  created: function () {
    this.$router.push('/dist/')
    this.loadIFshow = this.$store.state.loadIFshow
    var LiuChengJiHeurl = 'https://www.easy-mock.com/mock/59a92b9fe0dc66334198ddf9/example/urlqwerty'
    if (localStorage.LiuChengIDJiHe !== undefined) {
      console.log('已有流程列表数据，无需重新获取')
      this.LiuChengIDJiHe = localStorage.LiuChengIDJiHe.split(',')
      this.LiuChengNAMEJiHe = localStorage.LiuChengNAMEJiHe.split(',')
      var DangQianLiuChengurl = 'https://www.easy-mock.com/mock/59a92b9fe0dc66334198ddf9/example/liucheng'
      this.getDangQianLiuCheng(DangQianLiuChengurl)
    } else {
      console.log('数据为空，需要获取')
      this.getLiuChengJiHe(LiuChengJiHeurl)
    }

    if (window.localStorage.length === 0) {
      var grxxurl = 'http://www.easy-mock.com/mock/59a92b9fe0dc66334198ddf9/example/getgrxx'
      this.getgrxx(grxxurl)
    } else {
      console.log('已有学生信息，无需重新获取')
      var stuinfofromlocal = localStorage.getItem('studentinfo')
      this.$store.commit('addstudentinfo', stuinfofromlocal)
    }
    this.refreshfromvuex()
  },
  methods: {
    getLiuChengJiHe: function (url) {
      this.$http.post(url, {emulateJSON: true}).then(function (data) {
        if (data.body.data.length > 0) {
          var thisdata = data.body.data
          for (var i in thisdata) {
            this.LiuChengIDJiHe.push(thisdata[i].name)
            this.LiuChengNAMEJiHe.push(thisdata[i].name1)
          }
          localStorage.setItem('LiuChengIDJiHe', this.LiuChengIDJiHe)
          localStorage.setItem('LiuChengNAMEJiHe', this.LiuChengNAMEJiHe)
          var DangQianLiuChengurl = 'https://www.easy-mock.com/mock/59a92b9fe0dc66334198ddf9/example/liucheng'
          this.getDangQianLiuCheng(DangQianLiuChengurl)
        } else {
          alert('data is kong')
        }
      }, function (data) {
        alert(data)
      }).catch(function (res) {
        alert(res)
      })
    },
    getDangQianLiuCheng: function (url) {
      this.$http.post(url, {emulateJSoN: true}).then(function (data) {
        if (data.bodyText.length > 0) {
          var thisdata = data.body.data
          this.DangQianLiuChengID = thisdata.name
          this.DangQianLiuChengNAME = thisdata.name1
          this.getDangqianLiuchengXH(this.LiuChengIDJiHe, this.DangQianLiuChengID)
          this.gotoLiucheng()
        } else {
          alert('data is kong')
        }
      })
    },
    getDangqianLiuchengXH: function (items, item) {
      for (var i = 0; i < items.length; i++) {
        if (items[i] === item) {
          this.DangQianLiuChengXH = i
          this.vmLiuchengXH = i
        }
      }
    },
    gotoLiucheng: function () {
      this.DangQianURL = this.$route.path
      this.DangQianURL = this.DangQianURL.substr(1)
      if (this.DangQianURL !== this.DangQianLiuChengID) {
        console.info('不是这个流程,将进行push----》')
        this.$router.push(this.DangQianLiuChengID)
        console.log('》----已经跳转')
        this.loadIFshow = false
      } else {
        console.info('是这个流程')
      }
    },
    gotoNext: function () {
      this.isshow = false
      if (this.DangQianLiuChengXH >= this.LiuChengIDJiHe.length - 1) {
        this.DangQianLiuChengXH = this.LiuChengIDJiHe.length - 1
      } else {
        this.DangQianLiuChengXH++
        this.vmLiuchengXH = this.DangQianLiuChengXH
        this.autoScrollLeft(this.vmLiuchengXH)
      }
      this.$router.push(this.LiuChengIDJiHe[this.DangQianLiuChengXH])
      this.loadIFshow = true
      this.$store.commit('changeload', true)
    },
    BackToLiucheng: function (index) {
      // console.log('index' + index)
      // console.log('liucheng' + this.DangQianLiuChengXH)
      // this.vmLiuchengXH = index
      if (index > this.DangQianLiuChengXH) {
        console.log('noway')
      } else if (index < this.DangQianLiuChengXH) {
        this.$router.push(this.LiuChengIDJiHe[index])
        this.vmLiuchengXH = index
        this.autoScrollLeft(this.vmLiuchengXH)
        this.isshow = false
      } else if (index === this.DangQianLiuChengXH) {
        this.$router.push(this.LiuChengIDJiHe[index])
        this.vmLiuchengXH = index
        this.autoScrollLeft(this.vmLiuchengXH)
        this.isshow = true
      }
    },
    autoScrollLeft: function (liuchengXH) {
      var screenWidth = window.screen.width
      var scrollwidth = screenWidth / 3
      this.$root.$el.children[0].children[1].scrollLeft = scrollwidth * liuchengXH - scrollwidth
    },
    getgrxx: function (url) {
      this.$http.post(url, {emulateJSON: true}).then(function (data) {
        if (data.bodyText.length > 0) {
          var thisdata = data.body.data
          console.log(thisdata)
          thisdata = JSON.stringify(thisdata)
          localStorage.setItem('studentinfo', thisdata)
          this.$store.commit('addstudentinfo', thisdata)
          this.$store.commit('changeload', false)
        } else {
          alert('data is kong')
          this.loadIFshow = false
        }
      }, function (data) {
        alert(data)
      }).catch(function (res) {
        alert(res)
      })
    },
    refreshfromvuex: function () {
      this.loadIFshow = this.$store.state.loadIFshow
      if (this.vmLiuchengXH === this.DangQianLiuChengXH && this.vmLiuchengXH !== this.LiuChengIDJiHe.length - 1) {
        this.isshow = true
      } else if (this.vmLiuchengXH === this.LiuChengIDJiHe.length - 1) {
        this.gooutisshow = true
      }
      console.log(this.loadIFshow)
    },
    gotoHome: function () {
      window.location.href = 'http://www.baidu.com'
    }
  }
}
</script>
<style >
  @import '../static/css/animate.css';
</style>

<style>
*{
  margin:0px;
  padding:0px;
}
/* 挂载点样式 全局 */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.mohu{    /*全剧模糊*/

  position:fixed;
  width:120%;
  height:120%;
  top:-50px;
  left:-50px;
  background-color:rgba(250,250,250,0.4);
  z-index:9998;
  -webkit-filter: blur(10px); /* Chrome, Opera */
  filter: blur(10px);
}

a{
  text-decoration:none;
}

.liucheng-biaoti {
	width: 100%;
	height: 50px;
	border-bottom: 1px solid #eee;
	position: relative;
}

.liucheng-tubiao {
	width: 36px;
	height: 36px;
	border: 1px solid #eee;
	position: absolute;
	left: 10px;
	top: 7px;
	border-radius: 18px;
	background-image:url(../static/img/liuchengtubiao.png);
	-webkit-background-size: 100% 100%;
	background-size:100% 100%;
}

.liucheng-wenzi {
	height: 40px;
	line-height: 40px;
	position: absolute;
	top: 6px;
	left: 55px;
	font-size: 12pt;
}
.hengxiang {
	width: 100%;
	height: 100px;
	background-color: #F9F9F9;

	overflow: scroll;
}

.con {
	width: 200%;
	height: 100px;
}

/*横向滚动 begin*/

li {
	list-style: none;
}

.main {
	width: 100%;
	height: auto;
	overflow: hidden;
}

.process {
	padding: 20px 0px 0px 0px;
}

.wizard-steps {
	display: table;
	width: 100%;
	padding: 0;
	margin: 0;
	position: relative;
}

.wizard-steps li {
	display: table-cell;
	text-align: center;
	width: 1%;

}

.wizard-steps li .step {
	border: 5px solid #ced1d6;
	color: #000;
	font-size: 11pt;
	border-radius: 100%;
	background: #CED1D6;
	position: relative;
	z-index: 2;
	display: inline-block;
	width: 18px;
	height: 18px;
	line-height:20px;
	text-align: center;

}

.wizard-steps li:before {
	display: block;
	content: "";
	width: 100%;
	height: 1px;
	font-size: 10pt;
	overflow: hidden;
	border-top: 5px solid #ced1d6;
	position: relative;
	top: 17px;
	z-index: 1;
}

.wizard-steps li:last-child:before {
	max-width: 50%;
	width: 50%;
}

.wizard-steps li:first-child:before {
	max-width: 50%;
	left: 50%;
}


.wizard-steps li.complete:hover:before {
	border-color: #80afd4;
}

.wizard-steps li .title {
	display: block;
	margin-top: 4px;
	max-width: 100%;
	color: #000;
	font-size: 14px;
	z-index: 104;
	text-align: center;
	table-layout: fixed;
	word-wrap: break-word;
}

.wizard-steps li.gaoliang:before{
	border-top: 5px solid #1296DB;
	display: block;
	content: "";
	width: 100%;
	height: 1px;
	font-size: 10pt;
	overflow: hidden;
	position: relative;
	top: 17px;
	z-index: 1;
}
/*end*/

.middle{
  width:100%;
  border:1px solid #eee;
  font-size:30px;
  line-height:30px;
  margin-top:30px;
  background-color:rgba(255,0,0,0.3)
}

.footer{
  width:100%;
  height: 42px;


}

.activeClass{
  background-color:#1296db !important;
  border-color:#1296db !important;
  color:#fff !important;
}


.activeClass1{
  color:#1296db !important;
}

.activeClass2:before{
  border-top: 5px solid #1296DB !important;
}



.but{
  width:80%;
  margin:0 auto;
  height: 40px;
  margin-top:50px;
  background-color:#1979CA;
  border-radius:5px;
  text-align:center;
  color:#fff;
  font-size:18px;
  line-height:40px;
  -webkit-box-shadow:3px 2px 15px 1px rgba(0,0,0,0.4);
}
.but:active{
  -webkit-box-shadow:1px 1px 3px 1px rgba(0,0,0,0.2);
}


.gooutbut{
  width:80%;
  margin:0 auto;
  height: 40px;
  margin-top:50px;
  background-color:#1979CA;
  border-radius:5px;
  text-align:center;
  color:#fff;
  font-size:18px;
  line-height:40px;
  -webkit-box-shadow:3px 2px 15px 1px rgba(0,0,0,0.4);
}
.gooutbut:active{
  -webkit-box-shadow:1px 1px 3px 1px rgba(0,0,0,0.2);
}

</style>
