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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Chart.js Komponenten registrieren
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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

  // Berechne Einnahmen pro Kategorie
  const incomeByCategory = {};
  transactions
    .filter(t => t.type === 'income')
    .forEach(t => {
      if (!incomeByCategory[t.category]) {
        incomeByCategory[t.category] = 0;
      }
      incomeByCategory[t.category] += t.amount;
    });

    // Daten für das Übersichts-Diagramm (Einnahmen vs. Ausgaben)
    const overviewChartData = {
      labels: ['Einnahmen', 'Ausgaben'],
      datasets: [
        {
          label: 'Beträge',
          data: [totalIncome, totalExpenses],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',  // Grün für Einnahmen
            'rgba(255, 99, 132, 0.6)',   // Rot für Ausgaben
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    // Daten für das Ausgaben-Kategorien-Diagramm
    const expenseChartData = {
      labels: Object.keys(expensesByCategory),
      datasets: [
        {
          label: 'Ausgaben pro Kategorie',
          data: Object.values(expensesByCategory),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Finanzübersicht',
        },
      },
    };
  
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Finanzberichte
        </Typography>
  
        <Box sx={{ mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Zeitraum</InputLabel>
            <Select
              value={timeRange}
              label="Zeitraum"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value={1}>Letzter Monat</MenuItem>
              <MenuItem value={3}>Letzte 3 Monate</MenuItem>
              <MenuItem value={6}>Letzte 6 Monate</MenuItem>
              <MenuItem value={12}>Letztes Jahr</MenuItem>
            </Select>
          </FormControl>
        </Box>
  
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Übersicht" />
          <Tab label="Ausgaben nach Kategorien" />
        </Tabs>
  
        <Grid container spacing={3}>
          {currentTab === 0 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, height: 400 }}>
                <Bar data={overviewChartData} options={chartOptions} />
              </Paper>
            </Grid>
          )}
  
          {currentTab === 1 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, height: 400 }}>
                <Pie data={expenseChartData} options={chartOptions} />
              </Paper>
            </Grid>
          )}
  
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Zusammenfassung
              </Typography>
              <Typography>
                Gesamteinnahmen: {formatCurrency(totalIncome)}
              </Typography>
              <Typography>
                Gesamtausgaben: {formatCurrency(totalExpenses)}
              </Typography>
              <Typography>
                Bilanz: {formatCurrency(totalIncome - totalExpenses)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }
  
  export default Reports;
  