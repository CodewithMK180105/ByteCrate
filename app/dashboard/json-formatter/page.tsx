"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, FileText, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FullscreenToggle } from "@/components/ui/fullscreen-toggle"

export default function JSONFormatterPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [format, setFormat] = useState("json")
  const [showPreview, setShowPreview] = useState(false)

  // JSON Formatter with robust error handling
  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError("")
    } catch (err) {
      // Enhanced error handling with line/column information
      const errorMessage = (err as Error).message
      const match = errorMessage.match(/position\s+(\d+)/)

      if (match && match[1]) {
        const position = Number.parseInt(match[1], 10)
        const lines = input.substring(0, position).split("\n")
        const lineNumber = lines.length
        const columnNumber = lines[lines.length - 1].length + 1

        setError(`JSON syntax error at line ${lineNumber}, column ${columnNumber}: ${errorMessage}`)
      } else {
        setError(`JSON syntax error: ${errorMessage}`)
      }

      setOutput("")
    }
  }

  // YAML Formatter
  const formatYAML = () => {
    try {
      // Try to parse as JSON first, then convert to YAML
      try {
        const parsed = JSON.parse(input)
        setOutput(jsonToYAML(parsed))
      } catch {
        // If not valid JSON, try to format YAML directly
        const yamlFormatted = formatYAMLDirectly(input)
        setOutput(yamlFormatted)
      }
      setError("")
    } catch (err) {
      setError(`YAML formatting error: ${(err as Error).message}`)
      setOutput("")
    }
  }

  // Helper function to format YAML directly
  const formatYAMLDirectly = (yamlInput: string): string => {
    const lines = yamlInput.split("\n")
    let indentLevel = 0
    const formattedLines: string[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line || line.startsWith("#")) {
        formattedLines.push(line)
        continue
      }

      // Check for list items
      if (line.startsWith("-")) {
        const spaces = "  ".repeat(indentLevel)
        formattedLines.push(`${spaces}${line}`)

        // If the list item has a nested structure, increase indent
        if (line.includes(":") && !line.endsWith(":")) {
          indentLevel++
        }
        continue
      }

      // Handle key-value pairs
      if (line.includes(":")) {
        const colonIndex = line.indexOf(":")
        const key = line.substring(0, colonIndex).trim()
        const value = line.substring(colonIndex + 1).trim()

        const spaces = "  ".repeat(indentLevel)

        // Check if this is a key with nested structure
        if (value === "") {
          formattedLines.push(`${spaces}${key}:`)
          indentLevel++
        } else {
          formattedLines.push(`${spaces}${key}: ${value}`)
        }
        continue
      }

      // Handle closing indentation
      if (line === "}" || line === "]") {
        indentLevel = Math.max(0, indentLevel - 1)
        const spaces = "  ".repeat(indentLevel)
        formattedLines.push(`${spaces}${line}`)
        continue
      }

      // Default case
      const spaces = "  ".repeat(indentLevel)
      formattedLines.push(`${spaces}${line}`)
    }

    return formattedLines.join("\n")
  }

  // Helper function to convert JSON to YAML
  const jsonToYAML = (obj: any, indent = 0): string => {
    const spaces = "  ".repeat(indent)

    if (obj === null) return "null"
    if (typeof obj === "boolean" || typeof obj === "number") return obj.toString()
    if (typeof obj === "string") {
      // Handle multiline strings with pipe character
      if (obj.includes("\n")) {
        return `|\n${spaces}  ${obj.replace(/\n/g, `\n${spaces}  `)}`
      }
      // Escape special characters in YAML
      if (obj.match(/[:{}[\],&*#?|<>=!%@`]/)) {
        return `"${obj.replace(/"/g, '\\"')}"`
      }
      return obj
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]"
      return obj
        .map((item) => {
          const itemYaml = jsonToYAML(item, indent + 1)
          // For simple values in arrays
          if (typeof item !== "object" || item === null) {
            return `${spaces}- ${itemYaml}`
          }
          // For objects in arrays
          return `${spaces}-\n${spaces}  ${itemYaml.replace(/\n/g, `\n${spaces}  `)}`
        })
        .join("\n")
    }

    if (typeof obj === "object") {
      if (Object.keys(obj).length === 0) return "{}"
      return Object.entries(obj)
        .map(([key, value]) => {
          const formattedValue = jsonToYAML(value, indent + 1)
          if (typeof value === "object" && value !== null) {
            return `${spaces}${key}:\n${spaces}  ${formattedValue.replace(/\n/g, `\n${spaces}  `)}`
          }
          return `${spaces}${key}: ${formattedValue}`
        })
        .join("\n")
    }

    return String(obj)
  }

  // Markdown Formatter
  const formatMarkdown = () => {
    try {
      // Basic markdown formatting
      const lines = input.split("\n")
      const formattedLines = lines.map((line) => {
        const trimmed = line.trim()
        if (!trimmed) return ""

        // Format headers
        if (trimmed.startsWith("#")) {
          const match = trimmed.match(/^(#+)\s*(.+)$/)
          if (match) {
            const [, hashes, content] = match
            return `${hashes} ${content}`
          }
        }

        // Format lists
        if (trimmed.match(/^[-*+]\s/)) {
          return trimmed.replace(/^[-*+]\s/, "- ")
        }

        // Format numbered lists
        if (trimmed.match(/^\d+\.\s/)) {
          return trimmed
        }

        return trimmed
      })

      setOutput(formattedLines.join("\n\n").replace(/\n{3,}/g, "\n\n"))
      setError("")
    } catch (err) {
      setError(`Markdown formatting error: ${(err as Error).message}`)
      setOutput("")
    }
  }

  const formatXML = () => {
    try {
      // Basic XML formatting
      const xml = input.replace(/></g, ">\n<").replace(/^\s+|\s+$/g, "")

      const lines = xml.split("\n")
      let indentLevel = 0
      const indentedLines = lines.map((line) => {
        const trimmed = line.trim()
        if (!trimmed) return ""

        // Self-closing tags don't affect indent
        const isSelfClosing = trimmed.endsWith("/>")

        // Closing tag decreases indent before printing
        if (trimmed.startsWith("</")) {
          indentLevel = Math.max(0, indentLevel - 1)
          return "  ".repeat(indentLevel) + trimmed
        }

        // Current line with current indent
        const indentedLine = "  ".repeat(indentLevel) + trimmed

        // Opening tag increases indent after printing
        if (trimmed.startsWith("<") && !isSelfClosing && !trimmed.includes("</")) {
          indentLevel++
        }

        return indentedLine
      })

      setOutput(indentedLines.filter((line) => line.trim()).join("\n"))
      setError("")
    } catch (err) {
      setError(`XML formatting error: ${(err as Error).message}`)
      setOutput("")
    }
  }

  const formatData = () => {
    switch (format) {
      case "json":
        formatJSON()
        break
      case "xml":
        formatXML()
        break
      case "yaml":
        formatYAML()
        break
      case "markdown":
        formatMarkdown()
        break
      default:
        formatJSON()
    }
  }

  const validateData = () => {
    try {
      switch (format) {
        case "json":
          JSON.parse(input)
          setOutput("✅ Valid JSON")
          break
        case "xml":
          // Basic XML validation
          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(input, "text/xml")
          const parseError = xmlDoc.getElementsByTagName("parsererror")
          if (parseError.length > 0) {
            throw new Error("Invalid XML structure")
          }
          setOutput("✅ Valid XML")
          break
        case "yaml":
          // Basic YAML validation
          const lines = input.split("\n")
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim()
            if (!line || line.startsWith("#")) continue

            if (line.includes(":")) {
              const colonIndex = line.indexOf(":")
              const key = line.substring(0, colonIndex).trim()
              if (!key) {
                throw new Error(`Invalid key at line ${i + 1}`)
              }
            }
          }
          setOutput("✅ Valid YAML")
          break
        case "markdown":
          setOutput("✅ Valid Markdown")
          break
      }
      setError("")
    } catch (err) {
      setError(`❌ Invalid ${format.toUpperCase()}: ${(err as Error).message}`)
      setOutput("")
    }
  }

  const minifyData = () => {
    try {
      switch (format) {
        case "json":
          const parsed = JSON.parse(input)
          setOutput(JSON.stringify(parsed))
          break
        case "xml":
          // XML minification (basic)
          setOutput(input.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim())
          break

        case "yaml":
          // YAML minification (basic)
          setOutput(input.replace(/\s+/g, " ").trim())
          break
        case "markdown":
          // Markdown minification (basic)
          setOutput(input.replace(/\n{2,}/g, "\n").trim())
          break
      }
      setError("")
    } catch (err) {
      setError(`Minification error: ${(err as Error).message}`)
      setOutput("")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderMarkdownPreview = (markdown: string) => {
    // Enhanced markdown to HTML converter for preview
    const html = markdown
      // Headers
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // Bold
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      // Links
      .replace(/\[([^\]]*)\]$$([^)]*)$$/gim, '<a href="$2" target="_blank">$1</a>')
      // Code blocks
      .replace(/```([^`]*?)```/gims, "<pre><code>$1</code></pre>")
      // Inline code
      .replace(/`([^`]*?)`/gim, "<code>$1</code>")
      // Lists
      .replace(/^\s*[-*+]\s+(.*?)$/gim, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>")
      // Numbered lists
      .replace(/^\s*(\d+)\.\s+(.*?)$/gim, "<li>$2</li>")
      .replace(/(<li>.*<\/li>)/gims, "<ol>$1</ol>")
      // Line breaks
      .replace(/\n/gim, "<br>")

    return html
  }

  return (
    <div className="w-full space-y-6 md:space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">Text Formatter</h1>
          <p className="text-sm md:text-base text-muted-foreground">Format, validate and beautify JSON, XML, YAML, and Markdown</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold">Input</CardTitle>
            <CardDescription>Paste your data here to format</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Format Type</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                  <SelectItem value="yaml">YAML</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="input">Data Input</Label>
              <Textarea
                id="input"
                placeholder={`Paste your ${format.toUpperCase()} here...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[300px] font-mono resize-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={formatData} disabled={!input}>
                Format
              </Button>
              <Button onClick={validateData} variant="outline" disabled={!input}>
                Validate
              </Button>
              <Button onClick={minifyData} variant="outline" disabled={!input}>
                Minify
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold">Output</CardTitle>
            <CardDescription>Formatted result will appear here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {output && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Label>Formatted Output</Label>
                    {format === "markdown" && (
                      <Button
                        size="sm"
                        variant={showPreview ? "default" : "outline"}
                        onClick={() => setShowPreview(!showPreview)}
                      >
                        {showPreview ? "Show Code" : "Show Preview"}
                      </Button>
                    )}
                  </div>
                  <Button size="sm" variant="outline" onClick={copyToClipboard} className="h-8">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>

                {format === "markdown" && showPreview ? (
                  <FullscreenToggle title="Markdown Preview" contentClassName="min-h-[300px]">
                    <div
                      className="min-h-[300px] p-4 border rounded-md bg-background prose prose-sm max-w-none dark:prose-invert overflow-auto"
                      dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(output) }}
                    />
                  </FullscreenToggle>
                ) : (
                  <FullscreenToggle title={`${format.toUpperCase()} Output`} contentClassName="min-h-[300px]">
                    <Textarea value={output} readOnly className="min-h-[300px] font-mono resize-none" />
                  </FullscreenToggle>
                )}
              </>
            )}

            {!output && !error && (
              <div className="min-h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Formatted output will appear here</p>
                  <p className="text-sm">Enter data and click "Format"</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
