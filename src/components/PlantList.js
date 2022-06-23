import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onDelete, onPriceChange}) {

  const plantsToDisplay = plants.map(plant => <PlantCard key={plant.name} plant={plant} onDelete={onDelete} onPriceChange={onPriceChange}/>)

  return (
    <ul className="cards">{plantsToDisplay}</ul>
  );
}

export default PlantList;
