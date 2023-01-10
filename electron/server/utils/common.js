function formatDate(time){
  let date = time?new Date(time):new Date()
  let year = autoLength(date.getFullYear())
  let month = autoLength(date.getMonth()+1)
  let day = autoLength(date.getDay())
  let hours = autoLength(date.getHours())
  let minute = autoLength(date.getMinutes())
  let second = autoLength(date.getSeconds())
  return `${year}-${month}-${day} ${hours}:${minute}:${second}`
}

function autoLength(num) {
  return num.toString().length === 1 ? '0' + num : num
}

module.exports={
  formatDate,
  autoLength
}