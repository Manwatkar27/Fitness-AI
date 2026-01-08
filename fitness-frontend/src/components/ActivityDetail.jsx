import { Box, Card, CardContent, Divider, Typography, Grid, Chip, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getActivityDetail } from '../services/api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

const ActivityDetail = () => {
    const {id} = useParams();
    const [activity, setActivity] = useState(null);
    const [recommendation, setRecommendation] = useState(null);

    useEffect(() => {
        const fetchActivityDetail = async () => {
        try {
            const response = await getActivityDetail(id);
            setActivity(response.data);
            setRecommendation(response.data.recommendation);
        } catch (error) {
            console.error(error);
        }
        }

        fetchActivityDetail();
    }, [id]);

    if (!activity) {
        return <Typography sx={{p:4, textAlign:'center'}}>Loading...</Typography>
    }

    return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
            <Card sx={{ mb: 3, borderRadius: 2 }} elevation={3}>
                <CardContent>
                    <Typography variant="h4" color="primary" gutterBottom fontWeight="bold">
                        {activity.type}
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={4}>
                            <Typography variant="subtitle2" color="text.secondary">DURATION</Typography>
                            <Typography variant="h6">{activity.duration} min</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle2" color="text.secondary">CALORIES</Typography>
                            <Typography variant="h6">{activity.caloriesBurned}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                             <Typography variant="subtitle2" color="text.secondary">DATE</Typography>
                             <Typography variant="body1">{new Date(activity.createdAt).toLocaleDateString()}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {recommendation && (
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">AI Analysis</Typography>
                    
                    <Box sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mb: 3 }}>
                        <Typography variant="body1">{activity.recommendation}</Typography>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" color="success.main" display="flex" alignItems="center" gap={1}>
                                <CheckCircleIcon /> Improvements
                            </Typography>
                            <List dense>
                                {activity?.improvements?.map((improvement, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={`• ${improvement}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" color="info.main" display="flex" alignItems="center" gap={1}>
                                <InfoIcon /> Suggestions
                            </Typography>
                            <List dense>
                                {activity?.suggestions?.map((suggestion, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={`• ${suggestion}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="h6" color="warning.main" display="flex" alignItems="center" gap={1}>
                        <WarningIcon /> Safety Guidelines
                    </Typography>
                    <List>
                        {activity?.safety?.map((safety, index) => (
                            <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                                <ListItemText primary={`• ${safety}`} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    )
}

export default ActivityDetail;