import React, { useEffect, useState } from 'react'
import './Main.css'
import search from '../../assets/search.svg'
import axios from 'axios'
const MainSec = ({newcolors}) => {
  const[getApi,setGetApi] = useState([])
  const[loading,setLoading] = useState(true)
  const[filteredItems,setFilteredItems] = useState([])
  const[selectedRegion,SetSelectedRegion] = useState('')
  const[flag,setFlag] = useState('')
  const fetchingApi = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setGetApi(response.data); 
      setFilteredItems(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false)
    }
  };
  const handleInput = (e)=>{
    const inpValue = e.target.value.toLowerCase();
    const filtering = getApi.filter((item)=>item.name.common.toLowerCase().includes(inpValue))
    setFilteredItems(filtering);
  }
  const handleFilter = (e)=>{
    const inpValue = e.target.name;
    SetSelectedRegion(inpValue);
    const filtering = getApi.filter((item)=>item.region.includes(inpValue));
    setFilteredItems(filtering);
  }
  useEffect(()=>{
        fetchingApi();
  },[])

  return (
    <>
      <div  style={{backgroundColor:newcolors.bgColor}}>
      <div className="w-75 m-auto" >
        <div className='d-md-flex justify-content-between pt-5 align-md-center '>
          <div className='inputDiv shadow d-flex  align-center gap-3' style={{backgroundColor:newcolors.secondBgColor}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={newcolors.color} className="bi bi-search searchImage" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
          <input type="text" onChange={handleInput} placeholder='Search for a Country...' style={{color:newcolors.color,'::placeholder':{color:newcolors.color}}}   />
          </div>
          <div className="dropdown mt-4 mt-md-0 ">
            <button style={{backgroundColor:newcolors.secondBgColor,color:newcolors.color}} className="btn dropdown-toggle thisBtn shadow p-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {selectedRegion?selectedRegion:'Select Region'}
            </button>
            <ul className="dropdown-menu p-0" style={{backgroundColor:newcolors.secondBgColor}} >
              <li><a className="dropdown-item" style={{color:newcolors.color}} onClick={handleFilter}  name="Antarctic" href="#">Antarctic</a></li>
              <li><a className="dropdown-item" style={{color:newcolors.color}} onClick={handleFilter} name="Americas" href="#">Americas</a></li>
              <li><a className="dropdown-item" style={{color:newcolors.color}} onClick={handleFilter} name="Europe" href="#">Europe</a></li>
              <li><a className="dropdown-item" style={{color:newcolors.color}} onClick={handleFilter} name="Africa" href="#">Africa</a></li>
              <li><a className="dropdown-item" style={{color:newcolors.color}} onClick={handleFilter} name="Asia" href="#">Asia</a></li>
              <li><a className="dropdown-item" style={{color:newcolors.color}} onClick={handleFilter} name="Oceania" href="#">Oceania</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="main ps-xl-5 ">
      <div className="row rowDiv row-cols-1 row-cols-md-3 row-cols-sm-2 row-cols-lg-4 ps-xl-4 m-auto ">
        {loading ? 
      (filteredItems.map((item,index)=>(
        <div key={index} className="col mt-5">
          <div className="card m-auto shadow" aria-hidden="true">
            <img className="card-img-top flagImg" src="..." alt="" />
            <div className="card-body" style={{backgroundColor:newcolors.secondBgColor,color:newcolors.color}} >
              <h5 className="card-title placeholder-glow"><span className='placeholder'></span></h5>
              <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
              </p>
            </div>
          </div>
        </div>
      )))
      :   (filteredItems.map((item,index)=>(
        <div key={index} className="col mt-5">
          <div className="card m-auto shadow" aria-hidden="true">
            <img className="card-img-top flagImg" src={item.flags.png} alt="" />
            <div className="card-body" style={{backgroundColor:newcolors.secondBgColor,color:newcolors.color}} >
              <h5 className="card-title">{item.name.common}</h5>
              <p className="card-text"><strong>Population: </strong>{item.population.toLocaleString()}</p>
              <p className="card-text"><strong>Region: </strong>{item.region}</p>
              <p className="card-text"><strong>Capital: </strong>{item.capital}</p>
            </div>
          </div>
        </div>
      )))
      
      }
        </div>
      </div>
      </div>
    </>
  )
}

export default MainSec
