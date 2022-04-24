export function formatTime(time) {

  var date = new Date(time)
  var YY = date.getFullYear()
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  return YY +'年'+MM + "月" + DD + "日"

}
export function formatCount(count) {
  if (count > 100000000) {
    return (count / 100000000).toFixed(0) + "亿";
  } else if (count > 1000000) {
    return (count / 10000).toFixed(0) + "万";
  } else if (count > 100000) {
    return (count / 1000).toFixed(0) + "万";
  } else {
    return
  }
}
// !音乐时间的时间格式
export function formatMusicTime(second) {
  var secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)

    var hours = Math.floor(second / 3600)
    second = second - hours * 3600
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60

    return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '0:00:00'
  }
}
