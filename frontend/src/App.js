import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import AdminRegister from './pages/adminPage/AdminRegister';
import AdminLogin from './pages/adminPage/AdminLogin';
import { useSelector } from 'react-redux';
import AdminDashBoard from './pages/adminPage';
import CreateSpot from './pages/adminPage/CreateSpot';
import UpdateSpot from './pages/adminPage/UpdateSpot';
import NotFound from './NotFound';
import Home from './Home';
import AvailableSpots from './pages/userPage/AvailableSpots';
import UserLogin from './pages/userPage/UserLogin';
import UserRegister from './pages/userPage/userRegister';
import { useEffect, useState } from 'react';
import { getUserFromCookie } from './hooks/getUserFromCookie';
import FindMyVehicle from './pages/userPage/FindMyVehicle';
import Footer from './components/Footer';
function App() {
  const [user, setUser] = useState(null);

  const location = useLocation();
  useEffect(() => {
    const userData = getUserFromCookie(); // Fetch user from cookie
    if (userData) setUser(userData);
  }, []);

  const users = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);

  return (
 <>
 <Header user={user} setUser={setUser}/>
<Routes>
  <Route>
  <Route path="/" element={<Home />} />
  <Route path="/admin/register" element={<AdminRegister />} />
<Route path='/admin/login' element={<AdminLogin/>}/>
<Route path="/available-spots" element={<AvailableSpots />} />
<Route path="/user/login" element={<UserLogin isOpen={true} />} />
<Route path="/user/register" element={<UserRegister />} />




{admin && (
          <Route path="/admin/:id" element={<AdminDashBoard />}>
         <Route path="/admin/:id/create-spot" element={<CreateSpot />} />
         <Route path="/admin/:id/update-spot" element={<UpdateSpot />} />

        </Route>
        )}
      {
  users && (
    <>
      <Route path="/home/:id" element={<Home setUser={setUser} />} />
      <Route path="/find-my-vehicle" element={<FindMyVehicle />} />
    </>
  )
}


  </Route>
  {!users &&  !admin && (
          <Route path="/*" element={<NotFound />} />
        )}

        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer/>
 
 </>
  );
}

export default App;
