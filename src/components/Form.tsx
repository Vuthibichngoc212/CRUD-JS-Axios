import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../css/Form.css";
import {
  useAddUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../api/apiSlice";
import { setUserData } from "../api/formSlice";
import { RootState } from "../store";
import { FormProps } from "../interface/form";

const Form: React.FC<FormProps> = ({ mode }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const user = useSelector((state: RootState) => state.formReducer.user);

  const { data: getUserById } = useGetUserByIdQuery(id as string, {
    skip: mode === "create",
  });
  const handleChange = (type: string, value: string) => {
    dispatch(
      setUserData({
        email: type === "email" ? value : user.email,
        name: type === "name" ? value : user.name,
      })
    );
  };

  useEffect(() => {
    if (getUserById) {
      dispatch(
        setUserData({
          email: getUserById.email as string,
          name: getUserById.name as string,
        })
      );
    }
  }, [getUserById, dispatch]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (mode === "update" && id) {
        await updateUser({ id, ...user });
      } else {
        await addUser(user);
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
            value={user.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
