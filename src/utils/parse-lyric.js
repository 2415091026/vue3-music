const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function paesrLyric(lyricString) {
  const lyricInfos = []
  const lyricStrings = lyricString.split("\n")

  for(const lineString of lyricStrings) {
    const timeResult = timeRegExp.exec(lineString)
    if (!timeResult) continue
    const mintue = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millSecond = timeResult[3].length === 2 ? timeResult[3] * 10 : timeResult[3] * 1
    const time = mintue + second + millSecond
    const text = lineString.replace(timeRegExp, "")
    const lyricInfo = {time, text}
    lyricInfos.push(lyricInfo)
  }

  return lyricInfos
}
