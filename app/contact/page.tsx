"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/client"

interface ContactFormConfig {
  buttons_disabled: boolean
  post_url: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [config, setConfig] = useState<ContactFormConfig>({
    buttons_disabled: true,
    post_url: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const supabase = createClient()

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("setting_value")
        .eq("setting_key", "contact_form_config")
        .single()

      if (error) throw error
      if (data) {
        setConfig(data.setting_value as ContactFormConfig)
      }
    } catch (error) {
      console.error("Error loading config:", error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (config.buttons_disabled) return

    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      if (config.post_url) {
        const response = await fetch(config.post_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          setSubmitMessage("Message sent successfully!")
          setFormData({ name: "", email: "", phone: "", message: "" })
        } else {
          setSubmitMessage("Failed to send message. Please try again.")
        }
      } else {
        const { error } = await supabase.from("contact_messages").insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            message: formData.message,
            status: "new",
          },
        ])

        if (error) throw error

        setSubmitMessage("Message sent successfully!")
        setFormData({ name: "", email: "", phone: "", message: "" })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitMessage("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = config.buttons_disabled
  const inputClassName = isDisabled
    ? "w-full h-14 px-6 bg-gray-200 border-0 rounded-xl text-gray-500 placeholder:text-gray-400 font-medium cursor-not-allowed"
    : "w-full h-14 px-6 bg-white border-2 border-gray-300 rounded-xl text-navy-900 placeholder:text-gray-500 font-medium focus:border-navy-600 focus:outline-none"

  const textareaClassName = isDisabled
    ? "w-full px-6 py-4 bg-gray-200 border-0 rounded-xl text-gray-500 placeholder:text-gray-400 font-medium resize-none cursor-not-allowed"
    : "w-full px-6 py-4 bg-white border-2 border-gray-300 rounded-xl text-navy-900 placeholder:text-gray-500 font-medium resize-none focus:border-navy-600 focus:outline-none"

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy-900 mb-4">Contact Us</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isDisabled}
            required={!isDisabled}
            className={inputClassName}
          />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isDisabled}
            required={!isDisabled}
            className={inputClassName}
          />

          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={isDisabled}
            className={inputClassName}
          />

          <Textarea
            name="message"
            placeholder="Message"
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            disabled={isDisabled}
            required={!isDisabled}
            className={textareaClassName}
          />

          <Button
            type="submit"
            disabled={isDisabled || isSubmitting}
            className={
              isDisabled
                ? "bg-gray-400 text-gray-600 font-bold px-8 py-4 rounded-xl text-lg cursor-not-allowed hover:bg-gray-400"
                : "bg-navy-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-navy-700 disabled:opacity-50"
            }
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>

          {submitMessage && (
            <div
              className={`text-center p-4 rounded-xl ${
                submitMessage.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {submitMessage}
            </div>
          )}
        </form>
      </main>

      <Footer />
    </div>
  )
}
