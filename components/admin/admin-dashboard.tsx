"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Users, MessageSquare, BarChart3, Download, Shield, Edit3, Save, Trash2, Calendar } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  created_at: string
  status: "new" | "read" | "replied"
}

interface ContactFormConfig {
  buttons_disabled: boolean
  post_url: string
}

export function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [editingContent, setEditingContent] = useState(false)
  const [contactConfig, setContactConfig] = useState<ContactFormConfig>({
    buttons_disabled: true,
    post_url: "",
  })
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    loadMessages()
    loadContactConfig()
  }, [])

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error("Error loading messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadContactConfig = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("setting_value")
        .eq("setting_key", "contact_form_config")
        .single()

      if (error) throw error
      if (data) {
        setContactConfig(data.setting_value as ContactFormConfig)
      }
    } catch (error) {
      console.error("Error loading contact config:", error)
    }
  }

  const updateContactConfig = async (newConfig: ContactFormConfig) => {
    try {
      const { error } = await supabase.from("admin_settings").upsert({
        setting_key: "contact_form_config",
        setting_value: newConfig,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      setContactConfig(newConfig)
    } catch (error) {
      console.error("Error updating contact config:", error)
    }
  }

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ status: "read", updated_at: new Date().toISOString() })
        .eq("id", messageId)

      if (error) throw error

      setMessages(
        messages.map((msg) =>
          msg.id === messageId ? { ...msg, status: msg.status === "new" ? "read" : msg.status } : msg,
        ),
      )
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase.from("contact_messages").delete().eq("id", messageId)

      if (error) throw error

      setMessages(messages.filter((msg) => msg.id !== messageId))
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500"
      case "read":
        return "bg-yellow-500"
      case "replied":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Messages</p>
                <p className="text-2xl font-bold">{messages.filter((m) => m.status === "new").length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <Shield className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Messages List */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>Manage incoming contact form submissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading messages...</div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No messages yet</div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                        selectedMessage?.id === message.id ? "bg-accent" : ""
                      }`}
                      onClick={() => {
                        setSelectedMessage(message)
                        markAsRead(message.id)
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{message.name}</h4>
                          <p className="text-sm text-muted-foreground">{message.company || message.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={`${getStatusColor(message.status)} text-white`}>
                            {message.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteMessage(message.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(message.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Message Detail */}
            <Card>
              <CardHeader>
                <CardTitle>Message Details</CardTitle>
                <CardDescription>
                  {selectedMessage ? "View and respond to the selected message" : "Select a message to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedMessage ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Name</Label>
                        <p className="text-sm">{selectedMessage.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <p className="text-sm">{selectedMessage.email}</p>
                      </div>
                    </div>
                    {selectedMessage.phone && (
                      <div>
                        <Label className="text-sm font-medium">Phone</Label>
                        <p className="text-sm">{selectedMessage.phone}</p>
                      </div>
                    )}
                    {selectedMessage.company && (
                      <div>
                        <Label className="text-sm font-medium">Company</Label>
                        <p className="text-sm">{selectedMessage.company}</p>
                      </div>
                    )}
                    <div>
                      <Label className="text-sm font-medium">Message</Label>
                      <p className="text-sm bg-muted p-3 rounded-md">{selectedMessage.message}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">Reply</Button>
                      <Button variant="outline" size="sm">
                        Mark as Replied
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a message to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Contact Tab for form configuration */}
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form Settings</CardTitle>
              <CardDescription>Configure the contact form behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Grey out buttons</Label>
                  <p className="text-sm text-muted-foreground">Disable the contact form and grey out all buttons</p>
                </div>
                <Switch
                  checked={contactConfig.buttons_disabled}
                  onCheckedChange={(checked) => updateContactConfig({ ...contactConfig, buttons_disabled: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-url">Make form post request details</Label>
                <p className="text-sm text-muted-foreground">Enter the URL where form submissions should be sent</p>
                <Input
                  id="post-url"
                  placeholder="https://example.com/api/contact"
                  value={contactConfig.post_url}
                  onChange={(e) => setContactConfig({ ...contactConfig, post_url: e.target.value })}
                />
                <Button onClick={() => updateContactConfig(contactConfig)} className="mt-2">
                  <Save className="h-4 w-4 mr-2" />
                  Save URL
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Management Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>Edit website content and pages</CardDescription>
                </div>
                <Button onClick={() => setEditingContent(!editingContent)}>
                  {editingContent ? <Save className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
                  {editingContent ? "Save Changes" : "Edit Content"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hero-title">Hero Section Title</Label>
                  <Input
                    id="hero-title"
                    defaultValue="Exceptional Resources, Relationships & Results"
                    disabled={!editingContent}
                  />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle">Hero Section Subtitle</Label>
                  <Textarea
                    id="hero-subtitle"
                    defaultValue="Your pathway to success is built on strategic innovation and meaningful connections. We believe in the power of transformation through excellence."
                    disabled={!editingContent}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="services-title">Services Section Title</Label>
                  <Input id="services-title" defaultValue="Our Services" disabled={!editingContent} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Traffic</CardTitle>
                <CardDescription>Visitor statistics and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Page Views</span>
                    <span className="font-semibold">12,543</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Unique Visitors</span>
                    <span className="font-semibold">8,921</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bounce Rate</span>
                    <span className="font-semibold">23.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg. Session Duration</span>
                    <span className="font-semibold">4m 32s</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Pages</CardTitle>
                <CardDescription>Most visited pages on your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Home Page</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Services</span>
                    <span className="font-semibold">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">About Us</span>
                    <span className="font-semibold">18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Contact</span>
                    <span className="font-semibold">9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Settings</CardTitle>
              <CardDescription>Configure general website settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="site-title">Site Title</Label>
                <Input id="site-title" defaultValue="AR4Life - Exceptional Resources, Relationships & Results" />
              </div>
              <div>
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  defaultValue="Transforming businesses through innovative solutions, strategic partnerships, and measurable outcomes."
                />
              </div>
              <div>
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" defaultValue="hello@ar4life.com" />
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Tab */}
        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Export</CardTitle>
              <CardDescription>Download website data and create backups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Download className="h-6 w-6 mb-2" />
                  Export Messages
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Download className="h-6 w-6 mb-2" />
                  Export Analytics
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Download className="h-6 w-6 mb-2" />
                  Export Settings
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Download className="h-6 w-6 mb-2" />
                  Full Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage security settings and access logs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="change-password">Change Admin Password</Label>
                <Input id="change-password" type="password" placeholder="Enter new password" />
              </div>
              <div>
                <Label>Recent Login Attempts</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm">Successful login</span>
                    <span className="text-sm text-muted-foreground">2024-01-15 14:30</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm">Successful login</span>
                    <span className="text-sm text-muted-foreground">2024-01-14 09:15</span>
                  </div>
                </div>
              </div>
              <Button>Update Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
