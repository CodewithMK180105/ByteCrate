"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, FileSpreadsheet, Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExcelToolsPage() {
  const [csvData, setCsvData] = useState<string[][]>([])
  const [fileName, setFileName] = useState("")
  const [mockDataType, setMockDataType] = useState("users")
  const [mockDataRows, setMockDataRows] = useState(10)

  const mockDataTemplates = {
    users: {
      headers: ["ID", "Name", "Email", "Age", "City", "Country"],
      generator: (index: number) => [
        (index + 1).toString(),
        `User ${index + 1}`,
        `user${index + 1}@example.com`,
        (Math.floor(Math.random() * 50) + 18).toString(),
        ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][Math.floor(Math.random() * 5)],
        ["USA", "Canada", "UK", "Germany", "France"][Math.floor(Math.random() * 5)],
      ],
    },
    products: {
      headers: ["Product ID", "Name", "Category", "Price", "Stock", "Rating"],
      generator: (index: number) => [
        `PRD-${(index + 1).toString().padStart(3, "0")}`,
        `Product ${index + 1}`,
        ["Electronics", "Clothing", "Books", "Home", "Sports"][Math.floor(Math.random() * 5)],
        `$${(Math.random() * 1000 + 10).toFixed(2)}`,
        Math.floor(Math.random() * 100).toString(),
        (Math.random() * 5).toFixed(1),
      ],
    },
    sales: {
      headers: ["Order ID", "Customer", "Product", "Quantity", "Total", "Date"],
      generator: (index: number) => [
        `ORD-${(index + 1).toString().padStart(4, "0")}`,
        `Customer ${Math.floor(Math.random() * 100) + 1}`,
        `Product ${Math.floor(Math.random() * 50) + 1}`,
        Math.floor(Math.random() * 10 + 1).toString(),
        `$${(Math.random() * 500 + 20).toFixed(2)}`,
        new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      ],
    },
  }

  const generateMockData = () => {
    const template = mockDataTemplates[mockDataType as keyof typeof mockDataTemplates]
    const data = [template.headers]

    for (let i = 0; i < mockDataRows; i++) {
      data.push(template.generator(i))
    }

    setCsvData(data)
    setFileName(`mock-${mockDataType}-data.csv`)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        const rows = text.split("\n").map((row) => row.split(","))
        setCsvData(rows.filter((row) => row.some((cell) => cell.trim())))
      }
      reader.readAsText(file)
    }
  }

  const downloadAsExcel = () => {
    // In a real app, you would convert to actual Excel format
    alert("Excel file would be downloaded here (demo)")
  }

  const downloadAsCSV = () => {
    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName || "data.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const addRow = () => {
    if (csvData.length === 0) return
    const newRow = new Array(csvData[0].length).fill("")
    setCsvData([...csvData, newRow])
  }

  const removeRow = (index: number) => {
    setCsvData(csvData.filter((_, i) => i !== index))
  }

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...csvData]
    newData[rowIndex][colIndex] = value
    setCsvData(newData)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <FileSpreadsheet className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Excel & CSV Tools</h1>
          <p className="text-muted-foreground">Convert, generate, and manipulate spreadsheet data</p>
        </div>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload & Convert</TabsTrigger>
          <TabsTrigger value="generate">Generate Mock Data</TabsTrigger>
          <TabsTrigger value="edit">Edit Data</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                Upload CSV File
              </CardTitle>
              <CardDescription>Upload a CSV file to convert to Excel or edit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="csv-upload">Choose CSV file</Label>
                  <Input id="csv-upload" type="file" accept=".csv" onChange={handleFileUpload} className="mt-2" />
                </div>
                {fileName && (
                  <p className="text-sm text-muted-foreground">
                    Uploaded: <span className="font-medium">{fileName}</span>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Generate Mock Data
              </CardTitle>
              <CardDescription>Create sample data for testing and development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data Type</Label>
                  <Select value={mockDataType} onValueChange={setMockDataType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="users">User Data</SelectItem>
                      <SelectItem value="products">Product Catalog</SelectItem>
                      <SelectItem value="sales">Sales Records</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Number of Rows</Label>
                  <Input
                    type="number"
                    min="1"
                    max="1000"
                    value={mockDataRows}
                    onChange={(e) => setMockDataRows(Number.parseInt(e.target.value) || 10)}
                  />
                </div>
              </div>
              <Button onClick={generateMockData} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Generate {mockDataRows} Rows of {mockDataType} Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          {csvData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Data</CardTitle>
                <CardDescription>Modify your data directly in the table</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {csvData.length - 1} rows, {csvData[0]?.length || 0} columns
                    </p>
                    <Button onClick={addRow} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Row
                    </Button>
                  </div>
                  <div className="border rounded-lg overflow-auto max-h-96">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          {csvData[0]?.map((header, index) => (
                            <TableHead key={index}>
                              <Input
                                value={header}
                                onChange={(e) => updateCell(0, index, e.target.value)}
                                className="border-0 p-0 h-auto font-medium"
                              />
                            </TableHead>
                          ))}
                          <TableHead className="w-12">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {csvData.slice(1).map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            <TableCell className="font-medium">{rowIndex + 1}</TableCell>
                            {row.map((cell, cellIndex) => (
                              <TableCell key={cellIndex}>
                                <Input
                                  value={cell}
                                  onChange={(e) => updateCell(rowIndex + 1, cellIndex, e.target.value)}
                                  className="border-0 p-0 h-auto"
                                />
                              </TableCell>
                            ))}
                            <TableCell>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeRow(rowIndex + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {csvData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Data Preview & Export</CardTitle>
            <CardDescription>Preview your data and export in different formats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg overflow-auto max-h-64">
              <Table>
                <TableHeader>
                  <TableRow>
                    {csvData[0]?.map((header, index) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {csvData.slice(1, 6).map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {csvData.length > 6 && (
              <p className="text-sm text-muted-foreground text-center">
                Showing first 5 rows of {csvData.length - 1} total rows
              </p>
            )}

            <div className="flex gap-4">
              <Button onClick={downloadAsExcel} className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download as Excel
              </Button>
              <Button onClick={downloadAsCSV} variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download as CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
