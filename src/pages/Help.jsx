// src/pages/Help.jsx
import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SavingsIcon from '@mui/icons-material/Savings';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

function Help() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Hilfe & Anleitung
        </Typography>
        
        <Paper sx={{ p: 0, mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Übersicht" icon={<HelpIcon />} iconPosition="start" />
            <Tab label="Dashboard" icon={<DashboardIcon />} iconPosition="start" />
            <Tab label="Budget" icon={<AccountBalanceWalletIcon />} iconPosition="start" />
            <Tab label="Transaktionen" icon={<ReceiptIcon />} iconPosition="start" />
            <Tab label="Sparziele" icon={<SavingsIcon />} iconPosition="start" />
            <Tab label="Berichte" icon={<BarChartIcon />} iconPosition="start" />
            <Tab label="Einstellungen" icon={<SettingsIcon />} iconPosition="start" />
          </Tabs>
          
          <Box sx={{ p: 3 }}>
            {/* Übersicht */}
            {activeTab === 0 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Willkommen bei ZasterZen
                </Typography>
                
                <Typography paragraph>
                  ZasterZen ist deine persönliche Finanz-App, die dir hilft, deine Finanzen zu verwalten, Budgets zu erstellen, Ausgaben zu verfolgen und Sparziele zu erreichen. Diese Anleitung erklärt dir, wie du die verschiedenen Funktionen der App nutzen kannst.
                </Typography>
                
                <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                  Hauptfunktionen
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <DashboardIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">Dashboard</Typography>
                        </Box>
                        <Typography variant="body2">
                          Überblick über deine Finanzen, aktuelle Salden und kürzliche Transaktionen.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={4}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AccountBalanceWalletIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">Budget</Typography>
                        </Box>
                        <Typography variant="body2">
                          Erstelle und verwalte Budgets für verschiedene Ausgabenkategorien.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={4}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <ReceiptIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">Transaktionen</Typography>
                        </Box>
                        <Typography variant="body2">
                          Erfasse und verwalte deine Einnahmen und Ausgaben.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={4}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <SavingsIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">Sparziele</Typography>
                        </Box>
                        <Typography variant="body2">
                          Setze dir Sparziele und verfolge deinen Fortschritt.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={4}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <BarChartIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">Berichte</Typography>
                        </Box>
                        <Typography variant="body2">
                          Analysiere deine Finanzen mit Diagrammen und Berichten.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={4}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <SettingsIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">Einstellungen</Typography>
                        </Box>
                        <Typography variant="body2">
                          Passe dein Konto und die App-Einstellungen an.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                
                <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
                  Tipps für den Einstieg
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Beginne mit dem Dashboard" 
                      secondary="Verschaffe dir einen Überblick über deine finanzielle Situation."
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Erfasse deine Transaktionen" 
                      secondary="Trage regelmäßig deine Einnahmen und Ausgaben ein, um den Überblick zu behalten."
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <AccountBalanceWalletIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Erstelle Budgets" 
                      secondary="Lege Budgets für verschiedene Kategorien fest, um deine Ausgaben zu kontrollieren."
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <SavingsIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Setze dir Sparziele" 
                      secondary="Definiere konkrete Sparziele und verfolge deinen Fortschritt."
                    />
                  </ListItem>
                </List>
              </Box>
            )}
            
            {/* Dashboard */}
            {activeTab === 1 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Dashboard
                </Typography>
                
                <Typography paragraph>
                  Das Dashboard bietet dir einen schnellen Überblick über deine finanzielle Situation. Hier siehst du deine aktuellen Salden, kürzliche Transaktionen und den Status deiner Budgets.
                </Typography>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Kontostand</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Der Kontostand zeigt dir dein aktuelles Guthaben an. Er berechnet sich aus der Summe aller Einnahmen abzüglich der Summe aller Ausgaben.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Budget-Übersicht</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Die Budget-Übersicht zeigt dir, wie viel du in jeder Kategorie ausgegeben hast und wie viel noch übrig ist. Die Fortschrittsbalken werden rot, wenn du dein Budget überschreitest.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Aktuelle Transaktionen</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Hier siehst du deine neuesten Transaktionen. Klicke auf eine Transaktion, um Details anzuzeigen oder sie zu bearbeiten.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
            
            {/* Budget */}
            {activeTab === 2 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Budget
                </Typography>
                
                <Typography paragraph>
                  Die Budget-Seite hilft dir, deine Ausgaben zu planen und zu kontrollieren. Du kannst Budgets für verschiedene Kategorien erstellen und deinen Fortschritt verfolgen.
                </Typography>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Budget erstellen</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography paragraph>
                      Um ein neues Budget zu erstellen:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="1. Klicke auf 'Neues Budget'" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="2. Wähle eine Kategorie aus oder erstelle eine neue" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="3. Gib den Budgetbetrag ein" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="4. Wähle den Zeitraum (monatlich, wöchentlich, etc.)" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="5. Klicke auf 'Speichern'" />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Budget bearbeiten</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Um ein bestehendes Budget zu bearbeiten, klicke auf das Bearbeiten-Symbol neben dem Budget. Du kannst den Betrag, die Kategorie oder den Zeitraum ändern.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Budget-Fortschritt</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Der Fortschrittsbalken zeigt dir, wie viel deines Budgets du bereits ausgegeben hast. Grün bedeutet, dass du noch im Rahmen bist, gelb bedeutet, dass du fast am Limit bist, und rot bedeutet, dass du dein Budget überschritten hast.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
            
            {/* Transaktionen */}
            {activeTab === 3 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Transaktionen
                </Typography>
                
                <Typography paragraph>
                  Auf der Transaktionsseite kannst du deine Einnahmen und Ausgaben erfassen und verwalten. Du kannst Transaktionen hinzufügen, bearbeiten, filtern und kategorisieren.
                </Typography>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Transaktion hinzufügen</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography paragraph>
                      Um eine neue Transaktion hinzuzufügen:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="1. Klicke auf 'Neue Transaktion'" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="2. Wähle den Typ (Einnahme oder Ausgabe)" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="3. Gib den Betrag ein" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="4. Wähle eine Kategorie" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="5. Füge eine Beschreibung hinzu (optional)" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="6. Wähle das Datum" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="7. Klicke auf 'Speichern'" />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Transaktionen filtern</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Du kannst Transaktionen nach Datum, Kategorie, Betrag oder Typ filtern. Verwende die Filteroptionen am oberen Rand der Transaktionsliste.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Transaktion bearbeiten oder löschen</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Um eine Transaktion zu bearbeiten oder zu löschen, klicke auf das entsprechende Symbol neben der Transaktion. Du kannst alle Details einer Transaktion ändern oder sie vollständig löschen.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
            
            {/* Sparziele */}
            {activeTab === 4 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Sparziele
                </Typography>
                
                <Typography paragraph>
                  Mit Sparzielen kannst du für bestimmte Ziele sparen und deinen Fortschritt verfolgen. Du kannst mehrere Sparziele mit unterschiedlichen Beträgen und Fristen erstellen.
                </Typography>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Sparziel erstellen</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography paragraph>
                      Um ein neues Sparziel zu erstellen:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="1. Klicke auf 'Neues Sparziel'" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="2. Gib einen Namen für dein Sparziel ein" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="3. Lege den Zielbetrag fest" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="4. Gib an, wie viel du bereits gespart hast (falls zutreffend)" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="5. Wähle ein Zieldatum" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="6. Klicke auf 'Hinzufügen'" />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Fortschritt verfolgen</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Der Fortschrittsbalken zeigt dir, wie viel du bereits für dein Ziel gespart hast. Du siehst auch, wie viel du noch sparen musst und wie viel du monatlich zurücklegen solltest, um dein Ziel bis zum Zieldatum zu erreichen.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Sparziel aktualisieren</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Um den aktuellen Betrag deines Sparziels zu aktualisieren, klicke auf das Bearbeiten-Symbol neben dem Sparziel. Du kannst den aktuellen Betrag, den Zielbetrag oder das Zieldatum ändern.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
            
            {/* Berichte */}
            {activeTab === 5 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Berichte
                </Typography>
                
                <Typography paragraph>
                  Die Berichte-Seite bietet dir visuelle Darstellungen deiner Finanzen. Du kannst verschiedene Diagramme und Statistiken anzeigen, um deine Einnahmen, Ausgaben und Budgets zu analysieren.
                </Typography>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Einnahmen vs. Ausgaben</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Dieses Diagramm zeigt dir deine Einnahmen und Ausgaben im Vergleich. Du kannst sehen, ob du mehr ausgibst als du einnimmst, und wie sich das Verhältnis über die Zeit entwickelt.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Ausgaben nach Kategorie</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Dieses Tortendiagramm zeigt dir, wie sich deine Ausgaben auf verschiedene Kategorien verteilen. Du kannst sehen, in welchen Bereichen du am meisten ausgibst.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Zeitraum ändern</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Du kannst den Zeitraum für die Berichte ändern, um Daten für verschiedene Perioden anzuzeigen. Wähle zwischen dem letzten Monat, den letzten 3 Monaten, den letzten 6 Monaten oder dem letzten Jahr.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
            
            {/* Einstellungen */}
            {activeTab === 6 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Einstellungen
                </Typography>
                
                <Typography paragraph>
                  Auf der Einstellungsseite kannst du dein Konto und die App-Einstellungen anpassen. Du kannst deinen Benutzernamen ändern, dein Passwort aktualisieren und das Erscheinungsbild der App anpassen.
                </Typography>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Benutzername ändern</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography paragraph>
                      Um deinen Benutzernamen zu ändern:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="1. Gehe zum Tab 'Benutzername'" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="2. Gib deinen neuen Benutzernamen ein" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="3. Gib dein Passwort zur Bestätigung ein" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="4. Klicke auf 'Benutzername ändern'" />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Passwort ändern</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography paragraph>
                      Um dein Passwort zu ändern:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="1. Gehe zum Tab 'Passwort'" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="2. Gib dein aktuelles Passwort ein" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="3. Gib dein neues Passwort ein" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="4. Bestätige dein neues Passwort" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="5. Klicke auf 'Passwort ändern'" />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Abmelden</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Um dich von der App abzumelden, klicke auf das Benutzer-Symbol in der oberen rechten Ecke und wähle "Abmelden" aus dem Menü. Du wirst zur Login-Seite weitergeleitet.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
          </Box>
        </Paper>
        
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Häufig gestellte Fragen (FAQ)
          </Typography>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Sind meine Daten sicher?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Ja, deine Daten werden lokal auf deinem Gerät gespeichert und nicht an externe Server gesendet. Wir empfehlen dir dennoch, regelmäßig Backups zu erstellen, indem du deine Daten exportierst.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Kann ich meine Daten zwischen Geräten synchronisieren?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                In der aktuellen Version ist keine automatische Synchronisierung verfügbar. Du kannst jedoch deine Daten exportieren und auf einem anderen Gerät importieren.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Wie kann ich ein Konto löschen?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Um dein Konto zu löschen, kontaktiere bitte den Support. In einer zukünftigen Version wird diese Funktion direkt in den Einstellungen verfügbar sein.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Box>
    </Container>
  );
}

export default Help;
