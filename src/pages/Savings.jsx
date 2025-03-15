// src/pages/Savings.jsx
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Button, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  LinearProgress,
  IconButton,
  Card,
  CardContent,
  CardActions,
  InputAdornment,
  Container
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format, differenceInDays } from 'date-fns';
import { de } from 'date-fns/locale';
// Chart.js Imports
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Registrieren Sie die Chart.js Komponenten
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Savings() {
  const { savingsGoals, addSavingsGoal, updateSavingsGoal, deleteSavingsGoal } = useAppContext();
  const [open, setOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: format(new Date(), 'yyyy-MM-dd')
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingGoal(null);
    setFormData({
      name: '',
      targetAmount: '',
      currentAmount: '',
      deadline: format(new Date(), 'yyyy-MM-dd')
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['targetAmount', 'currentAmount'].includes(name) ? parseFloat(value) || '' : value
    });
  };

  const handleSubmit = () => {
    if (editingGoal) {
      updateSavingsGoal(editingGoal.id, formData);
    } else {
      addSavingsGoal(formData);
    }
    handleClose();
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setFormData({
      name: goal.name,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      deadline: goal.deadline
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Sind Sie sicher, dass Sie dieses Sparziel löschen möchten?')) {
      deleteSavingsGoal(id);
    }
  };

  // Formatiere Währung
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Formatiere Datum
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd. MMM yyyy', { locale: de });
  };

  // Berechne monatlichen Sparbetrag
  const calculateMonthlySavings = (goal) => {
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const daysLeft = Math.max(differenceInDays(deadline, today), 1);
    const monthsLeft = daysLeft / 30;
    const amountLeft = goal.targetAmount - goal.currentAmount;
    
    return amountLeft / Math.max(monthsLeft, 1);
  };

  // Daten für das Diagramm
  const savingsChartData = {
    labels: Array.isArray(savingsGoals) ? savingsGoals.map(goal => goal.name) : [],
    datasets: [
      {
        label: 'Gespart',
        data: Array.isArray(savingsGoals) ? savingsGoals.map(goal => goal.currentAmount) : [],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      }
    ],
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sparziele
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Verfolge deine Sparziele und behalte den Überblick über deinen Fortschritt.
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Neues Sparziel
        </Button>
      </Box>

      <Grid container spacing={3}>
        {Array.isArray(savingsGoals) && savingsGoals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const remaining = goal.targetAmount - goal.currentAmount;
          const monthlySavings = calculateMonthlySavings(goal);

          return (
            <Grid item xs={12} md={6} key={goal.id}>
              <Paper sx={{ p: 3, position: 'relative' }}>
                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                  <IconButton size="small" onClick={() => handleEdit(goal)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(goal.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Typography variant="h6" gutterBottom>
                  {goal.name}
                </Typography>

                <Box sx={{ mt: 2, mb: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(progress, 100)} 
                    sx={{ 
                      height: 10, 
                      borderRadius: 5,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: progress >= 100 ? 'success.main' : 'primary.main',
                      }
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(goal.currentAmount)} von {formatCurrency(goal.targetAmount)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Math.min(Math.round(progress), 100)}%
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Noch benötigt:
                    </Typography>
                    <Typography variant="body1">
                      {formatCurrency(Math.max(remaining, 0))}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Zieldatum:
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(goal.deadline)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Monatlich sparen:
                    </Typography>
                    <Typography variant="body1">
                      {formatCurrency(monthlySavings)}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}

        {Array.isArray(savingsGoals) && savingsGoals.length > 0 && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 450 }}>
              <Typography variant="h6" gutterBottom>
                Sparziele Übersicht
              </Typography>
              <Box sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                height: '100%'
              }}>
                <Doughnut 
                  data={savingsChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      }
                    }
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        )}

        {(!Array.isArray(savingsGoals) || savingsGoals.length === 0) && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Keine Sparziele vorhanden
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Du hast noch keine Sparziele erstellt. Klicke auf "Neues Sparziel", um zu beginnen.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Neues Sparziel
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingGoal ? 'Sparziel bearbeiten' : 'Neues Sparziel'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name des Sparziels"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="targetAmount"
            label="Zielbetrag"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.targetAmount}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="currentAmount"
            label="Aktueller Betrag"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.currentAmount}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="deadline"
            label="Zieldatum"
            type="date"
            fullWidth
            variant="outlined"
            value={formData.deadline}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingGoal ? 'Aktualisieren' : 'Hinzufügen'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Savings;
