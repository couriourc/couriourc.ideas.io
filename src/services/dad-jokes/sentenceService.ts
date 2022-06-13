import http from '..'

export enum hikitoSentenceType {
  a = 'a',
  b = 'b',
  c = 'c',
  d = 'd',
  e = 'e',
  f = 'f',
  g = 'g',
  h = 'h',
  i = 'i',
  j = 'j',
  k = 'k',
  l = 'l'
}
export interface HikitoSentence {
  id: number
  uuid: string
  hitokoto: string
  type: hikitoSentenceType
  from: string
  from_who: string
  creator: string
  creator_uid: number
  reviewer: number
  commit_from: string
  created_at: string
}

export function getSentenceService(): Promise<any> {
  return http.get('https://v1.hitokoto.cn')
}
