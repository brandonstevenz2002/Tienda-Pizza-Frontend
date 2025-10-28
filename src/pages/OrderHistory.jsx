import { useState, useEffect } from 'react';

export default function OrderHistory() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const historialGuardado = localStorage.getItem('orderHistory');
    if (historialGuardado) {
      setPedidos(JSON.parse(historialGuardado));
    }
  }, []);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(precio);
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container py-5">
      <h2 className="display-4 fw-bold mb-5">
        Mis Pedidos <span className="text-danger">📋</span>
      </h2>

      {pedidos.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-clock-history text-muted display-1 mb-4"></i>
          <h4 className="text-muted">No tienes pedidos anteriores</h4>
          <a href="/menu" className="btn btn-danger mt-3">
            ¡Haz tu primer pedido!
          </a>
        </div>
      ) : (
        <div className="row">
          {pedidos.map((pedido, index) => (
            <div className="col-md-6 mb-4" key={pedido.id}>
              <div className="card border-0 shadow-sm hover-shadow h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="mb-1">Pedido #{pedido.orderNumber}</h5>
                      <p className="text-muted mb-0">
                        {formatearFecha(pedido.fecha)}
                      </p>
                    </div>
                    <span className="badge bg-danger">{formatearPrecio(pedido.total)}</span>
                  </div>

                  <div className="mb-3">
                    {pedido.items.map((item, idx) => (
                      <div key={idx} className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <p className="mb-0 fw-medium">
                            {item.cantidad}x {item.nombre}
                          </p>
                          {item.personalizacion && (
                            <small className="text-muted">
                              {item.personalizacion.base}, {item.personalizacion.salsa}, {item.personalizacion.queso}
                              {item.personalizacion.toppings?.length > 0 && (
                                <>
                                  <br />
                                  Toppings: {item.personalizacion.toppings.join(', ')}
                                </>
                              )}
                            </small>
                          )}
                        </div>
                        <span className="text-muted">
                          {formatearPrecio(item.precio * item.cantidad)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button className="btn btn-outline-danger btn-sm w-100">
                    <i className="bi bi-arrow-repeat me-2"></i>
                    Repetir Pedido
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}