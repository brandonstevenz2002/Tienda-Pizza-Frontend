import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Cart from '../components/Cart';
import OrderCustomizer from '../components/OrderCustomizer';
import CountUpAnimation from '../components/CountUpAnimation';

const productos = {
  pizzas: [
    {
      id: 'p1',
      nombre: 'Pizza Margarita',
      descripcion: 'Tomate, mozzarella, albahaca fresca',
      precio: 18000,
      imagen: '/pizzas/margarita.jpg',
      personalizable: true,
      categoria: 'pizzas',
      etiquetas: ['clásica', 'vegetariana'],
      popular: true,
    },
    {
      id: 'p2',
      nombre: 'Pizza Pepperoni',
      descripcion: 'Mozzarella, pepperoni artesanal',
      precio: 20000,
      imagen: '/pizzas/pepperoni.jpg',
      personalizable: true,
      categoria: 'pizzas',
      etiquetas: ['clásica', 'carne'],
      popular: true,
    },
    {
      id: 'p3',
      nombre: 'Pizza Vegetariana',
      descripcion: 'Champiñones, pimentón, cebolla, aceitunas',
      precio: 19000,
      imagen: '/pizzas/vegetariana.jpg',
      personalizable: true,
      categoria: 'pizzas',
      etiquetas: ['vegetariana', 'saludable'],
      oferta: '15% OFF',
    },
    {
      id: 'p4',
      nombre: 'Pizza Hawaiana',
      descripcion: 'Jamón, piña, extra queso mozzarella',
      precio: 21000,
      imagen: '/pizzas/hawaiana.jpg',
      personalizable: true,
      categoria: 'pizzas',
      etiquetas: ['dulce', 'especial'],
    },
    {
      id: 'p5',
      nombre: 'Pizza Suprema',
      descripcion: 'Pepperoni, champiñones, pimentón, cebolla, aceitunas',
      precio: 23000,
      imagen: '/pizzas/suprema.jpg',
      personalizable: true,
      categoria: 'pizzas',
      etiquetas: ['premium', 'carne'],
      popular: true,
    },
  ],
  complementos: [
    {
      id: 'c1',
      nombre: 'Pan de Ajo',
      descripcion: 'Pan artesanal con mantequilla de ajo y hierbas',
      precio: 8000,
      imagen: '/complementos/pan-ajo.jpg',
      categoria: 'complementos',
      etiquetas: ['vegetariano'],
    },
    {
      id: 'c2',
      nombre: 'Alitas BBQ',
      descripcion: '8 piezas de alitas con salsa BBQ',
      precio: 15000,
      imagen: '/complementos/alitas.jpg',
      categoria: 'complementos',
      etiquetas: ['carne'],
      popular: true,
    },
    {
      id: 'c3',
      nombre: 'Palitos de Queso',
      descripcion: 'Crujientes palitos de masa con queso derretido',
      precio: 10000,
      imagen: '/complementos/palitos-queso.jpg',
      categoria: 'complementos',
      etiquetas: ['vegetariano'],
      oferta: '2x1',
    },
  ],
  bebidas: [
    {
      id: 'b1',
      nombre: 'Coca-Cola',
      descripcion: '500ml',
      precio: 3500,
      imagen: '/bebidas/coca-cola.jpg',
      categoria: 'bebidas',
    },
    {
      id: 'b2',
      nombre: 'Limonada Natural',
      descripcion: '500ml',
      precio: 4000,
      imagen: '/bebidas/limonada.jpg',
      categoria: 'bebidas',
      etiquetas: ['natural'],
    },
    {
      id: 'b3',
      nombre: 'Cerveza Artesanal',
      descripcion: '330ml',
      precio: 6000,
      imagen: '/bebidas/cerveza.jpg',
      categoria: 'bebidas',
      etiquetas: ['alcohol'],
    },
  ],
  postres: [
    {
      id: 'd1',
      nombre: 'Tiramisú',
      descripcion: 'Postre italiano tradicional',
      precio: 7000,
      imagen: '/postres/tiramisu.jpg',
      categoria: 'postres',
      popular: true,
    },
    {
      id: 'd2',
      nombre: 'Brownie con Helado',
      descripcion: 'Brownie caliente con helado de vainilla',
      precio: 8000,
      imagen: '/postres/brownie.jpg',
      categoria: 'postres',
      oferta: '2do a mitad de precio',
    },
  ],
};

const etiquetas = ['todos', 'popular', 'vegetariana', 'carne', 'saludable', 'oferta'];

