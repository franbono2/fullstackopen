
const calculateBMI = (height: number, weight: number) => {
  const height_M = height / 100
  const BMI = weight / (height_M * height_M)
  if (BMI < 18.5) return "Thinness (low weight)"
  if (BMI >= 18.5 && BMI < 25) return "Normal (healthy weight)"
  if (BMI >= 25 && BMI < 30) return "Overweight (unhealthy weight)"
  if (BMI >= 30) return "Obesity (unhealthy weight)"
}

console.log(calculateBMI(180, 74))