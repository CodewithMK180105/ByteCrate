"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Code, Download, Upload, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FullscreenToggle } from "@/components/ui/fullscreen-toggle"

export default function CodeBeautifierPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const beautifyJavaScript = (code: string): string => {
    try {
      // Remove extra whitespace first
      const js = code.replace(/^\s+|\s+$/g, "")

      // Try to parse as JSON first (for object literals)
      try {
        const parsed = JSON.parse(js)
        return JSON.stringify(parsed, null, 2)
      } catch {
        // Not valid JSON, continue with JS formatting
      }

      // Enhanced JavaScript beautification
      const beautified = js
        // Format function declarations
        .replace(/function\s*\(/g, "function (")
        // Format control structures
        .replace(/if\s*\(/g, "if (")
        .replace(/else\s*\{/g, "else {")
        .replace(/for\s*\(/g, "for (")
        .replace(/while\s*\(/g, "while (")
        // Format operators
        .replace(/([=+\-*/%<>!&|])/g, " $1 ")
        .replace(/\s+/g, " ") // Clean up multiple spaces
        // Format braces and semicolons
        .replace(/\{/g, " {\n")
        .replace(/\}/g, "\n}")
        .replace(/;/g, ";\n")
        .replace(/,/g, ",\n")
        // Clean up extra newlines
        .replace(/\n\s*\n/g, "\n")

      // Fix indentation
      const lines = beautified.split("\n")
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

      return indentedLines.filter((line) => line.trim()).join("\n")
    } catch (err) {
      throw new Error(`JavaScript beautification error: ${(err as Error).message}`)
    }
  }

  const beautifyHTML = (html: string): string => {
    try {
      // Enhanced HTML beautification
      const formatted = html.replace(/></g, ">\n<").replace(/^\s+|\s+$/g, "")

      const lines = formatted.split("\n")
      let indentLevel = 0
      const indentedLines = lines.map((line) => {
        const trimmed = line.trim()
        if (!trimmed) return ""

        // Self-closing tags don't affect indent
        const isSelfClosing =
          trimmed.endsWith("/>") ||
          /^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/.test(trimmed)

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

      return indentedLines.filter((line) => line.trim()).join("\n")
    } catch (err) {
      throw new Error(`HTML beautification error: ${(err as Error).message}`)
    }
  }

  const beautifyCSS = (css: string): string => {
    try {
      // Remove comments and normalize whitespace
      const formatted = css
        .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
        .replace(/\s+/g, " ")
        .trim()

      // Split into rule blocks
      const blocks = []
      let currentBlock = ""
      let braceCount = 0

      for (let i = 0; i < formatted.length; i++) {
        const char = formatted[i]
        currentBlock += char

        if (char === "{") {
          braceCount++
        } else if (char === "}") {
          braceCount--
          if (braceCount === 0) {
            blocks.push(currentBlock.trim())
            currentBlock = ""
          }
        }
      }

      // Format each block
      const formattedBlocks = blocks.map((block) => {
        // Split selector from declarations
        const openBraceIndex = block.indexOf("{")
        const closeBraceIndex = block.lastIndexOf("}")

        if (openBraceIndex === -1 || closeBraceIndex === -1) {
          return block // Not a valid CSS rule
        }

        const selector = block.substring(0, openBraceIndex).trim()
        const declarations = block
          .substring(openBraceIndex + 1, closeBraceIndex)
          .split(";")
          .filter((decl) => decl.trim())
          .map((decl) => {
            const colonIndex = decl.indexOf(":")
            if (colonIndex === -1) return decl.trim()

            const property = decl.substring(0, colonIndex).trim()
            const value = decl.substring(colonIndex + 1).trim()
            return `  ${property}: ${value};`
          })
          .join("\n")

        return `${selector} {\n${declarations}\n}`
      })

      return formattedBlocks.join("\n\n")
    } catch (err) {
      throw new Error(`CSS beautification error: ${(err as Error).message}`)
    }
  }

  const beautifyJSON = (json: string): string => {
    try {
      const parsed = JSON.parse(json)
      return JSON.stringify(parsed, null, 2)
    } catch (err) {
      throw new Error(`JSON parsing error: ${(err as Error).message}`)
    }
  }

  const beautifyCode = () => {
    setError("")
    try {
      let beautified = ""

      switch (language) {
        case "javascript":
          beautified = beautifyJavaScript(input)
          break
        case "html":
          beautified = beautifyHTML(input)
          break
        case "css":
          beautified = beautifyCSS(input)
          break
        case "json":
          beautified = beautifyJSON(input)
          break
        default:
          beautified = input
      }

      setOutput(beautified)
    } catch (err) {
      setError(`${(err as Error).message}`)
      setOutput("")
    }
  }

  const minifyCode = () => {
    setError("")
    try {
      let minified = ""

      switch (language) {
        case "javascript":
          minified = input
            .replace(/\/\/.*$/gm, "") // Remove single line comments
            .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
            .replace(/\s+/g, " ") // Replace multiple spaces with single space
            .replace(/\s*{\s*/g, "{") // Remove spaces around braces
            .replace(/\s*}\s*/g, "}")
            .replace(/\s*;\s*/g, ";")
            .replace(/\s*,\s*/g, ",")
            .trim()
          break
        case "html":
          minified = input
            .replace(/<!--[\s\S]*?-->/g, "") // Remove HTML comments
            .replace(/>\s+</g, "><") // Remove spaces between tags
            .replace(/\s+/g, " ") // Replace multiple spaces
            .trim()
          break
        case "css":
          minified = input
            .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
            .replace(/\s+/g, " ") // Replace multiple spaces
            .replace(/\s*{\s*/g, "{")
            .replace(/\s*}\s*/g, "}")
            .replace(/\s*:\s*/g, ":")
            .replace(/\s*;\s*/g, ";")
            .replace(/\s*,\s*/g, ",")
            .trim()
          break
        case "json":
          const parsed = JSON.parse(input)
          minified = JSON.stringify(parsed)
          break
        default:
          minified = input.replace(/\s+/g, " ").trim()
      }

      setOutput(minified)
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

  const downloadCode = () => {
    const extensions: Record<string, string> = {
      javascript: "js",
      html: "html",
      css: "css",
      json: "json",
    }

    const blob = new Blob([output], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `beautified.${extensions[language] || "txt"}`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setInput(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Code className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">Code Beautifier</h1>
          <p className="text-muted-foreground">Format and beautify HTML, CSS, JavaScript, and JSON</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold">Input Code</CardTitle>
            <CardDescription>Paste your code or upload a file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="space-y-2 flex-1">
                <Label>Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Upload File</Label>
                <div>
                  <input
                    type="file"
                    accept=".js,.html,.css,.json,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button variant="outline" size="sm" asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </label>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="code-input">Code Input</Label>
              <Textarea
                id="code-input"
                placeholder={`Paste your ${language.toUpperCase()} code here...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={beautifyCode} disabled={!input}>
                <Code className="mr-2 h-4 w-4" />
                Beautify
              </Button>
              <Button onClick={minifyCode} variant="outline" disabled={!input}>
                Minify
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold">Formatted Code</CardTitle>
            <CardDescription>Beautified code will appear here</CardDescription>
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
                  <Label>Formatted Output</Label>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={copyToClipboard}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={downloadCode}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <FullscreenToggle title={`${language.toUpperCase()} Output`} contentClassName="min-h-[300px]">
                  <Textarea value={output} readOnly className="min-h-[300px] font-mono text-sm" />
                </FullscreenToggle>
              </>
            )}

            {!output && !error && (
              <div className="min-h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Formatted code will appear here</p>
                  <p className="text-sm">Paste code and click "Beautify"</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold">Supported Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Code className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium mb-2">JavaScript</h4>
              <p className="max-sm:text-xs text-muted-foreground">Format JS code with proper indentation</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Code className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium mb-2">HTML</h4>
              <p className="max-sm:text-xs text-muted-foreground">Structure HTML with clean formatting</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Code className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium mb-2">CSS</h4>
              <p className="max-sm:text-xs text-muted-foreground">Organize CSS rules and properties</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Code className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium mb-2">JSON</h4>
              <p className="max-sm:text-xs text-muted-foreground">Validate and format JSON data</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
