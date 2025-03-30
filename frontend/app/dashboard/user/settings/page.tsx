"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import CONFIG from "@/utils/config";

export default function SecurityAndPrivacySettings() {
  const [email, setEmail] = useState(""); // Get email from local storage or auth state
  const [preferences, setPreferences] = useState({
    securityPreferences: {
      twoFactorAuth: false,
      emailVerification: false,
      loginAlerts: false,
    },
    dataPrivacy: {
      dataSharing: false,
      marketingCommunications: false,
    },
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
      fetchPreferences(storedEmail);
    } else {
      console.error("❌ No email found in local storage.");
    }
  }, []);
  

  // Fetch user preferences from API
  const fetchPreferences = async (userEmail: string) => {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/settings/get?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Preferences from API:", data); // Debugging
  
        if (data.data) {
          setPreferences({
            securityPreferences: {
              twoFactorAuth: data.data.securityPreferences?.twoFactorAuth ?? false,
              emailVerification: data.data.securityPreferences?.emailVerification ?? false,
              loginAlerts: data.data.securityPreferences?.loginAlerts ?? false,
            },
            dataPrivacy: {
              dataSharing: data.data.dataPrivacy?.dataSharing ?? false,
              marketingCommunications: data.data.dataPrivacy?.marketingCommunications ?? false,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error fetching preferences:", error);
    }
  };
  

  // Save preferences automatically whenever they change
  const savePreferences = async (updatedPreferences: typeof preferences) => {
    if (!email) {
      console.error("❌ Email is missing. Preferences cannot be saved.");
      return;
    }
  
    try {
      console.log("Saving Preferences:", updatedPreferences); // Debugging log
  
      const response = await fetch(`${CONFIG.BASE_URL}/settings/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          securityPreferences: updatedPreferences.securityPreferences,
          dataPrivacy: updatedPreferences.dataPrivacy,
        }),
      });
  
      if (!response.ok) {
        console.error("❌ Failed to save preferences.");
      } else {
        console.log("✅ Preferences successfully saved!");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };
  
  // Handle toggle switch and auto-save
  const handleToggle = <T extends keyof typeof preferences>(
    category: T,
    key: keyof (typeof preferences)[T]
  ) => {
    setPreferences((prev) => {
      const updatedPreferences = {
        ...prev,
        [category]: {
          ...prev[category],
          [key]: !prev[category][key as keyof (typeof preferences)[T]],
        },
      };
  
      return updatedPreferences;
    });
  
    // Wait for state update and save
    setTimeout(() => {
      savePreferences(preferences);
    }, 100);
  };
  


  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">OneKYCHub Settings</h1>
          <div className="flex items-center gap-4">
            {/* <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button> */}
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 py-8">
        {/* <Tabs defaultValue="settings" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger> */}
            {/* <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger> */}
          {/* </TabsList> */}

          {/* Settings Tab */}
          {/* <TabsContent value="settings">
            <div className="grid gap-6"> */}
               <Card>
        <CardHeader>
          <CardTitle>Security Preferences</CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Two-Factor Authentication (2FA)</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Switch
              id="two-factor"
              checked={preferences.securityPreferences.twoFactorAuth}
              onCheckedChange={() => handleToggle("securityPreferences", "twoFactorAuth")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-verification">Email Verification</Label>
              <p className="text-sm text-muted-foreground">Verify your identity through email</p>
            </div>
            <Switch
              id="email-verification"
              checked={preferences.securityPreferences.emailVerification}
              onCheckedChange={() => handleToggle("securityPreferences", "emailVerification")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="login-alerts">Login Alerts</Label>
              <p className="text-sm text-muted-foreground">Receive alerts for new login attempts</p>
            </div>
            <Switch
              id="login-alerts"
              checked={preferences.securityPreferences.loginAlerts}
              onCheckedChange={() => handleToggle("securityPreferences", "loginAlerts")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Privacy Options Card */}
      <Card>
        <CardHeader>
          <CardTitle>Data Privacy Options</CardTitle>
          <CardDescription>Control how your data is used and shared</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data-sharing">Data Sharing</Label>
              <p className="text-sm text-muted-foreground">Allow sharing your verification status with partners</p>
            </div>
            <Switch
              id="data-sharing"
              checked={preferences.dataPrivacy.dataSharing}
              onCheckedChange={() => handleToggle("dataPrivacy", "dataSharing")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing">Marketing Communications</Label>
              <p className="text-sm text-muted-foreground">Receive updates about new features and services</p>
            </div>
            <Switch
              id="marketing"
              checked={preferences.dataPrivacy.marketingCommunications}
              onCheckedChange={() => handleToggle("dataPrivacy", "marketingCommunications")}
            />
          </div>
        </CardContent>
        <CardFooter>
        <Button
            className="w-full"
            onClick={() => {
              console.log("Manually Saving Preferences:", preferences); // Debugging log
              savePreferences(preferences);
            }}
          >
            Update Preferences
          </Button>

        </CardFooter>

      </Card>
            {/* </div>
          </TabsContent> */}

          {/* Documents Tab
          <TabsContent value="documents">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Your KYC Documents</CardTitle>
                    <Button className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload New</span>
                    </Button>
                  </div>
                  <CardDescription>Manage and track your verification documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">ID Proof</h3>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                            >
                              Verified
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Passport uploaded on 12 Mar 2023</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            Replace
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Address Proof</h3>
                            <Badge
                              variant="outline"
                              className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-700"
                            >
                              Pending
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Utility bill uploaded on 15 Mar 2023</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            Replace
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Income Proof</h3>
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                            >
                              Rejected
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Bank statement uploaded on 18 Mar 2023</p>
                          <p className="text-xs text-red-600">Reason: Document is not clearly visible</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            Replace
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
                  <p className="text-sm text-muted-foreground">Last updated: 20 Mar 2023</p>
                  <Button variant="ghost" size="sm">
                    View Verification History
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent> */}

          {/* Notifications Tab */}
          {/* <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>System Notifications</CardTitle>
                <CardDescription>Updates and alerts related to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-lg border-l-4 border-green-500 bg-gray-50 p-4">
                    <Shield className="h-5 w-5 text-green-500" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">ID Verification Successful</h3>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                        >
                          High Priority
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Your passport has been successfully verified.</p>
                      <p className="text-xs text-muted-foreground">Today, 09:42 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-lg border-l-4 border-yellow-500 bg-gray-50 p-4">
                    <Bell className="h-5 w-5 text-yellow-500" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Address Verification Pending</h3>
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-700"
                        >
                          Medium Priority
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your address proof is under review. This usually takes 1-2 business days.
                      </p>
                      <p className="text-xs text-muted-foreground">Yesterday, 14:30 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-lg border-l-4 border-red-500 bg-gray-50 p-4">
                    <Shield className="h-5 w-5 text-red-500" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Income Proof Rejected</h3>
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
                          High Priority
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your income proof document was rejected. Please upload a clearer version.
                      </p>
                      <p className="text-xs text-muted-foreground">Mar 18, 2023, 11:15 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-lg border-l-4 border-blue-500 bg-gray-50 p-4">
                    <Bell className="h-5 w-5 text-blue-500" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Security Alert</h3>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                        >
                          Low Priority
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        New login detected from New York, USA. If this wasn't you, please secure your account.
                      </p>
                      <p className="text-xs text-muted-foreground">Mar 15, 2023, 08:22 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
                <Button variant="outline">Mark All as Read</Button>
                <Button variant="ghost" size="sm">
                  View All Notifications
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs> */}
      </main>
    </div>
  )
}

