import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Myprofile from './components/Myprofile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './components/Register';
import Contact from './components/Contact';
function App() {
  return (
    <>
      <Navbar
        className="my-2"
        color="dark"
        dark
      >
        <NavbarBrand href="/">
          ChatBooth
        </NavbarBrand>
        <div className='d-flex gap-5'>
          <a href='/' >
            Register
          </a>
          <a href='/login' >
            SignUp
          </a>
          <a href='/myprofile' >
            Myprofile
          </a>
        </div>
      </Navbar>
      {/* <Login /> */}
      <Router>
        <div>
          {/* Navigation links */}
          <Routes>
            <Route path="/" exact element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myprofile" element={<Myprofile />} />
            <Route path="/contacts" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}
export default App
