
const categoryStrings = (category: number) => {
    switch (category) {
        case 1:
            return "science";
        case 2:
            return "football";
        case 3:
            return "current-affairs";
        case 4:
            return "geography";
        case 5:
            return "nollywood";
        case 6:
            return "music";
        case 7:
            return "religion:christianity";
        case 8:
            return "religion:islam";
        case 9:
            return "science";
        case 10:
            return "general_knowledge";
        case 11:
            return "geography";
        case 12:
            return "sport_and_leisure";
        case 13:
            return "society_and_culture";
        default:
            return "";
    }
  }

  export default categoryStrings;