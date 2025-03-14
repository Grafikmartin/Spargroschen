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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Sparziele</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Neues Sparziel
        </Button>
      </Box>

      <Grid container spacing={3}>
        {savingsGoals.length > 0 ? (
          savingsGoals.map(goal => {
            const percentage = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
            const monthlySavings = calculateMonthlySavings(goal);
            const isCompleted = percentage >= 100;
            
            return (
              <Grid item xs={12} sm={6} md={4} key={goal.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{goal.name}</Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Ziel: {formatCurrency(goal.targetAmount)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Gespart: {formatCurrency(goal.currentAmount)} ({percentage.toFixed(0)}%)
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Fällig am: {formatDate(goal.deadline)}
                      </Typography>
                    </Box>
                    
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(percentage, 100)} 
                      color={isCompleted ? 'success' : 'primary'}
                      sx={{ height: 8, borderRadius: 4, mb: 2 }}
                    />
                    
                    {!isCompleted && (
                      <Typography variant="body2" color="primary" sx={{ fontWeight: 'medium' }}>
                        Monatlich sparen: {formatCurrency(monthlySavings)}
                      </Typography>
                    )}
                    
                    {isCompleted && (
                      <Typography variant="body2" color="success.main" sx={{ fontWeight: 'medium' }}>
                        Sparziel erreicht! 🎉
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <IconButton size="small" onClick={() => handleEdit(goal)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(goal.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1">
                Noch keine Sparziele vorhanden. Erstellen Sie Ihr erstes Sparziel!
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleOpen}
                sx={{ mt: 2 }}
              >
                Sparziel erstellen
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Dialog für neues/bearbeitetes Sparziel */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingGoal ? 'Sparziel bearbeiten' : 'Neues Sparziel'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Zielbetrag"
              name="targetAmount"
              type="number"
              value={formData.targetAmount}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
              }}
            />

            <TextField
              label="Bereits gespart"
              name="currentAmount"
              type="number"
              value={formData.currentAmount}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
              }}
            />

            <TextField
              label="Zieldatum"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.name || !formData.targetAmount || !formData.deadline}
          >
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Savings;
