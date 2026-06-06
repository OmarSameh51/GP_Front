"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { AlertCircle, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/lib/axios"

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: EASE },
  }),
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    department: z.string().optional(),
    academicYear: z.string().optional(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type FormValues = z.infer<typeof schema>

export function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [serverError, setServerError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    setServerError("")
    try {
      await api.post("/auth/register", {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email,
        password: values.password,
        username: values.email.split("@")[0],
        ...(values.department && { department: values.department }),
        ...(values.academicYear && { academicYear: Number(values.academicYear) }),
      })
      router.push("/login?registered=true")
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ??
        "Something went wrong. Please try again."
      setServerError(msg)
    }
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={fadeUp} custom={0} className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Faculty of Computer Science — Helwan University
        </p>
      </motion.div>

      <motion.form variants={stagger} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* name row */}
        <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="Ahmed"
              autoComplete="given-name"
              aria-invalid={!!errors.firstName}
              className="h-10"
              {...register("firstName")}
            />
            {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Hassan"
              autoComplete="family-name"
              aria-invalid={!!errors.lastName}
              className="h-10"
              {...register("lastName")}
            />
            {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
          </div>
        </motion.div>

        {/* email */}
        <motion.div variants={fadeUp} custom={2} className="space-y-1.5">
          <Label htmlFor="email">University email</Label>
          <Input
            id="email"
            type="email"
            placeholder="student@helwan.edu.eg"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className="h-10"
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </motion.div>

        {/* password */}
        <motion.div variants={fadeUp} custom={3} className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 6 characters"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              className="h-10 pr-9"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </motion.div>

        {/* confirm password */}
        <motion.div variants={fadeUp} custom={4} className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter password"
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPassword}
              className="h-10 pr-9"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </motion.div>

        {/* optional details */}
        <motion.div variants={fadeUp} custom={5} className="space-y-3 border-t border-border pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Optional details
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="e.g. CS"
                className="h-10"
                {...register("department")}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="academicYear">Year</Label>
              <Input
                id="academicYear"
                type="number"
                min={1}
                max={6}
                placeholder="1–6"
                className="h-10"
                {...register("academicYear")}
              />
            </div>
          </div>
        </motion.div>

        {serverError && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm"
          >
            <AlertCircle className="size-4 shrink-0 text-destructive" />
            <span className="text-destructive">{serverError}</span>
          </motion.div>
        )}

        <motion.div variants={fadeUp} custom={6}>
          <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account…" : <><span>Create Account</span><ArrowRight className="ml-1.5 size-4" /></>}
          </Button>
        </motion.div>
      </motion.form>

      <motion.p variants={fadeUp} custom={7} className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </motion.p>
    </motion.div>
  )
}
