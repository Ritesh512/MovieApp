import { useState,useEffect } from 'react'
import './App.css'
import { fetchDatafromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import {getApiConfigration} from "./store/homeSlice"

function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state)=>state.home)

  const fetchData = async ()=>{
    fetchDatafromApi("/movie/popular")
    .then((res)=>{
      console.log(res);
      dispatch(getApiConfigration(res));
    })
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <>
      <div className="App">App: {url?.total_pages}</div>
    </>
  )
}

export default App
