import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import CarListingPage from "./pages/CarListingPage";
import SellCarPage from "./pages/SellCarPage";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading";
import DefaultLayout from "./dashboard/layout/Layout";
import Dashboard from "./dashboard/dashboard/Dashboard";
import States from "./dashboard/components/states/States";
import Rto from "./dashboard/components/states/Rto";
import Brand from "./dashboard/Cars/Brand/Index";
import CarModel from "./dashboard/Cars/Model/Index";
import CarVariant from "./dashboard/Cars/Variant/Index";
import Users from "./dashboard/components/User/Index";
import { useDispatch } from "react-redux";
import { getUser } from "./store/authSlice";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs ";
import Faq from "./components/Faq";
import TermsAndConditions from "./pages/TermsAndConditions";

import UserProfile from "./pages/UserProfile";
import SoldCar from "./pages/SoldCar";
import Appointment from "./pages/Appointment";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DefaultLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="state/state" element={<States />} />
          <Route path="state/rto" element={<Rto />} />
          <Route path="cars/brand" element={<Brand />} />
          <Route path="cars/model" element={<CarModel />} />
          <Route path="cars/variant" element={<CarVariant />} />
          <Route path="users" element={<Users />} />
        </Route>
        
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route index element={<Home />} />
                <Route path="/car-details/:carId" element={<CarDetails />} />
                <Route path="/sell-a-car" element={<SellCarPage />} />
                <Route path="/buy-a-car" element={<CarListingPage />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/sold" element={<SoldCar />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/t&c" element={<TermsAndConditions />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
