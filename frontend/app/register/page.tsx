import KycForm from "./kyc-form"

export default function register() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">KYC Verification</h1>
      <div className="max-w-3xl mx-auto">
        <KycForm />
      </div>
    </main>
  )
}

