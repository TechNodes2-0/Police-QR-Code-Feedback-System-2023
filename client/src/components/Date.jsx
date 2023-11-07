import React from 'react';

const DateConvert = ({ dateObj }) => {
  // Extract year, month, and day from the dateObj
  const { year, month, day } = dateObj;

  // Convert month number to its corresponding name (e.g., 1 to 'Jan')
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const formattedMonth = monthNames[month - 1];

  // Format the day with the appropriate suffix (e.g., 1st, 2nd, 3rd, 4th, etc.)
  const formattedDay = `${day}${getDaySuffix(day)}`;

  // Combine the formatted parts to create the "4th Nov" format
  const formattedDate = `${formattedDay} ${formattedMonth}`;

  return formattedDate;
};

// Helper function to get the appropriate day suffix (e.g., 1st, 2nd, 3rd, 4th, etc.)
const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export default DateConvert;
