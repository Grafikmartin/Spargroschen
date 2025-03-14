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
  InputAdornment
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
        label:  'Gespart',
        data: Array.isArray(savingsGoals) ? savingsGoals.map(goal => goal.targetAmount - goal.currentAmount) : [],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(153, 102, 255, 0.2)',
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
        ]
      };
    
      return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Sparziele
          </Typography>
          
          <Grid container spacing={3}>
            {/* Diagramm */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
                <Typography variant="h6" gutterBottom>
                  Sparziele Übersicht
                </Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Doughnut data={savingsChartData} />
                </Box>
              </Paper>
            </Grid>
    
            {/* Liste der Sparziele */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">
                    Meine Sparziele
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                  >
                    Neues Sparziel
                  </Button>
                </Box>
    
                <Grid container spacing={2}>
                  {Array.isArray(savingsGoals) && savingsGoals.map((goal) => (
                    <Grid item xs={12} key={goal.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {goal.name}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={(goal.currentAmount / goal.targetAmount) * 100}
                            sx={{ mb: 1, height: 10, borderRadius: 5 }}
                          />
                          <Typography color="text.secondary" gutterBottom>
                            {formatCurrency(goal.currentAmount)} von {formatCurrency(goal.targetAmount)}
                          </Typography>
                          <Typography color="text.secondary">
                            Ziel bis: {formatDate(goal.deadline)}
                          </Typography>
                          <Typography color="text.secondary">
                            Monatlich benötigt: {formatCurrency(calculateMonthlySavings(goal))}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton onClick={() => handleEdit(goal)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(goal.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
    
          {/* Dialog für neues/bearbeiten Sparziel */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              {editingGoal ? 'Sparziel bearbeiten' : 'Neues Sparziel'}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Bezeichnung"
                type="text"
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="targetAmount"
                label="Zielbetrag"
                type="number"
                fullWidth
                value={formData.targetAmount}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
              />
              <TextField
                margin="dense"
                name="currentAmount"
                label="Bereits gespart"
                type="number"
                fullWidth
                value={formData.currentAmount}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
              />
              <TextField
                margin="dense"
                name="deadline"
                label="Zieldatum"
                type="date"
                fullWidth
                value={formData.deadline}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Abbrechen</Button>
              <Button onClick={handleSubmit} variant="contained">
                {editingGoal ? 'Aktualisieren' : 'Hinzufügen'}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      );
    }
    
    export default Savings;