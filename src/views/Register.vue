<template>
  <div id="register">
    <Header></Header>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="昵称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="ruleForm.avatar"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
        <el-button @click="resetForm(ruleForm)">重置</el-button>
      </el-form-item>
    </el-form>
    <Footer></Footer>
  </div>

</template>

<script>
//用户注册
import Header from "../components/Header"
import Footer from "../components/Footer";
export default {
  components: {
    Header,
    Footer
  },
  name: "Register",
  data() {
    return {
      ruleForm: {
        name: '',
        username: '',
        password: '',
        phoneNumber: '',
        avatar: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
      }
    };

  },
  methods: {
    submitForm(formName) {
      if (formName.name == '' || formName.username == '' || formName.password == '') {
        this.open4()
      }else{
        this.axios
          .post('/api/register', {
            name: formName.name,
            username: formName.username,
            password: formName.password,
            phoneNumber: formName.phoneNumber,
            avatar: formName.avatar,
          })
          .then((response) => {
            console.log(response)
            if (response.data.code === 200 && response.data.data === 1){
              this.open2();
              this.$router.replace({
                path: '/'
              })
            }
            if (response.data.code != 200 || response.data.data != 1){
              this.open3()
            }
          })
          .catch((error) => {
            this.open3()
          })
      }

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    open2() {
      this.$message({
        message: '注册成功！',
        type: 'success'
      });
    },
    open3() {
      this.$message({
        message: '注册失败',
        type: 'warning'
      });
    },
    open4() {
      this.$message({
        message: '请填写信息',
        type: 'warning'
      });
    },
  }
}
</script>

<style scoped>

</style>
