"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Eye, EyeOff, ArrowRight } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define a schema for validation (shared for all tabs)
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"user" | "institution" | "admin">("user") // Track active tab

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true)
    setError(null)

    try {
      // Replace this with your actual backend API URL
      const apiUrl = "http://localhost:8000/api/login"

      // Make API request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          loginType: activeTab, // Include the active tab (login type) in the payload
        }),
      })

      if (!response.ok) {
        const errorDetails = await response.json()
        console.error("Error details:", errorDetails)
        throw new Error(errorDetails.message || "Invalid email or password. Please try again.")
      }

      const result = await response.json()

      // Handle success (e.g., save token, redirect)
      console.log("Login successful:", result)
      window.location.href = `/dashboard/${activeTab}` // Redirect based on user type
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black p-4 relative">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white dark:from-black to-transparent"></div>

      <Link href="/" className="flex items-center gap-2 mb-12 relative">
        <div className="absolute -inset-4 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm -z-10"></div>
        <Shield className="h-7 w-7 text-black dark:text-white" />
        <span className="text-2xl font-bold tracking-tight">OneKYCHub</span>
      </Link>

      <div className="w-full max-w-md relative z-10">
        <Tabs defaultValue="user"   
          onValueChange={(value) => setActiveTab(value as "user" | "institution" | "admin")}
          className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white dark:bg-black rounded-lg p-1 shadow-md border border-gray-200 dark:border-gray-800">
            <TabsTrigger
              value="user"
              className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black rounded-md"
            >
              User
            </TabsTrigger>
            <TabsTrigger
              value="institution"
              className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black rounded-md"
            >
              Institution
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black rounded-md"
            >
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-xl">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl">User Login</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  {error && (
                    <Alert
                      variant="destructive"
                      className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/30"
                    >
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="h-12 pl-4 pr-4 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300 underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 pl-4 pr-12 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
                        {...register("password")}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-6 pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                    {!isLoading && <ArrowRight className="h-4 w-4" />}
                  </Button>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-black font-medium hover:text-gray-600 dark:text-white dark:hover:text-gray-300 underline-offset-4 hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="institution">
        <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-xl">
          <CardHeader className="pb-8">
            <CardTitle className="text-2xl">Institution Login</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
              Enter your credentials to access your institution account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
            {error && (
                    <Alert
                      variant="destructive"
                      className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/30"
                    >
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
              <div className="space-y-2">
                <Label htmlFor="institution-email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="institution-email"
                    type="email"
                    placeholder="name@institution.com"
                    {...register("email")} // Bind the email input to useForm
                    className={`h-12 pl-4 pr-4 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black ${
                      errors.email ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="institution-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300 underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="institution-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")} // Bind the password input to useForm
                    className={`h-12 pl-4 pr-12 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black ${
                      errors.password ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
            </CardContent>

      <CardFooter className="flex flex-col space-y-6 pt-4">
        <Button
          type="submit"
          className="w-full h-12 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
          <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-black font-medium hover:text-gray-600 dark:text-white dark:hover:text-gray-300 underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && (
          <Alert className="mt-4" variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </form>
  </Card>
</TabsContent>


          <TabsContent value="admin">
            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-xl">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl">Admin Login</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                  Enter your credentials to access the admin panel
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email" className="text-sm font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@onekyc.com"
                        className="h-12 pl-4 pr-4 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="admin-password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300 underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 pl-4 pr-12 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-6 pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    Sign in
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        By signing in, you agree to our{" "}
        <Link href="/terms" className="text-black dark:text-white underline-offset-4 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-black dark:text-white underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  )
}

