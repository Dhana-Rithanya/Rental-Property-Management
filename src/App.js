import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import propertiesData from "./data/properties.json";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userType = localStorage.getItem("userType");
  if (!isLoggedIn || userType !== "Owner") return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const savedProperties = localStorage.getItem("ownerProperties");
    if (savedProperties) {
      setProperties([...propertiesData, ...JSON.parse(savedProperties)]);
    } else {
      setProperties(propertiesData);
    }
  }, []);

  const addProperty = (newProperty) => {
    const ownerProperties = JSON.parse(localStorage.getItem("ownerProperties") || "[]");
    ownerProperties.push(newProperty);
    localStorage.setItem("ownerProperties", JSON.stringify(ownerProperties));
    setProperties([...propertiesData, ...ownerProperties]);
  };

  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties properties={properties} />} />
        <Route path="/property/:id" element={<PropertyDetail properties={properties} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard addProperty={addProperty} /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;