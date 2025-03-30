"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function RequestFormDialog() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ email, selectedDocuments, notes })
    setOpen(false)
    // Reset form
    setEmail("")
    setSelectedDocuments([])
    setNotes("")
  }

  const toggleDocument = (document: string) => {
    if (selectedDocuments.includes(document)) {
      setSelectedDocuments(selectedDocuments.filter((doc) => doc !== document))
    } else {
      setSelectedDocuments([...selectedDocuments, document])
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          New Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New Verification Request</DialogTitle>
            <DialogDescription>Create a new verification request for a user.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">User Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Required Documents</Label>
              <div className="grid gap-2">
                {["ID Proof", "Address Proof", "Income Proof", "Bank Statement", "Tax Returns"].map((document) => (
                  <div key={document} className="flex items-center space-x-2">
                    <Checkbox
                      id={document.replace(/\s+/g, "-").toLowerCase()}
                      checked={selectedDocuments.includes(document)}
                      onCheckedChange={() => toggleDocument(document)}
                    />
                    <Label htmlFor={document.replace(/\s+/g, "-").toLowerCase()} className="text-sm font-normal">
                      {document}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select defaultValue="normal">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional information or requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

