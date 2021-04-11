
type Rate = 1 | 2 | 3;

type Result = {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: Rate,
  ratingDescription: string
};

type DailyExcerciseHours = Array<string>;

interface IRatingData {
  rating: Rate
  ratingDescription: string
}

const  getRating = (target: number, average: number) : IRatingData => {
  let rating: Rate
  let ratingDescription
  const diff = target - average

  if(diff<= 0){
    rating = 1
    ratingDescription = "Very good!"
  } else if(diff <= 0.30) {
    rating = 2
    ratingDescription = "Not too bad, but could be better"
  } else {
    rating = 3
    ratingDescription = "Definitely you should train more..."
  }

  return { rating, ratingDescription }
}

const calculateExercises = (dailyExcerciseHours: DailyExcerciseHours, target: number): Result => {
  const average = dailyExcerciseHours.reduce((acc, h) => acc + Number(h), 0) / dailyExcerciseHours.length
  const { rating, ratingDescription } = getRating(target, average)

  return {
    periodLength: dailyExcerciseHours.length,
    trainingDays: dailyExcerciseHours.filter(hours => Number(hours) > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  }
}

interface ICalculateExercisesArguments {
  target: number
  hoursByDay: Array<string>
}

const parseParams = (args: Array<string>): ICalculateExercisesArguments => {
    if(!args[2]) throw new Error("Missing required first param 'target'.");
    if(isNaN(Number(args[2]))){
      throw new Error("First param is not a valid number: " + args[2]);
    }

    if(!args.slice(3).length) throw new Error("Missing required params 'hoursByDay' (list of numbers separated by spaces).");
    if(args.slice(3).some(p => isNaN(Number(p)))){
      throw new Error("hoursByDay only can be a list of numbers separated by spaces: " + args.slice(3));
    }

    return {
      target: Number(args[2]),
      hoursByDay: args.slice(3)
    }
}

try {
  const { target, hoursByDay } = parseParams(process.argv);
  console.log(JSON.stringify(calculateExercises(hoursByDay, target), null, 2))
} catch (e) {
  console.log('Something went wrong:', e.message);
}