export default function Menu() {
  const [categoriaActiva, setCategoriaActiva] = useState('pizzas');
  const [etiquetaActiva, setEtiquetaActiva] = useState('todos');
  const [showCart, setShowCart] = useState(false);
  const [customizing, setCustomizing] = useState(null);
  const [productosAnimados, setProductosAnimados] = useState([]);
  const { addItem, items: cartItems, getItemCount } = useCart();

  // Efecto para animar los productos al cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      setProductosAnimados(productos[categoriaActiva].map(p => p.id));
    }, 100);
    return () => clearTimeout(timer);
  }, [categoriaActiva]);

  const filtrarProductos = () => {
    let productosFiltrados = productos[categoriaActiva];
    
    if (etiquetaActiva !== 'todos') {
      if (etiquetaActiva === 'popular') {
        productosFiltrados = productosFiltrados.filter(p => p.popular);
      } else if (etiquetaActiva === 'oferta') {
        productosFiltrados = productosFiltrados.filter(p => p.oferta);
      } else {
        productosFiltrados = productosFiltrados.filter(p => p.etiquetas?.includes(etiquetaActiva));
      }
    }
    
    return productosFiltrados;
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(precio);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Hero del menú */}
      <section className="hero bg-dark text-white py-5 mb-5">
        <div style={{
          background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(/pizzas/pizza-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '4rem 0'
        }}>
          <div className="container text-center">
            <h1 className="display-3 fw-bold mb-4">Nuestro Menú <span>🍕</span></h1>
            <p className="lead mb-5">Descubre nuestra selección de pizzas artesanales y más</p>
            
            {/* Estadísticas Animadas */}
            <div className="row g-4 justify-content-center stats-container">
              <div className="col-6 col-lg-3">
                <div className="stat-item p-3 rounded bg-danger bg-opacity-25">
                  <h2 className="display-4 fw-bold mb-2">
                    <CountUpAnimation end={20} duration={1500} suffix="+" />
                  </h2>
                  <p className="text-uppercase fw-bold mb-0">Años de Experiencia</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="stat-item p-3 rounded bg-danger bg-opacity-25">
                  <h2 className="display-4 fw-bold mb-2">
                    <CountUpAnimation end={50} duration={2000} suffix="k+" />
                  </h2>
                  <p className="text-uppercase fw-bold mb-0">Clientes Felices</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="stat-item p-3 rounded bg-danger bg-opacity-25">
                  <h2 className="display-4 fw-bold mb-2">
                    <CountUpAnimation end={15} duration={1800} suffix="+" />
                  </h2>
                  <p className="text-uppercase fw-bold mb-0">Variedades</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="stat-item p-3 rounded bg-danger bg-opacity-25">
                  <h2 className="display-4 fw-bold mb-2">
                    <CountUpAnimation end={30} duration={1700} />
                    <span>m</span>
                  </h2>
                  <p className="text-uppercase fw-bold mb-0">Entrega Promedio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container pb-5">
        {/* Barra superior con carrito */}
        <div className="d-flex justify-content-end mb-4">
          <button 
            className="btn btn-danger btn-lg position-relative"
            onClick={() => setShowCart(true)}
          >
            <i className="bi bi-cart3"></i>
            {cartItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                {getItemCount()}
              </span>
            )}
          </button>
        </div>

        {/* Navegación de categorías */}
        <div className="nav nav-pills mb-5 justify-content-center gap-3">
          {Object.keys(productos).map((categoria) => (
            <button
              key={categoria}
              className={`btn ${categoriaActiva === categoria ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => {
                setCategoriaActiva(categoria);
                setProductosAnimados([]);
              }}
            >
              <i className={`bi bi-${
                categoria === 'pizzas' ? 'circle-fill' :
                categoria === 'complementos' ? 'plus-circle-fill' :
                categoria === 'bebidas' ? 'cup-straw' : 'heart-fill'
              } me-2`}></i>
              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
            </button>
          ))}
        </div>

        {/* Filtros por etiquetas */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {etiquetas.map((etiqueta) => (
            <button
              key={etiqueta}
              className={`btn btn-sm ${
                etiquetaActiva === etiqueta ? 'btn-dark' : 'btn-outline-dark'
              }`}
              onClick={() => setEtiquetaActiva(etiqueta)}
            >
              {etiqueta === 'popular' && <i className="bi bi-star-fill text-warning me-2"></i>}
              {etiqueta === 'oferta' && <i className="bi bi-tag-fill text-danger me-2"></i>}
              {etiqueta.charAt(0).toUpperCase() + etiqueta.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="row g-4">
          {filtrarProductos().map((producto) => (
            <div 
              className={`col-md-6 col-lg-4 ${
                productosAnimados.includes(producto.id) ? 'animate__animated animate__fadeIn' : 'opacity-0'
              }`}
              key={producto.id}
            >
              <div className="card h-100 border-0 shadow-sm hover-shadow">
                <div className="card-img-wrapper position-relative" style={{ 
                  height: producto.categoria === 'bebidas' ? '300px' : '200px', 
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8f9fa'
                }}>
                  {producto.oferta && (
                    <div className="position-absolute top-0 start-0 bg-danger text-white px-3 py-2 rounded-bottom-end">
                      <i className="bi bi-tag-fill me-2"></i>
                      {producto.oferta}
                    </div>
                  )}
                  {producto.popular && (
                    <div className="position-absolute top-0 end-0 bg-warning text-dark px-3 py-2 rounded-bottom-start">
                      <i className="bi bi-star-fill me-2"></i>
                      Popular
                    </div>
                  )}
                  <img
                    src={producto.imagen}
                    className={`card-img-top transition-all ${producto.categoria === 'bebidas' ? 'h-100' : 'w-100 h-100'}`}
                    style={{ 
                      objectFit: producto.categoria === 'bebidas' ? 'contain' : 'cover',
                      padding: producto.categoria === 'bebidas' ? '20px' : '0'
                    }}
                    alt={producto.nombre}
                  />
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{producto.nombre}</h5>
                    <span className="badge bg-danger">{formatearPrecio(producto.precio)}</span>
                  </div>
                  <p className="card-text text-muted mb-3">{producto.descripcion}</p>
                  {producto.etiquetas && (
                    <div className="mb-3">
                      {producto.etiquetas.map((etiqueta) => (
                        <span key={etiqueta} className="badge bg-light text-dark me-2">
                          {etiqueta}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => producto.personalizable ? setCustomizing(producto) : addItem(producto)}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Agregar
                    </button>
                    {producto.personalizable && (
                      <button 
                        className="btn btn-danger"
                        onClick={() => setCustomizing(producto)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal del Carrito */}
      {showCart && (
        <Cart
          onClose={() => setShowCart(false)}
        />
      )}

      {/* Modal de Personalización */}
      {customizing && (
        <OrderCustomizer
          pizzaBase={customizing}
          onClose={() => setCustomizing(null)}
          onAdd={addItem}
        />
      )}
    </div>
  );
}
