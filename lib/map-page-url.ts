import { ExtendedRecordMap, Block } from 'notion-types'
import { getPageTitle, parsePageId, uuidToId, getBlockTitle } from 'notion-utils'

import { includeNotionIdInUrls } from './config'
import { getCanonicalPageId } from './get-canonical-page-id'
import { Site, NotionPageInfo } from './types'

//page의 속성을 가져오기 위해 import함
import { getPageProperty } from 'notion-utils'
import { getPage } from './notion'
import axios from 'axios'
import { url } from 'inspector'
import { strict } from 'assert'
import { useState } from 'react'


// include UUIDs in page URLs during local development but not in production
// (they're nice for debugging and speed up local dev)
const uuid = !!includeNotionIdInUrls


//구매를 하면, 구매자의 아이디를 해당 페이지의 속성에 넣음(여기서 속성은 buyer: string[])
//if(getPrice >0 ){
  // if(getPageProperty.buyer == id) {
  //   url을 띄워주기
  // } else {
  //   결제 창 띄워주기
  // }
// }


export const mapPageUrl =
(site: Site, recordMap: ExtendedRecordMap, searchParams: URLSearchParams, buy:boolean = false) =>
(pageId = '') => {
    const pageUuid = parsePageId(pageId, { uuid: true })
    const block = recordMap.block[pageId]?.value
    const getPrice = getPageProperty<number>('Price',block,recordMap) || 0
    const title = getBlockTitle(block, recordMap) || site.name
    let pcurl;
    console.log(getPrice)
    if(getPrice > 0 ){ //유료인 블록은 axios로 넘김
      try{
        axios({
          method: 'post',
          url: 'http://localhost:8085/pay/kakaopay',
          data: {
            cid : "TC0ONETIME",
            partner_order_id : "partner_order_id",
            partner_user_id :"partner_user_id",
            quantity  : 1,
            approval_url: "http://localhost:8085/pay/success", 
            cancel_url:"http://localhost:8085/pay/fail",
            fail_url :"http://localhost:8085/pay/fail",
            item_name: title,
            total_amount: getPrice
          },
          headers: { 
                      "Content-Type": "application/json; charset=utf-8;",
                    }
        }).then(function (response) { //post 성공 시
                  console.log("Heade With Authentication :" + response)
                  console.log(response.data)
                  console.log(response.status)
                  console.log(response.statusText)
                  console.log(response.headers)
                  console.log(response.config)
                  console.log()
                  const data =  response.data
                  pcurl =  data.split(" , ")[1]
                  
                 return pcurl
                }
        )
      }catch(err){
        console.error(err)
      }
      console.log(pcurl)
      
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
    //만약에, (/spring-boot-dji2398)/(/db23jn2n4n2l3)
    if (uuidToId(pageId) === site.rootNotionPageId) {
      return `https://${site.domain}`
    } else {
      return `https://${site.domain}/${getCanonicalPageId(pageUuid, recordMap, {
        uuid
      })}`
    }
  }



//slug
//ex) spring-boot-dkalmo12903

function createUrl(path: string, searchParams: URLSearchParams) {
  console.log([path, searchParams.toString()].filter(Boolean).join('?'))
  return [path, searchParams.toString()].filter(Boolean).join('?')
}

