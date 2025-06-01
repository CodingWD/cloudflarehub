import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import ProductCategories from './pages/ProductCategories';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Applications from './pages/Applications';
import About from './pages/About';
import News, { NewsDetail } from './pages/News';
import Downloads from './pages/Downloads';
import SampleRequest from './pages/SampleRequest';

function App() {
  return (
    <Router>
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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
