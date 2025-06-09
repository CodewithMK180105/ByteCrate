"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Download, FileSpreadsheet } from "lucide-react"

export function ExcelTools() {
  const [csvData, setCsvData] = useState<string[][]>([])
  const [fileName, setFileName] = useState("")

  const generateMockData = () => {
    const mockData = [
      ["Name", "Email", "Age", "City"],
      ["John Doe", "john@example.com", "30", "New York"],
      ["Jane Smith", "jane@example.com", "25", "Los Angeles"],
      ["Bob Johnson", "bob@example.com", "35", "Chicago"],
      ["Alice Brown", "alice@example.com", "28", "Houston"],
      ["Charlie Wilson", "charlie@example.com", "32", "Phoenix"],
    ]
    setCsvData(mockData)
    setFileName("mock-data.csv")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      // Simulate CSV parsing
      const mockParsedData = [
        ["Column 1", "Column 2", "Column 3"],
        ["Data 1", "Data 2", "Data 3"],
        ["Data 4", "Data 5", "Data 6"],
      ]
      setCsvData(mockParsedData)
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Upload CSV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="csv-upload">Choose CSV file</Label>
                <Input id="csv-upload" type="file" accept=".csv" onChange={handleFileUpload} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Generate Mock Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={generateMockData} className="w-full">
              Generate Sample CSV Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {csvData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Data Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
                    {csvData.slice(1).map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex gap-2">
                <Button onClick={downloadAsExcel}>
                  <Download className="mr-2 h-4 w-4" />
                  Download as Excel
                </Button>
                <Button onClick={downloadAsCSV} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download as CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
