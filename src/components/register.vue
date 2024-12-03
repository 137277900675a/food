<template>
  <div class="wrapper">
    <form @submit.prevent="registerUser">
      <h2 class="title">公主请注册</h2>
      <div class="input-box">
        <i class="fas fa-user icon"></i>
        <input v-model="newUsername" type="text" required />
        <label>用户名</label>
      </div>
      <div class="input-box">
        <i class="fas fa-lock icon"></i>
        <input v-model="newPassword" type="password" required />
        <label>密码</label>
      </div>
      <div class="input-box">
        <i class="fas fa-image icon"></i>
        <input type="file" @change="handleFileUpload" />
        <label>上传头像</label>
      </div>
      <button type="submit" class="btn">注册</button>
      <div class="signup-link">
        <p>已有账号? <router-link to="/">请登录。</router-link></p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUsername: "",
      newPassword: "",
      avatarUrl: "../img/default-avatar.png", // 默认头像
      users: [],
    };
  },
  created() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      // 动态导入 localStorage 相关的模块
      const { getUsersFromLocalStorage } = await import(
        "../data/localStorageUtils.js"
      );
      this.users = getUsersFromLocalStorage();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.avatarUrl = URL.createObjectURL(file); // 显示上传的头像
      }
    },
    registerUser() {
      if (this.newUsername && this.newPassword) {
        const existingUser = this.users.find(
          (user) => user.username === this.newUsername
        );
        if (existingUser) {
          alert("用户名已存在，请选择另一个用户名。");
        } else {
          this.users.push({
            username: this.newUsername,
            password: this.newPassword,
            avatar: this.avatarUrl, // 保存头像信息
          });
          localStorage.setItem("users", JSON.stringify(this.users));
          alert("注册成功！");
          this.$router.push("/");
        }
      } else {
        alert("请完整填写用户名和密码。");
      }
    },
  },
};
</script>

<style>
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
  text-decoration: none;
  font-weight: 600;
}

.wrapper .signup-link a:hover {
  text-decoration: underline;
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
