   //find difference between game duration and submission time
   const timeDiffCalculator = (gameDuration: number, submitTime: number) => {
    const gameDurationInSec = gameDuration * 60;
    const submitTimeInSec = submitTime;

    const completionTimeInSec = gameDurationInSec - submitTimeInSec; 
    
    const minutes = Math.floor(completionTimeInSec / 60);
    const seconds = completionTimeInSec % 60

    const padTo2Digits = (num: number) => {
      return num.toString().padStart(2, '0');
    }

    //format as mm:ss
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`; 
  }

  export default timeDiffCalculator;
