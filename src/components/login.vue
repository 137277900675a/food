<template>
  <div class="wrapper">
    <form @submit.prevent="loginBrungle">
      <h2 class="title">公主请登录</h2>
      <div class="input-box">
        <i class="fas fa-user icon"></i>
        <input v-model="username" type="text" required />
        <label>用户名</label>
      </div>
      <div class="input-box">
        <i class="fas fa-lock icon"></i>
        <input v-model="password" type="password" required />
        <label>密码</label>
      </div>
      <div class="input-box">
        <i class="fas fa-shield-alt icon"></i>
        <input v-model="captcha" type="text" required />
        <label>验证码</label>
      </div>
      <div class="captcha-box">
        <img :src="captchaImage" alt="Captcha" />
        <button @click="generateCaptcha" type="button">刷新验证码</button>
      </div>
      <div class="row">
        <a @click="forgotman">忘记密码?</a>
      </div>
      <button type="submit" class="btn">登录</button>
      <div class="signup-link">
        <p>没有账号? <router-link to="/register">请创建一个。</router-link></p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      captcha: "",
      captchaChars: "",
      captchaImage: "",
      // 读取localStorage中的用户数据
      users: JSON.parse(localStorage.getItem("users") || "[]"),
    };
  },
  methods: {
    forgotman() {
      alert("忘记密码? 请联系管理员。");
    },
    generateCaptcha() {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let captcha = "";
      for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.captchaChars = captcha;
      this.captchaImage = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40"><text x="10" y="30" font-family="Arial" font-size="24" fill="black">${captcha}</text></svg>`;
    },
    loginBrungle() {
      if (this.username && this.password) {
        // 在本地存储中查找用户名和密码是否匹配
        const user = this.users.find(
          (user) =>
            user.username === this.username && user.password === this.password
        );

        // 判断是否找到了匹配的用户
        if (user) {
          // 判断输入的验证码是否正确，忽略大小写
          if (this.captcha === this.captchaChars.toLowerCase()) {
            alert("登录成功");
            // 登录成功后跳转到首页
            this.$router.push("/index");
          } else {
            alert("验证码错误");
          }
        } else {
          alert("用户名或密码错误");
        }
      } else {
        alert("请输入用户名和密码！");
      }
    },
  },
  mounted() {
    this.generateCaptcha();
  },
};
</script>

<style>
/* 引入FontAwesome的CDN */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css");

* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../img/bg.png");
  background-size: cover;
  background-position: center;
}

.title {
  color: #fff;
  text-align: center;
  margin-top: 10px;
  margin-bottom: -10px;
}

.wrapper {
  position: relative;
  width: 400px;
  height: 500px;
  background: #3e404d;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
}

.wrapper:hover {
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.5);
  background: #46474e;
}

.wrapper .input-box {
  position: relative;
  width: 310px;
  margin: 30px 0;
  border-bottom: 2px solid #fff;
}

.wrapper .input-box input {
  width: 100%;
  height: 50px;
  background: transparent;
  outline: none;
  border: none;
  font-size: 1em;
  color: #fff;
  padding: 0 40px 0 5px;
}

.wrapper .input-box label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1em;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.wrapper .input-box input:focus ~ label,
.wrapper .input-box input:valid ~ label {
  top: -5px;
}

.wrapper .input-box .icon {
  position: absolute;
  right: 8px;
  color: #fff;
  font-size: 1.2em;
  line-height: 57px;
}

.wrapper .row {
  margin: -15px 0 15px;
  font-size: 0.9em;
  color: #fff;
  display: flex;
  justify-content: space-between;
}

.wrapper .row label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.wrapper .row a {
  color: #fff;
  text-decoration: none;
}

.wrapper .btn {
  width: 100%;
  height: 40px;
  background: #fff;
  outline: none;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  color: #000;
  margin-top: 10px;
}

.btn:hover {
  background: #ffffea;
}

.wrapper .signup-link {
  font-size: 0.9em;
  color: #fff;
  text-align: center;
  margin: 25px 0 10px;
}

.wrapper .signup-link a {
  color: #fff;
  text-decoration: none; /* 去除下划线 */
  font-weight: 600;
}

.wrapper .signup-link a:hover {
  text-decoration: underline;
}

.captcha-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.captcha-box img {
  width: 120px;
  height: 40px;
}

.captcha-box button {
  background: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.9em;
  color: #000;
}

@media (max-width: 360px) {
  .wrapper {
    width: 100%;
    height: 100vh;
    border: none;
    border-radius: 0px;
  }

  .wrapper .input-box {
    width: 290px;
  }
}
</style>
