export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container text-center">
        <p className="mb-1">📍 Barrio El Vallado, Cali - Colombia</p>
        <p className="mb-1">🕒 Horario: Lunes a Domingo, 12:00 p.m. - 10:00 p.m.</p>
        <p className="mb-3">📞 Teléfono: +57 312 345 6789</p>
        <div className="mb-3">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
            <i className="bi bi-instagram"></i> Instagram
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
            <i className="bi bi-facebook"></i> Facebook
          </a>
        </div>
        <p className="fst-italic">Hecho con propósito, legado y sabor. 🍕</p>
      </div>
    </footer>
  );
}
