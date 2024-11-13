// src/utils/formatTime.js
export const formatTime = (time) => {
  const [hour, minute] = time.split(":");
  let formattedHour = parseInt(hour, 10);
  const ampm = formattedHour >= 12 ? "PM" : "AM";

  if (formattedHour > 12) {
    formattedHour -= 12;
  } else if (formattedHour === 0) {
    formattedHour = 12;
  }

  const formattedMinute = minute.padStart(2, "0");
  return `${formattedHour}:${formattedMinute} ${ampm}`;
};



export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };
  
