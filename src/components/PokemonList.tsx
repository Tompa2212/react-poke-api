import React from "react";
import { usePokemonContext } from "../contexts/pokemon";
import { Row, Table } from "react-bootstrap";
import ToggleFavButton from "./ToggleFavButton";
import { Pokemon } from "../models/pokemon";
import { Link } from "react-router-dom";
import { capitalize } from "../utils/funcions";

interface Props {
  pokemons: Pokemon[];
}

const PokemonList: React.FC<Props> = ({ pokemons }) => {
  const { toggleFavorites } = usePokemonContext();

  return (
    <Row>
      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Pokemon Name</th>
            <th>HP</th>
            <th>Attack</th>
            <th>Defense</th>
            <th>Special-Attack</th>
            <th>Special-Defense</th>
            <th>Speed</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon, index) => {
            const { name, id, stats } = pokemon;

            return (
              <tr key={id}>
                <td>
                  <Link className="table-link" to={`/pokemon/${id}`}>
                    {id}
                  </Link>
                </td>
                <td>
                  <Link className="table-link" to={`/pokemon/${id}`}>
                    {capitalize(name)}
                  </Link>
                </td>
                {stats.map((stat, index) => {
                  return (
                    <td key={index}>
                      <Link className="table-link" to={`/pokemon/${id}`}>
                        {stat.base_stat}
                      </Link>
                    </td>
                  );
                })}
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <ToggleFavButton
                    favorite={pokemon.favorite || false}
                    toggleFavorites={toggleFavorites}
                    pokemon={pokemon}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Row>
  );
};

export default PokemonList;
