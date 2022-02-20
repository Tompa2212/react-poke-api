import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SinglePokemon, FavoritePokemons } from "./pages";
import { PokemonProvider } from "./contexts/pokemon";
import Navigation from "./components/Navigation";
import { Container, Row, Col } from "react-bootstrap";
function App() {
  return (
    <PokemonProvider>
      <Container className="m-0" fluid>
        <Row>
          <Col>
            <Router>
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:id" element={<SinglePokemon />} />
                <Route path="/favorites" element={<FavoritePokemons />} />
              </Routes>
            </Router>
          </Col>
        </Row>
      </Container>
    </PokemonProvider>
  );
}

export default App;
