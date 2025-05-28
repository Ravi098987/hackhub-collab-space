
import React, { useState } from 'react';
import { Play, Square, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CodeRunnerProps {
  code: string;
  language: string;
}

export const CodeRunner: React.FC<CodeRunnerProps> = ({ code, language }) => {
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running...\n');

    try {
      if (language === 'javascript') {
        // Create a safe execution environment
        const originalConsole = console.log;
        const logs: string[] = [];
        
        // Override console.log to capture output
        console.log = (...args) => {
          logs.push(args.map(arg => String(arg)).join(' '));
        };

        try {
          // Execute the code
          const func = new Function(code);
          const result = func();
          
          if (result !== undefined) {
            logs.push(`Return value: ${result}`);
          }
          
          setOutput(logs.join('\n') || 'Code executed successfully (no output)');
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        } finally {
          // Restore original console.log
          console.log = originalConsole;
        }
      } else {
        setOutput(`Code execution for ${language} is not supported yet.\nSupported languages: JavaScript`);
      }
    } catch (error) {
      setOutput(`Execution error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
  };

  return (
    <Card className="h-48">
      <CardHeader className="py-2 px-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Output</CardTitle>
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
              onClick={clearOutput}
              className="h-6 px-2"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="bg-black text-green-400 p-2 rounded text-xs font-mono h-32 overflow-auto whitespace-pre-wrap">
          {output || 'Click "Run" to execute your code...'}
        </div>
      </CardContent>
    </Card>
  );
};
