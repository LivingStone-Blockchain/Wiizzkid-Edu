type uniqueMonthsType = {
    month: string,
    count: number
}

export const monthLengthIdentifier  = (monthLength: number, uniqueMonths: uniqueMonthsType[]) => {
    switch (monthLength) {
      case 8:
        return uniqueMonths.slice(1);
      case 9:
        return uniqueMonths.slice(2);
        case 10:
            return uniqueMonths.slice(3);
        case 11:
            return uniqueMonths.slice(4);
        case 12:
            return uniqueMonths.slice(5);
        default:
            return uniqueMonths;
    }
  }