"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, RefreshCw } from "lucide-react"

export function PasswordGenerator() {
  const [length, setLength] = useState([12])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let charset = ""
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (charset === "") {
      setPassword("Please select at least one character type")
      return
    }

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Password Length: {length[0]}</Label>
          <Slider value={length} onValueChange={setLength} max={50} min={4} step={1} className="w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
            <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
            <Label htmlFor="lowercase">Lowercase (a-z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
            <Label htmlFor="numbers">Numbers (0-9)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
            <Label htmlFor="symbols">Symbols (!@#$...)</Label>
          </div>
        </div>

        <Button onClick={generatePassword} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate Password
        </Button>
      </div>

      {password && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input value={password} readOnly className="font-mono" />
              <Button size="sm" variant="outline" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {copied && <p className="text-sm text-green-600">Password copied to clipboard!</p>}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
