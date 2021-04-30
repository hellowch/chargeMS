<template>
  <div id="login">
    <Header></Header>
    <el-container id="building">
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-link type="primary" href="/Register" style="float: right"><el-button>注册</el-button></el-link>
          </el-form-item>
        </el-form>

      </el-main>

    </el-container>
    <Footer></Footer>
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
        username: 'wch',
        password: '111111'
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
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                const _this = this
                this.$axios.post('/login',this.ruleForm).then(res => {
                    const jwt = res.headers['authorization'] //获取头文件中的authorization信息
                    const userInfo = res.data.data

                    //把数据共享出去
                    console.log(userInfo)
                    _this.$store.commit("SET_TOKEN",jwt)
                    _this.$store.commit("SET_USERINFO",userInfo)

                    //获取
                    console.log(_this.$store.getters.getUser)

                    //跳转
                    _this.$router.push("/user")
                })
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
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
