import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Form.css"

const Add = () => {
  const [inputData, setInputData] = useState({name: '', email: ''});
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:3000/users', inputData)
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
            onChange={(e) =>
              setInputData({ ...inputData, name: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            onChange={(e) =>
              setInputData({ ...inputData, email: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Add;
