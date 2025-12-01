import { AssessmentQuiz } from "@/components/assessment-quiz"

export const metadata = {
  title: "Assessment Quiz",
  description: "Take our assessment quiz to get a personalized probate recommendation.",
}

export default function BookCallPage() {
  return (
    <main className="font-sans">
      <AssessmentQuiz />
    </main>
  )
}
