
import React from 'react';
import Editor from '@monaco-editor/react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  value, 
  onChange, 
  language = "javascript" 
}) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{language}</Badge>
          <Button size="sm" variant="outline">
            Run Code
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <Avatar className="w-6 h-6 border-2 border-background">
              <AvatarFallback className="text-xs">SS</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 border-2 border-background">
              <AvatarFallback className="text-xs">LW</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-xs text-muted-foreground">2 editing</span>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Editor
          height="400px"
          language={language}
          value={value}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            folding: true,
            lineDecorationsWidth: 20,
            lineNumbersMinChars: 3,
            glyphMargin: false,
          }}
        />
      </div>
    </div>
  );
};
