"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { HelpCircle, Info } from "lucide-react"
import { TooltipProvider } from "react-tooltip"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { QUIZ_QUESTIONS } from "@/lib/quiz-data"
import { calculateRecommendedTier } from "@/lib/quiz-scoring"
import { getSupabaseClient } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"

interface QuizAnswers {
  [key: string]: string | string[]
}

interface FormState {
  firstName: string
  email: string
  phone: string
  scheduleCall: boolean
}

export function AssessmentQuiz() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [formData, setFormData] = useState<FormState>({ email: "", firstName: "", phone: "", scheduleCall: false })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalQuestions = 8
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex]
  const progressLabel = `Question ${currentQuestionIndex + 1} of ${totalQuestions} (${Math.round(progress)}%)`

  const handleAnswer = (value: string | string[], autoAdvance = true) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(newAnswers)

    if (currentQuestion.routing) {
      const route = currentQuestion.routing(newAnswers)
      if (route === "PROBATE_AUDIT_UPSELL" || route === "WAITLIST" || route === "ATTORNEY_NEEDED") {
        router.push(`/assessment/results?outcome=${route}`)
        return
      }
      if (route?.startsWith("q")) {
        const nextIndex = QUIZ_QUESTIONS.findIndex((q) => q.id === route)
        if (nextIndex !== -1) {
          setCurrentQuestionIndex(nextIndex)
          return
        }
      }
    }

    if (autoAdvance && currentQuestion.type === "single" && typeof value === "string") {
      setTimeout(() => {
        handleNext()
      }, 250)
    }
  }

  const handleMultiSelect = (value: string, checked: boolean) => {
    const currentAnswers = (answers[currentQuestion.id] as string[]) || []
    let newAnswers: string[]

    if (value === "none") {
      newAnswers = checked ? ["none"] : []
    } else {
      newAnswers = checked
        ? [...currentAnswers.filter((a) => a !== "none"), value]
        : currentAnswers.filter((a) => a !== value)
    }

    const updatedAnswers = { ...answers, [currentQuestion.id]: newAnswers }
    setAnswers(updatedAnswers)

    if (currentQuestion.routing) {
      const route = currentQuestion.routing(updatedAnswers)
      if (route === "PROBATE_AUDIT_UPSELL" || route === "WAITLIST" || route === "ATTORNEY_NEEDED") {
        router.push(`/assessment/results?outcome=${route}`)
        return
      }
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleRankSelect = (value: string) => {
    const existingOrder = (answers[currentQuestion.id] as string[]) || currentQuestion.options.map((opt) => opt.value)
    const newOrder = [value, ...existingOrder.filter((item) => item !== value)]
    handleAnswer(newOrder, false)
  }

  const handleSubmit = async () => {
    const result = calculateRecommendedTier(answers)
    setIsSubmitting(true)

    try {
      const supabase = getSupabaseClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Error",
          description: "Please log in to save your assessment.",
          variant: "destructive",
        })
        router.push("/auth/login")
        return
      }

      // Save assessment quiz data to forms table
      const { data: insertedData, error: insertError } = await supabase
        .from("forms")
        .insert([
          {
            user_id: user.id,
            form_type: "assessment_quiz",
            data: {
              answers,
              formData,
              result,
              recommendedTier: result.primary,
            },
            status: "pending",
          },
        ])
        .select()

      if (insertError) {
        toast({
          title: "Error",
          description: "Failed to save your assessment. Please try again.",
          variant: "destructive",
        })
        console.error("[v0] Assessment save error:", insertError)
        return
      }

      // Save to session storage as well
      sessionStorage.setItem("quizAnswers", JSON.stringify(answers))
      sessionStorage.setItem("quizResult", JSON.stringify(result))
      sessionStorage.setItem("quizFormData", JSON.stringify(formData))

      toast({
        title: "Success",
        description: "Your assessment has been saved.",
      })

      router.push(`/assessment/results?rec=${result.primary}`)
    } catch (error) {
      console.error("[v0] Assessment submission error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit()
  }

  const renderQuestion = () => {
    if (!currentQuestion) return null

    switch (currentQuestion.type) {
      case "single":
        return (
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleAnswer(option.value)}
                className="w-full rounded-2xl border-2 border-border p-6 text-left transition-all hover:border-primary hover:bg-accent/40"
              >
                <div className="text-lg font-semibold">{option.label}</div>
                {option.quote && <p className="mt-1 text-sm italic text-primary">{option.quote}</p>}
                {option.explainer && <p className="mt-2 text-sm text-muted-foreground">{option.explainer}</p>}
                {option.description && <p className="mt-2 text-sm text-muted-foreground">{option.description}</p>}
              </button>
            ))}
          </div>
        )

      case "multi-select": {
        const selectedValues = (answers[currentQuestion.id] as string[]) || []
        return (
          <div className="space-y-4">
            {currentQuestion.options.map((option) => {
              const isChecked = selectedValues.includes(option.value)
              return (
                <Card
                  key={option.value}
                  className={`cursor-pointer transition-all ${isChecked ? "border-primary bg-accent/40" : ""}`}
                  onClick={() => handleMultiSelect(option.value, !isChecked)}
                >
                  <CardContent className="flex items-start gap-4 p-4">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(state) => handleMultiSelect(option.value, state === true)}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{option.label}</p>
                      {option.explainer && (
                        <div className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
                          <Info className="mt-0.5 size-4 text-primary" />
                          <span>{option.explainer}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
            <Button onClick={handleNext} className="mt-6 w-full" disabled={selectedValues.length === 0}>
              Continue →
            </Button>
          </div>
        )
      }

      case "dropdown": {
        const value = (answers[currentQuestion.id] as string) || ""
        const stateMessage =
          value === "Other"
            ? "We're not in your state yet, but we're expanding in 2025. You'll be redirected to our waitlist with free resources."
            : value
              ? `Great! We're fully operational in ${value}.`
              : ""

        return (
          <div className="space-y-4">
            <Select value={value} onValueChange={(val) => handleAnswer(val, false)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select state..." />
              </SelectTrigger>
              <SelectContent>
                {currentQuestion.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {stateMessage && (
              <p className="rounded-xl bg-accent/30 p-3 text-sm text-muted-foreground">{stateMessage}</p>
            )}
            {value && (
              <Button onClick={handleNext} className="w-full">
                Continue →
              </Button>
            )}
          </div>
        )
      }

      case "rank": {
        const order = (answers[currentQuestion.id] as string[]) || currentQuestion.options.map((opt) => opt.value)
        return (
          <div className="space-y-4">
            {order.map((value, index) => {
              const option = currentQuestion.options.find((opt) => opt.value === value)
              if (!option) return null
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRankSelect(value)}
                  className="flex w-full items-center gap-4 rounded-2xl border-2 border-border p-4 text-left transition hover:border-primary hover:bg-accent/30"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-base font-semibold">{option.label}</p>
                    {option.explainer && <p className="text-sm text-muted-foreground">{option.explainer}</p>}
                  </div>
                </button>
              )
            })}
          </div>
        )
      }

      case "form":
        return (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-2"
                placeholder="For complex cases only"
              />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="scheduleCall"
                checked={formData.scheduleCall}
                onCheckedChange={(state) => setFormData({ ...formData, scheduleCall: state === true })}
              />
              <Label htmlFor="scheduleCall" className="text-sm text-muted-foreground">
                I'd like to schedule a free 15-minute consultation call
              </Label>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Get My Custom Plan →"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              We'll never sell your information. Unsubscribe anytime.
            </p>
          </form>
        )

      default:
        return null
    }
  }

  const renderNavigation = () => {
    if (!currentQuestion) return null
    if (
      currentQuestion.type === "form" ||
      currentQuestion.type === "multi-select" ||
      currentQuestion.type === "dropdown"
    ) {
      return null
    }

    if (currentQuestion.type === "rank") {
      return (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentQuestionIndex === 0}>
            ← Back
          </Button>
          <Button onClick={handleNext}>Continue →</Button>
        </div>
      )
    }

    return (
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentQuestionIndex === 0}>
          ← Back
        </Button>
      </div>
    )
  }

  const helperBlock = useMemo(() => {
    if (!currentQuestion?.helperText) return null
    return (
      <div className="mt-4 flex items-start gap-3 rounded-2xl bg-accent/30 p-4 text-sm text-muted-foreground">
        <HelpCircle className="mt-0.5 size-5 text-primary" />
        <div className="flex-1">
          {currentQuestion.helperText}{" "}
          {currentQuestion.helperTooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-primary underline decoration-dotted underline-offset-4">
                  Learn more
                </button>
              </TooltipTrigger>
              <TooltipContent>{currentQuestion.helperTooltip}</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    )
  }, [currentQuestion])

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Progress</div>
            <Progress value={progress} className="h-2" />
            <div className="mt-2 text-sm text-muted-foreground">{progressLabel}</div>
          </div>

          <Card className="p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Assessment Quiz</p>
              <h1 className="mt-3 text-3xl font-semibold">{currentQuestion.question}</h1>
              {currentQuestion.subtitle && (
                <p className="mt-2 text-base text-muted-foreground">{currentQuestion.subtitle}</p>
              )}
              {helperBlock}
            </div>

            {renderQuestion()}
            {renderNavigation()}
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
