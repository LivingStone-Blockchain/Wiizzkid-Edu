import { area, cube, cubes, custom } from '../../assets/images'



const imagePicker = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return cube;
      case "medium":
        return area;
        case "hard":
            return cubes;
        default:
            return custom;
    }
  }

  export default imagePicker;