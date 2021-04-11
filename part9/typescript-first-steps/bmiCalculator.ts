export default function calculateBmi(h: number, w: number): string {
  const bmi = w / Math.pow(h/100,2)
  if (bmi < 18.5) {
    return 'Underweight '
  } else if (bmi <= 25) {
    return 'Normal (healthy weight)'
  } else if (bmi <= 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

interface IBmiArguments {
  heigth: number
  weight: number
}

const parseArgunments = (args: string[]): IBmiArguments => {
  if(!args[2]) throw new Error("Missing first param 'heigth'.");
  if(isNaN(Number(args[2]))){
    throw new Error("First param is not a valid number: " + args[2]);
  }

  if(!args[3]) throw new Error("Missing second param 'weight'.");
  if(isNaN(Number(args[3]))){
    throw new Error("Second param is not a valid number: " + args[3]);
  }

  return {
    heigth: Number(args[2]),
    weight: Number(args[3])
  }
}

try {
  const { heigth, weight } = parseArgunments(process.argv);
  console.log(calculateBmi(heigth, weight))
} catch (e) {
  console.log('Something went wrong:', e.message);
}