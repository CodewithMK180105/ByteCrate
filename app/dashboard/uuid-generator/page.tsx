"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, RefreshCw, Shuffle, Trash2, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function UUIDGeneratorPage() {
  const [uuids, setUuids] = useState<Array<{ id: string; version: string; timestamp: string }>>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [version, setVersion] = useState("v4")

  const generateUUID = (ver: string = version) => {
    let uuid = ""
    const timestamp = new Date().toLocaleString()

    if (ver === "v4") {
      // UUID v4 generator
      uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c == "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    } else if (ver === "v1") {
      // Simulated UUID v1 (time-based)
      uuid = "xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c == "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    } else if (ver === "short") {
      // Short UUID (8 characters)
      uuid = "xxxxxxxx".replace(/[x]/g, () => {
        return ((Math.random() * 16) | 0).toString(16)
      })
    }

    const newUuid = { id: uuid, version: ver, timestamp }
    setUuids((prev) => [newUuid, ...prev.slice(0, 19)]) // Keep last 20 UUIDs
  }

  const generateMultiple = () => {
    for (let i = 0; i < 5; i++) {
      generateUUID()
    }
  }

  const copyToClipboard = (uuid: string) => {
    navigator.clipboard.writeText(uuid)
    setCopied(uuid)
    setTimeout(() => setCopied(null), 2000)
  }

  const clearAll = () => {
    setUuids([])
  }

  const downloadAsFile = () => {
    const content = uuids.map((uuid) => `${uuid.id} (${uuid.version}) - ${uuid.timestamp}`).join("\n")
    const blob = new Blob([content], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "uuids.txt"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getVersionColor = (ver: string) => {
    switch (ver) {
      case "v1":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "v4":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "short":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Shuffle className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">UUID Generator</h1>
          <p className="text-muted-foreground">Generate unique identifiers in various formats</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Generator Settings</CardTitle>
            <CardDescription>Choose UUID version and generate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>UUID Version</Label>
              <Select value={version} onValueChange={setVersion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v4">UUID v4 (Random)</SelectItem>
                  <SelectItem value="v1">UUID v1 (Time-based)</SelectItem>
                  <SelectItem value="short">Short UUID (8 chars)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Button onClick={() => generateUUID()} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate UUID
              </Button>
              <Button onClick={generateMultiple} variant="outline" className="w-full">
                Generate 5 UUIDs
              </Button>
            </div>

            {uuids.length > 0 && (
              <div className="flex space-x-2">
                <Button onClick={downloadAsFile} variant="outline" size="sm" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button onClick={clearAll} variant="destructive" size="sm" className="flex-1">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Generated UUIDs</CardTitle>
            <CardDescription>
              {uuids.length > 0 ? `${uuids.length} UUIDs generated` : "Generated UUIDs will appear here"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {uuids.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {uuids.map((uuid, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Badge className={getVersionColor(uuid.version)}>{uuid.version}</Badge>
                    <Input value={uuid.id} readOnly className="font-mono flex-1" />
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(uuid.id)}>
                      {copied === uuid.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Shuffle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No UUIDs generated yet</p>
                <p className="text-sm">Click "Generate UUID" to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About UUIDs</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-2">UUID v1 (Time-based)</h4>
            <p className="text-sm text-muted-foreground">
              Generated using timestamp and MAC address. Provides temporal ordering but may reveal information about the
              generating system.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">UUID v4 (Random)</h4>
            <p className="text-sm text-muted-foreground">
              Generated using random or pseudo-random numbers. Most commonly used version with very low collision
              probability.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Short UUID</h4>
            <p className="text-sm text-muted-foreground">
              8-character identifier for cases where shorter IDs are needed. Higher collision probability than standard
              UUIDs.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
