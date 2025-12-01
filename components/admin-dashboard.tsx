"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const { toast } = useToast()

  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedClient, setSelectedClient] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isSaving, setIsSaving] = useState(false)

  // Client content state (what shows on their dashboard)
  const [clientContent, setClientContent] = useState({
    progress: 0,
    currentPhase: 1,
    phaseDescription: "",
    expectedCompletion: "",
    actionItems: [],
    documents: [],
    messages: [],
  })

  // New action item form
  const [newAction, setNewAction] = useState({
    priority: "normal",
    title: "",
    description: "",
    due: "",
    button: "Complete",
  })

  // New document form
  const [newDocument, setNewDocument] = useState({
    name: "",
    date: new Date().toLocaleDateString(),
    note: "",
    signed: false,
  })

  // New message form
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/admin/clients")
        const data = await response.json()

        if (data && Array.isArray(data)) {
          setClients(data)
          if (data.length > 0) {
            setSelectedClient(data[0])
            await fetchDashboardContent(data[0].dashboardId)
          }
        }
      } catch (error) {
        console.error("[v0] Error fetching clients:", error)
        toast({
          title: "Error",
          description: "Failed to load clients",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [toast])

  const fetchDashboardContent = async (dashboardId: string) => {
    try {
      const response = await fetch(`/api/admin/dashboard/${dashboardId}`)
      const data = await response.json()

      setClientContent({
        progress: data.dashboard.progress,
        currentPhase: data.dashboard.current_phase,
        phaseDescription: data.dashboard.phase_description,
        expectedCompletion: data.dashboard.expected_completion,
        actionItems: data.actionItems.map((item: any) => ({
          id: item.id,
          priority: item.priority,
          title: item.title,
          description: item.description,
          due: item.due_date,
          button: item.button_text,
        })),
        documents: data.documents.map((doc: any) => ({
          id: doc.id,
          name: doc.name,
          date: doc.date_info,
          note: doc.note,
          signed: doc.signed,
          fileUrl: doc.file_url,
        })),
        messages: data.messages.map((msg: any) => ({
          id: msg.id,
          from: msg.from_name,
          time: new Date(msg.created_at).toLocaleString(),
          content: msg.content,
          isUser: msg.is_user,
        })),
      })
    } catch (error) {
      console.error("[v0] Error fetching dashboard content:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard content",
        variant: "destructive",
      })
    }
  }

  const addActionItem = async () => {
    if (!newAction.title || !selectedClient) return

    try {
      const response = await fetch("/api/admin/action-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dashboardId: selectedClient.dashboardId,
          priority: newAction.priority,
          title: newAction.title,
          description: newAction.description,
          due: newAction.due,
          button: newAction.button,
        }),
      })

      if (!response.ok) throw new Error("Failed to add action item")

      // Refresh dashboard content
      await fetchDashboardContent(selectedClient.dashboardId)

      setNewAction({
        priority: "normal",
        title: "",
        description: "",
        due: "",
        button: "Complete",
      })

      toast({
        title: "Success",
        description: "Action item added",
      })
    } catch (error) {
      console.error("[v0] Error adding action item:", error)
      toast({
        title: "Error",
        description: "Failed to add action item",
        variant: "destructive",
      })
    }
  }

  const removeActionItem = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/action-items?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete action item")

      // Refresh dashboard content
      if (selectedClient) {
        await fetchDashboardContent(selectedClient.dashboardId)
      }

      toast({
        title: "Success",
        description: "Action item removed",
      })
    } catch (error) {
      console.error("[v0] Error removing action item:", error)
      toast({
        title: "Error",
        description: "Failed to remove action item",
        variant: "destructive",
      })
    }
  }

  const addDocument = async () => {
    if (!newDocument.name || !selectedClient) return

    try {
      const response = await fetch("/api/admin/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dashboardId: selectedClient.dashboardId,
          name: newDocument.name,
          date: newDocument.date,
          note: newDocument.note,
          signed: newDocument.signed,
        }),
      })

      if (!response.ok) throw new Error("Failed to add document")

      // Refresh dashboard content
      await fetchDashboardContent(selectedClient.dashboardId)

      setNewDocument({
        name: "",
        date: new Date().toLocaleDateString(),
        note: "",
        signed: false,
      })

      toast({
        title: "Success",
        description: "Document added",
      })
    } catch (error) {
      console.error("[v0] Error adding document:", error)
      toast({
        title: "Error",
        description: "Failed to add document",
        variant: "destructive",
      })
    }
  }

  const removeDocument = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/documents?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete document")

      // Refresh dashboard content
      if (selectedClient) {
        await fetchDashboardContent(selectedClient.dashboardId)
      }

      toast({
        title: "Success",
        description: "Document removed",
      })
    } catch (error) {
      console.error("[v0] Error removing document:", error)
      toast({
        title: "Error",
        description: "Failed to remove document",
        variant: "destructive",
      })
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedClient) return

    try {
      const response = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dashboardId: selectedClient.dashboardId,
          fromName: "Lisa (Your Case Manager)",
          content: newMessage,
          isUser: false,
        }),
      })

      if (!response.ok) throw new Error("Failed to send message")

      // Refresh dashboard content
      await fetchDashboardContent(selectedClient.dashboardId)
      setNewMessage("")

      toast({
        title: "Success",
        description: "Message sent to client",
      })
    } catch (error) {
      console.error("[v0] Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
    }
  }

  const updateProgress = (phase: number) => {
    const progressMap: { [key: number]: number } = {
      1: 20,
      2: 40,
      3: 60,
      4: 80,
      5: 100,
    }

    setClientContent((prev) => ({
      ...prev,
      currentPhase: phase,
      progress: progressMap[phase] || prev.progress,
    }))
  }

  const saveChanges = async () => {
    if (!selectedClient) return

    setIsSaving(true)
    try {
      const response = await fetch(`/api/admin/dashboard/${selectedClient.dashboardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPhase: clientContent.currentPhase,
          progress: clientContent.progress,
          phaseDescription: clientContent.phaseDescription,
          expectedCompletion: clientContent.expectedCompletion,
        }),
      })

      if (!response.ok) throw new Error("Failed to save changes")

      toast({
        title: "Success",
        description: "Dashboard changes saved and synced to client",
      })
    } catch (error) {
      console.error("[v0] Error saving changes:", error)
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardContent className="pt-6">Loading admin dashboard...</CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Kinn Admin</h1>
              <p className="text-sm text-gray-500">Dashboard Manager</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Live Mode
              </Badge>
              <Button size="sm" variant="outline">
                View Live Site
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-6">
          {/* Left Sidebar - Client List */}
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Active Clients</CardTitle>
                <Input placeholder="Search clients..." className="mt-2" />
              </CardHeader>
              <CardContent className="space-y-2 p-0">
                {clients.length === 0 ? (
                  <p className="text-sm text-gray-500 p-4">No clients found</p>
                ) : (
                  clients.map((client) => (
                    <button
                      key={client.id}
                      onClick={() => {
                        setSelectedClient(client)
                        fetchDashboardContent(client.dashboardId)
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-l-2 ${
                        selectedClient?.id === client.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-transparent"
                      }`}
                    >
                      <p className="font-medium text-sm">{client.name}</p>
                      <p className="text-xs text-gray-500">{client.id}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          Phase {client.phase}
                        </Badge>
                        <span className="text-xs text-gray-500">{client.progress}%</span>
                      </div>
                    </button>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button size="sm" variant="outline" className="w-full justify-start bg-transparent">
                  + Add New Client
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start bg-transparent">
                  📊 View Analytics
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start bg-transparent">
                  ⚙️ Automation Rules
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Client Dashboard Editor */}
          {selectedClient ? (
            <div className="col-span-3 space-y-6">
              {/* Client Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>Editing: {selectedClient.name}</CardTitle>
                      <CardDescription>
                        Case #{selectedClient.id} • Estate of {selectedClient.decedent}
                      </CardDescription>
                    </div>
                    <Button onClick={saveChanges} size="sm" disabled={isSaving}>
                      💾 {isSaving ? "Saving..." : "Save All Changes"}
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Tabs for Different Sections */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="actions">Action Items</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Progress & Phase</CardTitle>
                      <CardDescription>Controls what the client sees in their progress tracker</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Current Phase</Label>
                          <Select
                            value={clientContent.currentPhase.toString()}
                            onValueChange={(val) => updateProgress(Number.parseInt(val))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1. Intake Complete</SelectItem>
                              <SelectItem value="2">2. Petition Filed</SelectItem>
                              <SelectItem value="3">3. Estate Administration</SelectItem>
                              <SelectItem value="4">4. Distribution</SelectItem>
                              <SelectItem value="5">5. Case Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Progress Percentage</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={clientContent.progress}
                            onChange={(e) =>
                              setClientContent((prev) => ({
                                ...prev,
                                progress: Number.parseInt(e.target.value),
                              }))
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Phase Description (shown to client)</Label>
                        <Textarea
                          value={clientContent.phaseDescription}
                          onChange={(e) =>
                            setClientContent((prev) => ({
                              ...prev,
                              phaseDescription: e.target.value,
                            }))
                          }
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Expected Completion Date</Label>
                        <Input
                          value={clientContent.expectedCompletion}
                          onChange={(e) =>
                            setClientContent((prev) => ({
                              ...prev,
                              expectedCompletion: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Action Items Tab */}
                <TabsContent value="actions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Add Action Item</CardTitle>
                      <CardDescription>Create tasks that appear in client's "Action Required" section</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Priority</Label>
                          <Select
                            value={newAction.priority}
                            onValueChange={(val) => setNewAction((prev) => ({ ...prev, priority: val }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="urgent">🔴 Urgent</SelectItem>
                              <SelectItem value="normal">🔵 Normal</SelectItem>
                              <SelectItem value="optional">⚪ Optional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Due Date</Label>
                          <Input
                            placeholder="e.g., '3 days from now'"
                            value={newAction.due}
                            onChange={(e) => setNewAction((prev) => ({ ...prev, due: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Title</Label>
                        <Input
                          placeholder="e.g., 'Upload bank statements'"
                          value={newAction.title}
                          onChange={(e) => setNewAction((prev) => ({ ...prev, title: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Explain what the client needs to do..."
                          value={newAction.description}
                          onChange={(e) => setNewAction((prev) => ({ ...prev, description: e.target.value }))}
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Button Text</Label>
                        <Input
                          placeholder="e.g., 'Upload Files'"
                          value={newAction.button}
                          onChange={(e) => setNewAction((prev) => ({ ...prev, button: e.target.value }))}
                        />
                      </div>

                      <Button onClick={addActionItem} className="w-full">
                        + Add Action Item
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Current Action Items ({clientContent.actionItems.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {clientContent.actionItems.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                          No action items. Client will see "You're all caught up!" message.
                        </p>
                      ) : (
                        clientContent.actionItems.map((item) => (
                          <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Badge variant={item.priority === "urgent" ? "destructive" : "secondary"}>
                                  {item.priority}
                                </Badge>
                                <h4 className="font-medium">{item.title}</h4>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                              <p className="text-xs text-gray-500 mt-1">Due: {item.due}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => removeActionItem(item.id)}>
                              ❌
                            </Button>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Add Document</CardTitle>
                      <CardDescription>Documents appear in client's document library</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Document Name</Label>
                        <Input
                          placeholder="e.g., 'Death Certificate (Certified)'"
                          value={newDocument.name}
                          onChange={(e) => setNewDocument((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label>Date/Status</Label>
                        <Input
                          placeholder="e.g., 'Uploaded Jan 20, 2025'"
                          value={newDocument.date}
                          onChange={(e) => setNewDocument((prev) => ({ ...prev, date: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label>Note (optional)</Label>
                        <Input
                          placeholder="e.g., 'Keep this safe - you'll need it often'"
                          value={newDocument.note}
                          onChange={(e) => setNewDocument((prev) => ({ ...prev, note: e.target.value }))}
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="signed"
                          checked={newDocument.signed}
                          onChange={(e) => setNewDocument((prev) => ({ ...prev, signed: e.target.checked }))}
                          className="rounded"
                        />
                        <Label htmlFor="signed">Show "Signed by you" badge</Label>
                      </div>

                      <Button onClick={addDocument} className="w-full">
                        + Add Document
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Current Documents ({clientContent.documents.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {clientContent.documents.map((doc) => (
                        <div key={doc.id} className="flex items-start gap-3 p-3 border rounded-lg">
                          <span className="text-2xl">📄</span>
                          <div className="flex-1">
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-sm text-gray-600">{doc.date}</p>
                            {doc.note && <p className="text-sm text-amber-600 mt-1">⭐ {doc.note}</p>}
                            {doc.signed && (
                              <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
                                Signed by you
                              </Badge>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeDocument(doc.id)}>
                            ❌
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Messages Tab */}
                <TabsContent value="messages" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Send Message to Client</CardTitle>
                      <CardDescription>Appears in their messages section immediately</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        placeholder="Type your message here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={6}
                      />
                      <Button onClick={sendMessage} className="w-full">
                        Send Message
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Message History</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {clientContent.messages.map((msg) => (
                        <div key={msg.id} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="text-xl">📧</span>
                          <div className="flex-1">
                            <p className="font-medium">{msg.from}</p>
                            <p className="text-xs text-gray-500">{msg.time}</p>
                            <p className="text-sm mt-2 whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Timeline Tab */}
                <TabsContent value="timeline" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Timeline Events</CardTitle>
                      <CardDescription>
                        Track major milestones (for internal use, not shown to client yet)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex gap-3 items-start">
                          <div className="w-3 h-3 rounded-full bg-green-500 mt-1"></div>
                          <div>
                            <p className="font-medium">Form submission received</p>
                            <p className="text-sm text-gray-500">Jan 20, 2025 - 9:30 AM</p>
                          </div>
                        </div>
                        <div className="flex gap-3 items-start">
                          <div className="w-3 h-3 rounded-full bg-green-500 mt-1"></div>
                          <div>
                            <p className="font-medium">Initial call completed</p>
                            <p className="text-sm text-gray-500">Jan 22, 2025 - 2:00 PM</p>
                          </div>
                        </div>
                        <div className="flex gap-3 items-start">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mt-1 animate-pulse"></div>
                          <div>
                            <p className="font-medium">Asset discovery in progress</p>
                            <p className="text-sm text-gray-500">Current phase</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        + Add Timeline Event
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Preview Button */}
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Preview Client Dashboard</h3>
                      <p className="text-sm text-gray-600">See exactly what {selectedClient.name} sees</p>
                    </div>
                    <Button>👁️ Preview Dashboard</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="col-span-3">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">Select a client to manage their dashboard</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
