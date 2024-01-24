import { useState,useEffect } from 'react'
import './App.css'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import {getApiConfigration} from "./store/homeSlice"

import Home from './pages/home/Home';
import PageNotFound from './pages/404/PageNotFound';
import Detail from "./pages/details/Detail";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/searchResult/SearchResult";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Routes,Route } from 'react-router-dom'


function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state)=>state.home)

  const fetchApiConfig = async ()=>{
    fetchDataFromApi("/configuration")
    .then((res)=>{
      console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
    };
      dispatch(getApiConfigration(url));
    })
  }

  useEffect(()=>{
    fetchApiConfig();
  },[])

  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":mediaType/:id" element={<Detail />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
    </>
  )
}

export default App
