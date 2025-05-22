import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductApp from './components/ProductApp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductApp />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
