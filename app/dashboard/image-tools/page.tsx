// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Upload, QrCode, Palette, ImageIcon, Download, Crop } from "lucide-react"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Slider } from "@/components/ui/slider"

// export default function ImageToolsPage() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [qrText, setQrText] = useState("")
//   const [selectedColor, setSelectedColor] = useState("#3b82f6")
//   const [imageFormat, setImageFormat] = useState("png")
//   const [imageQuality, setImageQuality] = useState([80])
//   const [imageSize, setImageSize] = useState({ width: 800, height: 600 })
//   const [extractedColors, setExtractedColors] = useState<string[]>([]); // new state to store extracted colors

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       setSelectedFile(file)
//     }
//   }

//   const convertImage = (format: string) => {
//     if (!selectedFile) return
//     alert(`Converting ${selectedFile.name} to ${format.toUpperCase()} format (demo)`)
//   }

//   const resizeImage = () => {
//     if (!selectedFile) return
//     alert(`Resizing ${selectedFile.name} to ${imageSize.width}x${imageSize.height} (demo)`)
//   }

//   const generateQR = () => {
//     if (!qrText) return
//     alert(`QR code generated for: "${qrText}" (demo)`)
//   }

//   const extractColors = () => {
//     if (!selectedFile) return;

//     // Create an image element to load the selected file
//     const img = new Image();
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       img.src = e.target?.result as string;
//     };

//     img.onload = () => {
//       // Create a canvas to draw the image and get pixel data
//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;

//       ctx.drawImage(img, 0, 0, img.width, img.height);

//       // Get all pixel data
//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//       const pixels = imageData.data;

//       const colorMap: Record<string, number> = {}; // map of colors and their counts

//       // Loop over every pixel
//       for (let i = 0; i < pixels.length; i += 4) {
//         const r = pixels[i];
//         const g = pixels[i + 1];
//         const b = pixels[i + 2];

//         // Convert RGB to hex
//         const hex = `#${[r, g, b]
//           .map((x) => x.toString(16).padStart(2, "0"))
//           .join("")}`;

//         colorMap[hex] = (colorMap[hex] || 0) + 1;
//       }

//       // Sort colors by frequency
//       const sortedColors = Object.entries(colorMap)
//         .sort((a, b) => b[1] - a[1])
//         .slice(0, 5) // Get top 5 dominant colors
//         .map(([color]) => color);

//       setExtractedColors(sortedColors); // Update the extracted colors
//     };

//     reader.readAsDataURL(selectedFile);
//   };
  

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center space-x-3">
//         <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
//           <ImageIcon className="h-5 w-5 text-primary" />
//         </div>
//         <div>
//           <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">Image Tools</h1>
//           <p className="text-muted-foreground">Convert, resize, and generate images and QR codes</p>
//         </div>
//       </div>

//       <Tabs defaultValue="convert" className="w-full">
//         <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
//           <TabsTrigger value="convert">Convert</TabsTrigger>
//           <TabsTrigger value="resize">Resize</TabsTrigger>
//           <TabsTrigger value="qr">QR Code</TabsTrigger>
//           <TabsTrigger value="color">Color Tools</TabsTrigger>
//         </TabsList>

//         <TabsContent value="convert" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center text-lg md:text-xl lg:text-2xl font-bold">
//                   <Upload className="mr-2 h-4 w-4" />
//                   Image Converter
//                 </CardTitle>
//                 <CardDescription>Convert images between different formats</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <Label htmlFor="image-upload">Upload Image</Label>
//                   <Input id="image-upload" type="file" accept="image/*" onChange={handleFileUpload} className="mt-2" />
//                 </div>

