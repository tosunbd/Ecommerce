import { useState } from "react";
import "./App.css";
import Router from "./routers/Router";
import publicRoutes from "./routers/routes/publicRoutes";

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  console.log(allRoutes);

  return <Router allRoutes={allRoutes} />;
}

export default App;
