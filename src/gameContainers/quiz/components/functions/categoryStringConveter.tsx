
const categoryStrings = (category: number) => {
    switch (category) {
        case 1:
            return "football";
        case 2:
            return "Arts & Literature";
        case 3:
            return "Film & TV";
        case 4:
            return "Food & Drink";
        case 5:
            return "General Knowledge";
        case 6:
            return "Geography";
        case 7:
            return  "History";
        case 8:
            return  "Music";
        case 9:
            return "Science";
        case 10:
            return "Society & Culture";
        case 11:
            return "Sports & Leisure";
        default:
            return "";
    }
  }
 


  export default categoryStrings;