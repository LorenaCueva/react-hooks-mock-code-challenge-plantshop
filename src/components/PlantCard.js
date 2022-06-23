import React, {useState} from "react";

function PlantCard({plant, onDelete, onPriceChange}) {
  
  const {name, image, price, id} = plant;
  const [inStock, setInStock] = useState(true);
  const [newPrice, setNewPrice] = useState(parseFloat(price));

  function handleStockClick(){
    setInStock((inStock) => !inStock);
  }

  function handleDeleteClick(e){
    onDelete(id);
  }

  function handlePriceChange(e){
      setNewPrice(e.target.value);
  }

  function handlePriceSubmit(e){
      e.preventDefault();
      onPriceChange(id, newPrice);
      e.target.price.blur();
      
  }

  return (
    <li className="card">
      <img src={image} alt={"plant name"} />
      <h4>{name}</h4>
      <form onSubmit={handlePriceSubmit}>
        <label>Price:</label>
        <input type="text" value={newPrice} name="price" onChange={handlePriceChange}></input>
      </form>
      {inStock ? (
        <button className="primary" onClick={handleStockClick}>In Stock</button>
      ) : (
        <button onClick={handleStockClick}>Out of Stock</button>
      )}
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default PlantCard;
