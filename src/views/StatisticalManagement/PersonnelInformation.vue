<template>
  <!-- 人事信息管理 -->
  <!-- 布局未完成 -->
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计管理</el-breadcrumb-item>
      <el-breadcrumb-item>人事信息管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索块 -->
    <div style="padding-top:2%">
      <!-- 搜索表单块 -->
      <div>
        <el-row :gutter="10">
          <!-- 搜索表单 -->
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form
              inline="true"
              :model="searchForm"
              :rules="searchRules"
              ref="ruleForm"
              label-width="80px"
              class="demo-ruleForm"
            >

              <!--搜索框  -->
              <el-form-item label="部门名称" prop="name" style="margin:0px">
                <el-input v-model="searchForm.name" size="small"></el-input>
              </el-form-item>

              <!-- 搜索点击按钮 -->
              <el-form-item style="margin-left:10px">
                <el-tooltip class="item" effect="dark" content="搜索" placement="top">
                  <el-button class="el-icon-search" type="primary" circle @click="Search()"></el-button>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </el-col>

          <!-- 按钮组 -->

          <!-- 上传 按钮 -->
          <!-- <el-col :offset="7" :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="上传" placement="top">
              <el-button class="el-icon-upload2" circle type="primary" @click="Upload()"></el-button>
            </el-tooltip>
          </el-col> -->

          <!-- 下载 按钮 -->
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="下载" placement="top">
              <el-button class="el-icon-download" circle type="primary" @click="Download()"></el-button>
            </el-tooltip>
          </el-col>

          <!-- 添加调动 按钮 -->
          <!-- <el-col :offset="2" :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="添加调动" placement="top">
              <el-button class="el-icon-plus" circle type="primary" @click="Add()"></el-button>
            </el-tooltip>
          </el-col> -->

          <!-- 删除调动 按钮 -->
          <!-- <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="删除调动" placement="top">
              <el-button class="el-icon-minus" circle type="primary" @click="Minus()"></el-button>
            </el-tooltip>
          </el-col> -->

          <!-- 修改调动 按钮 -->
          <!-- <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="修改调动" placement="top">
              <el-button class="el-icon-edit" circle type="primary" @click="Edit()"></el-button>
            </el-tooltip>
          </el-col> -->

          <!-- 打印 按钮 -->
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="打印" placement="top">
              <el-button class="el-icon-printer" circle type="primary" @click="Printer()"></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--综合信息统计表格块  -->
    <div>
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%"
        :row-style="{height:'30px'}"
        :cell-style="TableRowStyle"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column  fixed prop="number" label="员工编号" width="100" align="center"></el-table-column>
        <el-table-column  fixed prop="name" label="员工姓名" width="150" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center" width="100"></el-table-column>
        <el-table-column prop="date" label="出生日期" align="center" width="300"></el-table-column>
        <el-table-column prop="state" label="状态" align="center" width="150"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        name: "",
      },
      searchRules: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    TableRowStyle() {
      return "padding:1px";
    },
  },
};
</script>

<style>
</style>