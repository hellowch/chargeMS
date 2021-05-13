<template>
  <div id="login">
    <Header></Header>
    <el-container id="building">
      <el-main>
        <el-form style="margin-left: -10%;padding-right: 20px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button style="margin-left: -25%" type="primary" @click="submitForm(ruleForm)">立即登录</el-button>
            <el-button @click="resetForm(ruleForm)">重置</el-button>
            <el-link type="primary" href="/#/register" style="float: right"><el-button>注册</el-button></el-link>
          </el-form-item>
        </el-form>

      </el-main>

    </el-container>
<!--    <Footer></Footer>-->
  </div>
</template>

<script>
import Header from "../components/Header"
import Footer from "../components/Footer";
export default {
  components: {
    Header,
    Footer
  },
  name: "Login",

  data() {
    return {
      ruleForm: {
        username: 'luwei',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
        ],

      }
    };
  },
  methods: {
    // 按钮点击测试
    submitForm (loginForm) {
      this.axios
        .post('/api/login', {// 用post方法传 输入框输入的用户名和密码findindex
          username: loginForm.username,
          password: loginForm.password,
        })
        .then((response) => {//回调函数当post成功后执行
          console.log(response)
          if (response.data.code === 200 && response.data.data.Id != 0) {//如果后端返回的状态码是200
            this.open2();//调用第一个弹窗方法表示登录成功
            localStorage.setItem('key',JSON.stringify(response.data.data))
            this.$router.replace({
              path: '/cell'
            });
          }
          if (response.data.code != 200 || response.data.data.Id == 0) {
            this.open3()
          }
        })
        .catch((error) => {
          console.log(error)
          this.open3();
        });
    },
    resetForm(formName) {
      formName.username = 'wch01'
      formName.password = '123456'
    },
    open2() {
      this.$message({
        message: '登陆成功！',
        type: 'success'
      });
    },
    open3() {
      this.$message({
        message: '账号或密码错误',
        type: 'warning'
      });
    },
  }
}
</script>

<style>
.v-touch{
  touch-action: pan-y !important;
}
</style>

<style scoped>
#building{
  /*background:url("../assets/images/banner.jpg");*/
  min-height: 700px;
  background-size:100% 100%;
  position: relative;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.logo{
  height: 60%;
  margin-top: 10px;
}

.demo-ruleForm{
  max-width: 500px;
  margin: 0 auto;
  margin-top: 25%;
  /*display: inline-block;*/
  /*vertical-align: middle;*/
}
</style>
