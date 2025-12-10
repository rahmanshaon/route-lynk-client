export const formatDate = (dateString, includeTime = false) => {
  if (!dateString) return "N/A";
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return new Date(dateString).toLocaleDateString("en-US", options);
};