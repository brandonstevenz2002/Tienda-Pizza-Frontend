import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Contact from '../pages/Contact';
import OrderHistory from '../pages/OrderHistory';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pedidos" element={<OrderHistory />} />
    </Routes>
  );
}
