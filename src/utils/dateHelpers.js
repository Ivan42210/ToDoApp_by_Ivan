// Formater une date
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: 'short',
    year: 'numeric'
  });
};

// Vérifier si une date est aujourd'hui
export const isToday = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

// Vérifier si une date est dépassée
export const isOverdue = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

// Vérifier si une date est dans les 7 prochains jours
export const isUpcoming = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  today.setHours(0, 0, 0, 0);
  return date >= today && date <= nextWeek;
};

// Obtenir la date relative (Aujourd'hui, Demain, etc.)
export const getRelativeDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  
  if (date.getTime() === today.getTime()) return "Aujourd'hui";
  if (date.getTime() === tomorrow.getTime()) return "Demain";
  if (date < today) return "En retard";
  
  return formatDate(dateString);
};