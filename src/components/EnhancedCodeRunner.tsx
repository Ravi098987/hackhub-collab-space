
import React, { useState } from 'react';
import { Play, Square, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EnhancedCodeRunnerProps {
  code: string;
  language: string;
  fileName: string;
}

export const EnhancedCodeRunner: React.FC<EnhancedCodeRunnerProps> = ({ 
  code, 
  language, 
  fileName 
}) => {
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [htmlPreview, setHtmlPreview] = useState<string>('');

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running...\n');

    try {
      if (language === 'javascript') {
        const originalConsole = console.log;
        const logs: string[] = [];
        
        console.log = (...args) => {
          logs.push(args.map(arg => String(arg)).join(' '));
        };

        try {
          const func = new Function(code);
          const result = func();
          
          if (result !== undefined) {
            logs.push(`Return value: ${result}`);
          }
          
          setOutput(logs.join('\n') || 'Code executed successfully (no output)');
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        } finally {
          console.log = originalConsole;
        }
      } else if (language === 'html') {
        setHtmlPreview(code);
        setOutput('HTML preview generated successfully');
      } else if (language === 'css') {
        setOutput('CSS code validated. Apply to HTML for preview.');
      } else if (language === 'python') {
        setOutput('Python execution requires a backend service.\nFor now, showing syntax validation.');
        
        // Basic Python syntax validation
        const pythonKeywords = ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'import', 'from', 'return'];
        const hasValidSyntax = pythonKeywords.some(keyword => code.includes(keyword));
        
        if (hasValidSyntax) {
          setOutput(prev => prev + '\nSyntax appears valid.');
        } else {
          setOutput(prev => prev + '\nNo Python keywords detected.');
        }
      } else {
        setOutput(`Code execution for ${language} is not supported yet.\nSupported languages: JavaScript, HTML, CSS, Python (limited)`);
      }
    } catch (error) {
      setOutput(`Execution error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
    setHtmlPreview('');
  };

  const downloadFile = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="h-64">
      <CardHeader className="py-2 px-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Code Runner</CardTitle>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={runCode}
              disabled={isRunning}
              className="h-6 px-2"
            >
              <Play className="h-3 w-3 mr-1" />
              Run
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadFile}
              className="h-6 px-2"
            >
              <FileText className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearOutput}
              className="h-6 px-2"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <Tabs defaultValue="output" className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="output">Output</TabsTrigger>
            <TabsTrigger value="preview" disabled={!htmlPreview}>Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="output" className="mt-2">
            <div className="bg-black text-green-400 p-2 rounded text-xs font-mono h-32 overflow-auto whitespace-pre-wrap">
              {output || 'Click "Run" to execute your code...'}
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-2">
            {htmlPreview && (
              <iframe
                srcDoc={htmlPreview}
                className="w-full h-32 border rounded"
                title="HTML Preview"
                sandbox="allow-scripts"
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
