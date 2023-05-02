import logo from './logo.svg';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from './component/Footer';

import Subheader from './component/Subheader';
import Index from './component/Index';
import Title from './component/Title';

import Signup from './component/signUp';
import AddTransaction from './component/AddTransaction';

import AboutUs from './component/AboutUs';
import FAQ from './component/FAQ';

import Admin from './component/Admin';

import TransactionReport from './component/TransactionReport';
import Converter from './component/Converter';
import Admin_Footer from './component/Admin_Footer';

import Admin_Index from './component/Admin_Index';
import SaveUserBankDetails from './component/SaveUserBankDetails';
import Report from './component/Report';
import Home from './component/Home';
import UserHeader from './component/UserHeader';

import AllTransaction from './component/AllTransaction';
import AddCurrency from './component/AddCurrency';
import SignIn from './component/SignIn';
import Logout from './component/Logout';
import UpdateRates from './component/UpdateRates';
import GetRates from './component/GetRates';
// import SaveTransaction from './component/SaveTransaction';
import ForgotPassFirst from './component/ForgotPassFirst';
import VerifyOtp from './component/VerifyOtp';
import UserHeader2 from './component/UserHeader2';
import AdminSignIn from './component/AdminSignIn';
import AdminSignUp from './component/AdminSignUp';
import ResetPass from './component/ResetPass';
import ForgotResetPass from './component/ForgotResetPass';
import Demo from './component/Demo';
import AdminForgetPassword from './component/AdminForgetPassword';
import AdminVerifyOtp from './component/AdminVerifyOtp';
import AdminResetPassword from './component/AdminResetPassword';
import ResetAdminPassword from './component/ResetAdminPassword';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
        
        <Route path='/Admin' element={<Admin/>}></Route>
        <Route path='/AllTransaction' element={<AllTransaction/>}></Route>
          <Route path='/Title' element={<Title />}></Route> 
          <Route path='/Footer' element={<Footer/>}></Route>
          <Route path='/UserHeader' element={<UserHeader/>}></Route>
          <Route path='/Subheader' element={<Subheader />}></Route>
          <Route path='/Index' element={<Index/>}></Route>
        
          <Route path='/signin'element={<SignIn/>}></Route>
          <Route path ="/signup"element={<Signup/>}/>
          <Route path='/save' element={<AddTransaction />}></Route> 
          <Route path='/makePayment' element={<makePayment />}></Route>
          <Route path='/AboutUs' element={<AboutUs />}></Route>
           <Route path='/FAQ' element={<FAQ />}></Route> 
           <Route path='/Report' element={<Report/>}></Route>
           <Route path='/addCurrency'element={<AddCurrency/>}></Route>
           <Route path='/TransactionReport' element={<TransactionReport/>}></Route> 
           <Route path='/Converter' element={<Converter/>}></Route> 
           <Route path='/Admin_Footer' element={<Admin_Footer/>}></Route> 
            <Route path="/forgotPassFirst"element={<ForgotPassFirst/>}></Route>
            <Route path='/verifyOtp/:userName' element={<VerifyOtp/>}></Route>
           <Route path='/Admin_Index' element={<Admin_Index/>}></Route> 
           <Route path='/SaveUserBankDetails' element={<SaveUserBankDetails/>}></Route> 
           <Route path="/Logout"element={<Logout/>}></Route>
           <Route path="/updateRate"element={<UpdateRates/>}></Route>
           <Route path="/getRates"element={<GetRates/>}></Route>
           <Route path="/header2"element={<UserHeader2/>}></Route>
           <Route path="/adminsignin"element={<AdminSignIn/>}></Route>
           <Route path="/adminsignup"element={<AdminSignUp/>}></Route>
           <Route path="/reset"element={<ResetPass/>}></Route>
           <Route path="/forgotreset"element={<ForgotResetPass/>}></Route>
           <Route path="/adminForgotPassward" element={<AdminForgetPassword/>}></Route>
       <Route path="/AdminVerifyOtp/:adminEmail" element={<AdminVerifyOtp/>}></Route>
       <Route path="/adminForgetResetPassword" element={<AdminResetPassword/>}></Route>
       <Route path="/adminResetPassword" element={<ResetAdminPassword/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
