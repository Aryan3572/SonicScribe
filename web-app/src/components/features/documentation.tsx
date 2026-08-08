"use client"
import { FileUpload } from "@/components/ui/FileUpload"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"
import { MultiStepLoader } from "@/components/ui/multi-step-loader"
import { IconSquareRoundedX } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { StructuredAnalysisDisplay } from "@/components/structured-analysis-display"
import { useLoading } from "@/lib/use-loading"

const loadingStates = [
  { text: "Reading audio file..." },
  { text: "Uploading to Cloudinary..." },
  { text: "Saving metadata to database..." },
  { text: "Sending to AI model for processing..." },
  { text: "Analyzing symptoms and medical history..." },
  { text: "Generating diagnosis report..." },
  { text: "Finalizing..." },
]

interface DocumentationResponse {
  analysis: {
    structured: {
      age_gender: string
      medical_history: string[]
      name: string
      notes: string
      possible_disease: string[]
      recommendation: {
        next_steps: string
        should_be_admitted: boolean
      }
      risk_prediction: string
      symptoms: string[]
    }
    transcript: string
    triage: {
      advice: string
      probable_conditions: string[]
      specialist_to_consult: string
      triage_level: string
    }
  }
  file: {
    originalName: string
    uploadedAt: string
    url: string | null
  }
  success: boolean
}

export function Documentation() {
  const { loading, showAlert, analysis, startLoading, stopLoading, setLoading, resetState } = useLoading()

  async function handleUpload(files: File[]) {
    startLoading()

    const formData = new FormData()
    formData.append("file", files[0])

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      console.log("Upload response:", data)

      if (data.success) {
        // Store the entire response object as a JSON string
        stopLoading(JSON.stringify(data))
      } else {
        alert(data.error || "Upload failed. Please try again.")
        setLoading(false)
      }
    } catch (err) {
      console.error("Upload failed", err)
      alert("An unexpected error occurred during upload. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 relative">
      {!analysis ? (
        <div className="w-full max-w-2xl">
          <FileUpload onChange={handleUpload} />
        </div>
      ) : (
        <div className="mt-8 flex justify-center w-full max-w-2xl">
          <Button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            onClick={resetState}
          >
            Upload Another Audio File
          </Button>
        </div>
      )}

      {showAlert && (
        <div className="mt-6 w-full max-w-2xl">
          <Alert>
            <CheckCircle2Icon className="h-5 w-5" />
            <AlertTitle>Success! Your file has been uploaded.</AlertTitle>
            <AlertDescription>It is now stored securely and ready for use.</AlertDescription>
          </Alert>
        </div>
      )}

      <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={1500} loop={false} />

      {loading && (
        <Button className="fixed top-4 right-4 text-white z-50" onClick={() => setLoading(false)}>
          <IconSquareRoundedX className="h-10 w-10" />
        </Button>
      )}

      {analysis && <StructuredAnalysisDisplay data={analysis} />}
    </div>
  )
}
