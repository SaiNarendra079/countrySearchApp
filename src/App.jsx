import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import axios from "axios"
import Navbar from './Components/Navbar/Navbar'
import MainSec from './Components/Main/MainSec'
const App = () => {
  const[colors,setColors] = useState({bgColor:'white',color:'black',secondBgColor:'white',mode:'Dark Mode'})
  const getColors = ()=>{
    setColors((prevColor)=>prevColor.bgColor==="white"?{ bgColor: '#202c37', color: 'white' ,secondBgColor:'#2b3945',mode:'Light mode'}: {bgColor:'white',color:'black',secondBgColor:'white',mode:'Dark Mode'})
  }
  return (
    <div>
       <Navbar colors={getColors} newcolors={colors}/>
       <MainSec newcolors={colors}/>
    </div>
  )
}
export default App
