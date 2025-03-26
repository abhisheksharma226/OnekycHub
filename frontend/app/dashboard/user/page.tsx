"use client"; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Clock, FileText, Upload, Building, Shield } from "lucide-react";
import Link from "next/link";

import CONFIG from "../../../utils/config";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

//Hi

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Extract email from URL

  interface UserData {
    firstName: string;
    email: string;
    verificationStatus: string;
    addressProof?: string;
    selfie?: string;
    idDocumentType?: string;
    idDocument?: string;
    submittedDocuments: Array<{
      type: string;
      name: string;
      url?: string;
      uploadedDate?: string;
      verified: boolean;
    }>;
    institutions: string[];
    securityScore: number;
    nationality?: string;
    isVerified?: boolean;
    isConfirmed?: boolean;
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);



  const [showPopup, setShowPopup] = useState(false);

// Calculate progress and status based on the mock data
const uploadedDocsCount =
  userData?.submittedDocuments?.filter((doc) => doc.url).length || 0;
const isVerified = userData?.isVerified || true; // Mock data for verification status
const isConfirmed = userData?.isConfirmed || false; // Mock data for confirmation email status

// Calculate percentage
const percentage = isConfirmed
  ? 100
  : isVerified
  ? 66.66
  : uploadedDocsCount > 0
  ? 33.33
  : 0;

// Determine steps completed text
const stepsCompletedText = isConfirmed
  ? "3 of 3 steps completed"
  : isVerified
  ? "2 of 3 steps completed"
  : uploadedDocsCount > 0
  ? "1 of 3 steps completed"
  : "0 of 3 steps completed";

// Determine status text
const statusText = isConfirmed
  ? "Excellent"
  : isVerified
  ? "Good"
  : uploadedDocsCount > 0
  ? "Intermediate"
  : "Start KYC";

// Toggle popup
const togglePopup = () => setShowPopup(!showPopup);


  useEffect(() => {
    const fetchData = async () => {

      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      // Redirect to login if token or email is missing
      if (!token || !email) {
        window.location.href = "/login";
        return;
      }

      try {
        if (!email) {
          setError("Email parameter is missing.");
          setIsLoading(false);
          return;
        }
  
        const response = await fetch(`${CONFIG.BASE_URL}/dashboard/user?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Save user data
          setError(null);
          console.log(data);
  
          const mappedData: UserData = {
            firstName: data.firstName,
            email: data.email,
            nationality: data.nationality,
            verificationStatus: "In Progress",
            submittedDocuments: [
              {
                type: "ID Document",
                name: data.idDocumentType,
                url: data.idDocument,
                uploadedDate: "2025-03-01",
                verified: false,
              },
              {
                type: "Address Proof",
                name: "Address Proof",
                url: data.addressProof,
                uploadedDate: "2025-03-01",
                verified: false,
              },
              {
                type: "Selfie",
                name: "Selfie",
                url: data.selfie,
                uploadedDate: "2025-03-01",
                verified: false,
              },
            ],
            institutions: [],
            securityScore: 85,
          };
  
          setUserData(mappedData);
          setError(null);
        } else if (response.status === 401) {
          setError("Unauthorized access. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          window.location.href = "/login";
        } else {
          setError("Failed to fetch user data.");
          window.location.href = "/login";
        }
      } catch (error) {
        setError("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData(); // Make sure to call the function
  }, [email]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

 

  return (
    <div className="w-full max-w-screen-xl mx-auto space-y-6 px-4 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome back, {userData?.firstName || "User"}
          </h2>
          <p className="text-muted-foreground">
            Here's an overview of your KYC verification status.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/user/documents/upload/?email=${encodeURIComponent(userData?.email || "")}`}
          >
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Get Verified
            </Button>
          </Link>
        </div>
      </div>
  
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Action Required</AlertTitle>
        <AlertDescription>Please complete your KYC verification to unlock all features.</AlertDescription>
      </Alert>
  
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
          <Button
            variant="outline"
            className="rounded-full h-8 w-8 flex items-center justify-center"
            onClick={togglePopup}
          >
            <Clock className="h-4 w-4 text-muted-foreground" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statusText}</div>
          <p className="text-xs text-muted-foreground">{stepsCompletedText}</p>
          <Progress value={percentage} className="mt-3" />
        </CardContent>
      </Card>

      {/* Popup for KYC Process */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-5 w-1/3 shadow-lg">
            <h2 className="text-lg font-bold mb-4">KYC Process</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li className={uploadedDocsCount > 0 ? "text-green-500" : "text-gray-500"}>
                Upload Documents {uploadedDocsCount > 0 && "✔"}
              </li>
              <li className={isVerified ? "text-green-500" : "text-gray-500"}>
                Verification by Admin {isVerified && "✔"}
              </li>
              <li className={isConfirmed ? "text-green-500" : "text-gray-500"}>
                Email Confirmation Sent {isConfirmed && "✔"}
              </li>
            </ol>
            <button
                onClick={togglePopup}
                className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
          </div>
        </div>
      )}
    </div>
  
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Submitted</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userData?.submittedDocuments.filter((doc) => doc.url).length || 0} / 3
            </div>
            <p className="text-xs text-muted-foreground">ID, Address Proof, and Selfie</p>
          </CardContent>

        </Card>
  
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nationality</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData?.nationality || "N/A"}</div>
            <p className="text-xs text-muted-foreground">
              {userData?.nationality && userData.nationality !== "N/A" ? "Verified" : "Not Verified"}
            </p>
          </CardContent>
        </Card>


        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {(() => {
                const uploadedDocsCount =
                  userData?.submittedDocuments.filter((doc) => doc.url).length || 0;
                const percentage = (uploadedDocsCount / 3) * 100;
                let status = "Intermediate"; // Default status

                if (uploadedDocsCount === 2) status = "Good";
                if (uploadedDocsCount === 3) status = "Excellent";

                return (
                  <>
                    <div className="text-2xl font-bold">{percentage.toFixed(2)}%</div>
                    <p className="text-xs text-muted-foreground">{status}</p>
                    <Progress value={percentage} className="mt-3" />
                  </>
                );
              })()}
            </CardContent>
          </Card>

      </div>
  
      <Tabs defaultValue="documents">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="requests">Verification Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Documents</CardTitle>
              <CardDescription>Manage your submitted KYC documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData?.submittedDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded-lg border p-4 ${
                      doc.url ? "" : "border-dashed"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <FileText
                        className={`h-8 w-8 ${
                          doc.url ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{doc.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.url ? `Uploaded successfully` : "Not uploaded yet"}
                        </p>
                      </div>
                    </div>
                    {doc.url ? (
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Pending Verification
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300"
                        >
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Not Uploaded
                        </Badge>
                      )}

                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
