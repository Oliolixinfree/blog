import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase-config';

export const blogsApi = createApi({
  reducerPath: 'blogsApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchBlogs: builder.query({
      queryFn() {
        return { data: 'ok' };
      },
    }),
    addBlog: builder.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(db, 'blogs'), {
            ...data,
            timestamp: serverTimestamp(),
          });

          return { data: 'ok' };
        } catch (err) {
          return { error: err };
        }
      },
    }),
  }),
});

export const { useFetchBlogsQuery, useAddBlogMutation } = blogsApi;
