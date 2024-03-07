import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../css/Home.css";
import { axiosClient } from "../api/axiosClient";

const Home = () => {
  const [columsTable, setColumnsTable] = useState([]);
  const [listsUser, setListsUser] = useState([]);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/create");
  }
  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };
  const handleGetAll = () => {
    axiosClient.get("/users").then((res) => {
      setColumnsTable(Object.keys(res.data[0]));
      setListsUser(res.data);
    });
  };
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/users/${id}`);
      handleGetAll();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetAll();
  }, []);

  return (
    <div className="container">
      <div>
        <button onClick={handleClick}>Add</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            {columsTable.map((colum, index) => (
              <th key={index}>{colum}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listsUser.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Update</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
