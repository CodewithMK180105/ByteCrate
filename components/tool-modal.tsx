"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { JSONFormatter } from "@/components/tools/json-formatter"
import { APITester } from "@/components/tools/api-tester"
import { ImageTools } from "@/components/tools/image-tools"
import { CodeBeautifier } from "@/components/tools/code-beautifier"
import { ExcelTools } from "@/components/tools/excel-tools"
import { PasswordGenerator } from "@/components/tools/password-generator"
import { IPDNSTools } from "@/components/tools/ip-dns-tools"
import { UUIDGenerator } from "@/components/tools/uuid-generator"

interface ToolModalProps {
  toolId: string | null
  onClose: () => void
}

const toolComponents = {
  "json-formatter": { component: JSONFormatter, title: "JSON Formatter" },
  "api-tester": { component: APITester, title: "API Tester" },
  "image-tools": { component: ImageTools, title: "Image Tools" },
  "code-beautifier": { component: CodeBeautifier, title: "Code Beautifier" },
  "excel-tools": { component: ExcelTools, title: "Excel Tools" },
  "password-generator": { component: PasswordGenerator, title: "Password Generator" },
  "ip-dns-tools": { component: IPDNSTools, title: "IP/DNS Tools" },
  "uuid-generator": { component: UUIDGenerator, title: "UUID Generator" },
}

export function ToolModal({ toolId, onClose }: ToolModalProps) {
  if (!toolId || !toolComponents[toolId as keyof typeof toolComponents]) {
    return null
  }

  const { component: Component, title } = toolComponents[toolId as keyof typeof toolComponents]

  return (
    <Dialog open={!!toolId} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Component />
      </DialogContent>
    </Dialog>
  )
}
