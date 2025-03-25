"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Copy, Key, RefreshCw, Eye, EyeOff } from "lucide-react"

export default function ApiIntegration() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState("sk_live_51NxSDbLkjhGFDSa7890JHGFDSa789")
  const [copiedKey, setCopiedKey] = useState(false)

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2000)
  }

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey)
  }

  // Sample code snippets
  const codeSnippets = {
    curl: `curl -X GET "https://api.onekychub.com/v1/users/{user_id}" \\
  -H "Authorization: Bearer ${apiKey.substring(0, 10)}..." \\
  -H "Content-Type: application/json"`,
    node: `const axios = require('axios');

const getUserData = async (userId) => {
  try {
    const response = await axios.get(
      \`https://api.onekychub.com/v1/users/\${userId}\`,
      {
        headers: {
          'Authorization': 'Bearer ${apiKey.substring(0, 10)}...',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};`,
    python: `import requests

def get_user_data(user_id):
    url = f"https://api.onekychub.com/v1/users/{user_id}"
    headers = {
        "Authorization": "Bearer ${apiKey.substring(0, 10)}...",
        "Content-Type": "application/json"
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None`,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>API Key</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gray-100 p-3 rounded-md">
                  <Key className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Live API Key</p>
                  <p className="text-sm text-gray-500">Use this key for production environments</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Input
                    type={showApiKey ? "text" : "password"}
                    value={showApiKey ? apiKey : "•".repeat(Math.min(apiKey.length, 30))}
                    readOnly
                    className="pr-10 font-mono text-sm bg-white border-gray-200"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={toggleApiKeyVisibility}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button variant="outline" size="icon" onClick={copyApiKey} className="border-gray-200">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              {copiedKey && <p className="text-sm text-gray-500">API key copied to clipboard</p>}

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Created: July 10, 2023</p>
                  <p className="text-sm text-gray-500">Last used: 2 hours ago</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="border-gray-200">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Rotate Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Rotate API Key</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to rotate your API key? This will invalidate your current key and generate
                        a new one.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                      <Button variant="outline" className="border-gray-200">
                        Cancel
                      </Button>
                      <Button className="bg-black text-white hover:bg-gray-800">Rotate Key</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Requests this month</p>
                  <p className="text-2xl font-bold">1,284</p>
                </div>
                <Badge variant="outline" className="bg-gray-100 text-black border-gray-200">
                  Premium Plan
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Rate limit</span>
                  <span className="font-medium">10,000 / month</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-black rounded-full" style={{ width: "12.84%" }}></div>
                </div>
                <p className="text-xs text-gray-500">12.84% of monthly limit used</p>
              </div>

              <div className="pt-2">
                <p className="text-sm font-medium">Top Endpoints</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center justify-between text-sm">
                    <span>/v1/users/{"{user_id}"}</span>
                    <span>845 requests</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span>/v1/documents</span>
                    <span>312 requests</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span>/v1/consents</span>
                    <span>127 requests</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="curl">
            <TabsList className="mb-4">
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="node">Node.js</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>
            <TabsContent value="curl">
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-sm overflow-x-auto whitespace-pre-wrap">{codeSnippets.curl}</pre>
              </div>
            </TabsContent>
            <TabsContent value="node">
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-sm overflow-x-auto whitespace-pre-wrap">{codeSnippets.node}</pre>
              </div>
            </TabsContent>
            <TabsContent value="python">
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-sm overflow-x-auto whitespace-pre-wrap">{codeSnippets.python}</pre>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 space-y-4">
            <p className="font-medium">Available Endpoints</p>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-100 text-black border-gray-200">
                    GET
                  </Badge>
                  <span className="font-mono text-sm">/v1/users/{"{user_id}"}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">Retrieve KYC data for a specific user</p>
              </div>
              <div className="border-b pb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-100 text-black border-gray-200">
                    GET
                  </Badge>
                  <span className="font-mono text-sm">/v1/documents/{"{document_id}"}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">Retrieve a specific document</p>
              </div>
              <div className="border-b pb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-100 text-black border-gray-200">
                    POST
                  </Badge>
                  <span className="font-mono text-sm">/v1/requests</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">Create a new data access request</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-100 text-black border-gray-200">
                    GET
                  </Badge>
                  <span className="font-mono text-sm">/v1/consents</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">List all consents for your institute</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="outline" className="border-gray-200">
              View Full Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

