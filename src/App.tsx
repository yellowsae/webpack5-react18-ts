import React from 'react'
import './app.less'
import img01 from './assets/imgs/img01.png'
import img02 from './assets/imgs/img02.png'

function App() {
  return (
    <>
      <img src={img01} alt="小于10kb的图片" />
      <img src={img02} alt="大于于10kb的图片" />
      <div className='smallImg'></div> {/* 小图片背景容器 */}
      <div className='bigImg'></div> {/* 大图片背景容器 */}
    </>
  )}
export default App
