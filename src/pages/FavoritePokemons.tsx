import PokemonList from "../components/PokemonList";
import PokemonPagination from "../components/PokemonPagination";
import { usePokemonContext } from "../contexts/pokemon";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function FavoritePokemons() {
  const { favorite_pokemons, fav_pok_page, setFavPokPage } = usePokemonContext();

  if (!favorite_pokemons.length) {
    return (
      <Container>
        <Row>
          <Col className="text-center">
            <h2>No favorite pokemons</h2>
            <p>Go to our pokemon list to select one</p>
            <Link to="/">Take me there</Link>
          </Col>
        </Row>
      </Container>
    );
  }
  const pokemons = favorite_pokemons.slice(fav_pok_page * 10, fav_pok_page * 10 + 10);
  return (
    <>
      <PokemonList pokemons={pokemons} />
      <PokemonPagination
        totalCount={favorite_pokemons.length}
        currentPage={fav_pok_page}
        setPage={setFavPokPage}
        pageSize={10}
        siblingCount={5}
      />
    </>
  );
}
