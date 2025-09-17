"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import { useRouter } from "next/navigation"

interface AdminSiteEditorProps {
  onLogout: () => void
}

interface EditModal {
  isOpen: boolean
  element: HTMLElement | null
  content: string
  type: "text" | "image" | "link"
}

export function AdminSiteEditor({ onLogout }: AdminSiteEditorProps) {
  const [currentPath, setCurrentPath] = useState("/")
  const [isEditMode, setIsEditMode] = useState(true)
  const [editModal, setEditModal] = useState<EditModal>({
    isOpen: false,
    element: null,
    content: "",
    type: "text",
  })
  const router = useRouter()

  useEffect(() => {
    if (isEditMode) {
      // Add admin editing styles to body
      document.body.classList.add("admin-mode")

      // Add right-click context menu
      const handleRightClick = (e: MouseEvent) => {
        e.preventDefault()
        const target = e.target as HTMLElement

        // Create context menu
        const contextMenu = document.createElement("div")
        contextMenu.className = "fixed bg-card border border-border rounded-lg shadow-lg p-2 z-[1002]"
        contextMenu.style.left = `${e.clientX}px`
        contextMenu.style.top = `${e.clientY}px`

        const deleteOption = document.createElement("button")
        deleteOption.textContent = "Delete Element"
        deleteOption.className = "block w-full text-left px-3 py-2 text-sm hover:bg-accent rounded"
        deleteOption.onclick = () => {
          if (target && target.parentNode) {
            target.parentNode.removeChild(target)
          }
          document.body.removeChild(contextMenu)
        }

        contextMenu.appendChild(deleteOption)
        document.body.appendChild(contextMenu)

        // Remove context menu on click elsewhere
        const removeMenu = () => {
          if (document.body.contains(contextMenu)) {
            document.body.removeChild(contextMenu)
          }
          document.removeEventListener("click", removeMenu)
        }
        setTimeout(() => document.addEventListener("click", removeMenu), 100)
      }

      // Add click to edit functionality
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement

        // Check if it's editable text
        if (
          target.tagName === "H1" ||
          target.tagName === "H2" ||
          target.tagName === "H3" ||
          target.tagName === "P" ||
          target.tagName === "SPAN" ||
          target.tagName === "DIV"
        ) {
          e.preventDefault()
          setEditModal({
            isOpen: true,
            element: target,
            content: target.textContent || "",
            type: "text",
          })
        }
      }

      document.addEventListener("contextmenu", handleRightClick)
      document.addEventListener("click", handleClick)

      return () => {
        document.body.classList.remove("admin-mode")
        document.removeEventListener("contextmenu", handleRightClick)
        document.removeEventListener("click", handleClick)
      }
    }
  }, [isEditMode])

  const handlePathChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newPath = (e.target as HTMLInputElement).value
      setCurrentPath(newPath)
      if (newPath !== window.location.pathname) {
        router.push(newPath)
      }
    }
  }

  const handleSaveEdit = () => {
    if (editModal.element && editModal.type === "text") {
      editModal.element.textContent = editModal.content
    }
    setEditModal({ isOpen: false, element: null, content: "", type: "text" })
  }

  const handleCancelEdit = () => {
    setEditModal({ isOpen: false, element: null, content: "", type: "text" })
  }

  return (
    <div className="min-h-screen">
      {/* Admin Path Bar */}
      <div className="admin-path-bar">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-sm font-medium text-muted-foreground">Path:</span>
            <Input
              className="admin-path-input max-w-md"
              defaultValue={currentPath}
              placeholder="/path/to/page"
              onKeyDown={handlePathChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant={isEditMode ? "default" : "outline"} size="sm" onClick={() => setIsEditMode(!isEditMode)}>
              {isEditMode ? "Exit Edit" : "Edit Mode"}
            </Button>
            <Button variant="outline" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Site Content */}
      <div style={{ paddingTop: "60px" }}>
        <Navigation />
        <HeroSection />
        <ServicesSection />
        <ContactSection />
      </div>

      {/* Edit Modal */}
      {editModal.isOpen && (
        <>
          <div className="admin-edit-overlay" onClick={handleCancelEdit} />
          <div className="admin-edit-modal">
            <h3 className="text-lg font-semibold mb-4">Edit Content</h3>
            <Textarea
              value={editModal.content}
              onChange={(e) => setEditModal({ ...editModal, content: e.target.value })}
              className="mb-4"
              rows={4}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
