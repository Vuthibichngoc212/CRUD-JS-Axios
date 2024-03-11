import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import { useDeleteUserMutation, useGetListUsersQuery } from "../api/apiSlice";
import { useDispatch } from "react-redux";
import { setUserData } from "../api/formSlice";

export const Home: React.FC = () => {
  const { data } = useGetListUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columnsTable = data && data.length > 0 ? Object.keys(data[0]) : [];

  function handleClick() {
    dispatch(setUserData({ email: "", name: "" }));
    navigate("/create");
  }
  const handleEdit = (id?: string) => {
    navigate(`/update/${id}`);
  };
  const handleDelete = async (id?: string) => {
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
          {data &&
            data.length > 0 &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button onClick={() => handleEdit(item.id)}>Update</button>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
