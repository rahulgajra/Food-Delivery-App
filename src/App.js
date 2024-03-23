import './App.css';
import Home from './components/Screens/Home' 
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Screens/Login';
import Signup from './components/Screens/Signup';
import { CartProvider } from './components/ContextReducer';
import Cart from './components/Screens/Cart';
import MyOrder from './components/Screens/MyOrder';

function App() {
  return (
      <CartProvider> 

     
    <Router>  
       <div> 
          <Routes> 
             <Route exact path='/' element={<Home/>}/> 
             <Route exact path='/login' element={<Login/>}/> 
             <Route exact path='/creatuser' element={<Signup/>}/> 
             <Route exact path='/myOrder' element={<MyOrder/>}/>
          </Routes>
       </div>
    </Router>
    </CartProvider>
  );
}

export default App;
