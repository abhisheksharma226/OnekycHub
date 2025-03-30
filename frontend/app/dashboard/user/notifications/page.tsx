"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import CONFIG from "@/utils/config";
import { Bell, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SecurityAndPrivacySettings() {
  
  


  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">OneKYCHub Notifications</h1>
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
        
          {/* Notifications Tab */}
          {/* { <TabsContent value="notifications"> */}
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
                {/* <Button variant="outline">Mark All as Read</Button>
                <Button variant="ghost" size="sm">
                  View All Notifications
                </Button> */}
              </CardFooter>
            </Card>

      </main>
    </div>
  )
}

