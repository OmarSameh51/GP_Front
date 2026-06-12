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

export type AIAdvicePlanCourse = {
  courseCode: string
  courseName: string
  creditHours: number
}

export type AIAdviceResponse = {
  plan: AIAdvicePlanCourse[]
  notes: string
  totalSuggestedCredits: number
  remainingHoursToGraduate: number
  currentGPA: number | null
  candidatesConsidered: number
  aiUsed: boolean
}

export type GuestAdvicePassedCourse = {
  courseCode: string
  grade?: number
  isPassed?: boolean
}

export type GuestAdviceRequest = {
  department: "AI" | "CS" | "IT" | "IS" | "General"
  academicYear: 1 | 2 | 3 | 4
  preferredDepartment?: "AI" | "CS" | "IT" | "IS" | "General"
  semester?: 1 | 2
  passedCourses?: GuestAdvicePassedCourse[]
}

export type RoadmapTerm = {
  academicYear: number
  semester: number
  courses: AIAdvicePlanCourse[]
  credits: number
  overflow?: boolean
}

export type RoadmapResponse = {
  terms: RoadmapTerm[]
  totalPlannedCredits: number
  remainingHoursToGraduate: number
  remainingAfterPlan: number
  currentGPA: number | null
  notes: string
}

export type CourseSearchResult = {
  Code: string
  name: string
  Credits: number
  Required_level: number
  Semester: number
  isActive: boolean
}

export type GpaForecast = {
  forecastGPA: number
  currentGPA: number
  completedCredits: number
  remainingCredits: number
  sampleSize: number
  aiUsed: boolean
}

export type GradePrediction = {
  predictedFinal: number
  finalMax: number
  predictedTotal: number
  letter: string
  gradePoints: number
  passLikely: boolean
}

export type SummaryListItem = {
  _id: string
  title: string
  createdAt: string
  updatedAt: string
}

export type Summary = SummaryListItem & {
  lectureText: string
  summaryText: string
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

export type AnnouncementType =
  | "COURSE_CREATED"
  | "COURSE_UPDATED"
  | "COURSE_ACTIVATED"
  | "COURSE_DEACTIVATED"
  | "PREREQUISITE_ADDED"
  | "PREREQUISITE_REMOVED"

export type Announcement = {
  id: string
  type: AnnouncementType
  courseCode: string
  summary: string
  details: Record<string, unknown>
  adminId: string | null
  adminUsername: string | null
  createdAt: string
}

export type AnnouncementsResponse = {
  count: number
  offset: number
  limit: number
  announcements: Announcement[]
}
