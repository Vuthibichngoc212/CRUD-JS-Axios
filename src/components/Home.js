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
  const handleGetDetail = () => {
    axiosClient.get("/users").then((res) => {
      setColumnsTable(Object.keys(res.data[0]));
      setListsUser(res.data);
    });
  };
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/users/${id}`);
      handleGetDetail();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetDetail();
  }, []);

  return (
    <div className="container">
      <div>
        <button onClick={handleClick}>Add</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            {columsTable.map((columsTable, index) => (
              <th key={index}>{columsTable}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listsUser.map((users, index) => (
            <tr key={index}>
              <td>{users.id}</td>
              <td>{users.name}</td>
              <td>{users.email}</td>
              <td>
                <button onClick={() => handleEdit(users.id)}>Update</button>
                <button onClick={() => handleDelete(users.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
