import React, { useState } from "react";
import { Box, Button, Grid, TextField, CircularProgress, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCreateNewsLoading } from '../newsSLice';
import { useNavigate } from 'react-router-dom';
import { createNews, fetchNews } from '../newsThunk';
import FileInput from '../components/FileInput';
import { NewsMutation } from '../../../types';

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(4),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  width: '100%',
}));

const AddNew: React.FC = () => {
  const [newItem, setNewItem] = useState<NewsMutation>({
    title: '',
    content: '',
    dateTime: '',
    image: null,
  });
  const dispatch = useAppDispatch();
  const sendLoading = useAppSelector(selectCreateNewsLoading);
  const navigate = useNavigate();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setNewItem(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createNews(newItem));
    await dispatch(fetchNews());

    if (newItem) {
      dispatch(fetchNews())
      navigate('/');
    }


  };

  return (
    <FormContainer component="form" onSubmit={onSubmitHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title"
            label="Title"
            name="title"
            type="text"
            value={newItem.title}
            onChange={inputChangeHandler}
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="content"
            label="Text..."
            name="content"
            type="text"
            value={newItem.content}
            onChange={inputChangeHandler}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <FileInput
            onChange={filesInputChangeHandler}
            name="image"
            label="Image"
          />
        </Grid>
      </Grid>
      <SubmitButton
        variant="contained"
        type="submit"
        endIcon={sendLoading ? <CircularProgress size={24} /> : undefined}
      >
        Send
      </SubmitButton>
    </FormContainer>
  );
};

export default AddNew;