//                 {selectedFile && (
//                   <div className="space-y-4">
//                     <p className="text-sm text-muted-foreground">
//                       Selected: <span className="font-medium">{selectedFile.name}</span>
//                     </p>
//                     <div className="space-y-2">
//                       <Label>Output Format</Label>
//                       <Select value={imageFormat} onValueChange={setImageFormat}>
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="png">PNG</SelectItem>
//                           <SelectItem value="jpg">JPG</SelectItem>
//                           <SelectItem value="webp">WebP</SelectItem>
//                           <SelectItem value="gif">GIF</SelectItem>
//                           <SelectItem value="bmp">BMP</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Quality: {imageQuality[0]}%</Label>
//                       <Slider
//                         value={imageQuality}
//                         onValueChange={setImageQuality}
//                         max={100}
//                         min={10}
//                         step={5}
//                         className="w-full"
//                       />
//                     </div>
//                     <Button onClick={() => convertImage(imageFormat)} className="w-full">
//                       <Download className="mr-2 h-4 w-4" />
//                       Convert to {imageFormat.toUpperCase()}
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold">Supported Formats</CardTitle>
//                 <CardDescription>Input and output format compatibility</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div>
//                     <h4 className="font-medium mb-2">Input Formats</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {["JPG", "PNG", "GIF", "BMP", "WebP", "TIFF", "SVG"].map((format) => (
//                         <span key={format} className="px-2 py-1 bg-muted rounded text-sm">
//                           {format}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="font-medium mb-2">Output Formats</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {["JPG", "PNG", "WebP", "GIF", "BMP"].map((format) => (
//                         <span key={format} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
//                           {format}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="resize" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center text-lg md:text-xl lg:text-2xl font-bold">
//                 <Crop className="mr-2 h-4 w-4" />
//                 Image Resizer
//               </CardTitle>
//               <CardDescription>Resize images to specific dimensions</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <Label htmlFor="resize-upload">Upload Image</Label>
//                 <Input id="resize-upload" type="file" accept="image/*" onChange={handleFileUpload} className="mt-2" />
//               </div>

//               {selectedFile && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label>Width (px)</Label>
//                     <Input
//                       type="number"
//                       value={imageSize.width}
//                       onChange={(e) => setImageSize({ ...imageSize, width: Number.parseInt(e.target.value) || 0 })}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Height (px)</Label>
//                     <Input
//                       type="number"
//                       value={imageSize.height}
//                       onChange={(e) => setImageSize({ ...imageSize, height: Number.parseInt(e.target.value) || 0 })}
//                     />
//                   </div>
//                 </div>
//               )}

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={() => setImageSize({ width: 1920, height: 1080 })}
//                   className="text-xs"
//                 >
//                   1920×1080
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => setImageSize({ width: 1280, height: 720 })}
//                   className="text-xs"
//                 >
//                   1280×720
//                 </Button>
//                 <Button variant="outline" onClick={() => setImageSize({ width: 800, height: 600 })} className="text-xs">
//                   800×600
//                 </Button>
//                 <Button variant="outline" onClick={() => setImageSize({ width: 400, height: 400 })} className="text-xs">
//                   400×400
//                 </Button>
//               </div>

