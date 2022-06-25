import React, { useState, lazy, Suspense } from 'react'
import '@/app.less'
import img01 from '@/assets/imgs/img01.png'
import img02 from '@/assets/imgs/img02.png'

// 引入组件 
import { Demo1, Demo2 } from '@/components'

// 引入懒加载组件
const LazyDemo = lazy(() => import('@/components/LazyDemo')) // 使用import语法配合react的Lazy动态引入资源



// function App() {

//   const [ count, setCounts ] = useState('')
//   const onChange = (e: any) => {
//     setCounts(e.target.value)
//   }

//   return (
//     <>
//       <h2>webpack5+react+ts</h2>
//       <p>受控组件</p>
//       <input type="text" value={count} onChange={onChange} />
//       <br />
//       <p>非受控组件</p>
//       <input type="text" />
//     </>
//   )}

// function App() {
//   return (
//     <>
//       <div className='smallImg'></div>
//       <div className='bigImg'></div>
//       <Demo1></Demo1>
//     </>
//   )
// }



function App() {
  const [show, setShow] = useState(false)
  // 点击事件中动态引入css, 设置show为true
  const onClick = () => {
    import('./app.css')
    setShow(true)
  }

  return (
    <>
      <h2 onClick={onClick}>展示</h2>
      {/* show为true时加载LazyDemo组件 */}
      {show && <Suspense fallback={null}><LazyDemo /></Suspense>}
    </>
  )
}
export default App
