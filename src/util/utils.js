/**
 * 翌歌PC项目方法
 * @authors shinphy
 * @date    2018-09-18
 */
const image = [
  {
    id: '7',
    img: 'static/images/icon/technician.png'
  }, {
    id: '8',
    img: 'static/images/icon/arithmetic.png'
  }, {
    id: '9',
    img: 'static/images/icon/doctor.png'
  }
]

var userFilter,
    findCompCode;
  /* 根据角色筛选对应角色列表 */
  userFilter = (object) => {
    var roleCode = object.enterprises[0].roleCode.split(",");
    var roleList = [];
    for (var k = 0; k < roleCode.length; k++) {
      for (var i = 0; i < object.roles.length; i++) {
        for (var o = 0; o < image.length; o++) {
          if (roleCode[k] == object.roles[i].roleCode && object.roles[i].roleCode == image[o].id) {
            object.roles[i].img = image[o].img
            roleList.push(object.roles[i])
          }
        }
          
      }
    }
    return roleList
  },
  findCompCode = (enterprise) => {
    var orgCode = []
    if (enterprise.hasOwnProperty('companyChildren')) {
      enterprise.companyChildren.forEach(item => {
        if (item.hasPower == 1) {
          orgCode.push(item)
        }
      })
      if (enterprise.company.hasPower == 1) {
        orgCode.push(enterprise.company)
      }
    } else if (enterprise.company.hasPower == 1) {
      orgCode.push(enterprise.company)
    }
    
    return orgCode
  }
  
export {
  userFilter,
  findCompCode
}