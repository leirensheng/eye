import env from './getEnv.js'
let map={
  develop:'http://192.168.1.206:38080/intelligent-identify',
  trial:'https://intel.gdcers.com/intelligent-identify',
}
let baseUrl = map[env]||"https://intel.gdcers.com/intelligent-identify"
let http = (option) => {
  let { timeout = 60000, data, method = "get",url } = option;
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      timeout,
      dataType: "json",

      data,
      method: method,

      header: {
      },
      success: (res) => {
        let { msg, message, code, data } = res.data;
        if (code !== 0) {
          uni.showToast({
            icon: "none",
            title: (msg || message),
            duration: 2000,
          });
          reject(res.data);
          return;
        }
        resolve(data);
      },
      fail: (res) => {
        uni.showToast({
          icon: "none",
          title: '网络不给力，请稍后再试~',
          duration: 2000,
        });
        reject(res);
      },
      complete: () => {},
    });
  });
};
export {baseUrl}
export default http