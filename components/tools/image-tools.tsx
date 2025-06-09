"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, QrCode, Palette } from "lucide-react"

export function ImageTools() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [qrText, setQrText] = useState("")
  const [selectedColor, setSelectedColor] = useState("#000000")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const convertImage = (format: string) => {
    if (!selectedFile) return
    alert(`Converting ${selectedFile.name} to ${format.toUpperCase()} format (demo)`)
  }

  const generateQR = () => {
    if (!qrText) return
    alert(`QR code generated for: "${qrText}" (demo)`)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="convert" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="convert">Convert</TabsTrigger>
          <TabsTrigger value="qr">QR Code</TabsTrigger>
          <TabsTrigger value="color">Color Picker</TabsTrigger>
        </TabsList>

        <TabsContent value="convert" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                Image Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="image-upload">Upload Image</Label>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleFileUpload} className="mt-2" />
              </div>

              {selectedFile && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button onClick={() => convertImage("png")} variant="outline">
                      To PNG
                    </Button>
                    <Button onClick={() => convertImage("jpg")} variant="outline">
                      To JPG
                    </Button>
                    <Button onClick={() => convertImage("webp")} variant="outline">
                      To WebP
                    </Button>
                    <Button onClick={() => convertImage("gif")} variant="outline">
                      To GIF
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="mr-2 h-4 w-4" />
                QR Code Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="qr-text">Text or URL</Label>
                <Input
                  id="qr-text"
                  placeholder="Enter text or URL to generate QR code"
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                />
              </div>
              <Button onClick={generateQR} disabled={!qrText}>
                Generate QR Code
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="color" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-4 w-4" />
                Color Picker
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="color-picker">Pick a Color</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <Input
                    id="color-picker"
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    placeholder="#000000"
                  />
                </div>
              </div>
              <div className="p-4 rounded-lg border" style={{ backgroundColor: selectedColor }}>
                <p
                  className="text-center font-medium"
                  style={{ color: selectedColor === "#000000" ? "white" : "black" }}
                >
                  Color Preview
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
