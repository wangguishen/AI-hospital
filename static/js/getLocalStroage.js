import 'babel-polyfill'  //引入IE兼容性
var key = "IDENTIFY"
//获取本地存储的数据
function getLocalData(){
  return JSON.parse(localStorage.getItem(key) || '{}')
}

//数据更改后，本地存储数据相应的变化--newData:{authEntry：indexAuthEntry,currentUrl:url}
export function addLocalData(newData){
  var localMessage = getLocalData();
  for(var i in newData){
    var aut=newData[i].authEntry
    if(!localMessage[aut]){
       localMessage[aut]=newData[i].currentUrl    
    }else{
      localMessage[aut]=newData[i].currentUrl  
    }
  }
  localStorage.setItem(key, JSON.stringify(localMessage))
}

//传送indexAuthEntry之后，返回url地址currentName-->indexAuthEntry
export function getCurrentUrl(currentName){
  var localMessage = getLocalData();
  for (var key in localMessage) {
     if (key==currentName) {
      var url = localMessage[key];
      return url
    }  
  }
}
