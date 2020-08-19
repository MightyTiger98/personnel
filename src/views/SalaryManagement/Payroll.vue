<template>
  <!-- 工资表 -->
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>薪资管理</el-breadcrumb-item>
      <el-breadcrumb-item>工资表</el-breadcrumb-item>
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
              <el-form-item label="员工姓名" prop="name" style="margin:0px">
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

          <!-- 添加工资表 按钮 -->
          <el-col :offset="4" :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="添加工资表" placement="top">
              <el-button class="el-icon-plus" circle type="primary" @click="Add()"></el-button>
            </el-tooltip>
          </el-col>

          <!-- 删除工资表 按钮
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="删除工资表" placement="top">
              <el-button class="el-icon-minus" circle type="primary" @click="Minus()"></el-button>
            </el-tooltip>
          </el-col>-->

          <!-- 修改工资表 按钮
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="修改工资表" placement="top">
              <el-button class="el-icon-edit" circle type="primary" @click="Edit()"></el-button>
            </el-tooltip>
          </el-col>-->

          <!-- 打印工资表信息 按钮 -->
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="打印工资表信息" placement="top">
              <el-button class="el-icon-printer" circle type="primary" @click="Printer()"></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--工资表信息表格块  -->
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
        <el-table-column fixed prop="id" label="调薪编号" width="100" align="center"></el-table-column>
        <el-table-column fixed prop="name" label="员工姓名" width="150" align="center"></el-table-column>
        <el-table-column prop="eid" label="员工编号" align="center" width="100"></el-table-column>
        <el-table-column prop="asDate" label="调薪日期" align="center" width="200"></el-table-column>
        <el-table-column prop="beforeSalary" label="调前薪资" align="center" width="150"></el-table-column>
        <el-table-column prop="afterSalary" label="调后薪资" align="center" width="150"></el-table-column>
        <el-table-column prop="reason" label="调薪原因" align="center" width="300"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="300"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-popover placement="left" width="400" trigger="click">
              <div class="check">
                <span>
                  <span>培训编号</span>
                  {{ scope.row.id }}
                </span>
                <span>
                  <span>员工姓名</span>
                  {{ scope.row.name }}
                </span>
                <span>
                  <span>员工编号</span>
                  {{ scope.row.eid }}
                </span>
                <span>
                  <span>调薪日期</span>
                  {{ scope.row.asDate}}
                </span>
                <span>
                  <span>调前薪资</span>
                  {{ scope.row.beforeSalary }}
                </span>
                <span>
                  <span>调后薪资</span>
                  {{ scope.row.afterSalary }}
                </span>
                <span>
                  <span>调薪原因</span>
                  {{ scope.row.reason }}
                </span>
                <span>
                  <span>备注</span>
                  {{ scope.row.remark }}
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

    <!-- 添加工资表 按钮 dialog -->
    <el-dialog
      title="添加工资表"
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
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="addForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="员工编号" prop="eid">
          <el-input v-model="addForm.eid" ></el-input>
        </el-form-item>
        <el-form-item label="调薪日期" prop="asDate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addForm.asDate"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="调前薪资" prop="beforeSalary">
          <el-input v-model="addForm.beforeSalary" ></el-input>
        </el-form-item>
        <el-form-item label="调后薪资" prop="afterSalary">
          <el-input v-model="addForm.afterSalary" ></el-input>
        </el-form-item>
        <el-form-item label="调薪原因" prop="reason">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="addForm.reason"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddCancel()">取 消</el-button>
        <el-button type="primary" @click="AddConfirm()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑工资表 按钮 dialog -->
    <el-dialog
      title="编辑工资表"
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
        <el-form-item label="调薪编号" prop="id">
          <el-input v-model="editForm.id"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="editForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="员工编号" prop="eid">
          <el-input v-model="editForm.eid" ></el-input>
        </el-form-item>
        <el-form-item label="调薪日期" prop="asDate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.asDate"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="调前薪资" prop="beforeSalary">
          <el-input v-model="editForm.beforeSalary" ></el-input>
        </el-form-item>
        <el-form-item label="调后薪资" prop="afterSalary">
          <el-input v-model="editForm.afterSalary" ></el-input>
        </el-form-item>
        <el-form-item label="调薪原因" prop="reason">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="editForm.reason"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="editForm.remark"></el-input>
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
          { required: true, message: "请输入员工姓名", trigger: "change" },
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

      // 添加工资表 dialog 判断
      dialogVisibleAdd: false,
      // 添加工资表 dialog 表单
      addForm: {
        name: "",
        eid: "",
        asDate: "",
        beforeSalary: "",
        afterSalary: "",
        reason: "",
        remark: "",
      },
      // 添加工资表 dialog 表单规则
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
        enumber: [
          { required: true, message: "请输入员工编号", trigger: "change" },
          {
            min: 1,
            max: 32,
            message: "长度在 1 到 32 个字符",
            trigger: "blur",
          },
        ],
        remark: [],
      },
      // 编辑工资表 dialog 判断
      dialogVisibleEdit: false,
      // 编辑工资表 dialog 表单
      editForm: {
        id: "",
        name: "",
        eid: "",
        asDate: "",
        beforeSalary: "",
        afterSalary: "",
        reason: "",
        remark: "",
      },
      // 编辑工资表 dialog 表单规则
      editRules: {
        number: [],
        name: [
          { required: true, message: "请输入员工姓名", trigger: "change" },
          {
            min: 1,
            max: 32,
            message: "长度在 1 到 32 个字符",
            trigger: "blur",
          },
        ],
        enumber: [
          // { required: true, message: "请输入电话", trigger: "change" },
          // {
          //   min: 1,
          //   max: 32,
          //   message: "长度在 1 到 32 个字符",
          //   trigger: "blur",
          // },
        ],
        remark: [],
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
      const { data: res } = await this.$http.get("/salary/table", {
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

    // 添加工资表按钮
    Add() {
      this.dialogVisibleAdd = true;
    },
    // 添加工资表 dialog 隐藏时回调函数
    handleCloseAdd() {
      this.$refs.addFormRef.resetFields();
      this.dialogVisibleAdd = false;
      this.$message("停留在当前页面");
    },
    // 添加工资表 dialog 取消按钮
    AddCancel() {
      this.$refs.addFormRef.resetFields();
      this.dialogVisibleAdd = false;
      this.$message("已取消输入");
    },
    // 添加工资表 dialog 确认按钮
    async AddConfirm() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post(
          "/salary/table",
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
    // 编辑工资表按钮
    Edit(row) {
      this.dialogVisibleEdit = true;
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.editForm.eid = row.eid;
      this.editForm.asDate = row.asDate;
      this.editForm.beforeSalary = row.beforeSalary;
      this.editForm.afterSalary = row.afterSalary;
      this.editForm.reason = row.reason;
      this.editForm.remark = row.remark;
    },
    // 编辑工资表 dialog 隐藏时回调函数
    handleCloseEdit() {
      this.$refs.editFormRef.resetFields();
      this.dialogVisibleEdit = false;
      this.$message("停留在当前页面");
    },
    // 编辑工资表 dialog 取消按钮
    EditCancel() {
      this.$refs.editFormRef.resetFields();
      this.dialogVisibleEdit = false;
      this.$message("已取消编辑");
    },
    // 编辑工资表 dialog 确认按钮
    async EditConfirm() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;

        const { data: res } = await this.$http.put(
          "/salary/table",
          this.editForm
        );
        if (res.code == 200) {
          this.dialogVisibleEdit = false;
          this.$message.success("修改成功");
          // this.getTableData();
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    // 删除确认按钮
    async MinusConfirm(row) {
      const { data: res } = await this.$http.delete(
        "/salary/table?id=" + row.id
      );
      this.$message.success("删除工资表编号为" + row.id + "的数据成功");
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