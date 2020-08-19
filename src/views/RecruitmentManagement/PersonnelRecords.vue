<template>
  <!-- 员工资料 -->
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>招聘管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工资料</el-breadcrumb-item>
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

          <!-- 添加资料 按钮 -->
          <el-col :offset="4" :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="添加资料" placement="top">
              <el-button class="el-icon-plus" circle type="primary" @click="Add()"></el-button>
            </el-tooltip>
          </el-col>

          <!-- 删除资料 按钮
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="删除资料" placement="top">
              <el-button class="el-icon-minus" circle type="primary" @click="Minus()"></el-button>
            </el-tooltip>
          </el-col>-->

          <!-- 修改资料 按钮
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="修改资料" placement="top">
              <el-button class="el-icon-edit" circle type="primary" @click="Edit()"></el-button>
            </el-tooltip>
          </el-col>-->

          <!-- 打印资料信息 按钮 -->
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-tooltip class="item" effect="dark" content="打印资料信息" placement="top">
              <el-button class="el-icon-printer" circle type="primary" @click="Printer()"></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--资料信息表格块  -->
    <div class="table">
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
        <el-table-column fixed prop="id" label="编号" width="100" align="center"></el-table-column>
        <el-table-column fixed prop="name" label="员工姓名" width="100" align="center"></el-table-column>
        <el-table-column fixed prop="workId" label="员工工号" width="150" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" align="center" width="100"></el-table-column>
        <el-table-column prop="birthday" label="出生日期" align="center" width="200"></el-table-column>
        <el-table-column prop="idCard" label="身份证号" align="center" width="200"></el-table-column>
        <el-table-column prop="wedlock" label="婚姻状况" align="center" width="100"></el-table-column>
        <el-table-column prop="nationName" label="民族" align="center" width="150"></el-table-column>
        <el-table-column prop="nationPlace" label="籍贯" align="center" width="250"></el-table-column>
        <el-table-column prop="politic" label="政治面貌" align="center" width="130"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" width="250"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center" width="200"></el-table-column>
        <el-table-column prop="address" label="联系住址" align="center" width="300"></el-table-column>
        <el-table-column prop="departName" label="所属部门" align="center" width="150"></el-table-column>
        <el-table-column prop="jobName" label="职称" align="center" width="150"></el-table-column>
        <el-table-column prop="pos" label="所属岗位" align="center" width="150"></el-table-column>
        <el-table-column prop="engageForm" label="合同类型" align="center" width="150"></el-table-column>
        <el-table-column prop="tiptopDegree" label="最高学历" align="center" width="150"></el-table-column>
        <el-table-column prop="specialty" label="专业" align="center" width="250"></el-table-column>
        <el-table-column prop="school" label="毕业学校" align="center" width="250"></el-table-column>
        <el-table-column prop="beginDate" label="入职日期" align="center" width="200"></el-table-column>
        <el-table-column prop="workState" label="在职状态" align="center" width="150"></el-table-column>
        <el-table-column prop="contractTerm" label="合同期限" align="center" width="200"></el-table-column>
        <!-- <el-table-column prop="conversionTime" label="转正日期" align="center" width="200"></el-table-column>
        <el-table-column prop="notworkDate" label="停职日期" align="center" width="200"></el-table-column> -->
        <el-table-column prop="beginContract" label="合同起始日期" align="center" width="200"></el-table-column>
        <el-table-column prop="endContract" label="合同终止日期" align="center" width="200"></el-table-column>
        <el-table-column prop="workAge" label="工龄" align="center" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-popover placement="left" width="400" trigger="click">
              <div class="check">
                <span>
                  <span>编号</span>
                  {{scope.row.id}}
                </span>
                <span>
                  <span>员工姓名</span>
                  {{scope.row.name}}
                </span>
                <span>
                  <span>员工工号</span>
                  {{scope.row.workId}}
                </span>
                <span>
                  <span>性别</span>
                  {{scope.row.gender}}
                </span>
                <span>
                  <span>出生日期</span>
                  {{scope.row.birthday}}
                </span>
                <span>
                  <span>身份证号</span>
                  {{scope.row.idCard}}
                </span>
                <span>
                  <span>婚姻状况</span>
                  {{scope.row.wedlock}}
                </span>
                <span>
                  <span>民族</span>
                  {{scope.row.nationName}}
                </span>
                <span>
                  <span>籍贯</span>
                  {{scope.row.nationPlace}}
                </span>
                <span>
                  <span>政治面貌</span>
                  {{scope.row.politic}}
                </span>
                <span>
                  <span>邮箱</span>
                  {{scope.row.email}}
                </span>
                <span>
                  <span>电话</span>
                  {{scope.row.phone}}
                </span>
                <span>
                  <span>居住地</span>
                  {{scope.row.address}}
                </span>
                <span>
                  <span>所属部门</span>
                  {{scope.row.departName}}
                </span>
                <span>
                  <span>职称</span>
                  {{scope.row.jobName}}
                </span>
                <span>
                  <span>所属岗位</span>
                  {{scope.row.pos}}
                </span>
                <span>
                  <span>合同类型</span>
                  {{scope.row.engageForm}}
                </span>
                <span>
                  <span>最高学历</span>
                  {{scope.row.tiptopDegree}}
                </span>
                <span>
                  <span>专业</span>
                  {{scope.row.specialty}}
                </span>
                <span>
                  <span>毕业学校</span>
                  {{scope.row.school}}
                </span>
                <span>
                  <span>入职日期</span>
                  {{scope.row.beginDate}}
                </span>
                <span>
                  <span>在职状态</span>
                  {{scope.row.workState}}
                </span>
                <span>
                  <span>合同期限</span>
                  {{scope.row.contractTerm}}
                </span>
                <!-- <span>
                  <span>转正日期</span>
                  {{scope.row.conversionTime}}
                </span>
                <span>
                  <span>停职日期</span>
                  {{scope.row.notworkDate}}
                </span> -->
                <span>
                  <span>合同起始日期</span>
                  {{scope.row.beginContract}}
                </span>
                <span>
                  <span>合同终止日期</span>
                  {{scope.row.endContract}}
                </span>
                <span>
                  <span>工龄</span>
                  {{scope.row.workAge}}
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

    <!-- 添加资料 按钮 dialog -->
    <el-dialog
      title="添加资料"
      :visible.sync="dialogVisibleAdd"
      width="70%"
      :before-close="handleCloseAdd"
      top="0%"
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm"
        hide-required-asterisk
        size="mini"
        :inline="true"
      >
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="addForm.name" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="员工工号" prop="workId">
          <el-input v-model="addForm.workId" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="addForm.gender" style="width:100px">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addForm.birthday"
            style="width: 160px;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="addForm.idCard" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状况" prop="wedlock">
          <el-select v-model="addForm.wedlock" style="width:100px">
            <el-option label="未婚" value="未婚"></el-option>
            <el-option label="已婚" value="已婚"></el-option>
            <el-option label="离异" value="离异"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="籍贯" prop="nationPlace">
          <el-input v-model="addForm.nationPlace" style="width:200px" placeholder="请填写省份市"></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="nationName">
          <el-input v-model="addForm.nationName" style="width:120px"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌" prop="politic">
          <el-select v-model="addForm.politic" style="width:150px">
            <el-option label="中共党员" value="中共党员"></el-option>
            <el-option label="中共预备党员" value="中共预备党员"></el-option>
            <el-option label="共青团员" value="共青团员"></el-option>
            <el-option label="民革党员" value="民革党员"></el-option>
            <el-option label="民盟党员" value="民盟党员"></el-option>
            <el-option label="民建党员" value="民建党员"></el-option>
            <el-option label="民进党员" value="民进党员"></el-option>
            <el-option label="农工党党员" value="农工党党员"></el-option>
            <el-option label="致公党党员" value="致公党党员"></el-option>
            <el-option label="九三学社社员" value="九三学社社员"></el-option>
            <el-option label="台盟盟员" value="台盟盟员"></el-option>
            <el-option label="无党派民主人士" value="无党派民主人士"></el-option>
            <el-option label="普通公民" value="普通公民"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="联系住址" prop="address">
          <el-input v-model="addForm.address" style="width:640px"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="departName">
          <el-input v-model="addForm.departName" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="职称" prop="jobName">
          <el-input v-model="addForm.jobName" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="pos">
          <el-input v-model="addForm.pos" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="聘用方式" prop="engageForm">
          <el-select v-model="addForm.engageForm" style="width:160px">
            <el-option label="劳务合同" value="劳务合同"></el-option>
            <el-option label="劳动合同" value="劳动合同"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最高学历" prop="tiptopDegree">
          <el-select v-model="addForm.tiptopDegree" style="width:160px">
            <el-option label="小学" value="小学"></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
            <el-option label="博士后" value="博士后"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="specialty">
          <el-input v-model="addForm.specialty" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="毕业学校" prop="school">
          <el-input v-model="addForm.school" style="width:640px"></el-input>
        </el-form-item>

        <el-form-item label="入职日期" prop="beginDate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addForm.beginDate"
            style="width: 160px;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="在职状态" prop="workState">
          <el-select v-model="addForm.workState" style="width:160px">
            <el-option label="在职" value="在职"></el-option>
            <el-option label="离职" value="离职"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同期限" prop="contractTerm">
          <el-input-number v-model="addForm.contractTerm" :min="1" :max="10"></el-input-number>
          <span style="padding-left:10px">年</span>
        </el-form-item>

        <el-form-item label="合同起始日期" prop="beginContract">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addForm.beginContract"
            style="width: 160px;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="合同终止日期" prop="endContract">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addForm.endContract"
            style="width: 160px;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="工龄" prop="workAge">
          <el-input type="workAge" v-model="addForm.remark" style="width:100px"></el-input>
          <span style="padding-left:10px">年</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddCancel()">取 消</el-button>
        <el-button type="primary" @click="AddConfirm()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑资料 按钮 dialog -->
    <el-dialog
      title="编辑资料"
      :visible.sync="dialogVisibleEdit"
      width="70%"
      top="0%"
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
        :inline="true"
      >

        <el-form-item label="资料编号" prop="id">
          <el-input v-model="editForm.id" style="width:160px;margin-right:400px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="editForm.name" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="员工工号" prop="workId">
          <el-input v-model="editForm.workId" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="editForm.gender" style="width:100px">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.birthday"
            style="width: 160px;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="editForm.idCard" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状况" prop="wedlock">
          <el-select v-model="editForm.wedlock" style="width:100px">
            <el-option label="未婚" value="未婚"></el-option>
            <el-option label="已婚" value="已婚"></el-option>
            <el-option label="离异" value="离异"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="籍贯" prop="nationPlace">
          <el-input v-model="editForm.nationPlace" style="width:200px" placeholder="请填写省份市"></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="nationName">
          <el-input v-model="editForm.nationName" style="width:120px"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌" prop="politic">
          <el-select v-model="editForm.politic" style="width:150px">
            <el-option label="中共党员" value="中共党员"></el-option>
            <el-option label="中共预备党员" value="中共预备党员"></el-option>
            <el-option label="共青团员" value="共青团员"></el-option>
            <el-option label="民革党员" value="民革党员"></el-option>
            <el-option label="民盟党员" value="民盟党员"></el-option>
            <el-option label="民建党员" value="民建党员"></el-option>
            <el-option label="民进党员" value="民进党员"></el-option>
            <el-option label="农工党党员" value="农工党党员"></el-option>
            <el-option label="致公党党员" value="致公党党员"></el-option>
            <el-option label="九三学社社员" value="九三学社社员"></el-option>
            <el-option label="台盟盟员" value="台盟盟员"></el-option>
            <el-option label="无党派民主人士" value="无党派民主人士"></el-option>
            <el-option label="普通公民" value="普通公民"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="联系住址" prop="address">
          <el-input v-model="editForm.address" style="width:640px"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="departName">
          <el-input v-model="editForm.departName" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="职称" prop="jobName">
          <el-input v-model="editForm.jobName" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="pos">
          <el-input v-model="editForm.pos" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="聘用方式" prop="engageForm">
          <el-select v-model="editForm.engageForm" style="width:160px">
            <el-option label="劳务合同" value="劳务合同"></el-option>
            <el-option label="劳动合同" value="劳动合同"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最高学历" prop="tiptopDegree">
          <el-select v-model="editForm.tiptopDegree" style="width:160px">
            <el-option label="小学" value="小学"></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
            <el-option label="博士后" value="博士后"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="specialty">
          <el-input v-model="editForm.specialty" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="毕业学校" prop="school">
          <el-input v-model="editForm.school" style="width:640px"></el-input>
        </el-form-item>

        <el-form-item label="入职日期" prop="beginDate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.beginDate"
            style="width: 160px;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="在职状态" prop="workState">
          <el-select v-model="editForm.workState" style="width:160px">
            <el-option label="在职" value="在职"></el-option>
            <el-option label="离职" value="离职"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同期限" prop="contractTerm">
          <el-input-number v-model="editForm.contractTerm" :min="1" :max="10"></el-input-number>
          <span style="padding-left:10px">年</span>
        </el-form-item>

        <el-form-item label="合同起始日期" prop="beginContract">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.beginContract"
            style="width: 160px;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="合同终止日期" prop="endContract">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.endContract"
            style="width: 160px;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="工龄" prop="workAge">
          <el-input type="workAge" v-model="editForm.remark" style="width:100px"></el-input>
          <span style="padding-left:10px">年</span>
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

      // 添加资料 dialog 判断
      dialogVisibleAdd: false,
      // 添加资料 dialog 表单
      addForm: {
        name: "",
        workId: "",
        gender: "",
        birthday: "",
        idCard: "",
        wedlock: "",
        nationName: "",
        nationPlace: "",
        politic: "",
        email: "",
        address: "",
        departName: "",
        jobName: "",
        pos: "",
        engageForm: "",
        tiptopDegree: "",
        specialty: "",
        school: "",
        beginDate: "",
        workState: "",
        contractTerm: "",
        // conversionTime: "",
        // notworkDate: "",
        beginContract: "",
        endContract: "",
        workAge: "",
      },
      // 添加资料 dialog 表单规则
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
      // 编辑资料 dialog 判断
      dialogVisibleEdit: false,
      // 编辑资料 dialog 表单
      editForm: {
        id: "",
        name: "",
        workId: "",
        gender: "",
        birthday: "",
        idCard: "",
        wedlock: "",
        nationName: "",
        nationPlace: "",
        politic: "",
        email: "",
        address: "",
        departName: "",
        jobName: "",
        pos: "",
        engageForm: "",
        tiptopDegree: "",
        specialty: "",
        school: "",
        beginDate: "",
        workState: "",
        contractTerm: "",
        // conversionTime: "",
        // notworkDate: "",
        beginContract: "",
        endContract: "",
        workAge: "",
      },
      // 编辑资料 dialog 表单规则
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
      const { data: res } = await this.$http.get("/employee/basic", {
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

    // 添加资料按钮
    Add() {
      this.dialogVisibleAdd = true;
    },
    // 添加资料 dialog 隐藏时回调函数
    handleCloseAdd() {
      this.$refs.addFormRef.resetFields();
      this.dialogVisibleAdd = false;
    },
    // 添加资料 dialog 取消按钮
    AddCancel() {
      this.$refs.addFormRef.resetFields();
      this.dialogVisibleAdd = false;
    },
    // 添加资料 dialog 确认按钮
    async AddConfirm() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post(
          "/employee/basic",
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
    // 编辑资料按钮
    Edit(row) {
      this.dialogVisibleEdit = true;
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.editForm.workId = row.workId;
      this.editForm.gender = row.gender;
      this.editForm.birthday = row.birthday;
      this.editForm.idCard = row.idCard;
      this.editForm.wedlock = row.wedlock;
      this.editForm.nationName = row.nationName;
      this.editForm.nationPlace = row.nationPlace;
      this.editForm.politic = row.politic;
      this.editForm.email = row.email;
      this.editForm.phone = row.phone;
      this.editForm.address = row.address;
      this.editForm.departName = row.departName;
      this.editForm.jobName = row.jobName;
      this.editForm.pos = row.pos;
      this.editForm.engageForm = row.engageForm;
      this.editForm.tiptopDegree = row.tiptopDegree;
      this.editForm.specialty = row.specialty;
      this.editForm.school = row.school;
      this.editForm.beginDate = row.beginDate;
      this.editForm.workState = row.workState;
      this.editForm.conversionTime = row.conversionTime;
      this.editForm.notworkDate = row.notworkDate;
      this.editForm.contractTerm = row.contractTerm;
      this.editForm.beginContract = row.beginContract;
      this.editForm.endContract = row.endContract;
      this.editForm.workAge = row.workAge;
      
    },
    // 编辑资料 dialog 隐藏时回调函数
    handleCloseEdit() {
      this.$refs.editFormRef.resetFields();
      this.dialogVisibleEdit = false;
      this.$message("停留在当前页面");
    },
    // 编辑资料 dialog 取消按钮
    EditCancel() {
      this.$refs.editFormRef.resetFields();
      this.dialogVisibleEdit = false;
      this.$message("已取消编辑");
    },
    // 编辑资料 dialog 确认按钮
    async EditConfirm() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.put(
          "/employee/basic",
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
        "/employee/basic?id=" + row.id
      );
      this.$message.success("删除员工资料编号为" + row.id + "的数据成功");
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

<style  >
.check > span {
  display: block;
}
.check > span > span {
  display: inline-block;
  width: 100px;
  font-weight: bold;
}
</style>