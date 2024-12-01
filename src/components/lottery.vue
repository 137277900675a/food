<template>
  <!-- 导航栏 -->
  <div class="navbar">
    <div class="logo"><img src="../img/image.png" alt="logo" /></div>
    <ul class="nav-links">
      <li><router-link to="/index">首页</router-link></li>
      <li><router-link to="/lottery">每日随机选菜</router-link></li>
      <li v-if="isLoggedIn">
        <div class="avatar-container">
          <img
            :src="avatarUrl"
            alt="Avatar"
            class="avatar"
            @click="toggleDropdown"
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
  <div class="food-lottery">
    <h1>随机美食抽奖</h1>
    <button @click="pickRandomFood" class="lottery-button">抽奖</button>
    <div v-if="selectedFood" class="food-display">
      <img
        :src="selectedFood.image"
        :alt="selectedFood.name"
        class="food-image"
      />
      <h2 class="food-name">{{ selectedFood.name }}</h2>
      <p class="food-description">{{ selectedFood.description }}</p>
    </div>
  </div>
</template>

<script>
import img1 from "../img/1.jpg";
import img2 from "../img/2.jpg";
import img3 from "../img/3.jpg";
import img4 from "../img/4.jpg";
import img5 from "../img/5.jpg";
import img6 from "../img/6.jpg";
import img7 from "../img/7.jpg";
import img8 from "../img/8.jpg";
import img9 from "../img/9.jpg";
export default {
  data() {
    return {
      isLoggedIn: false,
      avatarUrl: "../img/yier.png",
      showDropdown: false,
      foods: [
        {
          name: "麻辣火锅",
          image: img1,
          description: "麻辣火锅，辣味十足，吃了让你欲罢不能！",
        },
        {
          name: "寿司",
          image: img2,
          description: "新鲜的寿司，口感细腻，令人陶醉。",
        },
        {
          name: "炸鸡",
          image: img3,
          description: "外酥里嫩的炸鸡，绝对是你的最爱！",
        },
        {
          name: "披萨",
          image: img4,
          description: "美味的披萨，丰富的配料让你欲罢不能。",
        },
        {
          name: "冰淇淋",
          image: img5,
          description: "清凉的冰淇淋，夏天的最佳选择。",
        },
        {
          name: "牛排",
          image: img6,
          description: "多汁的牛排，肉质鲜嫩，令人垂涎。",
        },
        {
          name: "沙拉",
          image: img7,
          description: "新鲜的沙拉，健康又美味。",
        },
        {
          name: "煎饺",
          image: img8,
          description: "香脆的煎饺，搭配酱油更美味。",
        },
        {
          name: "蛋糕",
          image: img9,
          description: "绵密的蛋糕，甜蜜的享受。",
        },
      ],
      selectedFood: null,
    };
  },
  methods: {
    pickRandomFood() {
      const randomIndex = Math.floor(Math.random() * this.foods.length);
      this.selectedFood = this.foods[randomIndex];
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    goToProfile() {
      alert("跳转到个人信息页面");
      this.$router.push("/profile");
    },
    goToSettings() {
      alert("跳转到设置页面");
    },
    logout() {
      localStorage.removeItem("user");
      this.isLoggedIn = false;
      this.avatarUrl = "../img/default-avatar.png";
      this.showDropdown = false;
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* 导航栏头像样式 */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
}
.avatar-container {
  position: relative;
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
.food-lottery {
  text-align: center;
  margin: 20px;
  margin-top: 80px;
  font-family: "Arial", sans-serif;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.lottery-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.lottery-button:hover {
  background-color: #0056b3;
}

.food-display {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.food-image {
  width: 300px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
}

.food-name {
  font-size: 24px;
  color: #333;
  margin: 10px 0;
}

.food-description {
  color: #666;
  font-size: 16px;
}
/* 页面整体布局 */
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  padding-top: 20px;
  margin-top: 70px;
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
</style>
