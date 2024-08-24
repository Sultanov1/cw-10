import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectNews } from '../newsSLice';
import { fetchNews } from '../newsThunk';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import NewItem from '../components/NewItem';

const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
        }}
      >
        <Typography variant="h2" component="h2">
          Posts
        </Typography>
        <NavLink to="/add-news" style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ height: '40px' }}>
            Add New Post
          </Button>
        </NavLink>
      </Box>
      <Grid container direction="column" spacing={2} sx={{ padding: '0 20px' }}>
        {news?.length ? (
          news.map((newItem) => (
            <NewItem
              key={newItem.id}
              id={newItem.id}
              title={newItem.title}
              date={newItem.dateTime}
              image={newItem.image}
            />
          ))
        ) : (
          <Typography variant="h5" component="h1" sx={{ margin: '100px auto' }}>
            No news available
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default NewsList;
