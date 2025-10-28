import { useState } from 'react';

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonios = [
    {
      nombre: "María González",
      comentario: "¡Las mejores pizzas que he probado! La masa es perfecta y los ingredientes son súper frescos.",
      rating: 5,
      imagen: "/testimonials/client1.jpg"
    },
    {
      nombre: "Carlos Ruiz",
      comentario: "El servicio es excelente y la pizza llegó caliente y en tiempo récord. ¡Volveré!",
      rating: 5,
      imagen: "/testimonials/client2.jpg"
    },
    {
      nombre: "Ana Martínez",
      comentario: "Me encanta que pueda personalizar mi pizza. Los ingredientes son de primera calidad.",
      rating: 5,
      imagen: "/testimonials/client3.jpg"
    }
  ];

  const pizzasDestacadas = [
    { nombre: "Margarita", precio: "18.000", imagen: "/pizzas/margarita.jpg" },
    { nombre: "Pepperoni", precio: "20.000", imagen: "/pizzas/pepperoni.jpg" },
    { nombre: "Vegetariana", precio: "19.000", imagen: "/pizzas/vegetariana.jpg" }
  ];

  return (
    <>
      {/* Hero Section con Video/Imagen de Fondo */}
      <div className="hero-section position-relative d-flex align-items-center text-white" 
           style={{ 
             minHeight: '100vh', 
             background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/pizzas/pizza-banner.jpg)',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundAttachment: 'fixed'
           }}>
        <div className="container py-5 text-center">
          <h1 className="display-2 fw-bold mb-4 animate__animated animate__fadeInDown">
            Pizzería El Sabor <span className="text-danger">🍕</span>
          </h1>
          <p className="lead fs-3 mb-5 animate__animated animate__fadeInUp">
            Las mejores pizzas artesanales de Cali,<br/>hechas con amor y tradición.
          </p>
          <div className="d-flex justify-content-center gap-3 mb-5 animate__animated animate__fadeInUp">
            <a href="/menu" className="btn btn-danger btn-lg px-4 py-3 shadow-sm hover-shadow">
              <i className="bi bi-arrow-right-circle me-2"></i>Ver Menú
            </a>
            <a href="/contact" className="btn btn-outline-light btn-lg px-4 py-3 shadow-sm hover-shadow">
              <i className="bi bi-telephone me-2"></i>Contáctanos
            </a>
          </div>
          <div className="scroll-indicator animate__animated animate__fadeInUp">
            <i className="bi bi-mouse text-white display-6 d-block mb-2"></i>
            <span className="text-white-50">Desliza para descubrir</span>
          </div>
        </div>
      </div>

      {/* Sección de Estadísticas */}
      <div className="py-5 bg-danger text-white">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="border-end border-white-50">
                <h2 className="display-4 fw-bold mb-0">20+</h2>
                <p className="mb-0">Años de Experiencia</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="border-end border-white-50">
                <h2 className="display-4 fw-bold mb-0">50k+</h2>
                <p className="mb-0">Clientes Felices</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="border-end border-white-50">
                <h2 className="display-4 fw-bold mb-0">15+</h2>
                <p className="mb-0">Variedades</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div>
                <h2 className="display-4 fw-bold mb-0">30m</h2>
                <p className="mb-0">Entrega Promedio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Características con Iconos Grandes */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 text-center hover-shadow h-100 p-4">
              <div className="card-body">
                <div className="icon-wrapper mb-4">
                  <i className="bi bi-star-fill text-warning display-1"></i>
                </div>
                <h3 className="h4 mb-3">Calidad Premium</h3>
                <p className="text-muted">Ingredientes frescos y seleccionados cuidadosamente para ti.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 text-center hover-shadow h-100 p-4">
              <div className="card-body">
                <div className="icon-wrapper mb-4">
                  <i className="bi bi-truck text-danger display-1"></i>
                </div>
                <h3 className="h4 mb-3">Entrega Rápida</h3>
                <p className="text-muted">Tu pizza caliente y deliciosa en menos de 30 minutos.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 text-center hover-shadow h-100 p-4">
              <div className="card-body">
                <div className="icon-wrapper mb-4">
                  <i className="bi bi-heart-fill text-danger display-1"></i>
                </div>
                <h3 className="h4 mb-3">Hecho con Amor</h3>
                <p className="text-muted">Recetas tradicionales con un toque especial en cada pizza.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pizzas Destacadas */}
      <div className="container-fluid bg-light py-5">
        <div className="container">
          <h2 className="display-4 text-center mb-5">Nuestras Pizzas Destacadas</h2>
          <div className="row g-4">
            {pizzasDestacadas.map((pizza, index) => (
              <div className="col-md-4" key={index}>
                <div className="card border-0 rounded-3 shadow-sm hover-shadow h-100">
                  <div className="card-img-top position-relative" style={{ height: '250px' }}>
                    <img 
                      src={pizza.imagen}
                      alt={pizza.nombre}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="position-absolute bottom-0 start-0 w-100 p-3"
                         style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                      <h3 className="text-white mb-0">{pizza.nombre}</h3>
                      <p className="text-white-50 mb-0">Desde ${pizza.precio}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de Testimonios */}
      <div className="py-5">
        <div className="container">
          <h2 className="display-4 text-center mb-5">Lo Que Dicen Nuestros Clientes</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {testimonios.map((testimonio, index) => (
                    <div className={`carousel-item ${index === activeTestimonial ? 'active' : ''}`} key={index}>
                      <div className="text-center">
                        <div className="mb-4">
                          {[...Array(testimonio.rating)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill text-warning fs-4 mx-1"></i>
                          ))}
                        </div>
                        <p className="lead mb-4">"{testimonio.comentario}"</p>
                        <h5 className="mb-0">{testimonio.nombre}</h5>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-center mt-4">
                  {testimonios.map((_, index) => (
                    <button
                      key={index}
                      className={`btn btn-sm mx-1 ${index === activeTestimonial ? 'btn-danger' : 'btn-outline-danger'}`}
                      onClick={() => setActiveTestimonial(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección CTA Final */}
      <div className="container-fluid py-5" style={{
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/pizzas/pizza-banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="container text-center text-white py-5">
          <h2 className="display-4 mb-4">¿Listo para Ordenar?</h2>
          <p className="lead mb-4">Disfruta de la auténtica pizza italiana desde la comodidad de tu hogar</p>
          <a href="/menu" className="btn btn-danger btn-lg px-5 py-3 hover-shadow">
            <i className="bi bi-cart-plus me-2"></i>
            Ordenar Ahora
          </a>
        </div>
      </div>
    </>
  );
}
