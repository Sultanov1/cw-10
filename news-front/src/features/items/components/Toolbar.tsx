import {AppBar, Box, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, padding: "15px 0" }}>
          <NavLink style={{padding: "10px", textDecoration: "none", color: "black", fontSize: '30px'}} to='/'>
            News
          </NavLink>
        </Typography>
      </AppBar>
    </Box>
  );
};

export default Toolbar;