/* eslint-disable no-unused-vars */
import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Router from './routes/Routers';
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div>
      <Layout />
      <ToastContainer />
    </div>
  );
}

export default App;
