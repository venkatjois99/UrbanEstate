
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import Landing from './components/landingPage/landing'
import ListPage from './components/Property/ListPage/listpage'
// import PropertyListing from './components/Sell/propertylistingform'
import About from './components/Quick Links/About/About'


import PrivacyPolicy from './components/Quick Links/PrivacyPolicy/Privacypolicy'
import SellPage from './components/Sell/sellpage'



// import BlobImageView from './components/Property/viewimage'


function App() {


  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />}/>
      <Route path='/rent' element={<ListPage />}/>
      <Route path='/sell' element={< SellPage/>}/>
      <Route path='/about-us' element={<About/>}/>
    
     
      <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>

  
     
     

    </Routes>
     </BrowserRouter>
    </>
     )
}

export default App
