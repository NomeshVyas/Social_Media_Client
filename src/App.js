import './App.css';
import SignIn from './pages/login/SignIn';
import {
  Routes,
  Route
} from "react-router-dom";
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
