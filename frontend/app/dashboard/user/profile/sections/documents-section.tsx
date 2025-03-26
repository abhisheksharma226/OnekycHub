import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, CheckCircle, Clock } from "lucide-react"

interface Document {
  type: string
  status: string
  lastUpdated: string
}

interface DocumentsSectionProps {
  documents: Document[]
}

export function DocumentsSection({ documents }: DocumentsSectionProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return (
          <Badge className="bg-black text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="border-gray-400 text-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Uploaded Documents</h3>
      </div>

      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex flex-col mb-2 md:mb-0">
              <span className="font-medium text-black">{doc.type}</span>
              <span className="text-sm text-gray-500">Last updated: {doc.lastUpdated}</span>
            </div>

            <div className="flex items-center space-x-3">
              {getStatusBadge(doc.status)}

              <Button variant="outline" size="sm" className="flex items-center">
                <Upload className="h-4 w-4 mr-1" />
                Re-upload
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

