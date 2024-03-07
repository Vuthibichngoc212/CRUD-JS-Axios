import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Form.css";
import { axiosClient } from "../api/axiosClient";

const Form = ({ mode }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mode === "create") {
      try {
        await axiosClient.post("/users", data);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else if (mode === "update") {
      try {
        await axiosClient.put(`/users/${id}`, data);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchDataUpdate = async () => {
      if (mode === "update") {
        try {
          const response = await axiosClient.get(`/users/${id}`);
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchDataUpdate();
  }, [id, mode]);

  return (
    <div className="container">
      <form className="setForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={data.email || ""}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
