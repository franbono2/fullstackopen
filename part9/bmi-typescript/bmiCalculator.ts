
interface BMIValues {
  height: number,
  weight: number
}

const calculateBMI = (height: number, weight: number) => {
  const height_M = height / 100
  const BMI = weight / (height_M * height_M)
  if (BMI < 18.5) return "Thinness (low weight)"
  if (BMI >= 18.5 && BMI < 25) return "Normal (healthy weight)"
  if (BMI >= 25 && BMI < 30) return "Overweight (unhealthy weight)"
  if (BMI >= 30) return "Obesity (unhealthy weight)"
}

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Povided values have to be numbers')
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBMI(height, weight))
} catch (error: unknown) {
  let errorMessage = ''
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
