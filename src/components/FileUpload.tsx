
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, File, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FileUploadProps {
  accept?: string
  maxSize?: number
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
}

export function FileUpload({ 
  accept = "*", 
  maxSize = 10, 
  title, 
  description, 
  icon: Icon = File 
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    
    // Check file size
    const oversizedFiles = selectedFiles.filter(file => file.size > maxSize * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSize}MB`,
        variant: "destructive"
      })
      return
    }

    setFiles(prev => [...prev, ...selectedFiles])
    
    // TODO: Upload to Supabase storage
    console.log('Uploading files:', selectedFiles)
    toast({
      title: "Files uploaded",
      description: `${selectedFiles.length} file(s) uploaded successfully`
    })
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
        <label className="cursor-pointer">
          <input
            type="file"
            accept={accept}
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="flex flex-col items-center text-center space-y-2">
            <Icon className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
            <Button size="sm" variant="outline" type="button">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </label>
      </Card>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
              <div className="flex items-center gap-2">
                <File className="w-4 h-4" />
                <span className="text-sm">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFile(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
