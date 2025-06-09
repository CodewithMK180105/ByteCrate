"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Send, Clock, CheckCircle } from "lucide-react"

export default function APITesterPage() {
  const [url, setUrl] = useState("")
  const [method, setMethod] = useState("GET")
  const [headers, setHeaders] = useState("")
  const [body, setBody] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [responseTime, setResponseTime] = useState(0)
  const [statusCode, setStatusCode] = useState(0)

  const sendRequest = async () => {
    setLoading(true)
    const startTime = Date.now()

    // Simulate API call with dummy response
    setTimeout(() => {
      const endTime = Date.now()
      const time = endTime - startTime

      const dummyResponse = {
        status: 200,
        statusText: "OK",
        headers: {
          "content-type": "application/json",
          "x-response-time": `${time}ms`,
          server: "nginx/1.18.0",
          date: new Date().toUTCString(),
        },
        data: {
          message: "This is a dummy response for testing",
          timestamp: new Date().toISOString(),
          method: method,
          url: url,
          requestHeaders: headers ? JSON.parse(headers || "{}") : {},
          requestBody: body || null,
        },
      }

      setResponse(JSON.stringify(dummyResponse, null, 2))
      setResponseTime(time)
      setStatusCode(200)
      setLoading(false)
    }, 1000)
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "bg-green-500"
    if (status >= 300 && status < 400) return "bg-yellow-500"
    if (status >= 400 && status < 500) return "bg-orange-500"
    if (status >= 500) return "bg-red-500"
    return "bg-gray-500"
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Globe className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Tester</h1>
          <p className="text-muted-foreground">Test REST APIs with custom headers and payloads</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Request Configuration</CardTitle>
            <CardDescription>Configure your API request parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
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
                    <SelectItem value="HEAD">HEAD</SelectItem>
                    <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-3">
                <Label>URL</Label>
                <Input
                  placeholder="https://api.example.com/endpoint"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="headers" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="body">Body</TabsTrigger>
              </TabsList>
              <TabsContent value="headers" className="space-y-2">
                <Label>Headers (JSON format)</Label>
                <Textarea
                  placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                  value={headers}
                  onChange={(e) => setHeaders(e.target.value)}
                  className="min-h-[150px] font-mono"
                />
              </TabsContent>
              <TabsContent value="body" className="space-y-2">
                <Label>Request Body</Label>
                <Textarea
                  placeholder="Request body content..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="min-h-[150px] font-mono"
                />
              </TabsContent>
            </Tabs>

            <Button onClick={sendRequest} disabled={loading || !url} className="w-full" size="lg">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Request
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
            <CardDescription>API response will appear here</CardDescription>
            {statusCode > 0 && (
              <div className="flex items-center space-x-4 pt-2">
                <Badge className={`${getStatusColor(statusCode)} text-white`}>{statusCode}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {responseTime}ms
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Success
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {response ? (
              <Textarea value={response} readOnly className="min-h-[400px] font-mono text-sm" />
            ) : (
              <div className="min-h-[400px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Send a request to see the response</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
