import { Badge } from "@/components/ui/badge"
import { ShieldCheck, ShieldAlert } from "lucide-react"

interface AdditionalInfoProps {
  createdAt: string
  updatedAt: string
  consentStatus: string
  twoFactorEnabled: boolean
}

export function AdditionalInfo({ createdAt, updatedAt, consentStatus, twoFactorEnabled }: AdditionalInfoProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Additional Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Account Created</p>
          <p className="font-medium text-black">{createdAt}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Last Update</p>
          <p className="font-medium text-black">{updatedAt}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Consent Status</p>
          <Badge
            variant={consentStatus === "Consent Given" ? "default" : "outline"}
            className={consentStatus === "Consent Given" ? "bg-black text-white" : ""}
          >
            {consentStatus}
          </Badge>
        </div>

        <div>
          <p className="text-sm text-gray-500">Two-Factor Authentication</p>
          <div className="flex items-center mt-1">
            {twoFactorEnabled ? (
              <>
                <ShieldCheck className="h-4 w-4 mr-1 text-black" />
                <span className="font-medium text-black">Enabled</span>
              </>
            ) : (
              <>
                <ShieldAlert className="h-4 w-4 mr-1 text-gray-500" />
                <span className="font-medium text-gray-500">Disabled</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

