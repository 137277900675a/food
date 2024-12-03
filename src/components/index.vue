<template>
  <div id="app">
    <!-- 导航栏部分 -->
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

    <!-- 轮播图部分 -->
    <div class="carousel">
      <div class="carousel-images">
        <div class="carousel-item">
          <img
            :src="images[currentIndex]"
            alt="carousel image"
            class="carousel-image"
          />
        </div>
      </div>

      <div class="carousel-buttons">
        <button
          v-for="(item, index) in images"
          :key="index"
          @click="goToSlide(index)"
        >
          图片 {{ index + 1 }}
        </button>
      </div>
    </div>

    <!-- 美食简介部分 -->
    <div class="food-intro">
      <h2>推荐美食</h2>
      <div class="food-cards">
        <div class="food-card">
          <img src="../img/banner1.jpg" alt="food 1" />
          <p>水果沙拉</p>
          <p>这是一道非常美味的菜品，口感鲜美，味道丰富。</p>
        </div>
        <div class="food-card">
          <img src="../img/banner2.jpg" alt="food 2" />
          <p>小酥肉</p>
          <p>山西省的传统名菜之一，味道独特，深受食客们的喜爱。</p>
        </div>
        <div class="food-card">
          <img src="../img/banner3.jpg" alt="food 3" />
          <p>醋香土豆丝</p>
          <p>这道美食色香味俱全，深受大家的喜爱。</p>
        </div>
      </div>
    </div>

    <!-- 热门美食部分 -->
    <div class="food-hot">
      <h2>热门美食</h2>
      <div class="food-cards">
        <div class="food-card hot-card">
          <div class="hot-tag">热门</div>
          <img src="../img/1.jpg" alt="food 1" />
          <p>麻婆豆腐</p>
          <p>口味独特，口感顺滑，让你的味蕾舞动起来！</p>
        </div>
        <div class="food-card hot-card">
          <div class="hot-tag">热门</div>
          <img src="../img/2.jpg" alt="food 2" />
          <p>眉山东坡肉</p>
          <p>肉质细嫩、香气浓郁，入口即化。</p>
        </div>
        <div class="food-card hot-card">
          <div class="hot-tag">热门</div>
          <img src="../img/3.jpg" alt="food 3" />
          <p>宫保鸡丁</p>
          <p>曾被封为“太子少保”，满汉全席名菜之一。</p>
        </div>
      </div>
    </div>

    <!-- 每日美食排行榜部分：使用ECharts的条形图显示 -->
    <div class="daily-food-ranking">
      <div class="dataView__first__title">每日美食排行榜</div>
      <!-- 添加一个 ECharts 容器 -->
      <div id="echartRanking" style="width: 100%; height: 400px"></div>
    </div>
  </div>
</template>
<script>
import img1 from "../img/5.jpg";
import img2 from "../img/7.jpg";
import img3 from "../img/6.jpg";
import "../assets/EChartComponent.js"; // 引入液体填充效果

// 随机生成排行榜数据
function generateRandomData() {
  return [
    { name: "水果沙拉", value: Math.floor(Math.random() * 100) },
    { name: "小酥肉", value: Math.floor(Math.random() * 100) },
    { name: "宫保鸡丁", value: Math.floor(Math.random() * 100) },
    { name: "麻婆豆腐", value: Math.floor(Math.random() * 100) },
    { name: "眉山东坡肉", value: Math.floor(Math.random() * 100) },
    { name: "宫保鸡丁", value: Math.floor(Math.random() * 100) },
    { name: "醋香土豆丝", value: Math.floor(Math.random() * 100) },
  ];
}

export default {
  name: "HomePage",
  data() {
    return {
      images: [img1, img2, img3],
      currentIndex: 0,
      slideInterval: null,
      isLoggedIn: false,
      avatarUrl: "../img/yier.png",
      showDropdown: false,
      dailyFoodRanking: generateRandomData(),
    };
  },
  mounted() {
    document.body.style.background =
      "url('../img/1.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    this.startAutoSlide();

    // 动态导入 EChartComponent
    import("../assets/EChartComponent.js").then((module) => {
      module.createEChart("echartRanking", this.dailyFoodRanking);
    });

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.avatar) {
      this.isLoggedIn = true;
      this.avatarUrl = user.avatar;
    }
  },
  beforeDestroy() {
    document.body.style.background = "";
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  },
  methods: {
    goToSlide(index) {
      this.currentIndex = index;
    },
    startAutoSlide() {
      this.slideInterval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 3000);
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    goToProfile() {
      alert("跳转到个人信息页面");
      this.$router.push("/self");
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

/* 页面整体布局 */
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  padding-top: 20px;
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

/* 轮播图样式 */
.carousel {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  text-align: center;
  margin-top: 60px;
}

.carousel-images {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.carousel-item {
  width: 100%;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-buttons {
  margin-top: 20px;
}

.carousel-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
}

.carousel-buttons button:hover {
  background-color: #ff4500;
}

/* 美食简介部分 */
.food-intro {
  padding: 40px 20px;
  text-align: center;
  width: 100%;
  background-color: #f8f8f8;
}

.food-intro h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
}

.food-cards {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  flex-wrap: wrap;
}

.food-card {
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.food-card img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.food-card p {
  font-size: 16px;
  color: #555;
  margin-top: 10px;
}

/* 热门美食部分样式 */
.food-hot .food-card {
  position: relative;
}

.hot-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ff6347;
  color: white;
  padding: 5px 10px;
  font-size: 0.9rem;
  border-radius: 5px;
}

.food-hot h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
} /* 每日美食排行榜样式 */
.daily-food-ranking {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f8f8f8;
  text-align: center;
  width: 100%;
  margin-top: 60px;
}

.daily-food-ranking .dataView__first__title {
  font-size: 2rem;
  color: #030607;
  margin-bottom: 30px;
  position: relative;
  padding-left: 30px;
  font-weight: bold;
  text-transform: uppercase;
}

/* 食物卡片容器 */
.daily-food-ranking .food-cards {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center; /* 垂直居中 */
}

/* 单个食物卡片 */
.daily-food-ranking .food-card {
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.daily-food-ranking .food-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* 排行榜徽章 */
.daily-food-ranking .rank-badge {
  background-color: #ff6347;
  color: white;
  padding: 8px 12px;
  border-radius: 50%;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
}

/* 食物图片 */
.daily-food-ranking .food-card img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.daily-food-ranking .food-card img:hover {
  transform: scale(1.05); /* 图片放大效果 */
}

/* 食物名称和描述 */
.daily-food-ranking .food-card p {
  font-size: 16px;
  color: #555;
  margin-top: 15px;
}

/* 食物名称（加粗） */
.daily-food-ranking .food-card p:first-child {
  font-weight: bold;
  color: #333;
}

/* 食物描述（灰色） */
.daily-food-ranking .food-card p:last-child {
  color: #777;
  font-size: 14px;
}
</style>
