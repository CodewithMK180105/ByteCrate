"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, RefreshCw, Key, Shield, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState([16])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)
  const [strength, setStrength] = useState(0)

  const calculateStrength = (pwd: string) => {
    let score = 0
    if (pwd.length >= 8) score += 25
    if (pwd.length >= 12) score += 25
    if (/[a-z]/.test(pwd)) score += 10
    if (/[A-Z]/.test(pwd)) score += 10
    if (/[0-9]/.test(pwd)) score += 10
    if (/[^A-Za-z0-9]/.test(pwd)) score += 20
    return Math.min(score, 100)
  }

  const getStrengthLabel = (score: number) => {
    if (score < 30) return { label: "Weak", color: "bg-red-500" }
    if (score < 60) return { label: "Fair", color: "bg-yellow-500" }
    if (score < 80) return { label: "Good", color: "bg-blue-500" }
    return { label: "Strong", color: "bg-green-500" }
  }

  const generatePassword = () => {
    let charset = ""
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (charset === "") {
      setPassword("Please select at least one character type")
      setStrength(0)
      return
    }

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(result)
    setStrength(calculateStrength(result))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const strengthInfo = getStrengthLabel(strength)

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Key className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">Password Generator</h1>
          <p className="text-muted-foreground">Generate secure passwords with custom options</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold">Password Settings</CardTitle>
            <CardDescription>Customize your password requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Password Length</Label>
                <span className="text-sm font-medium">{length[0]} characters</span>
              </div>
              <Slider value={length} onValueChange={setLength} max={50} min={4} step={1} className="w-full" />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Character Types</Label>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3">
                  <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
                  <Label htmlFor="uppercase" className="flex-1">
                    Uppercase Letters (A-Z)
                  </Label>
                  <span className="text-xs text-muted-foreground">26 chars</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
                  <Label htmlFor="lowercase" className="flex-1">
                    Lowercase Letters (a-z)
                  </Label>
                  <span className="text-xs text-muted-foreground">26 chars</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
                  <Label htmlFor="numbers" className="flex-1">
                    Numbers (0-9)
                  </Label>
                  <span className="text-xs text-muted-foreground">10 chars</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
                  <Label htmlFor="symbols" className="flex-1">
                    Symbols (!@#$...)
                  </Label>
                  <span className="text-xs text-muted-foreground">32 chars</span>
                </div>
              </div>
            </div>

            <Button onClick={generatePassword} className="w-full" size="lg">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold">Generated Password</CardTitle>
            <CardDescription>Your secure password will appear here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {password && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input value={password} readOnly className="font-mono text-lg" />
                    <Button size="sm" variant="outline" onClick={copyToClipboard}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-sm text-green-600 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Password copied to clipboard!
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Password Strength
                    </Label>
                    <span className={`text-sm font-medium ${strengthInfo.color.replace("bg-", "text-")}`}>
                      {strengthInfo.label}
                    </span>
                  </div>
                  <Progress value={strength} className="h-2" />
                  <p className="text-xs text-muted-foreground">{strength}/100 strength score</p>
                </div>
              </>
            )}

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Security Tips</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Use at least 12 characters for better security</li>
                      <li>• Include a mix of character types</li>
                      <li>• Don't reuse passwords across sites</li>
                      <li>• Consider using a password manager</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
