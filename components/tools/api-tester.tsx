"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function APITester() {
  const [url, setUrl] = useState("")
  const [method, setMethod] = useState("GET")
  const [headers, setHeaders] = useState("")
  const [body, setBody] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const sendRequest = async () => {
    setLoading(true)

    // Simulate API call with dummy response
    setTimeout(() => {
      const dummyResponse = {
        status: 200,
        statusText: "OK",
        headers: {
          "content-type": "application/json",
          "x-response-time": "45ms",
        },
        data: {
          message: "This is a dummy response",
          timestamp: new Date().toISOString(),
          method: method,
          url: url,
        },
      }

      setResponse(JSON.stringify(dummyResponse, null, 2))
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Method</Label>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-3">
          <Label>URL</Label>
          <Input placeholder="https://api.example.com/endpoint" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
      </div>

      <Tabs defaultValue="headers" className="w-full">
        <TabsList>
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger value="body">Body</TabsTrigger>
        </TabsList>
        <TabsContent value="headers" className="space-y-2">
          <Label>Headers (JSON format)</Label>
          <Textarea
            placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            className="min-h-[100px] font-mono"
          />
        </TabsContent>
        <TabsContent value="body" className="space-y-2">
          <Label>Request Body</Label>
          <Textarea
            placeholder="Request body content..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="min-h-[100px] font-mono"
          />
        </TabsContent>
      </Tabs>

      <Button onClick={sendRequest} disabled={loading || !url}>
        {loading ? "Sending..." : "Send Request"}
      </Button>

      {response && (
        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={response} readOnly className="min-h-[300px] font-mono" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
