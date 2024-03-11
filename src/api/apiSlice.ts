import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";
import { User } from "../components/Type";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getListUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ['User']
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: ['User']
    }),
    addUser: builder.mutation<User, Omit<User, 'id'>>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ['User']
    }),
    updateUser: builder.mutation<User, Partial<Omit<User, 'id'>> & Pick<User, "id">>({
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
      invalidatesTags: ['User']
    }),
  }),
});

export const {
  useGetListUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery
} = apiSlice;
