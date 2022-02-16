export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container" style={{ height: "105px" }}>
        <a data-cy="header-title" className="text-white navbar-brand fw-bold text-uppercase" href="#" style={{ fontSize: "24px" }}>
          to do list app
        </a>
      </div>
    </nav>
  );
}