//               {selectedFile && (
//                 <Button onClick={resizeImage} className="w-full">
//                   <Crop className="mr-2 h-4 w-4" />
//                   Resize Image
//                 </Button>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="qr" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center text-lg md:text-xl lg:text-2xl font-bold">
//                   <QrCode className="mr-2 h-4 w-4" />
//                   QR Code Generator
//                 </CardTitle>
//                 <CardDescription>Generate QR codes from text or URLs</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <Label htmlFor="qr-text">Text or URL</Label>
//                   <Input
//                     id="qr-text"
//                     placeholder="Enter text or URL to generate QR code"
//                     value={qrText}
//                     onChange={(e) => setQrText(e.target.value)}
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label>Size</Label>
//                     <Select defaultValue="medium">
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="small">Small (200px)</SelectItem>
//                         <SelectItem value="medium">Medium (400px)</SelectItem>
//                         <SelectItem value="large">Large (600px)</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Format</Label>
//                     <Select defaultValue="png">
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="png">PNG</SelectItem>
//                         <SelectItem value="jpg">JPG</SelectItem>
//                         <SelectItem value="svg">SVG</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <Button onClick={generateQR} disabled={!qrText} className="w-full">
//                   <QrCode className="mr-2 h-4 w-4" />
//                   Generate QR Code
//                 </Button>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold">QR Code Preview</CardTitle>
//                 <CardDescription>Generated QR code will appear here</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
//                   <div className="text-center text-muted-foreground">
//                     <QrCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
//                     <p>QR code preview</p>
//                     <p className="text-sm">Enter text to generate</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="color" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center text-lg md:text-xl lg:text-2xl font-bold">
//                   <Palette className="mr-2 h-4 w-4" />
//                   Color Picker
//                 </CardTitle>
//                 <CardDescription>Pick and analyze colors</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <Label htmlFor="color-picker">Pick a Color</Label>
//                   <div className="flex items-center space-x-4 mt-2">
//                     <Input
//                       id="color-picker"
//                       type="color"
//                       value={selectedColor}
//                       onChange={(e) => setSelectedColor(e.target.value)}
//                       className="w-16 h-10"
//                     />
//                     <Input
//                       value={selectedColor}
//                       onChange={(e) => setSelectedColor(e.target.value)}
//                       placeholder="#000000"
//                     />
//                   </div>
//                 </div>
//                 <div className="p-6 rounded-lg border" style={{ backgroundColor: selectedColor }}>
//                   <p
//                     className="text-center font-medium"
//                     style={{ color: selectedColor === "#000000" ? "white" : "black" }}
//                   >
//                     Color Preview
//                   </p>
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Color Information</Label>
//                   <div className="grid grid-cols-2 gap-2 text-sm">
//                     <div className="p-2 bg-muted rounded">
//                       <span className="font-medium">HEX:</span> {selectedColor}
//                     </div>
//                     <div className="p-2 bg-muted rounded">
//                       <span className="font-medium">RGB:</span> {Number.parseInt(selectedColor.slice(1, 3), 16)},{" "}
//                       {Number.parseInt(selectedColor.slice(3, 5), 16)}, {Number.parseInt(selectedColor.slice(5, 7), 16)}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold">Extract Colors from Image</CardTitle>
//                 <CardDescription>Get color palette from uploaded images</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <Label htmlFor="color-extract-upload">Upload Image</Label>
//                   <Input
//                     id="color-extract-upload"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileUpload}
//                     className="mt-2"
//                   />
//                 </div>
//                 {selectedFile && (
//                   <Button onClick={extractColors} className="w-full">
//                     <Palette className="mr-2 h-4 w-4" />
//                     Extract Color Palette
//                   </Button>
//                 )}
//                 <div className="space-y-2">
//                   <Label>Extracted Palette</Label>
//                   <div className="grid grid-cols-5 gap-2">
//                     {extractedColors.length > 0 ? (
//                       extractedColors.map((color, index) => (
//                         <div
//                           key={index}
//                           className="aspect-square rounded cursor-pointer border-2 border-transparent hover:border-primary"
//                           style={{ backgroundColor: color }}
//                           onClick={() => setSelectedColor(color)}
//                           title={color}
//                         />
//                       ))
//                     ) : (
//                       <p className="text-sm text-muted-foreground col-span-5">
//                         No colors extracted yet. Upload an image and extract colors.
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, QrCode, Palette, ImageIcon, Download, Crop } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import ColorThief from "colorthief";

