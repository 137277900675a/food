<template>
  <div id="profile-page">
    <!-- 导航栏 -->
    <div class="navbar">
      <div class="logo"><img src="../img/image.png" alt="logo" /></div>
      <ul class="nav-links">
        <li><router-link to="/index">首页</router-link></li>
        <li><router-link to="/lottery">每日随机选菜</router-link></li>
        <li v-if="isLoggedIn">
          <div class="avatar-container" @click="editAvatar">
            <img
              :src="avatarUrl"
              alt="Avatar"
              class="avatar"
              @click.stop="toggleDropdown"
            />
            <input
              type="file"
              ref="fileInput"
              @change="onFileChange"
              accept="image/*"
              style="display: none"
            />
            <div v-if="showDropdown" class="dropdown">
              <ul>
                <li @click="goToProfile">个人信息</li>
                <li @click="goToSettings">设置</li>
                <li @click="logout">注销</li>
              </ul>
            </div>
          </div>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/">登录</router-link>
        </li>
      </ul>
    </div>

    <!-- 个人信息头部 -->
    <div class="profile-header">
      <div class="avatar-container">
        <img :src="avatarUrl" alt="Avatar" class="avatar" @click="editAvatar" />
      </div>
      <h2>{{ username }}</h2>
      <button @click="editProfile">编辑个人资料</button>
    </div>

    <!-- 用户详细信息表单 -->
    <form class="profile-info" @submit.prevent="saveProfile">
      <div class="info-item">
        <label for="username">用户名</label>
        <input
          v-model="username"
          id="username"
          type="text"
          :readonly="!isEditing"
        />
      </div>

      <div class="info-item">
        <label for="email">电子邮箱</label>
        <input v-model="email" id="email" type="email" :readonly="!isEditing" />
      </div>

      <div class="info-item">
        <label for="phone">联系电话</label>
        <input v-model="phone" id="phone" type="tel" :readonly="!isEditing" />
      </div>

      <!-- 新增性别信息 -->
      <div class="info-item">
        <label for="gender">性别</label>
        <input
          v-model="gender"
          id="gender"
          type="text"
          :readonly="!isEditing"
        />
      </div>

      <!-- 新增年龄信息 -->
      <div class="info-item">
        <label for="age">年龄</label>
        <input v-model="age" id="age" type="number" :readonly="!isEditing" />
      </div>

      <!-- 新增地区信息 -->
      <div class="info-item">
        <label for="region">地区</label>
        <input
          v-model="region"
          id="region"
          type="text"
          :readonly="!isEditing"
        />
      </div>

      <!-- 新增职业信息 -->
      <div class="info-item">
        <label for="occupation">职业</label>
        <input
          v-model="occupation"
          id="occupation"
          type="text"
          :readonly="!isEditing"
        />
      </div>

      <!-- 新增兴趣爱好信息 -->
      <div class="info-item">
        <label for="hobby">兴趣爱好</label>
        <input v-model="hobby" id="hobby" type="text" :readonly="!isEditing" />
      </div>

      <!-- 新增个性签名信息 -->
      <div class="info-item">
        <label for="signature">个性签名</label>
        <input
          v-model="signature"
          id="signature"
          type="text"
          :readonly="!isEditing"
        />
      </div>

      <!-- 新增注册日期信息 -->
      <div class="info-item">
        <label for="registerDate">注册日期</label>
        <input
          v-model="registerDate"
          id="registerDate"
          type="text"
          :readonly="!isEditing"
        />
      </div>

      <!-- 编辑/保存按钮 -->
      <div class="actions">
        <button v-if="isEditing" type="submit">保存</button>
        <button v-if="!isEditing" @click="editProfile" type="button">
          编辑
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      username: "",
      email: "",
      phone: "",
      avatarUrl: "../img/yier.png", // 默认的avatar路径
      isEditing: false,
      isLoggedIn: false,
      showDropdown: false,
      gender: "",
      age: "",
      region: "",
      occupation: "",
      hobby: "",
      signature: "",
      registerDate: "",
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.isLoggedIn = true;
      this.username = user.username;
      this.email = user.email;
      this.phone = user.phone;
      this.avatarUrl = user.avatar || "../img/default-avatar.png";
      this.gender = user.gender;
      this.age = user.age;
      this.region = user.region;
      this.occupation = user.occupation;
      this.hobby = user.hobby;
      this.signature = user.signature;
      this.registerDate = user.registerDate;
    }
  },
  methods: {
    editProfile() {
      this.isEditing = !this.isEditing;
    },
    saveProfile() {
      const updatedUser = {
        username: this.username,
        email: this.email,
        phone: this.phone,
        avatar: this.avatarUrl,
        gender: this.gender,
        age: this.age,
        region: this.region,
        occupation: this.occupation,
        hobby: this.hobby,
        signature: this.signature,
        registerDate: this.registerDate,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      this.isEditing = false;
      alert("个人资料已保存！");
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      localStorage.removeItem("user");
      this.isLoggedIn = false;
      this.avatarUrl = "../img/default-avatar.png";
      this.showDropdown = false;
      this.$router.push("/");
    },
    goToProfile() {
      this.$router.push("/profile");
    },
    goToSettings() {
      alert("跳转到设置页面");
    },
    editAvatar() {
      // 触发文件选择
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatarUrl = e.target.result; // 更新头像URL
        };
        reader.readAsDataURL(file); // 读取文件为Data URL
      }
    },
  },
};
</script>

<style scoped>
/* 导航栏头像样式 */
/* 确保头像大小一致 */
.avatar-container {
  position: relative;
  width: 80px; /* 固定宽度 */
  height: 80px; /* 固定高度 */
  margin: 0 auto;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f5f5f5;
}

.dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 150px;
}

.dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown ul li {
  padding: 10px;
  cursor: pointer;
}

.dropdown ul li:hover {
  background-color: #f0f0f0;
}

/* 页面整体布局 */
#profile-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  text-align: center;
  padding-top: 100px;
}

/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(254, 254, 254);
  padding: 15px 20px;
  color: rgb(11, 3, 3);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 20px;
  align-items: center; /* 确保头像在导航栏中垂直居中 */
}

.nav-links li {
  font-size: 1.2rem;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-links li:hover {
  background-color: #ff6347;
}

.nav-links li a {
  color: rgb(21, 9, 9);
  text-decoration: none;
  display: block;
}

.nav-links li a:hover {
  color: white;
}

/* 个人信息部分 */
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 30px;
}

.avatar-container {
  position: relative;
  width: 80px; /* Adjusted size */
  height: 80px; /* Adjusted size */
  margin: 0 auto;
  margin-top: 20px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f5f5f5;
}

h2 {
  font-size: 1.5rem;
  margin-top: 10px;
}

button {
  padding: 8px 15px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* 个人信息表单部分 */
.profile-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: left;
  max-width: 800px;
  margin: 0 auto;
  gap: 20px;
}

.info-item {
  flex: 1 1 45%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  min-width: 250px;
}

.info-item label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input[readonly] {
  background-color: #f9f9f9;
  cursor: not-allowed;
}

/* 编辑/保存按钮 */
.actions {
  margin-top: 20px;
}

.actions button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.actions button:hover {
  background-color: #0056b3;
}
</style>
