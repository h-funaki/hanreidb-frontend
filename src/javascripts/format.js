export default class Format {



  formatToJsonDate(dateString) {
    if (!dateString) {
      return null;
    }
    const date = new Date(dateString);
    return date.getFullYear() +
            '-' + this.pad(date.getMonth() + 1) +
            '-' + this.pad(date.getDate());
  }

  formatToJsonInteger(numberStr) {
    if (numberStr == null || numberStr == '') {
      return null;
    } else if (!isNaN(numberStr)) {
      return Number(numberStr);
    } else {
      return new Error('cannot parse ' + numberStr + ' to integer');
    }
  }

  pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }
}