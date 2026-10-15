import { formatInTimeZone } from 'date-fns-tz'

export function getMealTime(date = new Date()) {
  const koreaHour = Number(formatInTimeZone(date, 'Asia/Seoul', 'H'))

  if (koreaHour >= 5 && koreaHour < 11) return '아침'
  if (koreaHour >= 11 && koreaHour < 15) return '점심'
  if (koreaHour >= 15 && koreaHour < 17) return '간식'
  if (koreaHour >= 17 && koreaHour < 23) return '저녁'
  return '야식'
}