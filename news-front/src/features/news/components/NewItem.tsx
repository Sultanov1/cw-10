import {Box, Button, Grid, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';

const NewItem = () => {
  return (
    <Grid item xs sx={{ padding: '20px', border: '1px solid grey', borderRadius: '7px', marginTop: '100px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
           title
          </Typography>
          <Typography variant="body1" component="p" sx={{ marginBottom: '16px' }}>
            01.07.2024
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
          <Button variant="outlined" color="error">
            Delete
          </Button>
          <NavLink to='/:id' style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Read Full Post</Button>
          </NavLink>
        </Box>
      </Box>
    </Grid>
  );
};

export default NewItem;