<template>
    <div class="login_container">
        <!-- 登录块 -->
        <div class="login_box">
            
            <h1 class="login_title" >
                人事管理系统
            </h1>
                <!-- 表单区域 -->
               <el-form ref="LoginFormRef" :rules="LoginRules" :model="LoginForm" class="login_form" label-width="0">
                    <!-- 用户名 -->
                    <el-form-item prop="username">
                        <el-input v-model="LoginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user" size="large"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                     <el-form-item prop="password">
                        <el-input v-model="LoginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password  size="large"></el-input>
                    </el-form-item>
                    <!-- 按钮 -->
                    <el-form-item class="btns">
                    <el-button   type="primary" @click="Login">登录</el-button>
                    
                    </el-form-item>
                </el-form>
            
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            LoginForm:{
                username:"admin",
                password:"123456"
            },
            LoginRules:{
                username:[
                    {required:true,message:'请输入用户名称',trigger:'blur'},
                    {min:5,max:8,message:'长度在5到8个字符',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'},
                    {min:4,max:8,message:'长度在4到8个字符',trigger:'blur'}
                ],

            },
        }
    },
    methods:{
        //处理登录
        Login(){
            //验证校验规则
            this.$refs.LoginFormRef.validate(async vaild =>{

                if(!vaild) return;//验证失败
                const {data:res}=await this.$http.get("/api/test",{params:this.LoginForm});//访问后台
                // if(res=="Hello World"){
                    this.$message.error(res);
                    window.sessionStorage.setItem("user",res);
                    this.$message.success("操作成功！");//信息提示
                    this.$router.push({path:"/home"});//页面路由跳转

                // }else{
                //     this.$message.error("操作失败！");//错误提示
                // }

            })
        }
    },
}
</script>

<style lang="less" scoped>
//登录容器
.login_container{
    // background-color: #2b4b6b ;
    height: 100%;
    background-image: url(../assets/login.png);
    background-size:100% 100%;
    background-repeat:no-repeat;
}
//登录块
.login_box{
    width:460px;
    height: 460px;
    // background-color: #F5F5F5;
   background-color:  rgba(230, 230, 230, 0.596);
    position: absolute;
    transform: translate(-50%,-50%);
    // margin: 0px auto;
    left: 50%;
    top: 53%;
    // text-align: center;
    border-radius: 3px;
    // filter:alpha(Opacity=60);
    // -moz-opacity:0.6;
    // opacity: 0.6; 
    //标题
    .login_title{
        transform:translateX(-50%);
        position: absolute;
        margin-top:50px;
        left: 50%;
        // font-family:Helvetica Neue;
        
    }
}
//按钮
.btns{
    display: flex;
    justify-content: center;
}
//表单
.login_form{
    position: absolute;
    bottom:  15%;
    width:70%;
    padding:0 10px;
    left:15%;
    box-sizing: border-box;
}
</style>