
const categoryStrings = (category: number) => {
    switch (category) {
      case 1:
        return "football";
      case 2:
        return "current-affairs";
        case 3:
            return "nollywood";
        case 4:
            return "music";
        case 5:
            return "gossip/gist";
        case 6:
            return "religion";
        case 7:
        return "science";
        case 8:
        return "general_knowledge";
        case 9:
            return "sport_and_leisure";
        case 10:
            return "geography";
        case 11:
            return "society_and_culture";
        default:
            return "";
    }
  }

  export default categoryStrings;