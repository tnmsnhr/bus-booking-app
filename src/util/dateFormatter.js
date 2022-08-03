export const dateFormatter = () => {
  const today = new Date()
  const yyyy = today.getFullYear()
  let mm = today.getMonth() + 1 // Months start at 0!
  let dd = today.getDate()
  let hh = today.getHours()
  let m = today.getMinutes()
  let s = today.getSeconds()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm
  if (hh < 10) hh = '0' + hh
  if (m < 10) m = '0' + m
  if (s < 10) s = '0' + s

  const formattedToday = `${dd}/${mm}/${yyyy} ${hh}:${m}:${s}`

  return formattedToday
}
