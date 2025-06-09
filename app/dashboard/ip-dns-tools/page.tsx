"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Search, Zap, Route, MapPin, Server, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function IPDNSToolsPage() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("lookup")

  const performLookup = (type: string) => {
    if (!input) return

    setLoading(true)
    setActiveTab("results")

    // Simulate API call with dummy data
    setTimeout(() => {
      let dummyResult = ""

      switch (type) {
        case "ip":
          dummyResult = `IP Lookup Results for: ${input}

🌍 LOCATION INFORMATION
Country: United States
Region: California
City: San Francisco
Postal Code: 94102
Coordinates: 37.7749, -122.4194
Timezone: America/Los_Angeles

🏢 NETWORK INFORMATION
ISP: Example Internet Provider
Organization: Example Corp
AS Number: AS12345
Network: 192.0.2.0/24

🔒 SECURITY INFORMATION
Threat Level: Low
VPN/Proxy: No
Tor Exit Node: No
Last Seen: ${new Date().toLocaleString()}
          `
          break
        case "dns":
          dummyResult = `DNS Lookup Results for: ${input}

📋 A RECORDS
192.0.2.1
192.0.2.2

📋 AAAA RECORDS (IPv6)
2001:db8::1
2001:db8::2

📧 MX RECORDS (Mail Exchange)
Priority 10: mail.${input}
Priority 20: mail2.${input}

🌐 NS RECORDS (Name Servers)
ns1.${input}
ns2.${input}

📝 TXT RECORDS
"v=spf1 include:_spf.${input} ~all"
"google-site-verification=abc123def456"

⚙️ SOA RECORD
Primary NS: ns1.${input}
Admin Email: admin@${input}
Serial: 2024010101
Refresh: 3600
Retry: 1800
Expire: 604800
TTL: 86400
          `
          break
        case "ping":
          dummyResult = `Ping Results for: ${input}

PING ${input} (192.0.2.1): 56 data bytes

64 bytes from 192.0.2.1: icmp_seq=0 ttl=64 time=12.345 ms
64 bytes from 192.0.2.1: icmp_seq=1 ttl=64 time=11.234 ms
64 bytes from 192.0.2.1: icmp_seq=2 ttl=64 time=13.456 ms
64 bytes from 192.0.2.1: icmp_seq=3 ttl=64 time=10.987 ms
64 bytes from 192.0.2.1: icmp_seq=4 ttl=64 time=12.678 ms

--- ${input} ping statistics ---
5 packets transmitted, 5 received, 0% packet loss
round-trip min/avg/max/stddev = 10.987/12.140/13.456/0.923 ms

📊 STATISTICS
Average Response Time: 12.14 ms
Packet Loss: 0%
Jitter: 0.923 ms
Status: ✅ Host is reachable
          `
          break
        case "traceroute":
          dummyResult = `Traceroute Results for: ${input}

traceroute to ${input} (192.0.2.1), 30 hops max, 60 byte packets

 1  gateway (192.168.1.1)          1.234 ms   1.123 ms   1.345 ms
 2  10.0.0.1 (10.0.0.1)           5.678 ms   5.567 ms   5.789 ms
 3  isp-router.net (203.0.113.1)  12.345 ms  12.234 ms  12.456 ms
 4  backbone1.net (203.0.113.10)  18.123 ms  18.234 ms  18.345 ms
 5  backbone2.net (203.0.113.20)  25.456 ms  25.567 ms  25.678 ms
 6  edge-router.net (203.0.113.30) 28.789 ms  28.890 ms  28.901 ms
 7  ${input} (192.0.2.1)          32.123 ms  32.234 ms  32.345 ms

🛣️ ROUTE ANALYSIS
Total Hops: 7
Total Time: ~32 ms
Route Status: ✅ Complete
Geographic Path: Local → ISP → Backbone → Destination
          `
          break
        case "whois":
          dummyResult = `WHOIS Information for: ${input}

🏢 DOMAIN INFORMATION
Domain Name: ${input}
Registry Domain ID: D123456789-LROR
Registrar: Example Registrar Inc.
Registrar WHOIS Server: whois.example-registrar.com
Registrar URL: http://www.example-registrar.com
Updated Date: 2024-01-15T10:30:00Z
Creation Date: 2020-03-20T14:25:00Z
Expiration Date: 2025-03-20T14:25:00Z

👤 REGISTRANT INFORMATION
Name: John Doe
Organization: Example Organization
Street: 123 Example Street
City: San Francisco
State/Province: CA
Postal Code: 94102
Country: US
Phone: +1.4155551234
Email: admin@${input}

🌐 NAME SERVERS
ns1.${input}
ns2.${input}

🔒 DNSSEC: Enabled
Status: clientTransferProhibited
        clientDeleteProhibited
        clientUpdateProhibited
          `
          break
      }

      setResult(dummyResult)
      setLoading(false)
    }, 1500)
  }

  const toolButtons = [
    { type: "ip", label: "IP Lookup", icon: Globe, description: "Get location and ISP info" },
    { type: "dns", label: "DNS Records", icon: Search, description: "Fetch DNS records" },
    { type: "ping", label: "Ping Test", icon: Zap, description: "Test connectivity" },
    { type: "traceroute", label: "Traceroute", icon: Route, description: "Trace network path" },
    { type: "whois", label: "WHOIS", icon: Server, description: "Domain registration info" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Globe className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">IP/DNS Tools</h1>
          <p className="text-muted-foreground">Network diagnostics and domain information lookup</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lookup">Lookup Tools</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="lookup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Network Diagnostics</CardTitle>
              <CardDescription>Enter an IP address, domain name, or URL to analyze</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ip-input">IP Address or Domain</Label>
                <Input
                  id="ip-input"
                  placeholder="Enter IP address, domain name, or URL (e.g., google.com, 8.8.8.8)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {toolButtons.map((tool) => (
                  <Card
                    key={tool.type}
                    className="cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                    onClick={() => performLookup(tool.type)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <tool.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{tool.label}</h3>
                          <p className="text-sm text-muted-foreground">{tool.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium">Geolocation</h4>
                    <p className="text-sm text-muted-foreground">Find physical location of IP addresses</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <Server className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium">DNS Analysis</h4>
                    <p className="text-sm text-muted-foreground">Complete DNS record inspection</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium">Performance</h4>
                    <p className="text-sm text-muted-foreground">Network latency and connectivity tests</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Diagnostic Results</CardTitle>
                  <CardDescription>{input ? `Results for: ${input}` : "No query performed yet"}</CardDescription>
                </div>
                {result && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ✅ Complete
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-lg font-medium">Running diagnostic...</p>
                    <p className="text-sm text-muted-foreground">This may take a few seconds</p>
                  </div>
                </div>
              ) : result ? (
                <Textarea
                  value={result}
                  readOnly
                  className="min-h-[500px] font-mono text-sm leading-relaxed"
                  style={{ whiteSpace: "pre-wrap" }}
                />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Globe className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No results yet</p>
                  <p className="text-sm">Go to the Lookup Tools tab to run a diagnostic</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
