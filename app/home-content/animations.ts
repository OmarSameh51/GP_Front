export const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: EASE },
  }),
}

export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

export const inView = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: EASE } },
})
