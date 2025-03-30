"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      })

      if (result?.error) {
        setError("Credenciales incorrectas")
      } else if (result?.ok) {
        router.push(callbackUrl)
      }
    } catch (error) {
      setError("Ocurrió un error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-neutral-800 bg-neutral-900 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Access</h1>
          <p className="mt-2 text-neutral-400">Inicia sesión para administrar tus proyectos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-neutral-700 bg-neutral-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-neutral-700 bg-neutral-800"
            />
          </div>

          {error && <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">{error}</div>}

          <Button type="submit" className="w-full bg-neutral-800 hover:bg-neutral-700" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="inline-flex items-center text-sm text-neutral-400 hover:text-white">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  )
}

