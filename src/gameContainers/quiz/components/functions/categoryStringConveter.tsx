
const categoryStrings = (category: number) => {
    switch (category) {
        /*case 1:
            return "football";*/
        case 13:
            return "Arts & Literature";
        case 14:
            return "Film & TV";
        case 15:
            return "Food & Drink";
        case 8:
            return "general_knowledge";
        case 10:
            return "Geography";
        case 16:
            return  "History";
        case 4:
            return  "Music";
        case 7:
            return "Science";
        case 11:
            return "society_and_culture";
        case 9:
            return "sport_and_leisure";
        default:
            return "";
    }
  }
 


  export default categoryStrings;



  /*
  
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
                return "general_knowledge";
            case 6:
                return "Geography";
            case 7:
                return  "History";
            case 8:
                return  "Music";
            case 9:
                return "Science";
            case 10:
                return "society_and_culture";
            case 11:
                return "sport_and_leisure";
            default:
                return "";
        }
      }
  */