import React, {useState} from "react";

function NewPlantForm({onAddPlant}) {

  const[formData, setFormData] = useState({name: "", image: "", price:""})

  function handleFormChange(e){
    const name = e.target.name;
    const value = e.target.value;
    setFormData({...formData, [name]: value})
  }

  function handleAddPlant(e){ 
    e.preventDefault();
    onAddPlant(formData);
    setFormData({name: "", image: "", price:""});
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleAddPlant}>
        <input type="text" name="name" placeholder="Plant name" value={formData.name} onChange={handleFormChange}/>
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleFormChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={formData.price} onChange={handleFormChange}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
