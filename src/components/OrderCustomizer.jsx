import { useState } from 'react';

const ingredientes = {
  bases: [
    { id: 'b1', nombre: 'Masa Delgada', precio: 0 },
    { id: 'b2', nombre: 'Masa Gruesa', precio: 0 },
    { id: 'b3', nombre: 'Masa Integral', precio: 2000 },
  ],
  salsas: [
    { id: 's1', nombre: 'Salsa de Tomate', precio: 0 },
    { id: 's2', nombre: 'Salsa BBQ', precio: 1000 },
    { id: 's3', nombre: 'Salsa Alfredo', precio: 1000 },
  ],
  quesos: [
    { id: 'q1', nombre: 'Mozzarella', precio: 0 },
    { id: 'q2', nombre: 'Queso Azul', precio: 3000 },
    { id: 'q3', nombre: 'Parmesano', precio: 2000 },
  ],
  toppings: [
    { id: 't1', nombre: 'Pepperoni', precio: 3000 },
    { id: 't2', nombre: 'Champiñones', precio: 2000 },
    { id: 't3', nombre: 'Pimentón', precio: 1500 },
    { id: 't4', nombre: 'Aceitunas', precio: 2000 },
    { id: 't5', nombre: 'Jamón', precio: 3000 },
    { id: 't6', nombre: 'Piña', precio: 2000 },
    { id: 't7', nombre: 'Cebolla', precio: 1500 },
    { id: 't8', nombre: 'Tomate', precio: 1500 },
  ],
};

export default function OrderCustomizer({ pizzaBase, onClose, onAdd }) {
  const [seleccion, setSeleccion] = useState({
    base: ingredientes.bases[0].id,
    salsa: ingredientes.salsas[0].id,
    queso: ingredientes.quesos[0].id,
    toppings: [],
  });

  const [paso, setPaso] = useState(1);

  const calcularPrecioTotal = () => {
    let total = pizzaBase.precio;

    // Sumar precio de la base
    const baseSeleccionada = ingredientes.bases.find(b => b.id === seleccion.base);
    total += baseSeleccionada.precio;

    // Sumar precio de la salsa
    const salsaSeleccionada = ingredientes.salsas.find(s => s.id === seleccion.salsa);
    total += salsaSeleccionada.precio;

    // Sumar precio del queso
    const quesoSeleccionado = ingredientes.quesos.find(q => q.id === seleccion.queso);
    total += quesoSeleccionado.precio;

    // Sumar precio de los toppings
    seleccion.toppings.forEach(toppingId => {
      const topping = ingredientes.toppings.find(t => t.id === toppingId);
      total += topping.precio;
    });

    return total;
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(precio);
  };

  const handleToppingToggle = (toppingId) => {
    setSeleccion(prev => ({
      ...prev,
      toppings: prev.toppings.includes(toppingId)
        ? prev.toppings.filter(id => id !== toppingId)
        : [...prev.toppings, toppingId]
    }));
  };

  const renderPaso = () => {
    switch (paso) {
      case 1:
        return (
          <div>
            <h4 className="mb-4">Elige tu masa</h4>
            <div className="d-flex flex-column gap-2">
              {ingredientes.bases.map(base => (
                <div
                  key={base.id}
                  className={`btn btn-outline-danger p-3 text-start ${
                    seleccion.base === base.id ? 'active' : ''
                  }`}
                  onClick={() => setSeleccion({ ...seleccion, base: base.id })}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{base.nombre}</span>
                    {base.precio > 0 && <span>+{formatearPrecio(base.precio)}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h4 className="mb-4">Elige tu salsa</h4>
            <div className="d-flex flex-column gap-2">
              {ingredientes.salsas.map(salsa => (
                <div
                  key={salsa.id}
                  className={`btn btn-outline-danger p-3 text-start ${
                    seleccion.salsa === salsa.id ? 'active' : ''
                  }`}
                  onClick={() => setSeleccion({ ...seleccion, salsa: salsa.id })}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{salsa.nombre}</span>
                    {salsa.precio > 0 && <span>+{formatearPrecio(salsa.precio)}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h4 className="mb-4">Elige tu queso</h4>
            <div className="d-flex flex-column gap-2">
              {ingredientes.quesos.map(queso => (
                <div
                  key={queso.id}
                  className={`btn btn-outline-danger p-3 text-start ${
                    seleccion.queso === queso.id ? 'active' : ''
                  }`}
                  onClick={() => setSeleccion({ ...seleccion, queso: queso.id })}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{queso.nombre}</span>
                    {queso.precio > 0 && <span>+{formatearPrecio(queso.precio)}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h4 className="mb-4">Elige tus toppings</h4>
            <div className="row g-2">
              {ingredientes.toppings.map(topping => (
                <div className="col-md-6" key={topping.id}>
                  <div
                    className={`btn btn-outline-danger p-3 text-start w-100 ${
                      seleccion.toppings.includes(topping.id) ? 'active' : ''
                    }`}
                    onClick={() => handleToppingToggle(topping.id)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{topping.nombre}</span>
                      <span>+{formatearPrecio(topping.precio)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
      <div className="modal-content bg-white rounded-3 shadow-lg p-4" style={{ maxWidth: '600px', width: '90%', maxHeight: '90vh', overflow: 'auto' }}>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h3 className="mb-2">Personaliza tu Pizza</h3>
            <p className="text-muted mb-0">Base: {pizzaBase.nombre}</p>
          </div>
          <button className="btn btn-link text-danger" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Progress bar */}
        <div className="progress mb-4" style={{ height: '4px' }}>
          <div
            className="progress-bar bg-danger"
            style={{ width: `${(paso / 4) * 100}%` }}
          ></div>
        </div>

        {renderPaso()}

        <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
          <div>
            <p className="mb-0">Total:</p>
            <h4 className="text-danger mb-0">{formatearPrecio(calcularPrecioTotal())}</h4>
          </div>
          <div className="d-flex gap-2">
            {paso > 1 && (
              <button
                className="btn btn-outline-secondary"
                onClick={() => setPaso(p => p - 1)}
              >
                Anterior
              </button>
            )}
            {paso < 4 ? (
              <button
                className="btn btn-danger"
                onClick={() => setPaso(p => p + 1)}
              >
                Siguiente
              </button>
            ) : (
              <button
                className="btn btn-danger"
                onClick={() => {
                  const pizzaPersonalizada = {
                    ...pizzaBase,
                    precio: calcularPrecioTotal(),
                    personalizacion: {
                      base: ingredientes.bases.find(b => b.id === seleccion.base).nombre,
                      salsa: ingredientes.salsas.find(s => s.id === seleccion.salsa).nombre,
                      queso: ingredientes.quesos.find(q => q.id === seleccion.queso).nombre,
                      toppings: seleccion.toppings.map(
                        id => ingredientes.toppings.find(t => t.id === id).nombre
                      ),
                    },
                  };
                  onAdd(pizzaPersonalizada);
                }}
              >
                Agregar al Carrito
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}