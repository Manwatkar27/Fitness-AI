import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { addActivity } from '../services/api';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ActivityForm = ({ onActivityAdded }) => {

  const [activity, setActivity] = useState({
    type: "RUNNING", duration: '', caloriesBurned: '',
    additionalMetrics: {}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(activity);
      onActivityAdded();
      setActivity({ type: "RUNNING", duration: '', caloriesBurned: '', additionalMetrics: {} });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                Log New Activity
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Activity Type</InputLabel>
                            <Select
                                value={activity.type}
                                label="Activity Type"
                                onChange={(e) => { setActivity({ ...activity, type: e.target.value }) }}
                            >
                                <MenuItem value="RUNNING">Running</MenuItem>
                                <MenuItem value="WALKING">Walking</MenuItem>
                                <MenuItem value="CYCLING">Cycling</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField 
                            fullWidth
                            label="Duration (min)"
                            type="number"
                            value={activity.duration}
                            onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Calories Burned"
                            type="number"
                            fullWidth
                            value={activity.caloriesBurned}
                            onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            type='submit' 
                            variant='contained' 
                            fullWidth 
                            size="large"
                            startIcon={<AddCircleIcon />}
                            sx={{ mt: 1 }}
                        >
                            Add Activity
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </CardContent>
    </Card>
  )
}

export default ActivityForm;