import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Card, CardContent, Grid, Typography, Box, Chip } from '@mui/material';
import { getActivities } from '../services/api';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }  
  };
  
  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Grid container spacing={3}>
      {activities.map((activity) => (
        // CHANGED: This must be 'Grid item' to flow correctly
        <Grid item xs={12} sm={6} md={4} key={activity.id}>
          <Card 
            elevation={2}
            sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6, transform: 'translateY(-2px)', transition: '0.2s' } }}
            onClick={() => navigate(`/activities/${activity.id}`)}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                 <Typography variant='h6' fontWeight="bold" color="primary">
                    {activity.type}
                 </Typography>
                 <DirectionsRunIcon color="action" />
              </Box>

              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <AccessTimeIcon fontSize="small" color="disabled" />
                <Typography variant="body2">{activity.duration} minutes</Typography>
              </Box>
              
              <Box display="flex" alignItems="center" gap={1}>
                <LocalFireDepartmentIcon fontSize="small" color="error" />
                <Typography variant="body2">{activity.caloriesBurned} calories</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ActivityList;