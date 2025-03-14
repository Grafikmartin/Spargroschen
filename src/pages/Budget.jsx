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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  IconButton,
  Card,
  CardContent,
  CardActions,
  InputAdornment // Korrigiert von TextField.Adornment
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { categories } from '../data/initialData';

function Budget() {
  const { budgets, transactions, addBudget, updateBudget, deleteBudget } = useAppContext();
  const [open, setOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly'
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingBudget(null);
    setFormData({
      category: '',
      amount: '',
      period: 'monthly'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    });
  };

  const handleSubmit = () => {
    if (editingBudget) {
      updateBudget(editingBudget.id, formData);
    } else {
      addBudget(formData);
    }
    handleClose();
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setFormData({
      category: budget.category,
      amount: budget.amount,
      period: budget.period
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Sind Sie sicher, dass Sie dieses Budget löschen möchten?')) {
      deleteBudget(id);
    }
  };

  // Formatiere Währung
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Filtere Transaktionen für den ausgewählten Monat
  const filteredTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === selectedMonth && 
           date.getFullYear() === selectedYear && 
           t.type === 'expense';
  });
  
  // Berechne Ausgaben pro Kategorie
  const expensesByCategory = {};
  filteredTransactions.forEach(t => {
    if (!expensesByCategory[t.category]) {
      expensesByCategory[t.category] = 0;
    }
    expensesByCategory[t.category] += t.amount;
  });

  const months = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Budget</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Neues Budget
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Monat</InputLabel>
            <Select
              value={selectedMonth}
              label="Monat"
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((month, index) => (
                <MenuItem key={index} value={index}>{month}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Jahr</InputLabel>
            <Select
              value={selectedYear}
              label="Jahr"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {[...Array(5)].map((_, i) => {
                const year = new Date().getFullYear() - 2 + i;
                return <MenuItem key={year} value={year}>{year}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {budgets.length > 0 ? (
          budgets.map(budget => {
            const spent = expensesByCategory[budget.category] || 0;
            const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
            const isOverBudget = percentage > 100;
            
            return (
              <Grid item xs={12} sm={6} md={4} key={budget.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">{budget.category}</Typography>
                      <Typography 
                        variant="body2" 
                        color={isOverBudget ? 'error.main' : 'text.secondary'}
                      >
                        {budget.period === 'monthly' ? 'Monatlich' : 'Jährlich'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Budget: {formatCurrency(budget.amount)}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color={isOverBudget ? 'error.main' : 'text.secondary'}
                      >
                        Ausgegeben: {formatCurrency(spent)} ({percentage.toFixed(0)}%)
                      </Typography>
                    </Box>
                    
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(percentage, 100)} 
                      color={isOverBudget ? 'error' : 'primary'}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    
                    {isOverBudget && (
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        Budget um {formatCurrency(spent - budget.amount)} überschritten!
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <IconButton size="small" onClick={() => handleEdit(budget)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(budget.id)}>
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
                Noch keine Budgets vorhanden. Erstellen Sie Ihr erstes Budget!
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleOpen}
                sx={{ mt: 2 }}
              >
                Budget erstellen
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Dialog für neues/bearbeitetes Budget */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingBudget ? 'Budget bearbeiten' : 'Neues Budget'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Kategorie</InputLabel>
              <Select
                name="category"
                value={formData.category}
                label="Kategorie"
                onChange={handleChange}
              >
                {categories.expense.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Betrag"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">€</InputAdornment>, // Korrigiert
              }}
            />

            <FormControl fullWidth>
              <InputLabel>Zeitraum</InputLabel>
              <Select
                name="period"
                value={formData.period}
                label="Zeitraum"
                onChange={handleChange}
              >
                <MenuItem value="monthly">Monatlich</MenuItem>
                <MenuItem value="yearly">Jährlich</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.category || !formData.amount}
          >
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Budget;
