<template>
  <!-- 操作员管理 -->
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>操作员管理</el-breadcrumb-item>
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
              label-width="100px"
              class="demo-ruleForm"
              hide-required-asterisk
            >
              <!--搜索框  -->
              <el-form-item label="操作员姓名" prop="name" style="margin:0px">
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

          <!-- 添加操作员 按钮 -->
          <el-col :offset="4" :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="添加操作员" placement="top">
              <el-button class="el-icon-plus" circle type="primary" @click="Add()"></el-button>
            </el-tooltip>
          </el-col>

          <!-- 删除操作员 按钮
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="删除操作员" placement="top">
              <el-button class="el-icon-minus" circle type="primary" @click="Minus()"></el-button>
            </el-tooltip>
          </el-col>-->

          <!-- 修改操作员 按钮
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="修改操作员" placement="top">
              <el-button class="el-icon-edit" circle type="primary" @click="Edit()"></el-button>
            </el-tooltip>
          </el-col>-->

          <!-- 打印操作员信息 按钮 -->
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="打印操作员信息" placement="top">
              <el-button class="el-icon-printer" circle type="primary" @click="Printer()"></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--操作员信息表格块  -->
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
        <el-table-column fixed prop="id" label="操作员编号" width="100" align="center"></el-table-column>
        <el-table-column fixed prop="name" label="操作员姓名" width="150" align="center"></el-table-column>
        <el-table-column fixed prop="phone" label="电话" width="150" align="center"></el-table-column>
        <el-table-column fixed prop="telephone" label="住宅电话" width="150" align="center"></el-table-column>
        <el-table-column prop="address" label="联系地址" width="300" align="center"></el-table-column>
        <el-table-column prop="enabled" label="是否可用" width="100" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" width="150" align="center"></el-table-column>
        <el-table-column prop="password" label="密码" width="200" align="center"></el-table-column>
        <el-table-column prop label="照片" width="150" align="center">
          <template slot-scope="scope">
            <el-popover placement="left" title trigger="hover">
              <el-image :src="scope.row.userface" slot="reference" style="width:10px;height:10px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <el-image :src="scope.row.userface">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="400" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-popover placement="left" width="400" trigger="click">
              <div class="check">
                <span>
                  <span>操作员编号</span>
                  {{scope.row.id}}
                </span>
                <span>
                  <span>操作员姓名</span>
                  {{scope.row.name}}
                </span>
                <span>
                  <span>电话</span>
                  {{scope.row.phone}}
                </span>
                <span>
                  <span>住宅电话</span>
                  {{scope.row.telephone}}
                </span>
                <span>
                  <span>联系地址</span>
                  {{scope.row.address}}
                </span>
                <span>
                  <span>是否可用</span>
                  {{scope.row.enabled}}
                </span>
                <span>
                  <span>用户名</span>
                  {{scope.row.username}}
                </span>
                <span>
                  <span>密码</span>
                  {{scope.row.password}}
                </span>
                <span>
                  <span>照片</span>
                  <el-image :src="scope.row.userface" style="width:100px;height:100px">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </span>
                <span>
                  <span>备注</span>
                  {{scope.row.remark}}
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

    <!-- 添加操作员 按钮 dialog -->
    <el-dialog
      title="添加操作员"
      :visible.sync="dialogVisibleAdd"
      width="70%"
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
        inline="true"
      >
        <el-form-item label="操作员编号" prop="id">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>

        <el-form-item label="操作员姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="住宅电话" prop="telephone">
          <el-input v-model="addForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="addForm.address" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" prop="enabled">
          <el-switch
            style="width:178px"
            v-model="addForm.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="是"
            inactive-value="否"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>

        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="userface">
          <el-input v-model="addForm.userface" v-if="false"></el-input>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            ref="upload"
          >
            <img v-if="addForm.userface" :src="addForm.userface" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="addForm.remark"
            style="width:465px"
          ></el-input>
        </el-form-item>
        <el-button @click="clearFilesAdd" style="margin-left:100px">重置图片</el-button>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddCancel()">取 消</el-button>
        <el-button type="primary" @click="AddConfirm()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑操作员 按钮 dialog -->
    <el-dialog
      title="编辑操作员"
      :visible.sync="dialogVisibleEdit"
      width="70%"
      :before-close="handleCloseEdit"
    >
      <el-form
        :model="editForm"
        :rules="editRules"
        ref="editFormRef"
        label-width="100px"
        class="demo-ruleForm"
        hide-required-asterisk
        :inline="true"
        size="mini"
      >
        <el-form-item label="操作员编号" prop="id">
          <el-input v-model="editForm.id"></el-input>
        </el-form-item>

        <el-form-item label="操作员姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="住宅电话" prop="telephone">
          <el-input v-model="editForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="editForm.address" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" prop="enabled">
          <el-switch
            style="width:178px"
            v-model="editForm.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="是"
            inactive-value="否"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>

        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="userface">
          <el-input v-model="editForm.userface" v-if="false"></el-input>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            ref="upload"
          >
            <img v-if="editForm.userface" :src="editForm.userface" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="editForm.remark"
            style="width:465px"
          ></el-input>
        </el-form-item>
        <el-button @click="clearFilesEdit" style="margin-left:100px">重置图片</el-button>
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
          { required: true, message: "请输入操作员姓名", trigger: "change" },
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

      // 添加操作员 dialog 判断
      dialogVisibleAdd: false,
      // 添加操作员 dialog 表单
      addForm: {
        id: "",
        name: "",
        phone: "",
        telephone: "",
        address: "",
        enabled: "",
        username: "",
        password: "",
        userface: "",
        remark: "",
      },
      // 添加操作员 dialog 表单规则
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
      // 编辑操作员 dialog 判断
      dialogVisibleEdit: false,
      // 编辑操作员 dialog 表单
      editForm: {
        id: "",
        name: "",
        phone: "",
        telephone: "",
        address: "",
        enabled: "",
        username: "",
        password: "",
        userface: "",
        remark: "",
      },
      // 编辑操作员 dialog 表单规则
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
      const { data: res } = await this.$http.get("/system/hr", {
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

    // 添加操作员按钮
    Add() {
      this.dialogVisibleAdd = true;
    },
    // 添加操作员 dialog 隐藏时回调函数
    handleCloseAdd() {
      this.$refs.addFormRef.resetFields();
      this.dialogVisibleAdd = false;
    },
    // 添加操作员 dialog 取消按钮
    AddCancel() {
      this.$refs.addFormRef.resetFields();
      this.dialogVisibleAdd = false;
    },
    // 添加操作员 dialog 确认按钮
    async AddConfirm() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post("/system/hr", this.addForm);
        if (res.code == 200) {
          this.dialogVisibleAdd = false;
          this.$message.success("添加成功");
        } else {
          this.$message.error("添加失败");
        }
      });
      console.log(this.addForm);
    },
    // 编辑操作员按钮
    Edit(row) {
      this.dialogVisibleEdit = true;
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.editForm.phone = row.phone;
      this.editForm.telephone = row.telephone;
      this.editForm.address = row.address;
      this.editForm.enabled = row.enabled;
      this.editForm.username = row.username;
      this.editForm.password = row.password;
      this.editForm.userface = row.userface;
      this.editForm.remark = row.remark;
    },
    // 编辑操作员 dialog 隐藏时回调函数
    handleCloseEdit() {
      this.$refs.editFormRef.resetFields();
      this.dialogVisibleEdit = false;
      this.$message("停留在当前页面");
    },
    // 编辑操作员 dialog 取消按钮
    EditCancel() {
      this.$refs.editFormRef.resetFields();
      this.dialogVisibleEdit = false;
      this.$message("已取消编辑");
    },
    // 编辑操作员 dialog 确认按钮
    async EditConfirm() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
      });
      const { data: res } = await this.$http.put("/system/hr", this.editForm);
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
      const { data: res } = await this.$http.delete("/system/hr?id=" + row.id);
      this.$message.success("删除操作员编号为" + row.id + "的数据成功");
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
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.addForm.userface = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 重置图片
    clearFilesAdd() {
      // this.$refs.upload.clearFiles();
      this.addForm.userface = "";
    },
    clearFilesEdit() {
      console.log("hello");
      // this.$refs.upload.clearFiles();
      this.editForm.userface = "";
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>