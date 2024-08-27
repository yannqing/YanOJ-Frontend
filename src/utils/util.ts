/**
 * 原时间格式：2024-07-21T10:56:01.000+00:00
 * 格式化时间为 yyyy-mm-dd HH:mm:ss
 * @param date
 */
export const dataFormat = (date: string) => {
  const dateStr = new Date(date)
  return dateStr
    .toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Shanghai' // 假设你想要北京时间
    })
    .replace(/\//g, '-')
}

export const passPercentage = (acceptedNum: number, submitNum: number) => {
  if (submitNum === 0) {
    return '0%  (0/0)'
  } else {
    const percentage = ((acceptedNum * 100) / submitNum).toFixed(2)
    return `${percentage}%  (${acceptedNum}/${submitNum})`
  }
}
