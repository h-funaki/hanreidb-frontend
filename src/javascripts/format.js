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

  japaneseDateToWesternDate(era, year, month, day) {
    year = Number(year);
    month = Number(month);
    day = Number(day);

    if (year <= 0) {
      return new Error('year value ' + year + ' is invalid');
    }
    if (month <= 0 || 13 <= month) {
      return new Error('month value ' + month + ' is invalid');
    }
    if (day <= 0 || 32 <= day) {
      return new Error('day value ' + day + ' is invalid');
    }

    if (era == 'SHOWA') {
      if (65 <= year) {
        return new Error('(showa) year value ' + year + ' is invalid');
      }
      year = year + 1925;
    } else if (era == 'HEISEI') {
      if (31 <= year) {
        return new Error('(heisei) year value ' + year + ' is invalid');
      }
      year = year + 1988;
    } else if (era == 'TAISHO') {
      if (17 <= year) {
        return new Error('(taisho) year value ' + year + ' is invalid');
      }
      year = year + 1911;
    } else if (era == 'MEIJI') {
      if (45 <= year) {
        return new Error('(meiji) year value ' + year + ' is invalid');
      }
      year = year + 1867;
    } else {
      return new Error('era value ' + era + ' is invalid');
    }

    return this.formatToJsonDate(year + '/' + month + '/' + day);
  }
}