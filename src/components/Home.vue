<template>
  <!-- 主页面，会跳转显示Welcome.vue的内容 -->
  <!-- 容器 -->
  <el-container class="home_container">
    <!-- 导航栏顶部 -->
    <el-header>
      <el-row id="header_row">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" id="header_title">
          <h1 class="home_title">人事管理系统</h1>
        </el-col>
        <el-col :xs="16" :sm="18" :md="20" :lg="21" :xl="23" id="header_text">
          <div style="text-align:right">
            欢迎{{User}}登录：
            <el-button type="info" @click="Logout" id="exit">安全退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- 左侧导航栏和右侧主页面容器 -->
    <el-container>
      <!-- 左侧导航栏 -->
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="HandleOpen"
              @close="HandleClose"
              text-color="black"
              active-text-color="#ffd04b"
              :router="true"
              :unique-opened="true"
            >
              <!-- 测试 -->

              <!-- 招聘主管 -->
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>招聘管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/personnelrecords">员工资料</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <!-- 人事主管 -->
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span>人事管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/employeeappraisal">员工考评</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/employeerewards">员工奖惩</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/employeetrain">员工培训</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/employeeadjustsalary">员工调薪</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/employeeremove">员工调动</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <!-- 薪资主管 -->
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-money"></i>
                  <span>薪资管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/payrollbook">工资账套管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/payroll">工资表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <!--部门经理  -->
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-office-building"></i>
                  <span>部门管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/departmentinfo">部门信息</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/positioninfo">岗位信息</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/joblevel">工作等级</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <!-- 统计主管 -->
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-s-data"></i>
                  <span>统计管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/comprehensiveInfostatistics">综合信息统计</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/personnelinfomation">人事信息管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/personnelrecordstatistics">人事记录统计</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <!-- 系统管理 -->
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>系统管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/system">系统管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/operator">操作员管理管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/operationlog">操作日志管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/basicinformation">基础信息设置</el-menu-item>
                </el-menu-item-group>
                
              </el-submenu>

              <!-- 部门管理 -->
              <!-- <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>部门管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/department">部门信息管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/deptransfer">员工部门调动</el-menu-item>
                </el-menu-item-group>
              </el-submenu>-->
              <!-- 岗位管理 -->
              <!-- <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>岗位管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/station">岗位信息管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/statransfer">员工岗位调动</el-menu-item>
                </el-menu-item-group>
              </el-submenu>-->
              <!-- 入职管理 -->
              <!-- <el-submenu index="3" :unique-opened="true">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>入职管理</span>
                </template>
                <el-menu-item index="/try">员工试用期管理</el-menu-item>
                <el-menu-item index="/employee">员工入职信息</el-menu-item>
                <el-menu-item index="/dismission">员工离职管理</el-menu-item>
              </el-submenu>-->
              <!-- 报表管理 -->
              <!-- <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span slot="title">报表管理</span>
                </template>
                <el-menu-item index="/newemployeestate">新聘员工报表</el-menu-item>
                <el-menu-item index="/disemployeestate">离职员工报表</el-menu-item>
                <el-menu-item index="/deptransferstate">部门调动员工报表</el-menu-item>
                <el-menu-item index="/statransferstate">岗位调动员工报表</el-menu-item>
                <el-menu-item index="/monthlystate">人事月报</el-menu-item>
              </el-submenu>-->
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 主页面 -->
      <el-main style="padding-bottom:0px">
        <router-view :key="$route.fullPath"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      User: "User",
    };
  },
  methods: {
    // 退出
    Logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
      this.$message.success("退出成功");
    },
    HandleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    HandleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  // watch:{
  //     "$route" (to,from){
  //       console.log(to.path);
  //       console.log(from.path);

  //     }
  //   },
};
</script>
<style lang='less' scoped>
// 容器
.home_container {
  height: 100%;
  background-image: url(../assets/home.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
// 顶部栏
.el-header,
.el-footer {
  // background-color: #b3c0d1;
  color: #333;
  padding-left: 30px;
  padding-right: 0px;
  // text-align: center;
  line-height: 60px;
  //响应使布局容器
  #header_row {
    // border-bottom: 4px double black;
  }
  //“人事管理系统”
  .home_title {
    margin: 0px;
    width: 179px;
    // border-right: 1px solid;
    margin-right: 0px;
    display: inline;
  }
  //“欢迎登陆和按钮”
  #header_text {
    border-left: 3px double black;
    border-bottom: 3px double black;
    border-radius: 0 0 0 15px;
  }
  // #header_exit{

  //   border-bottom: 1px solid black;
  // }
}
// 左侧导航栏
.el-aside {
  // background-color: white;
  color: #333;
  text-align: center;
  line-height: 200px;
  background-color: rgba(230, 230, 230, 0.192);
  //  border: 2px solid;
  box-shadow: 5px 5px 5px rgb(190, 190, 190);
  //菜单栏
  .el-menu {
    border-right: none;
    background-image: url(../assets/home.jpg);
    background-color: rgba(230, 230, 230, 0.199);
    // .el-menu-item{
    //   // background-image: url(../assets/home.jpg);

    // }
  }
}
// 主页面
.el-main {
  // background-color: white;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}
//左侧导航栏容器
.tac {
  //
  .el-col {
    width: 100%;
    height: 100%;
  }
}
</style>