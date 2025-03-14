import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

function Dashboard() {
  const { transactions, budgets } = useAppContext();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Berechne Gesamteinnahmen und -ausgaben
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = income - expenses;
  
  // Hole die letzten 5 Transaktionen
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  
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
  
  // Filtere Transaktionen für den ausgewählten Monat
  const filteredTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear && t.type === 'expense';
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
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Kontostand */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Kontostand
            </Typography>
            <Typography variant="h4" sx={{ my: 2 }}>
              {formatCurrency(balance)}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Einnahmen:</Typography>
              <Typography variant="body1" color="success.main">
                {formatCurrency(income)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Ausgaben:</Typography>
              <Typography variant="body1" color="error.main">
                {formatCurrency(expenses)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Budget-Übersicht */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Budget-Übersicht</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
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
            </Box>
            
            <Box sx={{ mt: 3 }}>
              {budgets.map(budget => {
                const spent = expensesByCategory[budget.category] || 0;
                const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
                const isOverBudget = percentage > 100;
                
                return (
                  <Box key={budget.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">{budget.category}</Typography>
                      <Typography variant="body2" color={isOverBudget ? 'error' : 'textPrimary'}>
                        {formatCurrency(spent)} / {formatCurrency(budget.amount)}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(percentage, 100)} 
                      color={isOverBudget ? 'error' : 'primary'}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>
        
        {/* Letzte Transaktionen */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Letzte Transaktionen
            </Typography>
            <List>
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <ListItem 
                    key={transaction.id}
                    divider
                    secondaryAction={
                      <Typography 
                        variant="body2" 
                        color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                      >
                        {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                      </Typography>
                    }
                  >
                    <ListItemText
                      primary={transaction.description}
                      secondary={`${transaction.category} • ${formatDate(transaction.date)}`}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="Keine Transaktionen vorhanden." />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
