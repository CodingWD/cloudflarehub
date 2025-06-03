import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ProductCategories from './pages/ProductCategories';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Applications from './pages/Applications';
import About from './pages/About';
import News, { NewsDetail } from './pages/News';
import Downloads from './pages/Downloads';
import SampleRequest from './pages/SampleRequest';
import ContactUs from './pages/ContactUs';
import EnergyPowerSolutions from './pages/EnergyPowerSolutions';
import MachineVisionSolutions from './pages/MachineVisionSolutions';
import EdgeComputingSolutions from './pages/EdgeComputingSolutions';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/categories" element={<ProductCategories />} />
          <Route path="/products/category/:categoryId" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/sample-request" element={<SampleRequest />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/energy-power-solutions" element={<EnergyPowerSolutions />} />
          <Route path="/machine-vision-solutions" element={<MachineVisionSolutions />} />
          <Route path="/edge-computing-solutions" element={<EdgeComputingSolutions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
