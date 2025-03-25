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
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!email) {
          setError("Email parameter is missing.");
          setIsLoading(false);
          return;
        }
  
        const response = await fetch(`${CONFIG.BASE_URL}/dashboard/user/?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
  
          const mappedData: UserData = {
            firstName: data.firstName,
            email: data.email,
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
        } else {
          setError("Failed to fetch user data.");
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">In Progress</div>
            <p className="text-xs text-muted-foreground">2 of 3 steps completed</p>
            <Progress value={66} className="mt-3" />
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Submitted</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
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
            <p className="text-xs text-muted-foreground">Verified</p>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Good</p>
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
