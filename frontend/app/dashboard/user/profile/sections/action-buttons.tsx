"use client"

import { Button } from "@/components/ui/button"
import { Download, Edit, Trash2 } from "lucide-react"

interface ActionButtonsProps {
  isEditing: boolean
  onEdit: () => void
  onCancel: () => void
}

export function ActionButtons({ isEditing, onEdit, onCancel }: ActionButtonsProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap gap-2">
        {!isEditing && (
          <>
            <Button variant="outline" className="flex items-center" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Update Profile
            </Button>

            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Download Profile Data
            </Button>
          </>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <Button variant="destructive" className="bg-white text-red-600 border border-red-600 hover:bg-red-50">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Account
        </Button>
        <p className="mt-2 text-xs text-gray-500">
          This action cannot be undone. All your data will be permanently removed.
        </p>
      </div>
    </div>
  )
}

