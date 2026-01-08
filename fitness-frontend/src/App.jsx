import { Box, Button, CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Typography, Container, Paper } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router"; 
import { logout, setCredentials } from './store/authSlice';
import { AuthContext } from 'react-oauth2-code-pkce';
import { useDispatch } from 'react-redux';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import ActivityDetail from './components/ActivityDetail';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Define a professional theme
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: { default: '#f5f5f5' },
  },
});

// Your Page Component
const ActivitiesPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Passing the exact reload logic you requested */}
      <ActivityForm onActivityAdded={() => window.location.reload()} />
      
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#555' }}>
            Recent Activities
        </Typography>
        <ActivityList />
      </Box>
    </Container>
  );
}

function App() {
  const { token, tokenData, logIn, logOut } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {!token ? (
          // LOGIN STATE: Centered Login Button (Strictly separate as per your original code)
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="100vh"
            sx={{ background: 'linear-gradient(135deg, #1976d2 30%, #42a5f5 90%)' }}
          >
            <Paper elevation={10} sx={{ p: 5, textAlign: 'center', borderRadius: 3 }}>
                <FitnessCenterIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" gutterBottom fontWeight="bold">Fitness Tracker</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Please login to continue
                </Typography>
                <Button 
                    variant="contained" 
                    size="large"
                    startIcon={<LockOpenIcon />}
                    onClick={() => { logIn(); }}
                    sx={{ px: 4, py: 1.5, borderRadius: 50 }}
                >
                    LOGIN
                </Button>
            </Paper>
          </Box>
        ) : (
          // LOGGED IN STATE
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0}>
                <Toolbar>
                    <FitnessCenterIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        My Activities
                    </Typography>
                    <Button 
                        color="inherit" 
                        startIcon={<ExitToAppIcon />}
                        onClick={logout}
                    >
                        LOGOUT
                    </Button>
                </Toolbar>
            </AppBar>
            
            <Routes>
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/activities/:id" element={<ActivityDetail />} />
              <Route path="/" element={token ? <Navigate to="/activities" replace /> : <div>Welcome! Please login</div>} />
            </Routes>
          </Box>
        )}
      </Router>
    </ThemeProvider>
  )
}

export default App;