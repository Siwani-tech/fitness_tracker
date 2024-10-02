
import React from 'react'

function Dashboard() {

  const data=[
  {
  
    name:"jungkook",
    age:"26",
    favfood:"samyoungpal"
  },
  {
    name:"tae",
    age:"28",
    favfood:"samyoungpal"
  },
  {
  name:"jimin",
  age:"28",
  favfood:"samyoungpal"}

]
  return (
    <div>
   {data.map((item)=>{
    return (<div>{item.favfood}</div>)
   })}
    </div>
  )
}

export default Dashboard