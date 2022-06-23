import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plantList, setPlantList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=> {
    fetch("http://localhost:6001/plants")
    .then(r => r.json())
    .then(plants => setPlantList(plants))
    .catch(error => console.log(error));
  },[]);

  function handleSearch(searchWord){
    setSearch(searchWord);
  }

  function hanldeOnAddPlant(newPlant){
      fetch("http://localhost:6001/plants", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(newPlant)
      })
      .then(r => r.json())
      .then(plant => setPlantList([...plantList, plant]))
      .catch(error => console.log(error));
  }

  function handleOnPlantDelete(id){
    fetch(`http://localhost:6001/plants/${id}`,{
      method: "DELETE"
    })
    .then(r => r.json())
    .then(()=> {
      const newPlantList = plantList.filter(plant => plant.id !== id);
      setPlantList(newPlantList);
    })
    .catch(error => console.log(error));
  }

  function handlePriceChange(id, newPrice){
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({price: newPrice})
    })
    .then(r => r.json())
    .then(plant => {
      const newPlantList = plantList.map(p => p.id === plant.id ? plant : p)
      setPlantList(newPlantList);
    });
  }

  const plantsToDisplay = plantList.filter(plant => plant.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main>
      <NewPlantForm onAddPlant={hanldeOnAddPlant}/>
      <Search onSearch={handleSearch}/>
      <PlantList plants={plantsToDisplay} onDelete={handleOnPlantDelete} onPriceChange={handlePriceChange}/>
    </main>
  );
}

export default PlantPage;
