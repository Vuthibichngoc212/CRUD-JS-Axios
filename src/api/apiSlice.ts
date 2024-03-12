import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IForm } from "../interface/form";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getListUsers: builder.query<Array<IForm['user']>, void>({
      query: () => "/users",
      providesTags: ["User"],
    }),
    getUserById: builder.query<IForm['user'], string>({
      query: (id) => `/users/${id}`,
      providesTags: ['User']
    }),
    addUser: builder.mutation<IForm['user'], Omit<IForm['user'], "id">>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<IForm['user'], Partial<Omit<IForm['user'], 'id'>> & Pick<IForm['user'], "id">>({
      query: ({ id, ...user }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ['User']
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetListUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
} = apiSlice;
