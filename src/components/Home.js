import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../css/Home.css";

const Home = () => {
  const [colums, setColumns] = useState([]);
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/create");
  }
  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };
  const handleDelete = (id) => {
    const Dialog = window.confirm("Are you sure to delete?");
    axios.delete(`http://localhost:3000/users/${id}`)
    .then((res) => {
      alert("Delete success");
      navigate(`/delete/${id}`);
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => {
      setColumns(Object.keys(res.data[0]));
      setLists(res.data);
    });
  }, []);

  return (
    <div className="container">
      <div>
        <button onClick={handleClick}>Add</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            {colums.map((c, index) => (
              <th key={index}>{c}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((l, index) => (
            <tr key={index}>
              <td>{l.id}</td>
              <td>{l.name}</td>
              <td>{l.email}</td>
              <td>
                <button onClick={() => handleEdit(l.id)}>Edit</button>
                <button onClick={() => handleDelete(l.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
