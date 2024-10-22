
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import Landing from './components/landingPage/landing'
import ListPage from './components/Property/ListPage/listpage'


function App() {


  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />}/>
      <Route path='/rent' element={<ListPage />}/>
    </Routes>
     </BrowserRouter>
    </>
     )
}

export default App
