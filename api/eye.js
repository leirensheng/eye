
import request from "./httpRequest.js";


export function deleteReport(id) {
  let openId = uni.getStorageSync("openId");
  return request({
    url: `/report/delete`,
    method:'delete',
    data:{
      id,
      openId
    }
  });
}
export function collect(id) {
  let openId = uni.getStorageSync("openId");

  return request({
    url: `/report/collect`,
    method:'put',
    data:{
      openId,
      id
    }
  });
}
export function noCollect(id) {
  let openId = uni.getStorageSync("openId");
  return request({
    url: `/report/cancelCollect`,
    method:'delete',
    data:{
      openId,
      ...id
    }
  });
}

  
export function getHistory(data) {
  let openId = uni.getStorageSync("openId");
  return request({
    url: `/report/list`,
    data:{
      ...data,
      openId
    }
  });
}


export function getDetail(id) {
  let openId = uni.getStorageSync("openId");
  return request({
    url: `/report/get`,    
    method:'post',
    data:{
      id,
      openId
    }  
  });
}


export function analyse(data) {
  return request({
    url: `/report/analUrl`,
    method:'post',
    data    
  });
}



export function generate(data) {
  return request({
    url: `/report/generate`,
    method:'post',
    data    
  });
}

