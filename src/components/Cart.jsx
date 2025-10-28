import { useState } from 'react';

export default function Cart({ items, onClose, onUpdateQuantity, onRemoveItem }) {
  const [showOrderPlaced, setShowOrderPlaced] = useState(false);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(precio);
  };

  const calcularTotal = () => {
    return items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const handlePlaceOrder = () => {
    // Crear el objeto del pedido
    const order = {
      id: Date.now().toString(),
      orderNumber: Math.floor(Math.random() * 10000) + 1,
      fecha: new Date().toISOString(),
      items: items,
      total: calcularTotal(),
    };

    // Guardar en el historial
    const historialGuardado = localStorage.getItem('orderHistory') || '[]';
    const historial = JSON.parse(historialGuardado);
    localStorage.setItem('orderHistory', JSON.stringify([order, ...historial]));

    setShowOrderPlaced(true);
    setTimeout(() => {
      onClose();
      // Limpiar el carrito después de procesar el pedido
      setItems([]);
    }, 3000);
  };

  if (showOrderPlaced) {
    return (
      <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
        <div className="modal-content bg-white rounded-3 shadow-lg p-5 text-center" style={{ maxWidth: '400px', width: '90%' }}>
          <i className="bi bi-check-circle-fill text-success display-1 mb-4"></i>
          <h3 className="mb-4">¡Pedido Realizado!</h3>
          <p className="text-muted mb-4">Tu pedido estará listo en aproximadamente 20-30 minutos.</p>
          <p className="h5 mb-0">Número de orden: #{Math.floor(Math.random() * 1000) + 1}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
      <div className="modal-content bg-white rounded-3 shadow-lg p-4" style={{ maxWidth: '600px', width: '90%', maxHeight: '90vh', overflow: 'auto' }}>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <h3 className="mb-0">Tu Pedido</h3>
          <button className="btn btn-link text-danger" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-cart-x text-muted display-1 mb-4"></i>
            <h4 className="text-muted">Tu carrito está vacío</h4>
            <button className="btn btn-outline-danger mt-3" onClick={onClose}>
              Ver Menú
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              {items.map((item) => (
                <div key={item.id} className="card mb-3 border-0 bg-light">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="card-title mb-1">{item.nombre}</h5>
                        <p className="text-muted small mb-0">
                          {item.personalizacion ? (
                            <>
                              Base: {item.personalizacion.base}<br />
                              Salsa: {item.personalizacion.salsa}<br />
                              Queso: {item.personalizacion.queso}<br />
                              Toppings: {item.personalizacion.toppings.join(', ')}
                            </>
                          ) : (
                            item.descripcion
                          )}
                        </p>
                      </div>
                      <div className="text-end">
                        <p className="text-danger fw-bold mb-2">
                          {formatearPrecio(item.precio)}
                        </p>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.cantidad - 1))}
                          >
                            -
                          </button>
                          <button className="btn btn-outline-danger disabled">
                            {item.cantidad}
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-link text-danger btn-sm ms-2"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-top pt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Total:</h4>
                <h4 className="text-danger mb-0">{formatearPrecio(calcularTotal())}</h4>
              </div>
              <button
                className="btn btn-danger w-100 btn-lg hover-shadow"
                onClick={handlePlaceOrder}
              >
                <i className="bi bi-check2-circle me-2"></i>
                Realizar Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}