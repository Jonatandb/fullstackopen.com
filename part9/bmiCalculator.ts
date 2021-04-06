function calculateBmi(h: number, w: number): string {
  const bmi = w / ((h/100) ** (h/100))

  if (bmi < 18.5) {
    return 'Underweight '
  } else if (bmi >= 18.5 && bmi <= 26) {
    return 'Normal (healthy weight)'
  } else if (bmi > 26 && bmi <= 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

console.log(calculateBmi(180, 74))