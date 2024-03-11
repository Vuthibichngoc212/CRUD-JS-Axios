import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Form.css";
import {
  useAddUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../api/apiSlice";
import { FormProps, User } from "./Type";

const Form: React.FC<FormProps> = ({ mode }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [data, setData] = useState<User>({ email: "", name: "" });
  const {data: getUserById} = useGetUserByIdQuery(id as string, {
    skip: mode === "create",
  });

  useEffect(() => {
    if (getUserById ) {
      setData({
        email: getUserById.email,
        name: getUserById.name,
      });
    }
  }, [getUserById]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (mode === "update" && id ) {
        await updateUser({ id, ...data });
      } else {
        await addUser(data);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form className="setForm" onSubmit={handleSubmit}>
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
};

export default Form;
