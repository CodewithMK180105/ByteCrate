"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, QrCode, Palette, ImageIcon, Download, Crop } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function ImageToolsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [qrText, setQrText] = useState("")
  const [selectedColor, setSelectedColor] = useState("#3b82f6")
  const [imageFormat, setImageFormat] = useState("png")
  const [imageQuality, setImageQuality] = useState([80])
  const [imageSize, setImageSize] = useState({ width: 800, height: 600 })

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

  const resizeImage = () => {
    if (!selectedFile) return
    alert(`Resizing ${selectedFile.name} to ${imageSize.width}x${imageSize.height} (demo)`)
  }

  const generateQR = () => {
    if (!qrText) return
    alert(`QR code generated for: "${qrText}" (demo)`)
  }

  const extractColors = () => {
    if (!selectedFile) return
    alert(`Extracting color palette from ${selectedFile.name} (demo)`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <ImageIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">Image Tools</h1>
          <p className="text-muted-foreground">Convert, resize, and generate images and QR codes</p>
        </div>
      </div>

      <Tabs defaultValue="convert" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="convert">Convert</TabsTrigger>
          <TabsTrigger value="resize">Resize</TabsTrigger>
          <TabsTrigger value="qr">QR Code</TabsTrigger>
          <TabsTrigger value="color">Color Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="convert" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg md:text-xl lg:text-2xl font-bold">
                  <Upload className="mr-2 h-4 w-4" />
                  Image Converter
                </CardTitle>
                <CardDescription>Convert images between different formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="image-upload">Upload Image</Label>
                  <Input id="image-upload" type="file" accept="image/*" onChange={handleFileUpload} className="mt-2" />
                </div>

                {selectedFile && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Selected: <span className="font-medium">{selectedFile.name}</span>
                    </p>
                    <div className="space-y-2">
                      <Label>Output Format</Label>
                      <Select value={imageFormat} onValueChange={setImageFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="png">PNG</SelectItem>
                          <SelectItem value="jpg">JPG</SelectItem>
                          <SelectItem value="webp">WebP</SelectItem>
                          <SelectItem value="gif">GIF</SelectItem>
                          <SelectItem value="bmp">BMP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Quality: {imageQuality[0]}%</Label>
                      <Slider
                        value={imageQuality}
                        onValueChange={setImageQuality}
                        max={100}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    <Button onClick={() => convertImage(imageFormat)} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Convert to {imageFormat.toUpperCase()}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold">Supported Formats</CardTitle>
                <CardDescription>Input and output format compatibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Input Formats</h4>
                    <div className="flex flex-wrap gap-2">
                      {["JPG", "PNG", "GIF", "BMP", "WebP", "TIFF", "SVG"].map((format) => (
                        <span key={format} className="px-2 py-1 bg-muted rounded text-sm">
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Output Formats</h4>
                    <div className="flex flex-wrap gap-2">
                      {["JPG", "PNG", "WebP", "GIF", "BMP"].map((format) => (
                        <span key={format} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg md:text-xl lg:text-2xl font-bold">
                <Crop className="mr-2 h-4 w-4" />
                Image Resizer
              </CardTitle>
              <CardDescription>Resize images to specific dimensions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="resize-upload">Upload Image</Label>
                <Input id="resize-upload" type="file" accept="image/*" onChange={handleFileUpload} className="mt-2" />
              </div>

              {selectedFile && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Width (px)</Label>
                    <Input
                      type="number"
                      value={imageSize.width}
                      onChange={(e) => setImageSize({ ...imageSize, width: Number.parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Height (px)</Label>
                    <Input
                      type="number"
                      value={imageSize.height}
                      onChange={(e) => setImageSize({ ...imageSize, height: Number.parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  onClick={() => setImageSize({ width: 1920, height: 1080 })}
                  className="text-xs"
                >
                  1920×1080
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setImageSize({ width: 1280, height: 720 })}
                  className="text-xs"
                >
                  1280×720
                </Button>
                <Button variant="outline" onClick={() => setImageSize({ width: 800, height: 600 })} className="text-xs">
                  800×600
                </Button>
                <Button variant="outline" onClick={() => setImageSize({ width: 400, height: 400 })} className="text-xs">
                  400×400
                </Button>
              </div>

              {selectedFile && (
                <Button onClick={resizeImage} className="w-full">
                  <Crop className="mr-2 h-4 w-4" />
                  Resize Image
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qr" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg md:text-xl lg:text-2xl font-bold">
                  <QrCode className="mr-2 h-4 w-4" />
                  QR Code Generator
                </CardTitle>
                <CardDescription>Generate QR codes from text or URLs</CardDescription>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (200px)</SelectItem>
                        <SelectItem value="medium">Medium (400px)</SelectItem>
                        <SelectItem value="large">Large (600px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Format</Label>
                    <Select defaultValue="png">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="jpg">JPG</SelectItem>
                        <SelectItem value="svg">SVG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={generateQR} disabled={!qrText} className="w-full">
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold">QR Code Preview</CardTitle>
                <CardDescription>Generated QR code will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <QrCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>QR code preview</p>
                    <p className="text-sm">Enter text to generate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="color" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg md:text-xl lg:text-2xl font-bold">
                  <Palette className="mr-2 h-4 w-4" />
                  Color Picker
                </CardTitle>
                <CardDescription>Pick and analyze colors</CardDescription>
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
                <div className="p-6 rounded-lg border" style={{ backgroundColor: selectedColor }}>
                  <p
                    className="text-center font-medium"
                    style={{ color: selectedColor === "#000000" ? "white" : "black" }}
                  >
                    Color Preview
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Color Information</Label>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-muted rounded">
                      <span className="font-medium">HEX:</span> {selectedColor}
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <span className="font-medium">RGB:</span> {Number.parseInt(selectedColor.slice(1, 3), 16)},{" "}
                      {Number.parseInt(selectedColor.slice(3, 5), 16)}, {Number.parseInt(selectedColor.slice(5, 7), 16)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold">Extract Colors from Image</CardTitle>
                <CardDescription>Get color palette from uploaded images</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="color-extract-upload">Upload Image</Label>
                  <Input
                    id="color-extract-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="mt-2"
                  />
                </div>
                {selectedFile && (
                  <Button onClick={extractColors} className="w-full">
                    <Palette className="mr-2 h-4 w-4" />
                    Extract Color Palette
                  </Button>
                )}
                <div className="space-y-2">
                  <Label>Sample Palette</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"].map((color, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded cursor-pointer border-2 border-transparent hover:border-primary"
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
