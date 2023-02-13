import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,
} from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { storage } from '../firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useAddBlogMutation } from '../services/blogsApi';
import { async } from '@firebase/util';
import { useNavigate } from 'react-router-dom';

const initialState = {
  title: '',
  description: '',
};

export const AddEditBlog = () => {
  const [data, setData] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [addBlog] = useAddBlogMutation();

  const navigate = useNavigate();

  const { title, description } = data;

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setProgress(progress);

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.info('Image upload successfully');
            setData((prev) => ({ ...prev, imdURL: downloadURL }));
          });
        },
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && description) {
      await addBlog(data);
      navigate('/');
    }
  };

  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '450px',
        alignContent: 'center',
        marginTop: '120px',
      }}
      className="container">
      <MDBCard alignment="center">
        <h4 className="fw-bold" style={{ marginTop: '1.5rem' }}>
          Create Blog
        </h4>
        <MDBCardBody>
          <MDBValidation className="row g-3" noValidate onSubmit={handleSubmit}>
            <MDBValidationItem className="col-md-12" feedback="Please provide title" invalid>
              <MDBInput
                label="Title"
                type="text"
                value={title}
                name="title"
                onChange={handleChange}
                className="from-control"
                required
              />
            </MDBValidationItem>
            <MDBValidationItem className="col-md-12" feedback="Please provide description" invalid>
              <MDBTextArea
                label="Description"
                type="text"
                value={description}
                name="description"
                onChange={handleChange}
                className="from-control"
                rows={4}
                required
              />
            </MDBValidationItem>
            <div className="col-md-14">
              <MDBInput type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: '100%' }} disabled={progress !== null && progress < 100}>
                Submit
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};
