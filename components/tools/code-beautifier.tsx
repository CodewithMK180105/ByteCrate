"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FullscreenToggle } from "@/components/ui/fullscreen-toggle"

export function CodeBeautifier() {
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

      // Format JavaScript with more sophisticated rules
      const tokens: string[] = []
      let current = ""
      let inString = false
      let stringChar = ""
      let inComment = false
      let commentType = ""

      // Tokenize the input
      for (let i = 0; i < js.length; i++) {
        const char = js[i]
        const nextChar = js[i + 1] || ""

        // Handle strings
        if ((char === '"' || char === "'" || char === "`") && !inComment) {
          if (inString && char === stringChar && js[i - 1] !== "\\") {
            // End of string
            current += char
            tokens.push(current)
            current = ""
            inString = false
            stringChar = ""
          } else if (!inString) {
            // Start of string
            if (current) {
              tokens.push(current)
              current = ""
            }
            current += char
            inString = true
            stringChar = char
          } else {
            // Inside string
            current += char
          }
          continue
        }

        // Handle comments
        if (!inString && !inComment && char === "/" && nextChar === "/") {
          if (current) {
            tokens.push(current)
            current = ""
          }
          current += char
          inComment = true
          commentType = "line"
          continue
        }

        if (!inString && !inComment && char === "/" && nextChar === "*") {
          if (current) {
            tokens.push(current)
            current = ""
          }
          current += char
          inComment = true
          commentType = "block"
          continue
        }

        if (inComment) {
          current += char
          if (commentType === "line" && char === "\n") {
            tokens.push(current)
            current = ""
            inComment = false
            commentType = ""
          } else if (commentType === "block" && char === "/" && js[i - 1] === "*") {
            tokens.push(current)
            current = ""
            inComment = false
            commentType = ""
          }
          continue
        }

        // Inside string, add character
        if (inString) {
          current += char
          continue
        }

        // Handle special characters
        if ("{};()[],.".includes(char)) {
          if (current) {
            tokens.push(current)
            current = ""
          }
          tokens.push(char)
          continue
        }

        // Add to current token
        current += char
      }

      // Add final token if any
      if (current) {
        tokens.push(current)
      }

      // Format tokens
      let formatted = ""
      let indentLevel = 0
      let lastToken = ""

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i].trim()
        const nextToken = tokens[i + 1]?.trim() || ""

        // Skip empty tokens
        if (!token) continue

        // Handle opening braces
        if (token === "{") {
          formatted += " {\n" + "  ".repeat(indentLevel + 1)
          indentLevel++
          lastToken = token
          continue
        }

        // Handle closing braces
        if (token === "}") {
          indentLevel = Math.max(0, indentLevel - 1)
          formatted = formatted.trimEnd() + "\n" + "  ".repeat(indentLevel) + "}"

          // Add newline after closing brace unless followed by else, catch, finally
          if (["else", "catch", "finally"].includes(nextToken)) {
            formatted += " "
          } else if (nextToken !== ";" && nextToken !== "," && nextToken !== ")") {
            formatted += "\n" + "  ".repeat(indentLevel)
          }

          lastToken = token
          continue
        }

        // Handle semicolons
        if (token === ";") {
          formatted += ";\n" + "  ".repeat(indentLevel)
          lastToken = token
          continue
        }

        // Handle commas
        if (token === ",") {
          formatted += ", "
          lastToken = token
          continue
        }

        // Handle if, for, while, etc.
        if (["if", "for", "while", "switch"].includes(token) && nextToken === "(") {
          formatted += token + " "
          lastToken = token
          continue
        }

        // Handle else
        if (token === "else") {
          if (lastToken === "}") {
            // Already have space after }
          } else {
            formatted += "  ".repeat(indentLevel)
          }
          formatted += "else"

          // Add space before { or if
          if (nextToken === "{" || nextToken === "if") {
            formatted += " "
          } else {
            formatted += "\n" + "  ".repeat(indentLevel)
          }

          lastToken = token
          continue
        }

        // Default handling
        if (lastToken === "}" && !["else", "catch", "finally", ";", ","].includes(token)) {
          // Already added newline and indent after }
        } else if (
          lastToken &&
          lastToken !== "\n" &&
          !["(", "{", ";", ","].includes(lastToken) &&
          !formatted.endsWith(" ")
        ) {
          formatted += " "
        }

        formatted += token
        lastToken = token
      }

      return formatted
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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Language</Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-48">
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
        <Label htmlFor="code-input">Code Input</Label>
        <Textarea
          id="code-input"
          placeholder={`Paste your ${language.toUpperCase()} code here...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px] font-mono"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={beautifyCode} disabled={!input}>
          Beautify Code
        </Button>
        <Button onClick={minifyCode} disabled={!input} variant="outline">
          Minify Code
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
            <Label>Formatted Code</Label>
            <Button size="sm" variant="outline" onClick={copyToClipboard} className="h-8">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <FullscreenToggle title={`${language.toUpperCase()} Output`} contentClassName="min-h-[200px]">
            <Textarea value={output} readOnly className="min-h-[200px] font-mono" />
          </FullscreenToggle>
        </div>
      )}
    </div>
  )
}
