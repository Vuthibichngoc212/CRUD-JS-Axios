import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axiosClient";
import "../css/Home.css";

interface IUser {
  id: number;
  name: string;
  email: string;
}

export const Home: React.FC = () => {
  const [columnsTable, setColumnsTable] = useState<string[]>([]);
  const [listsUser, setListsUser] = useState<IUser[]>([]);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/create");
  }
  const handleEdit = (id: number) => {
    navigate(`/update/${id}`);
  };
  const handleGetAll = () => {
    axiosClient.get("/users").then((res) => {
      setColumnsTable(Object.keys(res.data[0]));
      setListsUser(res.data);
    });
  };
  const handleDelete = async (id: number) => {
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
      <div><button onClick={handleClick}>Add</button></div>
      <table className="table">
        <thead>
          <tr>
            {columnsTable.map((colum, index) => (
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
