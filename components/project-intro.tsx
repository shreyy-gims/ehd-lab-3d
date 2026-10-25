
"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Layers3,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"

interface ProjectIntroProps {
  onEnter: () => void
}

const members = [
  {
    name: "Ishita Karkun",
    register: "RA2611005010171",
    initials: "IK",
  },
  {
    name: "Amish Anand Dias",
    register: "RA2611005010172",
    initials: "AD",
  },
  {
    name: "Kesireddy Akkash Reddy",
    register: "RA2611005010173",
    initials: "KR",
  },
  {
    name: "Sreepriya Satheesh",
    register: "RA2611005010174",
    initials: "SS",
  },
  {
    name: "Krithik Kumar",
    register: "RA2611005010175",
    initials: "KK",
  },
]

const steps = ["Introduction", "Our Team", "Project Overview"]

export default function ProjectIntro({
  onEnter,
}: ProjectIntroProps) {
  const [step, setStep] = useState(0)

  const next = () =>
    setStep((current) => Math.min(current + 1, 2))

  const previous = () =>
    setStep((current) => Math.max(current - 1, 0))

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#060d18] text-white">
      {/* Subtle animated background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="intro-glow absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-blue-700/10 blur-[110px]" />
        <div className="intro-glow-delayed absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[110px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 35%, transparent)",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.07]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
              <Atom className="h-5 w-5 text-cyan-300" />
            </div>

            <div>
              <p className="text-sm font-bold tracking-wide">
                EHD-LAB 3D
              </p>
              <p className="text-[10px] tracking-widest text-slate-500">
                VIRTUAL PHYSICS LABORATORY
              </p>
            </div>
          </div>

          <span className="hidden rounded-full border border-white/10 px-4 py-2 text-[11px] tracking-wider text-slate-400 sm:block">
            ACADEMIC MINI PROJECT
          </span>
        </div>
      </header>

      {/* Main slide */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-12 sm:px-8">
        <div key={step} className="intro-enter">
          {step === 0 && (
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              {/* College branding */}
              <div className="intro-logo mb-9 flex h-32 w-44 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-3 shadow-[0_0_70px_rgba(56,189,248,0.08)] sm:h-36 sm:w-56">
                <Image
                  src="/srm-logo.png"
                  alt="SRM Institute of Science and Technology logo"
                  width={220}
                  height={220}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 sm:tracking-[0.3em]">
                College of Engineering & Technology
              </p>

              <p className="max-w-2xl text-sm leading-6 text-slate-400">
                SRM Institute of Science and Technology
                <span className="block text-xs text-slate-500">
                  Kattankulathur, Chengalpattu, Tamil Nadu
                </span>
              </p>

              <div className="my-9 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

              <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                Presenting
              </p>

              <h1 className="text-5xl font-black tracking-[-0.05em] sm:text-7xl md:text-8xl">
                EHD
                <span className="text-cyan-400">-</span>
                LAB 3D
              </h1>

              <p className="mt-5 text-base font-medium text-slate-200 sm:text-xl">
                Ionic Wind Propulsion
              </p>

              <p className="mt-1 text-sm text-slate-400">
                An Interactive Virtual Physics Laboratory
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-2">
                {[
                  "B.Tech EEE",
                  "Section C",
                  "Physics Mini Project",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs text-slate-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="mx-auto max-w-5xl">
              <div className="mb-10 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-300">
                  <Users className="h-4 w-4" />
                  THE PEOPLE BEHIND THE PROJECT
                </div>

                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Meet Our Team
                </h2>

                <p className="mt-3 text-sm text-slate-400">
                  B.Tech Electrical & Electronics Engineering
                  <span className="mx-2 text-slate-600">•</span>
                  Section C
                </p>
              </div>

              {/* Team cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member, index) => (
                  <div
                    key={member.register}
                    className="intro-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.055]"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="mb-6 flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-lg font-bold text-cyan-300">
                        {member.initials}
                      </div>

                      <span className="text-xs text-slate-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold tracking-tight">
                      {member.name}
                    </h3>

                    <p className="mt-2 text-xs text-slate-400">
                      {member.register}
                    </p>

                    <div className="mt-5 border-t border-white/[0.07] pt-4">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500">
                        B.Tech EEE · Section C
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Faculty */}
              <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.035] p-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                    <GraduationCap className="h-6 w-6 text-cyan-300" />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-400">
                      Faculty In-Charge
                    </p>

                    <h3 className="mt-1 text-lg font-semibold">
                      Dr. Sujit Kumar
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Department of Physics and Nanotechnology
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-400">
                  SRM IST
                </span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs text-cyan-300">
                  <BookOpen className="h-4 w-4" />
                  PROJECT OVERVIEW
                </div>

                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  The Science of
                  <span className="block text-cyan-400">
                    Ionic Wind
                  </span>
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400">
                  Electrohydrodynamic propulsion uses
                  electric forces acting on charged particles
                  to transfer momentum to surrounding air.
                  Explore the concept through an interactive
                  three-dimensional educational model.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
                    <Zap className="h-6 w-6 text-cyan-300" />
                  </div>

                  <h3 className="text-lg font-semibold">
                    Ion Generation
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Learn how corona discharge can produce
                    charged particles near an emitter.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
                    <Layers3 className="h-6 w-6 text-cyan-300" />
                  </div>

                  <h3 className="text-lg font-semibold">
                    Multi-Stage Thruster
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Inspect electrode arrangements,
                    ion motion and illustrative airflow
                    in an interactive 3D model.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
                    <Atom className="h-6 w-6 text-cyan-300" />
                  </div>

                  <h3 className="text-lg font-semibold">
                    Virtual Experiments
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Change model parameters, estimate
                    ideal thrust and compare theoretical
                    experiment results.
                  </p>
                </div>
              </div>

              <p className="mt-7 text-center text-xs text-slate-500">
                Educational visualization · Simplified theoretical model
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <footer className="relative z-10 border-t border-white/[0.07]">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div className="flex items-center gap-2">
            {steps.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(index)}
                aria-label={`Go to ${label}`}
                aria-current={step === index ? "step" : undefined}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  step === index
                    ? "w-10 bg-cyan-400"
                    : "w-5 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            ))}

            <span className="ml-3 text-xs text-slate-500">
              {String(step + 1).padStart(2, "0")} / 03
            </span>
          </div>

          <div className="flex items-center gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={previous}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 transition hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}

            {step < 2 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-3 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.98]"
              >
                {step === 0 ? "Meet the Team" : "Continue"}
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onEnter}
                className="inline-flex items-center gap-3 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.98]"
              >
                Enter 3D Laboratory
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </footer>

      <style jsx>{`
        .intro-enter {
          animation: introFade 650ms cubic-bezier(0.2, 0.8, 0.2, 1)
            both;
        }

        .intro-logo {
          animation: logoAppear 900ms ease-out both;
        }

        .intro-card {
          animation: introFade 600ms ease-out both;
        }

        .intro-glow {
          animation: floatGlow 9s ease-in-out infinite alternate;
        }

        .intro-glow-delayed {
          animation: floatGlow 12s ease-in-out infinite
            alternate-reverse;
        }

        @keyframes introFade {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes logoAppear {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes floatGlow {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(50px, -30px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-enter,
          .intro-logo,
          .intro-card,
          .intro-glow,
          .intro-glow-delayed {
            animation: none;
          }
        }
      `}</style>
    </main>
  )
}
