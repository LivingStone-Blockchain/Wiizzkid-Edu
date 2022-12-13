export const times = (figure: number) => {
    let result = [];
    for (let i = 1; i <= 100; i++) {
       let multiply = figure * i;
       result.push({
        "title": `${figure} * ${i}`,
        "correctAnswer": multiply,
        "difficulty": i <= 20 ? 'Easy' : i <= 50 ? 'Medium' : "Hard",
       })
        console.log(result);
    }
  }

  times(5)