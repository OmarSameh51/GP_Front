import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { GraduationCap, BookOpen, Brain, TrendingUp, ArrowLeft } from "lucide-react"

function AuthSidebar() {
  const t = useTranslations("authLayout")

  const features = [
    { icon: BookOpen, text: t("courses") },
    { icon: TrendingUp, text: t("gpa") },
    { icon: Brain, text: t("ai") },
  ]

  const miniStats = [
    { value: "120+", label: t("statCourses") },
    { value: "144", label: t("statCredits") },
    { value: "8", label: t("statSemesters") },
  ]

  return (
    <div className="sticky top-0 hidden h-screen w-[460px] shrink-0 flex-col justify-between overflow-hidden border-e border-border bg-card px-10 py-10 lg:flex">
      <div className="pointer-events-none absolute -start-24 -top-24 size-96 rounded-full bg-primary/8 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 end-0 size-64 rounded-full bg-primary/5 blur-[80px]" />

      <Link href="/" className="relative flex items-center gap-2 text-sm font-semibold text-foreground">
        <GraduationCap className="size-5 text-primary" />
        {t("faculty").split("·")[0].trim()}
      </Link>

      <div className="relative space-y-8">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t("faculty")}
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
            {t("headline")}
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t("desc")}
          </p>
        </div>

        <div className="space-y-3">
          {features.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3">
              <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <Icon className="size-3.5 text-primary" />
              </div>
              <p className="text-sm text-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
          {miniStats.map(({ value, label }) => (
            <div key={label} className="bg-background px-4 py-3 text-center">
              <p className="text-lg font-bold tabular-nums text-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="relative text-xs text-muted-foreground">{t("footer")}</p>
    </div>
  )
}

function MobileAuthHeader() {
  const t = useTranslations("authLayout")
  return (
    <div className="mb-8 flex items-center justify-between lg:hidden">
      <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <GraduationCap className="size-5 text-primary" />
        Helwan CS
      </Link>
      <Link href="/" className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="size-3.5 rtl:rotate-180" />
        {t("backHome")}
      </Link>
    </div>
  )
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AuthSidebar />
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-12">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-[80px] lg:hidden" />
        <div className="w-full max-w-sm">
          <MobileAuthHeader />
          {children}
        </div>
      </div>
    </div>
  )
}
