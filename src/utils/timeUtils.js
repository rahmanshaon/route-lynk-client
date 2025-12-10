// Existing 12h converter
export const convertTo12Hour = (time24) => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  let h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  h = h ? h : 12;
  return `${String(h).padStart(2, "0")}:${minutes} ${ampm}`;
};

// Convert 12h to 24h for Input Field
export const convertTo24Hour = (time12) => {
  if (!time12) return "";

  // Check if it's already 24h
  if (!time12.includes("AM") && !time12.includes("PM")) return time12;

  const [time, modifier] = time12.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};
