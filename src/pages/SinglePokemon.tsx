import { useParams } from "react-router-dom";
import { Row, Col, Card, Table } from "react-bootstrap";
import { usePokemonContext } from "../contexts/pokemon";
import ToggleFavButton from "../components/ToggleFavButton";
import { Pokemon } from "../models/pokemon";
import useFetch from "../hooks/useFetch";
import { base_url } from "../contexts/pokemon";
import { capitalize } from "../utils/funcions";

export default function SinglePokemon() {
  const { id } = useParams();
  const { favorite_pokemons, toggleFavorites } = usePokemonContext();
  const { data: pokemon, error } = useFetch<Pokemon>(`${base_url}${id}`);

  if (!pokemon) {
    return (
      <Row className="align-center">
        <h3>Loading...</h3>
      </Row>
    );
  }

  if (error) {
    return (
      <Row className="align-center">
        <h3>Sorry, we couldn't find that pokemon...</h3>
      </Row>
    );
  }

  if (pokemon) {
    if (favorite_pokemons.find((p) => p.id === Number(id))) {
      pokemon.favorite = true;
    } else {
      pokemon.favorite = false;
    }
  }

  const { name, sprites, base_experience, height, weight, favorite, stats } = pokemon;
  return (
    <Row>
      <Col>
        <Card style={{ maxWidth: "600px" }} className="text-center mx-auto">
          <Card.Header as="h5">
            <Row className="d-flex pl-3 pr-3">
              {name}{" "}
              <ToggleFavButton
                favorite={favorite || false}
                toggleFavorites={toggleFavorites}
                pokemon={pokemon}
              />
            </Row>
          </Card.Header>
          <Card.Img
            variant="top"
            className="d-block mx-auto p-0"
            style={{ width: "100px" }}
            src={sprites?.front_default}
          />
          <Card.Body>
            <Card.Title className="text-left">Basic Info</Card.Title>
            <Table size="sm" className="text-center">
              <thead>
                <tr>
                  <th>Base experience</th>
                  <th>Height</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{base_experience}</td>
                  <td>{height}</td>
                  <td>{weight}</td>
                </tr>
              </tbody>
            </Table>
            <Card.Title className="text-left">Stats</Card.Title>
            <Table size="sm" className="text-center">
              <thead>
                <tr>
                  {stats.map((stat) => {
                    return <th>{capitalize(stat.stat.name)}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {stats.map((stat) => {
                    return <td>{stat.base_stat}</td>;
                  })}
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
