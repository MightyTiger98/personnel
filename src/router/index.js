import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import welcome from '../components/welcome.vue'
import HelloWorld from '../components/HelloWorld.vue'
// import department from '../views/department/department.vue'
// import deptransfer from '../views/department/dep_transfer.vue'
// import statransfer from '../views/station/sta_transfer.vue'
// import station from '../views/station/station.vue'
// import dismission from '../views/employee/dismission.vue'
// import employee from  '../views/employee/employee.vue'
// import trys from '../views/employee/try.vue'
// import deptransferstate from '../views/statement/deptransfer_state.vue'
// import disemployeestate from '../views/statement/dis_employee_state.vue'
// import monthlystate from '../views/statement/monthly_state.vue'
// import newemployeestate from '../views/statement/new_employee_state.vue'
// import statransferstate from '../views/statement/statransfer_state.vue'
import departmentinfo from '../views/BranchManagement/DepartmentInfo.vue'
import positioninfo from '../views/BranchManagement/PositionInfo.vue'
import joblevel from '../views/BranchManagement/JobLevel.vue'
import employeerewards from '../views/PersonnelManagement/EmployeeRewards.vue'
import employeeappraisal from '../views/PersonnelManagement/EmployeeAppraisal.vue'
import employeetrain from '../views/PersonnelManagement/EmployeeTrain.vue'
import employeeadjustsalary from '../views/PersonnelManagement/EmployeeAdjustsalary.vue'
import employeeremove from '../views/PersonnelManagement/EmployeeRemove.vue'
// import test from '../components/Test.vue'
import comprehensiveinfostatistics from '../views/StatisticalManagement/ComprehensiveInfoStatistics.vue'
import personnelinfomation from '../views/StatisticalManagement/PersonnelInformation.vue'
import personnelrecordstatistics from '../views/StatisticalManagement/PersonnelRecordStatistics.vue'
import payrollbook from '../views/SalaryManagement/PayrollBook.vue'
import payroll from '../views/SalaryManagement/Payroll.vue'
import personnelrecords from '../views/RecruitmentManagement/PersonnelRecords.vue'
import system from '../views/SystemManager/System.vue'
import operator from '../views/SystemManager/Operator.vue'
import operationlog from '../views/SystemManager/OperationLog.vue'
import basicinformation from '../views/SystemManager/BasicInformation.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path:"/",
      redirect:"/login"
    },
    {
      path:"/login",
      component:Login
    },
    {
      path:"/home",
      component:Home,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:welcome},//欢迎界面
        // {path:"/department",component:department},//部门信息
        // {path:"/deptransfer",component:deptransfer},//部门调动
        // {path:"/station",component:station},//岗位信息
        // {path:"/statransfer",component:statransfer},//岗位调动
        // {path:"/dismission",component:dismission},//离职员工
        // {path:"/employee",component:employee},//员工信息
        // {path:"/try",component:trys},//试用期
        // {path:"/deptransferstate",component:deptransferstate},//部门调动表
        // {path:"/disemployeestate",component:disemployeestate},//离职员工表
        // {path:"/monthlystate",component:monthlystate},//人事月表
        // {path:"/newemployeestate",component:newemployeestate},//新聘员工表
        // {path:"/statransferstate",component:statransferstate},//岗位调动表

        {path:"/departmentinfo",component:departmentinfo},
        {path:"/positioninfo",component:positioninfo},
        {path:"/joblevel",component:joblevel},
        {path:"/employeerewards",component:employeerewards},
        {path:"/employeeappraisal",component:employeeappraisal},
        {path:"/employeetrain",component:employeetrain},
        {path:"/employeeadjustsalary",component:employeeadjustsalary},
        {path:"/employeeremove",component:employeeremove},
        // {path:"/test",component:test},
        {path:"/comprehensiveinfostatistics",component:comprehensiveinfostatistics},
        {path:"/personnelinfomation",component:personnelinfomation},
        {path:"/personnelrecordstatistics",component:personnelrecordstatistics},
        // {path:"/",component:},
        {path:"/payrollbook",component:payrollbook},
        {path:"/payroll",component:payroll},
        {path:"/personnelrecords",component:personnelrecords},
        {path:"/system",component:system},
        {path:"/basicinformation",component:basicinformation},
        {path:"/operator",component:operator},
        {path:"/operationlog",component:operationlog},
        
        
      ]
    },
    {
      path:"/hello",
      component:HelloWorld,
    }
]

const router = new VueRouter({
  mode:'history',
  routes
})

// const originalPush = VueRouter.prototype.push
//    VueRouter.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }



export default router


