import {Box, Button, Container, Grid, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import NewItem from '../components/NewItem.tsx';

const NewsList = () => {
  return (
    <Container maxWidth='xl'>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
        <Typography variant="h2" component="h2">
          Posts
        </Typography>
        <NavLink to="/add-news" style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ height: '40px' }}>
            Add New Post
          </Button>
        </NavLink>
      </Box>
      <Grid container direction="column" spacing={2} sx={{padding: '0 20px'}}>
        <NewItem/>
      </Grid>
    </Container>
  );
};

export default NewsList;