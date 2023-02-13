import {
  MDBCard,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';
import { useFetchBlogsQuery } from '../services/blogsApi';

export const Home = () => {
  const { data, isLoading, isError, error } = useFetchBlogsQuery();

  useEffect(() => {
    isError && toast.error(error);
  }, [isError]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleDelete = () => {};

  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '1200px',
        alignContent: 'center',
      }}>
      <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        {data?.map((item) => (
          <MDBCol key={item.id}>
            <MDBCard className="h-100">
              <MDBCardImage src={item.imgURL} alt={item.title} position="top" />
              <MDBCardBody>
                <MDBCardTitle>{item.title}</MDBCardTitle>
                <MDBCardText>{item.description}</MDBCardText>
                <div style={{ marginLeft: '5px', float: 'right' }}>
                  <MDBBtn className="mt-1" tag="a" color="none">
                    <MDBIcon
                      fas
                      icon="trash"
                      style={{ color: '#dd4b39' }}
                      size="lg"
                      onClick={() => handleDelete(item.id)}
                    />
                  </MDBBtn>
                  <Link to={`/update/${item.id}`}>
                    <MDBIcon
                      fas
                      icon="edit"
                      style={{ color: '#55acee', marginLeft: '10px' }}
                      size="lg"
                    />
                  </Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
};
