import {Box, Button, Grid, TextField} from '@mui/material';
import React from 'react';

const NewsForm = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{display: 'flex', flexDirection: 'column', mt: 4}}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              id="title"
              label="Title"
              name="title"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="content"
              label="Text..."
              name="content"
              type="text"
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          sx={{mt: 4, mx: 'auto', width: '100%'}}
          variant="contained"
          type="submit"
        >
          Send
        </Button>
      </Box>
  );
};

export default NewsForm;