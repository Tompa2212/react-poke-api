import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <Navbar className="mb-3 pl-0" expand="lg">
      <Navbar.Brand className="nav-link pl-0">
        <Link to="/" className="nav-logo">
          Pokemon API
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link className="nav-link" to="/">
            All Pokemons
          </Link>
          <Link className="nav-link" to="/favorites">
            Favorite Pokemons
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
