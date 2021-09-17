import Vue from "vue";
import App from "./App";
import store from "./store";
import checkLogin from "@/utils/checkLogin.js";
Vue.config.productionTip = false;
Vue.prototype.$checkLogin = checkLogin;
Vue.prototype.$store = store;
Vue.prototype.$formatDate = (val) => {
  if (!val) return "";
  let date = val;
  if (typeof val !== "object") {
    date = new Date(val);
  }
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  month = getFullNumber(month);
  day = getFullNumber(day);
  return `${year}-${month}-${day}`;
};

function getFullNumber(val) {
  return val <= 9 ? `0${val}` : val;
}
Vue.prototype.$sleep = (time = 500) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
Vue.prototype.$formatTime = (val) => {
  if (!val) return "";
  let date = val;
  if (typeof val !== "object") {
    date = new Date(val);
  }
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  month = getFullNumber(month);
  day = getFullNumber(day);
  hour = getFullNumber(hour);
  minute = getFullNumber(minute);
  second = getFullNumber(second);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

Vue.prototype.$toLogin = () => {
  uni.navigateTo({ url: "/pages/login/index" });
};
Vue.prototype.$toPage = (page) => {
  uni.navigateTo({ url: `/pages/${page}/index` });
};
Vue.prototype.$getPrePath = () => {
  let pages = getCurrentPages(); //页面对象
  console.log(pages);
  let prePage = pages.slice(-2)[0];
  return prePage && prePage.route;
};


Vue.prototype.$getClip=()=>{
  return new Promise((resolve) => {
    uni.getClipboardData({
      success: (res) => {
        resolve(res.data)
      },
    });
  });
},
App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
