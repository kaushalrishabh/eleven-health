import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/login/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import ForgetPass from './components/ForgetPass';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ForgetPass" element={<ForgetPass />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Landing" element={<Landing />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
