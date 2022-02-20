import React from "react";
import { Pokemon } from "../models/pokemon";
import { Button } from "react-bootstrap";

type Props = {
  favorite: boolean;
  pokemon: Pokemon;
  toggleFavorites(pokemon: Pokemon, toAdd: boolean): void;
};

const ToggleFavButton: React.FC<Props> = ({ favorite, pokemon, toggleFavorites }) => {
  return (
    <Button
      variant={`${favorite ? "danger" : "success"}`}
      onClick={() => toggleFavorites(pokemon, !favorite || false)}
      size="sm"
    >
      {favorite ? "Remove from favorites" : "Add to favorites"}
    </Button>
  );
};

export default ToggleFavButton;
