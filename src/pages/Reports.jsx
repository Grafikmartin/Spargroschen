import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tab,
  Tabs
} from '@mui/material';

function Reports() {
  const { transactions } = useAppContext();
  const [timeRange, setTimeRange] = useState(3); // Monate
  const [currentTab, setCurrentTab] = useState(0);

  // Formatiere Währung
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Berechne Gesamteinnahmen und -ausgaben
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Berechne Ausgaben pro Kategorie
  const expensesByCategory = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      if (!expensesByCategory[t.category]) {
        expensesByCategory[t.category] = 0;
      }
      expensesByCategory[t.category] += t.amount;
    });

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChangeTimeRange = (event) => {
    setTimeRange(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Berichte
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Tabs value={currentTab} onChange={handleChangeTab}>
            <Tab label="Übersicht" />
            <Tab label="Ausgaben" />
            <Tab label="Einnahmen" />
          </Tabs>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Zeitraum</InputLabel>
            <Select
              value={timeRange}
              label="Zeitraum"
              onChange={handleChangeTimeRange}
            >
              <MenuItem value={1}>Letzter Monat</MenuItem>
              <MenuItem value={3}>Letzte 3 Monate</MenuItem>
              <MenuItem value={6}>Letzte 6 Monate</MenuItem>
              <MenuItem value={12}>Letztes Jahr</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        {currentTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Zusammenfassung</Typography>
                <Box sx={{ my: 2 }}>
                  <Typography variant="body1">
                    Gesamteinnahmen: <strong style={{ color: 'green' }}>{formatCurrency(totalIncome)}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Gesamtausgaben: <strong style={{ color: 'red' }}>{formatCurrency(totalExpenses)}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Bilanz: <strong style={{ color: totalIncome - totalExpenses >= 0 ? 'green' : 'red' }}>
                      {formatCurrency(totalIncome - totalExpenses)}
                    </strong>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Top Ausgaben-Kategorien</Typography>
                <Box sx={{ my: 2 }}>
                  {Object.entries(expensesByCategory)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([category, amount]) => (
                      <Box key={category} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">{category}</Typography>
                        <Typography variant="body1" color="error">
                          {formatCurrency(amount)}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 2, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Hier würden Diagramme angezeigt werden (Chart.js)
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
        
        {currentTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>Ausgaben-Analyse</Typography>
            <Paper elevation={1} sx={{ p: 2, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Hier würde ein Ausgaben-Diagramm angezeigt werden
              </Typography>
            </Paper>
          </Box>
        )}
        
        {currentTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>Einnahmen-Analyse</Typography>
            <Paper elevation={1} sx={{ p: 2, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Hier würde ein Einnahmen-Diagramm angezeigt werden
              </Typography>
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Reports;
