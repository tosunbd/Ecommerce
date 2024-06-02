<<<<<<< HEAD
import { useState } from 'react';
import './App.css';
import Router from './router/Router';
import publicRoutes from './router/routes/publicRoutes';
=======
import { useState } from "react";
import "./App.css";
import Router from "./routers/Router";
import publicRoutes from "./routers/routes/publicRoutes";
>>>>>>> 4eaf028a92412088f5a8532c446d1fb5c07ea029

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  // console.log(allRoutes);
  return <Router allRoutes={allRoutes} />;
}

export default App;
