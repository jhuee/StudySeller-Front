import { ExtendedRecordMap, Block } from 'notion-types'
import { parsePageId, uuidToId } from 'notion-utils'

import { includeNotionIdInUrls } from './config'
import { getCanonicalPageId } from './get-canonical-page-id'
import { Site, NotionPageInfo } from './types'

//page의 속성을 가져오기 위해 import함
import { getPageProperty } from 'notion-utils'
import { getPage } from './notion'


// include UUIDs in page URLs during local development but not in production
// (they're nice for debugging and speed up local dev)
const uuid = !!includeNotionIdInUrls

export const mapPageUrl =
(site: Site, recordMap: ExtendedRecordMap, searchParams: URLSearchParams) =>
(pageId = '') => {
    const pageUuid = parsePageId(pageId, { uuid: true })
    const block = recordMap.block[pageId]?.value
    const getPrice = getPageProperty<number>('Price',block,recordMap) || 0
    console.log(getPrice)
    if(getPrice > 0 ){
      if (uuidToId(pageUuid) === site.rootNotionPageId) {
      return `http://localhost:3000/${site.rootNotionPageId}`
      }
    }
    else if(getPrice == 0){
      console.log("BB")
    if (uuidToId(pageUuid) === site.rootNotionPageId) {
      return createUrl('/', searchParams)
    } else {
      console.log(createUrl(  
        `/${getCanonicalPageId(pageUuid, recordMap, { uuid })}`,
        searchParams
      ) , "그리고 ", pageUuid, "그리고", recordMap, "또 그리고", { uuid })
      console.log
      return createUrl(
        `/${getCanonicalPageId(pageUuid, recordMap, { uuid })}`,
        searchParams
      )
    }}}
  
//pageUuid = page id
//uuid 는 boolean인데 뭐가 true이고 false인진 모르겠음
export const getCanonicalPageUrl =
  (site: Site, recordMap: ExtendedRecordMap) =>
  (pageId = '') => {
    const pageUuid = parsePageId(pageId, { uuid: true })
    if (uuidToId(pageId) === site.rootNotionPageId) {
      return `https://${site.domain}`
    } else {
      return `https://${site.domain}/${getCanonicalPageId(pageUuid, recordMap, {
        uuid
      })}`
    }
  }

  

function createUrl(path: string, searchParams: URLSearchParams) {
  console.log([path, searchParams.toString()].filter(Boolean).join('?'))
  return [path, searchParams.toString()].filter(Boolean).join('?')
}

