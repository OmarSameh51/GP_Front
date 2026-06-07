export type Role = "student" | "admin" | "super_admin"

export type EnrolledCourse = {
  _id: string
  courseCode: string
  courseName: string
  creditHours: number
  grade: number
  isPassed: boolean
  gradePoints: number
}

export type AIPlanCourse = {
  courseCode: string
  courseName: string
  creditHours: number
}

export type AIPlan = {
  plan: AIPlanCourse[]
  updatedAt?: string
  createdAt?: string
}

export type UserProfile = {
  _id: string
  studentId: string
  firstName: string
  lastName: string
  username: string
  email: string
  role: Role
  academicYear: number
  department: string
  preferredDepartment: string
  gpa: number
  totalCreditHours: number
  enrolledCourses: EnrolledCourse[]
  AI_plan?: AIPlan
  phoneNumber?: string
  createdAt: string
  updatedAt: string
}

export type Course = {
  Code: string
  name: string
  Credits: number
  Semester: number
  Required_level: number
  Required_Hours: number
  isActive: boolean
}

export type CourseRelations = {
  courseCode: string
  prerequisites: Course[]
  unlocks: Course[]
}

export type AdminUser = {
  _id: string
  firstName: string
  lastName: string
  username: string
  email: string
  role: Role
  phoneNumber?: string
  createdAt: string
}
