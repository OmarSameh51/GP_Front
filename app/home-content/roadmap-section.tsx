"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { SEMESTERS, semStyle } from "./data"
import { EASE, inView } from "./animations"

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={inView(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Curriculum Roadmap
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your entire CS degree, mapped.
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Every course, every prerequisite, every semester — visualized from year one
            to graduation. Know exactly what comes next, and why.
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-4">
          <div className="flex min-w-[700px] gap-4">
            {SEMESTERS.map((sem, si) => {
              const s = semStyle[sem.status]
              const filled = sem.status === "done" ? 100 : sem.status === "active" ? 55 : 0
              return (
                <motion.div
                  key={sem.num}
                  variants={inView(si * 0.08)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex-1"
                >
                  <div className={`rounded-t-xl border border-b-0 ${s.ring} bg-card p-4`}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${s.badge}`}>
                        {sem.status === "done" ? "Completed" : sem.status === "active" ? "In Progress" : "Upcoming"}
                      </span>
                      {sem.gpa && (
                        <span className="font-mono text-xs font-semibold text-success">
                          {sem.gpa} GPA
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-foreground">{sem.label}</p>
                    <p className="text-xs text-muted-foreground">{sem.credits} credits</p>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${filled}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + si * 0.1, ease: EASE }}
                        className={`h-full rounded-full ${s.bar}`}
                      />
                    </div>
                  </div>

                  <div className={`divide-y divide-border/40 rounded-b-xl border border-t border-t-border/40 ${s.ring} bg-card`}>
                    {sem.courses.map((course) => (
                      <div key={course.code} className="flex items-center gap-2 px-4 py-2.5">
                        <span className={`mt-px size-1.5 shrink-0 rounded-full ${s.dot}`} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-foreground">{course.name}</p>
                          <p className="font-mono text-[10px] text-muted-foreground">{course.code}</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{course.credits}cr</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          variants={inView(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"
        >
          <ChevronRight className="size-3.5" />
          <span>Semesters 5–8 continue with AI, distributed systems, and specialization tracks.</span>
        </motion.div>
      </div>
    </section>
  )
}
