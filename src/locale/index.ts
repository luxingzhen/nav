// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
import english from './english'
import zh_CN from './zh_CN'
import { STORAGE_KEY_MAP } from 'src/constants'
import { settings } from 'src/store'

const o = {
  en: english,
  cn: zh_CN,
}

const DEFAULT_LANGUAGE = 'zh-CN'

export function getLocale(): string {
  try {
    if (typeof localStorage !== 'undefined') {
      const localLang = localStorage.getItem(STORAGE_KEY_MAP.LANGUAGE)
      if (localLang) {
        return localLang
      }
    }
  } catch (e) {}
  return DEFAULT_LANGUAGE
}

export function $t(s: string, map?: Record<string, any>): string {
  function replaceStr(s: string, map?: Record<string, any>) {
    if (map) {
      for (const k in map) {
        s = s.replaceAll(`{${k}}`, map[k])
      }
    }
    return s
  }
  const l = getLocale()
  let result: string
  if (l === 'zh-CN') {
    result = o.cn[s]
  } else {
    result = o.en[s] ?? o.cn[s]
  }
  if (!result || result.trim() === '') {
    return s
  }
  return replaceStr(result, map)
}

export function isZhCN(): boolean {
  return getLocale() === 'zh-CN'
}

export default o
