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
    verificationStatus: string;
    submittedDocuments: string[];
    institutions: string[];
    securityScore: number;
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!email) {
          console.error("Email is missing in the URL params.");
          setError("Email parameter is missing.");
          setIsLoading(false);
          return;
        }

        const response = await fetch(`${CONFIG.BASE_URL}/dashboard/user?email=${(email)}`);
        console.log("Fetch response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched user data:", data);
          setUserData(data);
          setError(null); // Clear any previous errors
        } else {
          const errorText = await response.text();
          console.error("API Error:", errorText);
          setError("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, {userData?.firstName || "User"}</h2>
          <p className="text-muted-foreground">Here's an overview of your KYC verification status.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/user/documents/upload">
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
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">ID and Address Proof</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Institutions Shared</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Global Finance Corp</p>
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
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">ID Proof - Passport</p>
                      <p className="text-sm text-muted-foreground">Uploaded on Mar 10, 2023</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                    <CheckCircle className="mr-1 h-3 w-3" /> Verified
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Address Proof - Utility Bill</p>
                      <p className="text-sm text-muted-foreground">Uploaded on Mar 12, 2023</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                    <CheckCircle className="mr-1 h-3 w-3" /> Verified
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4 border-dashed">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Income Proof</p>
                      <p className="text-sm text-muted-foreground">Not uploaded yet</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-3 w-3" />
                    Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
