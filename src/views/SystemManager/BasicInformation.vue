<template>
  <!-- 基础信息设置 -->
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>基础信息设置</el-breadcrumb-item>
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
              ref="searchFormRef"
              label-width="80px"
              class="demo-ruleForm"
              hide-required-asterisk
            >
              <!--搜索框  -->
              <el-form-item label="职称名称" prop="name" style="margin:0px">
                <el-input v-model="searchForm.name" size="small"></el-input>
              </el-form-item>

              <!-- 搜索点击按钮 -->
              <el-form-item style="margin-left:10px">
                <el-tooltip class="item" effect="dark" content="搜索" placement="top">
                  <el-button
                    class="el-icon-search"
                    type="primary"
                    circle
                    @click="Search()"
                    :loading="searchload"
                  ></el-button>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </el-col>

          <!-- 按钮组 -->
          <!-- 上传 按钮 -->
          <el-col :offset="7" :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="上传" placement="top">
              <el-button class="el-icon-upload2" circle type="primary" @click="Upload()"></el-button>
            </el-tooltip>
          </el-col>

          <!-- 下载 按钮 -->
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="下载" placement="top">
              <el-button class="el-icon-download" circle type="primary" @click="Download()"></el-button>
            </el-tooltip>
          </el-col>

          <!-- 添加基础信息 按钮 -->
          <el-col :offset="4" :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="添加基础信息" placement="top">
              <el-button class="el-icon-plus" circle type="primary" @click="Add()"></el-button>
            </el-tooltip>
          </el-col>

          <!-- 删除基础信息 按钮
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="删除基础信息" placement="top">
              <el-button class="el-icon-minus" circle type="primary" @click="Minus()"></el-button>
            </el-tooltip>
          </el-col>-->

          <!-- 修改基础信息 按钮
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="修改基础信息" placement="top">
              <el-button class="el-icon-edit" circle type="primary" @click="Edit()"></el-button>
            </el-tooltip>
          </el-col>-->

          <!-- 打印基础信息 按钮 -->
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="打印基础信息" placement="top">
              <el-button class="el-icon-printer" circle type="primary" @click="Printer()"></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--基础信息表格块  -->
    <div>
      <el-table
        :data="tableData"
        stripe
        border
        max-height="400"
        style="width: 100%"
        :row-style="{height:'30px'}"
        :cell-style="TableRowStyle"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column fixed prop="id" label="员工编号" width="100" align="center"></el-table-column>
        <el-table-column fixed prop="name" label="员工姓名" width="150" align="center"></el-table-column>
        <el-table-column prop="depart" label="所属部门" width="200" align="center"></el-table-column>
        <el-table-column prop="job" label="职称" width="200" align="center"></el-table-column>
        <el-table-column prop="position" label="职位" width="200" align="center"></el-table-column>
        <el-table-column
          prop="permission"
          label="权限组"
          width="200"
          align="center"
          :formatter="ShowPermission"
        ></el-table-column>
        <el-table-column prop="rule" label="奖惩规则" align="center" width="300"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-popover placement="left" width="400" trigger="click">
              <div class="check">
                <span>
                  <span>员工编号</span>
                  {{scope.row.id}}
                </span>
                <span>
                  <span>员工姓名</span>
                  {{scope.row.name}}
                </span>
                <span>
                  <span>所属部门</span>
                  {{scope.row.depart}}
                </span>
                <span>
                  <span>职称</span>
                  {{scope.row.job}}
                </span>
                <span>
                  <span>职位</span>
                  {{scope.row.position}}
                </span>
                <span>
                  <span>权限组</span>
                  {{scope.row.permission}}
                </span>
                <span>
                  <span>奖惩规则</span>
                  {{scope.row.rule}}
                </span>
              </div>
              <el-button
                slot="reference"
                type="text"
                size="small"
                style="height:10px;padding-right:3px"
              >查看</el-button>
            </el-popover>
            <el-button
              @click="Edit(scope.row)"
              type="text"
              size="small"
              style="height:10px;padding-right:3px"
            >编辑</el-button>
            <el-popconfirm
              title="删除后不可恢复,确认要删除此条数据吗？"
              @onConfirm="MinusConfirm(scope.row)"
              @onCancel="MinusCancel()"
              confirmButtonText="确认"
              cancelButtonText="取消"
              icon="el-icon-info"
              iconColor="red"
              id="hello"
            >
              <el-button type="text" size="small" style="height:10px" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="box_bottom">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 添加基础信息 按钮 dialog -->
    <el-dialog
      title="添加基础信息"
      :visible.sync="dialogVisibleAdd"
      width="35%"
      :before-close="handleCloseAdd"
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm"
        hide-required-asterisk
        size="mini"
      >
        <el-form-item label="员工编号" prop="id">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="depart">
          <el-input v-model="addForm.depart"></el-input>
        </el-form-item>
        <el-form-item label="职称" prop="job">
          <el-input v-model="addForm.job"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="addForm.posision"></el-input>
        </el-form-item>
        <el-form-item label="权限组" prop="permission">
          <el-input v-model="addForm.permission"></el-input>
        </el-form-item>
        <el-form-item label="奖惩规则" prop="rule">
          <el-input v-model="addForm.rule"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddCancel()">取 消</el-button>
        <el-button type="primary" @click="AddConfirm()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑基础信息 按钮 dialog -->
    <el-dialog
      title="编辑基础信息"
      :visible.sync="dialogVisibleEdit"
      width="35%"
      :before-close="handleCloseEdit"
    >
      <el-form
        :model="editForm"
        :rules="editRules"
        ref="editFormRef"
        label-width="100px"
        class="demo-ruleForm"
        hide-required-asterisk
        size="mini"
      >
        <el-form-item label="员工编号" prop="id">
          <el-input v-model="editForm.id"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="depart">
          <el-input v-model="editForm.depart"></el-input>
        </el-form-item>
        <el-form-item label="职称" prop="job">
          <el-input v-model="editForm.job"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="editForm.position"></el-input>
        </el-form-item>
        <el-form-item label="权限组" prop="permission">
          <el-select v-model="editForm.permission" placeholder="请选择">
            <el-option label="系统管理员" value="1"></el-option>
            <el-option label="找聘主管" value="2"></el-option>
            <el-option label="人事主管" value="3"></el-option>
            <el-option label="薪资主管" value="4"></el-option>
            <el-option label="统计主管" value="5"></el-option>
            <el-option label="部门主管" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖惩规则" prop="rule">
          <el-input v-model="editForm.rule"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditCancel()">取 消</el-button>
        <el-button type="primary" @click="EditConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索表单
      searchForm: {
        name: "",
      },
      // 搜索规则
      searchRules: {
        name: [
          { required: true, message: "请输入基础信息编号", trigger: "change" },
          {
            min: 1,
            max: 32,
            message: "长度在 1 到 32 个字符",
            trigger: "blur",
          },
        ],
      },
      // 搜索按钮点击加载判断
      searchload: false,

      // 表格数据
      tableData: [],
      page: {
        current: 1, //当前页
        size: 5, //每页显示条目数
      },
      //数据总数
      total: 0,

      // 添加基础信息 dialog 判断
      dialogVisibleAdd: false,
      // 添加基础信息 dialog 表单
      addForm: {
        id: "",
        name: "",
        depart: "",
        job: "",
        position: "",
        permission: "",
        rule: "",
      },
      // 添加基础信息 dialog 表单规则
      addRules: {
        name: [
          { required: true, message: "请输入员工姓名", trigger: "change" },
          {
            min: 1,
            max: 32,
            message: "长度在 1 到 32 个字符",
            trigger: "blur",
          },
        ],
      },
      // 编辑基础信息 dialog 判断
      dialogVisibleEdit: false,
      // 编辑基础信息 dialog 表单
      editForm: {
        id: "",
        name: "",
        depart: "",
        job: "",
        position: "",
        permission: "",
        rule: "",
      },
      // 编辑基础信息 dialog 表单规则
      editRules: {
        name: [
          { required: true, message: "请输入员工姓名", trigger: "change" },
          {
            min: 1,
            max: 32,
            message: "长度在 1 到 32 个字符",
            trigger: "blur",
          },
        ],
      },
      // 勾选数据数组
      multipleSelection: [],
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    // 访问后端获取表格数据
    async getTableData() {
      const { data: res } = await this.$http.get("/system/basic", {
        params: this.page,
      });
      //将data数据赋值表格数组
      this.tableData = res.data.rows;
      this.total = res.data.total;
    },
    //监听页码值改变的事件
    handleSizeChange(newSize) {
      this.page.size = newSize;
      this.getTableData();
    },
    // //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.page.current = newPage;
      this.getTableData();
    },
    // 搜索按钮 点击
    Search() {
      this.searchload = true;
      this.$refs.searchFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error("搜索失败");
          return;
        }
      });
      setTimeout(() => {
        this.searchload = false;
        this.$refs.searchFormRef.resetFields();
      }, 5000);
    },

    // 表格权限组栏回调
    ShowPermission(row, column) {
      if (row.permission === "1") {
        return "系统管理员";
      } else if (row.permission === "2") {
        return "招聘主管";
      } else if (row.permission === "3") {
        return "人事主管";
      } else if (row.permission === "4") {
        return "薪资主管";
      } else if (row.permission === "5") {
        return "统计主管";
      } else if (row.permission === "6") {
        return "部门主管";
      }
    },

    // 添加基础信息按钮
    Add() {
      this.dialogVisibleAdd = true;
    },
    // 添加基础信息 dialog 隐藏时回调函数
    handleCloseAdd() {
      this.$refs.addFormRef.resetFields();
      this.dialogVisibleAdd = false;
    },
    // 添加基础信息 dialog 取消按钮
    AddCancel() {
      this.$refs.addFormRef.resetFields();
      this.dialogVisibleAdd = false;
    },
    // 添加基础信息 dialog 确认按钮
    async AddConfirm() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post(
          "/system/basic",
          this.addForm
        );
        if (res.code == 200) {
          this.dialogVisibleAdd = false;
          this.$message.success("添加成功");
        } else {
          this.$message.error("添加失败");
        }
      });
      console.log(this.addForm);
    },
    // 编辑基础信息按钮
    Edit(row) {
      this.dialogVisibleEdit = true;
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.editForm.depart = row.depart;
      this.editForm.job = row.job;
      this.editForm.position = row.position;
      this.editForm.permission = row.permission;
      this.editForm.rule = row.rule;
    },
    // 编辑基础信息 dialog 隐藏时回调函数
    handleCloseEdit() {
      this.$refs.editFormRef.resetFields();
      this.dialogVisibleEdit = false;
      this.$message("停留在当前页面");
    },
    // 编辑基础信息 dialog 取消按钮
    EditCancel() {
      this.$refs.editFormRef.resetFields();
      this.dialogVisibleEdit = false;
      this.$message("已取消编辑");
    },
    // 编辑基础信息 dialog 确认按钮
    async EditConfirm() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
      });
      const { data: res } = await this.$http.put(
        "/system/basic",
        this.editForm
      );
      if (res.code == 200) {
        this.dialogVisibleEdit = false;
        this.$message.success("修改成功");
        // this.getTableData();
      } else {
        this.$message.error("修改失败");
      }
    },
    // 删除确认按钮
    async MinusConfirm(row) {
      const { data: res } = await this.$http.delete(
        "/system/basic?id=" + row.id
      );
      this.$message.success("删除基础信息编号为" + row.id + "的数据成功");
      // this.getTableData();
    },
    // 删除取消按钮
    MinusCancel() {
      this.$message("已取消删除");
    },

    // 回调函数，设置文字和边框的间距
    TableRowStyle() {
      return "padding:1px";
    },
    // 表格勾选监听
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(val);
      // console.log(this.multipleSelection)
    },
  },
};
</script>

<style>
.check > span {
  display: block;
}
.check > span > span {
  display: inline-block;
  width: 100px;
  font-weight: bold;
}
</style>