"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Eye, EyeOff, ArrowRight, Check } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

const signupSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === false, { message: "You must accept the terms and conditions" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      terms: false,
    },
  })

  const password = watch("password", "")
  const hasLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)

  const onSubmit = async (data: any) => {
    try {
        const response = await fetch(`http://localhost:8000/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            window.location.href = "/login";
        } else {
            setError("Failed to register. Please try again.");
        }
    } catch (err) {
        setError("An error occurred. Please try again later.");
    }
};


const onInstitutionSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Prevent default form submission behavior
  console.log("Submit button clicked");

  const institutionData = {
    name: (document.getElementById("name") as HTMLInputElement)?.value,
    registrationId: (document.getElementById("registrationId") as HTMLInputElement)?.value,
    email: (document.getElementById("email") as HTMLInputElement)?.value,
    password: (document.getElementById("password") as HTMLInputElement)?.value,
  };

  console.log("Institution Data: ", institutionData);

  try {
    const response = await fetch(`http://localhost:8000/api/register-institution`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(institutionData),
    });

    console.log("API Response Status: ", response.status);
    // console.log(institutionData)

    if (response.ok) {
      console.log("Institution registered successfully!");
      window.location.href = "/login"; // Redirect after successful registration
    } else {
      console.error("API Response Error: ", await response.text());
      setError("Failed to register institution. Please try again.");
    }
  } catch (err) {
    console.error("Network Error: ", err);
    setError("An error occurred. Please try again later.");
  }
};


// //auto scroll to first error field
// const handleInvalid = (errors: any) => {
//   const firstErrorField = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
//   if (firstErrorField) {
//       firstErrorField.scrollIntoView({ behavior: "smooth" });
//   }


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
        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white dark:bg-black rounded-lg p-1 shadow-md border border-gray-200 dark:border-gray-800">
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
          </TabsList>

          <TabsContent value="user">
            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-xl">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                  Enter your information to create a user account
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        className="h-12 pl-4 pr-4 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
                        {...register("firstName")}
                      />
                      {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        className="h-12 pl-4 pr-4 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
                        {...register("lastName")}
                      />
                      {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="h-12 pl-4 pr-4 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
                      {...register("email")}
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
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

                    <div className="mt-3 space-y-2">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Password requirements:</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div
                          className={`flex items-center text-xs ${hasLength ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}
                        >
                          {hasLength ? (
                            <Check className="h-3 w-3 mr-1" />
                          ) : (
                            <span className="h-3 w-3 mr-1 rounded-full border border-gray-300 dark:border-gray-600" />
                          )}
                          At least 8 characters
                        </div>
                        <div
                          className={`flex items-center text-xs ${hasUppercase ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}
                        >
                          {hasUppercase ? (
                            <Check className="h-3 w-3 mr-1" />
                          ) : (
                            <span className="h-3 w-3 mr-1 rounded-full border border-gray-300 dark:border-gray-600" />
                          )}
                          Uppercase letter
                        </div>
                        <div
                          className={`flex items-center text-xs ${hasLowercase ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}
                        >
                          {hasLowercase ? (
                            <Check className="h-3 w-3 mr-1" />
                          ) : (
                            <span className="h-3 w-3 mr-1 rounded-full border border-gray-300 dark:border-gray-600" />
                          )}
                          Lowercase letter
                        </div>
                        <div
                          className={`flex items-center text-xs ${hasNumber ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}
                        >
                          {hasNumber ? (
                            <Check className="h-3 w-3 mr-1" />
                          ) : (
                            <span className="h-3 w-3 mr-1 rounded-full border border-gray-300 dark:border-gray-600" />
                          )}
                          Number
                        </div>
                        <div
                          className={`flex items-center text-xs ${hasSpecial ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}
                        >
                          {hasSpecial ? (
                            <Check className="h-3 w-3 mr-1" />
                          ) : (
                            <span className="h-3 w-3 mr-1 rounded-full border border-gray-300 dark:border-gray-600" />
                          )}
                          Special character
                        </div>
                      </div>
                    </div>

                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 pl-4 pr-12 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
                        {...register("confirmPassword")}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-500"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  {/* <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="terms"
                      className="h-5 w-5 border-gray-300 dark:border-gray-700 data-[state=checked]:bg-black data-[state=checked]:border-black dark:data-[state=checked]:bg-white dark:data-[state=checked]:border-white rounded"
                      {...register("terms")}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-black font-medium hover:text-gray-600 dark:text-white dark:hover:text-gray-300 underline-offset-4 hover:underline"
                      >
                        terms and conditions
                      </Link>
                    </Label>
                  </div> */}
                  {errors.terms && <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>}
                </CardContent>

                <CardFooter className="flex flex-col space-y-6 pt-4">
                <Button
                    type="submit"
                    className="w-full h-12 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create account"}
                    {!isLoading && <ArrowRight className="h-4 w-4" />}
                </Button>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-black font-medium hover:text-gray-600 dark:text-white dark:hover:text-gray-300 underline-offset-4 hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="institution">
  <form onSubmit={onInstitutionSubmit}>
    <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-xl">
      <CardHeader className="pb-8">
        <CardTitle className="text-2xl">Register Institution</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
          Enter your information to register your financial institution
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="institution-name" className="text-sm font-medium">
            Institution Name
          </Label>
          <Input
            id="name"
            className="h-12 pl-4 pr-4 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="institution-id" className="text-sm font-medium">
            Registration ID
          </Label>
          <Input
            id="registrationId"
            placeholder="Business registration number"
            className="h-12 pl-4 pr-4 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="institution-email" className="text-sm font-medium">
            Business Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="contact@institution.com"
            className="h-12 pl-4 pr-4 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="institution-password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
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
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="institution-terms"
            className="h-5 w-5 border-gray-300 dark:border-gray-700 data-[state=checked]:bg-black data-[state=checked]:border-black dark:data-[state=checked]:bg-white dark:data-[state=checked]:border-white rounded"
          />
          <Label htmlFor="institution-terms" className="text-sm">
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-black font-medium hover:text-gray-600 dark:text-white dark:hover:text-gray-300 underline-offset-4 hover:underline"
            >
              terms and conditions
            </Link>
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-6 pt-4">
        <Button type="submit" className="w-full h-12 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all">
          Register Institution
          <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already registered?{" "}
          <Link
            href="/login"
            className="text-black font-medium hover:text-gray-600 dark:text-white dark:hover:text-gray-300 underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  </form>
</TabsContent>;
        </Tabs>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        By creating an account, you agree to our{" "}
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

