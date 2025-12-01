import { createClient } from "@/lib/supabase-server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "My Forms - Kinn",
  description: "View and manage your forms",
}

export default async function FormsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: forms } = await supabase
    .from("forms")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Forms</h1>
        <p className="text-muted-foreground mt-2">Manage all your submitted forms</p>
      </div>

      {forms && forms.length > 0 ? (
        <div className="grid gap-4">
          {forms.map((form) => (
            <Card key={form.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="capitalize">{form.form_type}</CardTitle>
                    <CardDescription>Submitted on {new Date(form.created_at).toLocaleDateString()}</CardDescription>
                  </div>
                  <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded capitalize">{form.status}</span>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/forms/${form.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">No forms submitted yet</p>
            <Button asChild>
              <Link href="/assessment/quiz">Start a Form</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
