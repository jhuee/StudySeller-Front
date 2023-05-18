import * as React from 'react'
import 'semantic-ui-css/semantic.min.css';

import { NotionPage } from '@/components/NotionPage'
import { domain } from '@/lib/config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import MainPage from "@/components/MainPage"

// 속성을 가져오는 함수를 실행하는데, 개인 notion page id가 없으면 error 출력함
// 만약에 로그인이 되어있지 않다면, error가 발생하기 때문에, error -> login페이지로 연결

export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage(domain)
    return( { props, revalidate: 10 }
  
   );
  } catch (err) {
    console.error('page error', domain, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}
export default function Main(props){
  return  <MainPage{...props}  />

}
