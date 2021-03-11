/* const userId = {
  normalUser: 0,
  touristUser: 1,
  vipUser:2,
}

function forUser(type){
  if(type===userId.normalUser){
    // 针对普通用户的操作
  }else if(type==userId.touristUser){
    // 针对游客的操作
  }else if(type==userId.vipUser){
    // 针对 VIP 用户的操作
  }
} */

const userId = {
  normalUser: Symbol(),
  touristUser: Symbol(),
  vipUser:Symbol(),
}

function forUser(type){
  if(type===userId.normalUser){
    console.log("0")
  }else if(type==userId.touristUser){
    // 针对游客的操作
    console.log("1")
  }else if(type==userId.vipUser){
    // 针对 VIP 用户的操作
    console.log("2")
  }
}

const type = userId.touristUser;
forUser(type);