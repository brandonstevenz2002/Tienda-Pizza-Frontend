import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', form);
    alert('Gracias por contactarnos. Te responderemos pronto.');
    setForm({ nombre: '', correo: '', mensaje: '' });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h2 className="display-4 text-center fw-bold mb-5">
            Contáctanos <span className="text-danger">📞</span>
          </h2>
          
          <div className="row g-4">
            {/* Información de contacto */}
            <div className="col-md-5">
              <div className="bg-light p-4 h-100 rounded-3 shadow-sm hover-shadow">
                <h3 className="h4 mb-4">Información de Contacto</h3>
                
                <div className="d-flex mb-4">
                  <i className="bi bi-geo-alt-fill text-danger fs-4 me-3"></i>
                  <div>
                    <h4 className="h6 mb-1">Dirección</h4>
                    <p className="text-muted mb-0">Calle 123 #45-67, Cali, Colombia</p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <i className="bi bi-telephone-fill text-danger fs-4 me-3"></i>
                  <div>
                    <h4 className="h6 mb-1">Teléfono</h4>
                    <p className="text-muted mb-0">+57 123 456 7890</p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <i className="bi bi-envelope-fill text-danger fs-4 me-3"></i>
                  <div>
                    <h4 className="h6 mb-1">Email</h4>
                    <p className="text-muted mb-0">contacto@pizzeriaelsabor.com</p>
                  </div>
                </div>

                <div className="d-flex">
                  <i className="bi bi-clock-fill text-danger fs-4 me-3"></i>
                  <div>
                    <h4 className="h6 mb-1">Horario</h4>
                    <p className="text-muted mb-0">Lunes a Domingo<br />11:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="col-md-7">
              <div className="bg-white p-4 rounded-3 shadow-sm hover-shadow">
                <h3 className="h4 mb-4">Envíanos un Mensaje</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-muted">Nombre Completo</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <i className="bi bi-person text-danger"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-0 bg-light"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted">Correo Electrónico</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <i className="bi bi-envelope text-danger"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control border-0 bg-light"
                        name="correo"
                        value={form.correo}
                        onChange={handleChange}
                        required
                        placeholder="tucorreo@ejemplo.com"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted">Mensaje</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <i className="bi bi-chat-dots text-danger"></i>
                      </span>
                      <textarea
                        className="form-control border-0 bg-light"
                        name="mensaje"
                        rows="5"
                        value={form.mensaje}
                        onChange={handleChange}
                        required
                        placeholder="¿En qué podemos ayudarte?"
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-danger btn-lg w-100 hover-shadow">
                    <i className="bi bi-send me-2"></i>Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
