import axios from "../api";
import { API_CATALOGUE } from "../api";
import { useState } from "react";

export default function Catalogue() {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState({});

  const loadProducts = async () => {
    const res = await axios.get(API_CATALOGUE);
    setItems(res.data);
  };

  const handleChange = (id, field, value) => {
    setEditItem({ ...editItem, [id]: { ...editItem[id], [field]: value } });
  };

  const updateProduct = async (id) => {
    const updated = editItem[id];
    if (!updated) return;
    const res = await axios.put(`${API_CATALOGUE}/${id}`, updated);
    alert(`Product updated: ${res.data.name}`);
    loadProducts(); // reload products after update
  };

  return (
    <div>
      <button onClick={loadProducts}>Load Products</button>
      {items.map((p) => (
        <div key={p._id}>
          <input
            type="text"
            defaultValue={p.name}
            onChange={(e) => handleChange(p._id, "name", e.target.value)}
          />
          <input
            type="number"
            defaultValue={p.price}
            onChange={(e) => handleChange(p._id, "price", e.target.value)}
          />
          <button onClick={() => updateProduct(p._id)}>Update</button>
        </div>
      ))}
    </div>
  );
}
