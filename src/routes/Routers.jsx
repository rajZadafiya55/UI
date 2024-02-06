// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import AllFoods from '../pages/AllFoods';
import LoginForm from '../pages/Login';
import RegistrationForm from '../pages/Register';
import Contact from '../pages/Contact';
import Review from '../pages/Review';
import Cart from '../pages/Cart';
import Payment from '../pages/Payment';
import PaymentReceipt from '../pages/PaymentReceipt';

const Router = () => {
  return (
    <Routes> 
      <Route path='/login' element={<LoginForm />} />
          <Route path='/' element={<Home />} />
          <Route path='/foods' element={<AllFoods />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<RegistrationForm />} />
          <Route path='/review' element={<Review />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/payment-receipt' element={<PaymentReceipt />} />

      <Route />
    </Routes>
  )
}

export default Router