"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, RefreshCw } from "lucide-react"

export function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const generateUUID = () => {
    // Simple UUID v4 generator
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c == "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })

    setUuids((prev) => [uuid, ...prev.slice(0, 9)]) // Keep last 10 UUIDs
  }

  const generateMultiple = () => {
    const newUuids = []
    for (let i = 0; i < 5; i++) {
      const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c == "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
      newUuids.push(uuid)
    }
    setUuids((prev) => [...newUuids, ...prev.slice(0, 5)])
  }

  const copyToClipboard = (uuid: string) => {
    navigator.clipboard.writeText(uuid)
    setCopied(uuid)
    setTimeout(() => setCopied(null), 2000)
  }

  const clearAll = () => {
    setUuids([])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button onClick={generateUUID}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate UUID
        </Button>
        <Button onClick={generateMultiple} variant="outline">
          Generate 5 UUIDs
        </Button>
        {uuids.length > 0 && (
          <Button onClick={clearAll} variant="destructive">
            Clear All
          </Button>
        )}
      </div>

      {uuids.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated UUIDs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {uuids.map((uuid, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input value={uuid} readOnly className="font-mono" />
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(uuid)}>
                  {copied === uuid ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>About UUIDs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            UUIDs (Universally Unique Identifiers) are 128-bit values used to uniquely identify information. The UUIDs
            generated here are version 4, which are randomly generated and have a very low probability of collision.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
