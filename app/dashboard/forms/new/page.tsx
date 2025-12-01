import { FormSubmission } from "@/components/form-submission"

export const metadata = {
  title: "New Form - Kinn",
  description: "Submit a new form",
}

const intakeFormFields = [
  {
    name: "deceasedName",
    label: "Deceased's Full Name",
    type: "text" as const,
    required: true,
    placeholder: "John Smith",
  },
  {
    name: "dateOfDeath",
    label: "Date of Death",
    type: "text" as const,
    required: true,
    placeholder: "MM/DD/YYYY",
  },
  {
    name: "relationshipToDeceased",
    label: "Your Relationship to Deceased",
    type: "text" as const,
    required: true,
    placeholder: "Spouse, Child, etc.",
  },
  {
    name: "estimatedEstateValue",
    label: "Estimated Estate Value",
    type: "number" as const,
    required: true,
    placeholder: "500000",
  },
  {
    name: "hasWill",
    label: "Is there a Will?",
    type: "text" as const,
    required: true,
    placeholder: "Yes or No",
  },
  {
    name: "heirsOrBeneficiaries",
    label: "Names of Heirs/Beneficiaries",
    type: "textarea" as const,
    required: true,
    placeholder: "List names and relationships",
  },
  {
    name: "debtsOrLiabilities",
    label: "Known Debts or Liabilities",
    type: "textarea" as const,
    required: false,
    placeholder: "Mortgage, credit cards, etc.",
  },
  {
    name: "additionalNotes",
    label: "Additional Information",
    type: "textarea" as const,
    required: false,
    placeholder: "Anything else we should know?",
  },
]

export default function NewFormPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">New Estate Intake Form</h1>
        <p className="text-muted-foreground mt-2">Provide information about the estate</p>
      </div>
      <FormSubmission formType="estate-intake" fields={intakeFormFields} />
    </div>
  )
}
