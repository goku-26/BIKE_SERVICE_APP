import React, { useEffect, useState } from 'react';
import API from '../../api/axios';

function Services() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    API.get('/services').then((res) => setServices(res.data));
  }, []);

  const handleAdd = async () => {
    await API.post('/services', { name, price });
    setName('');
    setPrice('');
    window.location.reload();
  };

  const handleDelete = async (id) => {
    await API.delete(`/services/${id}`);
    window.location.reload();
  };

  return (
    <div>
      <h2>Manage Services</h2>
      <input placeholder="Service Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button onClick={handleAdd}>Add Service</button>

      {services.map((s) => (
        <div key={s._id}>
          <p>{s.name} - ₹{s.price}</p>
          <button onClick={() => handleDelete(s._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Services;