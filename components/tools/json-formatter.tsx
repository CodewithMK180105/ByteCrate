"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Check, AlertCircle } from "lucide-react"
import { FullscreenToggle } from "@/components/ui/fullscreen-toggle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function JSONFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [format, setFormat] = useState("json")
  const [showPreview, setShowPreview] = useState(false)

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError("")
    } catch (err) {
      setError(`Invalid JSON: ${(err as Error).message}`)
      setOutput("")
    }
  }

  const formatYAML = () => {
    try {
      // Try to parse as JSON first, then convert to YAML
      try {
        const parsed = JSON.parse(input)
        setOutput(jsonToYAML(parsed))
        setError("")
      } catch {
        // If not valid JSON, try to parse as YAML directly
        const yamlFormatted = formatYAMLDirectly(input)
        setOutput(yamlFormatted)
        setError("")
      }
    } catch (err) {
      setError(`YAML formatting error: ${(err as Error).message}`)
      setOutput("")
    }
  }

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

  const formatJavaScript = () => {
    try {
      // Enhanced JavaScript beautification
      let js = input
        // Remove extra whitespace first
        .replace(/^\s+|\s+$/g, "")

      // Try to parse as JSON first (for object literals)
      try {
        const parsed = JSON.parse(js)
        js = JSON.stringify(parsed, null, 2)
      } catch {
        // Not valid JSON, continue with JS formatting
      }

      // Format JavaScript
      js = js
        // Format function declarations
        .replace(/function\s*\(/g, "function (")
        // Format control structures
        .replace(/if\s*\(/g, "if (")
        .replace(/else\s*\{/g, "else {")
        .replace(/for\s*\(/g, "for (")
        .replace(/while\s*\(/g, "while (")
        // Format braces and semicolons
        .replace(/\{/g, " {\n  ")
        .replace(/\}/g, "\n}")
        .replace(/;\s*/g, ";\n")
        .replace(/,\s*/g, ", ")
        // Clean up extra newlines and spaces
        .replace(/\n\s*\n/g, "\n")

      // Fix indentation
      const lines = js.split("\n")
      let indentLevel = 0
      const indentedLines = lines.map((line) => {
        const trimmed = line.trim()
        if (!trimmed) return ""

        // Adjust indent level based on braces
        if (trimmed === "}") {
          indentLevel = Math.max(0, indentLevel - 1)
        }

        const indentedLine = "  ".repeat(indentLevel) + trimmed

        // Increase indent after opening brace
        if (trimmed.endsWith("{")) {
          indentLevel++
        }

        return indentedLine
      })

      setOutput(indentedLines.join("\n"))
      setError("")
    } catch (err) {
      setError(`JavaScript formatting error: ${(err as Error).message}`)
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
      case "javascript":
        formatJavaScript()
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
        case "javascript":
          // Basic JS validation using Function constructor
          try {
            // eslint-disable-next-line no-new-func
            new Function(input)
            setOutput("✅ Valid JavaScript")
          } catch (e) {
            throw e
          }
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
        case "javascript":
          // JavaScript minification
          setOutput(
            input
              .replace(/\/\/.*$/gm, "") // Remove single line comments
              .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
              .replace(/\s+/g, " ") // Replace multiple spaces with single space
              .replace(/\s*{\s*/g, "{") // Remove spaces around braces
              .replace(/\s*}\s*/g, "}")
              .replace(/\s*;\s*/g, ";")
              .replace(/\s*,\s*/g, ",")
              .trim(),
          )
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
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="format-type">Format Type</Label>
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger id="format-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="xml">XML</SelectItem>
            <SelectItem value="yaml">YAML</SelectItem>
            <SelectItem value="markdown">Markdown</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="input-data">Input</Label>
        <Textarea
          id="input-data"
          placeholder={`Paste your ${format.toUpperCase()} here...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px] font-mono"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={formatData}>Format</Button>
        <Button onClick={validateData} variant="outline">
          Validate
        </Button>
        <Button onClick={minifyData} variant="outline">
          Minify
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Label>Output</Label>
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
            <FullscreenToggle title="Markdown Preview" contentClassName="min-h-[200px]">
              <div
                className="min-h-[200px] p-4 border rounded-md bg-background prose prose-sm max-w-none dark:prose-invert overflow-auto"
                dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(output) }}
              />
            </FullscreenToggle>
          ) : (
            <FullscreenToggle title={`${format.toUpperCase()} Output`} contentClassName="min-h-[200px]">
              <Textarea value={output} readOnly className="min-h-[200px] font-mono" />
            </FullscreenToggle>
          )}
        </div>
      )}
    </div>
  )
}
