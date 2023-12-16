function getDaysLeft(targetDate: Date) {
    const currentDate = new Date(); // Current date
    const eventDate = new Date(targetDate); // Target date (e.g., event date)
  
    // Convert both dates to timestamps
    const currentTimestamp = currentDate.getTime();
    const eventTimestamp = eventDate.getTime();
  
    // Calculate the difference in milliseconds between the two timestamps
    const differenceMs = eventTimestamp - currentTimestamp;
  
    // Convert milliseconds to days
    const daysLeft = Math.ceil(differenceMs / (1000 * 60 * 60 * 24)); // 1 day = 24 hours * 60 mins * 60 secs * 1000 milliseconds
  
    return daysLeft;
  }
  export default getDaysLeft;