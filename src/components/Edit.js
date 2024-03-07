import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../css/Form.css";

const Edit = () => {
    const {id} = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${id}`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }, [id])
    function handleSubmit(event) {
        event.preventDefault();

        axios.put(`http://localhost:3000/users/${id}`, data)
        .then((res) => {
            alert("Success");
            navigate('/');
        }).catch(err=>
            alert("Failed"));
    }
    return (
        <div className="container">
          <form onSubmit={handleSubmit} className="setForm">
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
}

export default Edit