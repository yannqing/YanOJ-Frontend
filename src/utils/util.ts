/**
 * 原时间格式：2024-07-21T10:56:01.000+00:00
 * 格式化时间为 yyyy-mm-dd HH:mm:ss
 * @param date
 */
export const dataFormat = (date: string) => {
  const dateStr = new Date(date)
  return dateStr.toISOString().replace('T', ' ').substring(0, 19)
}
