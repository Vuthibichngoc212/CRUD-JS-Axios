import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import { useDeleteUserMutation, useGetListUsersQuery } from "../api/apiSlice";

export const Home: React.FC = () => {
  const { data } = useGetListUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();
  const columnsTable = data && data.length > 0 ? Object.keys(data[0]) : [];

  function handleClick() {
    navigate("/create");
  }
  const handleEdit = (id?: string) => {
    navigate(`/update/${id}`);
  };
  const handleDelete = async (id?: string ) => {
    await deleteUser(id);
  };

  return (
    <div className="container">
      <div>
        <button onClick={handleClick}>Add</button>
      </div>
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
          {data && data.length > 0 && data.map((user, index) => (
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
