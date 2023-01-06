import { movies, church, news, culture, rocket, geography, general, custom, basket, soccer, music } from '../../assets/images'



const imagePicker = (category: string) => {
    switch (category) {
      case "football":
        return soccer;
      case "current-affairs":
        return news;
        case "nollywood":
            return movies;
        case "music":
            return music;
        case "religion:christianity":
            return church;
        case "science":
        return rocket;
        case "general_knowledge":
        return general;
        case "sport_and_leisure":
            return basket;
        case "geography":
            return geography;
        case "society_and_culture":
            return culture;
        default:
            return custom;
    }
  }

  export default imagePicker;