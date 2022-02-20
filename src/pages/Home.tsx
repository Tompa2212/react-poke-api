import { usePokemonContext } from "../contexts/pokemon";
import PokemonList from "../components/PokemonList";
import PokemonPagination from "../components/PokemonPagination";
import { Spinner, Row, Container } from "react-bootstrap";
export default function Home() {
  const { pokemons, pokemons_page, setPage, pokemons_count } = usePokemonContext();

  if (!pokemons.get(pokemons_page)) {
    return (
      <Row className="loader-cont">
        <h3>Loading...</h3>
        <Spinner animation="border" role="status">
          <span className="visually-hidden mx-auto"></span>
        </Spinner>
      </Row>
    );
  }

  return (
    <Container as="main" fluid>
      <PokemonList pokemons={pokemons.get(pokemons_page) || []} />
      {/* <PokemonPagination
              curr_page={pokemons_page}
              setPage={setPage}
              per_page={20}
              itemCount={pokemons_count}
            /> */}
      <PokemonPagination
        totalCount={pokemons_count}
        currentPage={pokemons_page}
        setPage={setPage}
        pageSize={20}
        siblingCount={5}
      />
    </Container>
  );
}
