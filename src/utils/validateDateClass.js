class DateValidator {
  constructor(dateString) {
    const [day, month, year] = dateString.split('/');

    const formattedDateString = `${year}-${month?.padStart(2, '0')}-${day?.padStart(2, '0')}`;
    this.dateString = formattedDateString;
    this.year = parseInt(year, 10);
    this.month = parseInt(month, 10);
    this.day = parseInt(day, 10);
  }

  isLeapYear() {
    const isLeapYear = (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0;
    const daysInFebruary = isLeapYear ? 29 : 28;

    if (this.month === 2) {
      return this.day >= 1 && this.day <= daysInFebruary;
    }
    return true;
  }

  isValidDate() {
    const date = new Date(this.dateString);

    const daysInMonth = new Date(this.year, this.month, 0).getDate();

    if (isNaN(this.day) || isNaN(this.month) || isNaN(this.year)) {
      return false;
    }

    return (
      date instanceof Date &&
      !isNaN(date) &&
      date.getDate() === this.day &&
      date.getMonth() + 1 === this.month && // Month is 0-indexed in JavaScript Date objects
      date.getFullYear() === this.year &&
      this.day >= 1 &&
      this.day <= daysInMonth
    );
  }

  isInThePast() {
    const date = new Date(this.dateString);
    const currentDate = new Date();
    //set time to  00:00:00 for even comparison(only dates)
    currentDate.setHours(0, 0, 0, 0);

    date.setHours(0, 0, 0, 0);
    return date < currentDate;
  }
}

export default DateValidator;
