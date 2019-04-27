<template>
    <div id="register">
        <el-container>
                <el-header>注册账号</el-header>
                <el-main>
                    <el-form  :model="ruleForm" label-width="100px" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="u_name" >
                            <el-col :span="16">
                               <el-input v-model="ruleForm.u_name" clearable></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="姓名" prop="truename">
                            <el-col :span="16">
                                <el-input v-model="ruleForm.truename" clearable></el-input>
                            </el-col>
                            
                        </el-form-item>
                        <el-form-item label="地址" prop="address">
                            <el-col :span="16">
                                <el-input v-model="ruleForm.address"  clearable></el-input>
                            </el-col>
                            
                        </el-form-item>
                        <el-form-item label="邮政编码" prop="postcode">
                            <el-col :span="16">
                                <el-input v-model="ruleForm.postcode"  clearable></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="出生日期" prop="birthday">
                            <el-col :span="16">
                                <el-date-picker type="date" v-model="ruleForm.birthday" placeholder="选择日期"  style="width: 100%;" clearable></el-date-picker>
                            </el-col>
                            
                        </el-form-item>
                        <el-form-item label="手机号码" prop="phone">
                            <el-col :span="16">
                                <el-input v-model="ruleForm.phone" clearable></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-col :span="16">
                                <el-input type="email" v-model="ruleForm.email" clearable></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="密码" prop="u_pwd">
                            <el-col :span="16">
                                <el-input v-model="ruleForm.u_pwd" clearable></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="re_u_pwd">
                            <el-col :span="16">
                                <el-input v-model="ruleForm.re_u_pwd" clearable></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                        <el-footer>
                            <!-- <router-link to="/register">注册</router-link>|
                             <router-link to="">忘记密码</router-link> -->
                        </el-footer>
                </el-main>
            </el-container>


    </div>
</template>
<script>
export default {
    data() {
        return {
            ruleForm:{
                u_name:"",
                truename:"",
                address:"",
                postcode:"",
                birthday:"",
                phone:"",
                email:"",
                u_pwd:"",
                re_u_pwd:""
            },
            //表单验证
            rules:{
                u_name:[
                    {required:true,message:"请输入用户名"}
                ]
            }
                
        }
    },
}
</script>

<style scope>
.el-container{
    padding-right: 2%;
}
.el-header{
    background-color: Transparent;
    color: black;
    text-align: center;
    line-height: 60px;
    font-weight: bolder;
    font-size: 25px;
}
.el-footer{
    text-align: right;
}
.el-main {
    background-color:Transparent;
    /* background-color: #E9EEF3; */
    color: #333;
    opacity: 0.7;
    text-align: center;
    line-height: 50px;
    padding-left: 10%;
}
#register{
    width: 50%;
    margin: 0 auto;
    
}
.el-form-item__label{
    font-size: 16px ;
    font-weight: bolder ;
}
.el-input{
}
</style>