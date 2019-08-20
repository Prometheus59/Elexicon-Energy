const TinyDatePicker = require('tiny-date-picker');

const dp = TinyDatePicker('#box', {
    appendTo: document.querySelector('#cal'),
    lang: {
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        today: 'Today',
        clear: 'Clear',
        close: 'Close',
      }
});

function show_calendar() {
    dp.open();
}