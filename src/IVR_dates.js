const ivr_holiday_dates = require("date-holidays");
const clipboardy = require("clipboardy");

function get_ivr_date() {
  var ivr_date = new Date();
  let adjustment = "";
  // Short Circuit if today is a Tuesday
  // --> No IVR's on Tuesdays
  if (ivr_date.getDay() == 2) {
    console.log("No IVR's on Tuesdays");
    alert("No IVR's on Tuesdays")
    return;
  }

  var waiting_period = 0;

  // Initialize holiday dates
  var holidays = new ivr_holiday_dates();
  holidays.init("CA", "ON");
  const opts = {
    types: "public"
  };

  function increment_date(date, num) {
    date.setDate(date.getDate() + num);
  }

  // Checks if date is a business day
  function is_bus(date) {
    var d = date.getDay();
    if (d == 0 || d == 6 || holidays.isHoliday(date)) {
      return false;
    } else {
      return true;
    }
  }

  // Set end date of waiting_period timeline
  while (waiting_period < 3) {
    increment_date(ivr_date, 1);
    if (is_bus(ivr_date)) {
      //increment waiting period
      waiting_period++;
    } else {
      let x = holidays.isHoliday(ivr_date);
      if (x) {
        console.log("\nDates adjusted for " + x.name);
        adjustment = "\nDates adjusted for " + x.name;
      }
    }
  }

  // Prepend "0" if necessary
  let month = ivr_date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month.toString();
  }

  let year = ivr_date.getFullYear() % 100;

  // Prepend "0" if necessary
  let day = ivr_date.getDate();
  if (day < 10) {
      day = "0" + day.toString();
  }

  // Format date as yymmdd for excel
  let formatted_date = year + month + day;

  // Copy date and print to console for verification
  clipboardy.writeSync(formatted_date);
  alert(
    "\nIVR Date is " + formatted_date + adjustment + "\n\nDate copied to clipboard!"
  );
}