export default function ImageToolsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [qrText, setQrText] = useState("");
  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [imageFormat, setImageFormat] = useState("png");
  const [imageQuality, setImageQuality] = useState([80]);
  const [imageSize, setImageSize] = useState({ width: 800, height: 600 });
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setQrPreview(null); // Reset QR preview on new file upload
      setExtractedColors([]); // Reset extracted colors
    }
  };

  const convertImage = async () => {
    if (!selectedFile) {
      toast.error("Please upload an image first");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("format", imageFormat);
    formData.append("quality", imageQuality[0].toString());

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Conversion failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `converted.${imageFormat}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Image converted to ${imageFormat.toUpperCase()}`);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Image conversion failed");
    } finally {
      setIsLoading(false);
    }
  };

  const resizeImage = async () => {
    if (!selectedFile) {
      toast.error("Please upload an image first");
      return;
    }

    if (imageSize.width <= 0 || imageSize.height <= 0) {
      toast.error("Width and height must be positive numbers");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("width", imageSize.width.toString());
    formData.append("height", imageSize.height.toString());

    try {
      const response = await fetch("/api/resize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Resize failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resized.${selectedFile.type.split("/")[1]}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Image resized to ${imageSize.width}x${imageSize.height}`);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Image resizing failed");
    } finally {
      setIsLoading(false);
    }
  };

  const generateQR = async () => {
    if (!qrText) {
      toast.error("Please enter text or URL for QR code");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: qrText, format: imageFormat, size: "medium" }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "QR code generation failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setQrPreview(url); // Set preview
      const a = document.createElement("a");
      a.href = url;
      a.download = `qrcode.${imageFormat}`;
      a.click();
      toast.success("QR code generated");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "QR code generation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const extractColors = () => {
  if (!selectedFile || !imgRef.current) {
    toast.error("Please upload an image first");
    return;
  }

  const img = imgRef.current;
  const reader = new FileReader();

  reader.onload = (e) => {
    img.src = e.target?.result as string;
  };

  img.onload = () => {
    try {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 10); // Get top 10 colors
      const hexColors = palette.map(([r, g, b]: [number, number, number]) =>
        `#${[r, g, b].map((x: number) => x.toString(16).padStart(2, "0")).join("")}`
      );
      setExtractedColors(hexColors);
      toast.success("Color palette extracted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to extract colors");
    }
  };

  reader.readAsDataURL(selectedFile);
};

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
                    <Button onClick={convertImage} disabled={isLoading} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      {isLoading ? "Converting..." : `Convert to ${imageFormat.toUpperCase()}`}
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
                <Button onClick={resizeImage} disabled={isLoading} className="w-full">
                  <Crop className="mr-2 h-4 w-4" />
                  {isLoading ? "Resizing..." : "Resize Image"}
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
                    <Select value={imageFormat} onValueChange={setImageFormat}>
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
                <Button onClick={generateQR} disabled={!qrText || isLoading} className="w-full">
                  <QrCode className="mr-2 h-4 w-4" />
                  {isLoading ? "Generating..." : "Generate QR Code"}
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
                  {qrPreview ? (
                    <img src={qrPreview} alt="QR Code Preview" className="max-w-full max-h-full" />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <QrCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>QR code preview</p>
                      <p className="text-sm">Enter text to generate</p>
                    </div>
                  )}
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
                      <span className="font-medium">RGB:</span>{" "}
                      {parseInt(selectedColor.slice(1, 3), 16)}, {parseInt(selectedColor.slice(3, 5), 16)},{" "}
                      {parseInt(selectedColor.slice(5, 7), 16)}
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
                  <>
                    <img ref={imgRef} style={{ display: "none" }} alt="Hidden image for color extraction" />
                    <Button onClick={extractColors} disabled={isLoading} className="w-full">
                      <Palette className="mr-2 h-4 w-4" />
                      {isLoading ? "Extracting..." : "Extract Color Palette"}
                    </Button>
                  </>
                )}
                <div className="space-y-2">
                  <Label>Extracted Palette</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {extractedColors.length > 0 ? (
                      extractedColors.map((color, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded cursor-pointer border-2 border-transparent hover:border-primary"
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                          title={color}
                        />
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground col-span-5">
                        No colors extracted yet. Upload an image and extract colors.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}