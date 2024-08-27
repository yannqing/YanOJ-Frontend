// 编辑器支持的语言
import { ref } from 'vue'

export const languages = ref(['java', 'html', 'python', 'Go', 'javascript', 'css', 'json'])

export const languagesToColor: Map<string, string> = new Map([
  ['java', 'pinkpurple'],
  ['html', 'blue'],
  ['python', 'orange'],
  ['Go', 'purple'],
  ['javascript', 'pinkpurple'],
  ['css', 'lime'],
  ['json', 'gold']
])
