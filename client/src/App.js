import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Header from './Components/Header';
import AdminLogin from './Components/AdminProfile';
import "bootstrap/dist/css/bootstrap.min.css";
import {HashRouter,Route,Routes} from 'react-router-dom'


function App() {
  let token= localStorage.getItem('auth')
  console.log(token)
  return (
    <>
   
     <Header heading="Customer App Management" />
     <HashRouter>
      <Routes>
        <Route>
          {!token?(
             <Route path='/AdminProfile' element={<AdminLogin />}></Route>
          ):(
            <Route path='/Home' element={<Home />}></Route>
          )}
       
        </Route>
      </Routes>
     </HashRouter>
    <Home />
    </>
  );
}

export default App;
