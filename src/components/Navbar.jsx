import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <span className="me-2">🍕</span>
        Pizzería El Sabor
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="bi bi-house-door me-1"></i>
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/menu">
              <i className="bi bi-grid me-1"></i>
              Menú
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pedidos">
              <i className="bi bi-clock-history me-1"></i>
              Mis Pedidos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              <i className="bi bi-chat-dots me-1"></i>
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
