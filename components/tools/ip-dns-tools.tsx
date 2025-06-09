"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Globe, Search, Zap, Route } from "lucide-react"

export function IPDNSTools() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const performLookup = (type: string) => {
    if (!input) return

    setLoading(true)

    // Simulate API call with dummy data
    setTimeout(() => {
      let dummyResult = ""

      switch (type) {
        case "ip":
          dummyResult = `IP Lookup Results for: ${input}
          
Location: San Francisco, CA, US
ISP: Example Internet Provider
Organization: Example Corp
Timezone: America/Los_Angeles
Coordinates: 37.7749, -122.4194
          `
          break
        case "dns":
          dummyResult = `DNS Lookup Results for: ${input}
          
A Records:
  192.0.2.1
  192.0.2.2

AAAA Records:
  2001:db8::1

MX Records:
  10 mail.${input}
  20 mail2.${input}

NS Records:
  ns1.${input}
  ns2.${input}
          `
          break
        case "ping":
          dummyResult = `Ping Results for: ${input}
          
PING ${input} (192.0.2.1): 56 data bytes
64 bytes from 192.0.2.1: icmp_seq=0 ttl=64 time=12.345 ms
64 bytes from 192.0.2.1: icmp_seq=1 ttl=64 time=11.234 ms
64 bytes from 192.0.2.1: icmp_seq=2 ttl=64 time=13.456 ms
64 bytes from 192.0.2.1: icmp_seq=3 ttl=64 time=10.987 ms

--- ${input} ping statistics ---
4 packets transmitted, 4 received, 0% packet loss
round-trip min/avg/max/stddev = 10.987/12.006/13.456/1.023 ms
          `
          break
        case "traceroute":
          dummyResult = `Traceroute Results for: ${input}
          
traceroute to ${input} (192.0.2.1), 30 hops max, 60 byte packets
 1  gateway (192.168.1.1)  1.234 ms  1.123 ms  1.345 ms
 2  10.0.0.1 (10.0.0.1)  5.678 ms  5.567 ms  5.789 ms
 3  203.0.113.1 (203.0.113.1)  12.345 ms  12.234 ms  12.456 ms
 4  192.0.2.1 (192.0.2.1)  15.678 ms  15.567 ms  15.789 ms
          `
          break
      }

      setResult(dummyResult)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="ip-input">IP Address or Domain</Label>
        <Input
          id="ip-input"
          placeholder="Enter IP address or domain name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button onClick={() => performLookup("ip")} disabled={loading || !input} variant="outline">
          <Globe className="mr-2 h-4 w-4" />
          IP Lookup
        </Button>
        <Button onClick={() => performLookup("dns")} disabled={loading || !input} variant="outline">
          <Search className="mr-2 h-4 w-4" />
          DNS Info
        </Button>
        <Button onClick={() => performLookup("ping")} disabled={loading || !input} variant="outline">
          <Zap className="mr-2 h-4 w-4" />
          Ping
        </Button>
        <Button onClick={() => performLookup("traceroute")} disabled={loading || !input} variant="outline">
          <Route className="mr-2 h-4 w-4" />
          Traceroute
        </Button>
      </div>

      {(loading || result) && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Running diagnostic...</span>
              </div>
            ) : (
              <Textarea value={result} readOnly className="min-h-[300px] font-mono text-sm" />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
