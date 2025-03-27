import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle, Clock, XCircle, Eye } from "lucide-react";
import { useState } from "react";

interface Document {
  type: string;
  status?: string; // Optional status
  lastUpdated?: string; // Optional last updated timestamp
  url?: string; // Document URL to check if uploaded
}

interface DocumentsSectionProps {
  idDocumentType: string;
  idDocument: string | null;
  addressProof: string | null;
  selfie: string | null;
}

export function DocumentsSection({
  idDocumentType,
  idDocument,
  addressProof,
  selfie
}: DocumentsSectionProps) {

  // Construct document details manually based on props
  const documents: Document[] = [
    {
      type: idDocumentType || "Identity Document",
      status: idDocument ? "Verified" : "Not Uploaded",
      url: idDocument || undefined,
      lastUpdated: idDocument ? "Recently Uploaded" : undefined, // Placeholder for a real timestamp
    },
    {
      type: "Address Proof",
      status: addressProof ? "Verified" : "Not Uploaded",
      url: addressProof || undefined,
      lastUpdated: addressProof ? "Recently Uploaded" : undefined, // Placeholder for a real timestamp
    },
    {
      type: "Selfie Proof",
      status: selfie ? "Verified" : "Not Uploaded",
      url: selfie || undefined,
      lastUpdated: selfie ? "Recently Uploaded" : undefined, // Placeholder for a real timestamp
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case "Pending":
        return (
          <Badge variant="outline" className="border-gray-400 text-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            <XCircle className="h-3 w-3 mr-1" />
            Not Uploaded
          </Badge>
        );
    }
  };

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
              <span className="text-sm text-gray-500">
                Last updated: {doc.lastUpdated || "N/A"}
              </span>
            </div>

            <div className="flex items-center space-x-3">
  {/* Show status badge */}
  {getStatusBadge(doc.status || "Not Uploaded")}

            {/* Show 'View Document' button if URL exists */}
            {doc.url && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() => window.open(doc.url, "_blank")}
              >
                <Eye className="h-4 w-4 mr-1" />
                View Document
              </Button>
            )}
          </div>

          </div>
        ))}
      </div>
    </div>
  );
}
