import { skipToken } from '@reduxjs/toolkit/dist/query';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBTypography,
} from 'mdb-react-ui-kit';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';
import { useFetchBlogQuery } from '../services/blogsApi';

export const Detail = () => {
  const { id } = useParams();

  const { data, isError, error, isLoading } = useFetchBlogQuery(id ? id : skipToken);
  console.log(data?.imgURL);

  useEffect(() => {
    isError && toast.error(error);
  }, [isError]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MDBCard className="mb-3">
        <MDBCardImage
          position="top"
          scr={data?.imgURL}
          alt={data?.title}
          style={{ height: '100%' }}
        />
        <MDBCardBody>
          <MDBCardTitle className="h3 fw-bold text-center">{data?.title}</MDBCardTitle>
          <MDBCardText className="text-start">
            <span className="fw-bold">Created at - &nbsp;</span>
            <small className="text-muted h6">{data?.timestamp.toDate().toLocaleString()}</small>
          </MDBCardText>
          <MDBTypography blockquote className="text-start mb-0">
            {data?.description}
          </MDBTypography>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};
