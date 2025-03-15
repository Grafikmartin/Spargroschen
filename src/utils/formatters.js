// src/utils/formatters.js

/**
 * Formatiert einen Betrag als Währung
 * @param {number} amount - Der zu formatierende Betrag
 * @returns {string} Der formatierte Betrag
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

/**
 * Berechnet den monatlichen Betrag, der gespart werden muss
 * @param {number} remainingAmount - Der noch zu sparende Betrag
 * @param {Date} startDate - Das Startdatum
 * @param {Date} targetDate - Das Zieldatum
 * @returns {number} Der monatliche Betrag
 */
export const calculateMonthlyAmount = (remainingAmount, startDate, targetDate) => {
  // Berechne die Anzahl der Monate zwischen Start- und Zieldatum
  const start = new Date(startDate);
  const target = new Date(targetDate);
  
  // Wenn das Zieldatum in der Vergangenheit liegt, gib den gesamten Betrag zurück
  if (target < start) {
    return remainingAmount;
  }
  
  // Berechne die Differenz in Monaten
  const monthsDiff = (target.getFullYear() - start.getFullYear()) * 12 + 
                     (target.getMonth() - start.getMonth());
  
  // Wenn weniger als ein Monat übrig ist, gib den gesamten Betrag zurück
  if (monthsDiff < 1) {
    return remainingAmount;
  }
  
  // Berechne den monatlichen Betrag
  return remainingAmount / monthsDiff;
};
