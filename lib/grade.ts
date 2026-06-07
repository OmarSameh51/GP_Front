type GradeInfo = { letter: string; points: number }

export function gradeToInfo(grade: number): GradeInfo {
  if (grade >= 90) return { letter: "A+", points: 4.0 }
  if (grade >= 85) return { letter: "A", points: 3.75 }
  if (grade >= 80) return { letter: "B+", points: 3.4 }
  if (grade >= 75) return { letter: "B", points: 3.1 }
  if (grade >= 70) return { letter: "C+", points: 2.8 }
  if (grade >= 65) return { letter: "C", points: 2.5 }
  if (grade >= 60) return { letter: "D+", points: 2.25 }
  if (grade >= 50) return { letter: "D", points: 2.0 }
  return { letter: "F", points: 1.0 }
}

export function gradeToLetter(grade: number): string {
  return gradeToInfo(grade).letter
}
