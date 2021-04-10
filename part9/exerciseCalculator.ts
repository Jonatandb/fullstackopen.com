
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

type DailyExcerciseHours = Array<number>;

interface RatingData {
  rating: Rate
  ratingDescription: string
}

const  getRating = (target: number, average: number) : RatingData => {
  let rating: Rate
  let ratingDescription
  const diff = target - average

  if(diff<= 0){
    rating = 1
    ratingDescription = "Very good!"
  } else if(diff <= 0.25) {
    rating = 2
    ratingDescription = "Not too bad, but could be better"
  } else {
    rating = 3
    ratingDescription = "Definetily you should traing more..."
  }

  return { rating, ratingDescription }
}

const calculateExercises = (dailyExcerciseHours: DailyExcerciseHours, target: number): Result => {
  const average = dailyExcerciseHours.reduce((acc, h) => acc + h, 0) / dailyExcerciseHours.length
  const { rating, ratingDescription } = getRating(target, average)

  return {
    periodLength: dailyExcerciseHours.length,
    trainingDays: dailyExcerciseHours.filter(hours => hours > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  }
}

  const dailyExcerciseHours = [3, 0, 2, 4.5, 0, 3, 1]
  const target = 2

console.log(JSON.stringify(calculateExercises(dailyExcerciseHours, target), null, 2))
