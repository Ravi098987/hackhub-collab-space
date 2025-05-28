
import React, { useEffect, useRef, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import { Button } from '@/components/ui/button';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import 'xterm/css/xterm.css';

interface TerminalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ isVisible, onClose }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [currentPath, setCurrentPath] = useState('/workspace');
  const [fileSystem, setFileSystem] = useState<{ [key: string]: any }>({
    '/workspace': {
      type: 'directory',
      children: {
        'src': { type: 'directory', children: {} },
        'README.md': { type: 'file', content: '# Welcome to HackHub Terminal' }
      }
    }
  });

  useEffect(() => {
    if (!terminalRef.current || !isVisible) return;

    const terminal = new XTerm({
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff'
      },
      fontSize: 14,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    
    terminal.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = terminal;
    fitAddonRef.current = fitAddon;

    let currentLine = '';
    
    const writePrompt = () => {
      terminal.write(`\r\n\x1b[32mhackub@terminal\x1b[0m:\x1b[34m${currentPath}\x1b[0m$ `);
    };

    const executeCommand = (command: string) => {
      const parts = command.trim().split(' ');
      const cmd = parts[0];
      const args = parts.slice(1);

      switch (cmd) {
        case 'ls':
          const currentDir = fileSystem[currentPath];
          if (currentDir && currentDir.type === 'directory') {
            const items = Object.keys(currentDir.children || {});
            terminal.write(`\r\n${items.join('  ')}`);
          }
          break;
        
        case 'pwd':
          terminal.write(`\r\n${currentPath}`);
          break;
        
        case 'echo':
          terminal.write(`\r\n${args.join(' ')}`);
          break;
        
        case 'mkdir':
          if (args[0]) {
            const newDir = args[0];
            const currentDir = fileSystem[currentPath];
            if (currentDir && currentDir.type === 'directory') {
              currentDir.children[newDir] = { type: 'directory', children: {} };
              setFileSystem({ ...fileSystem });
              terminal.write(`\r\nDirectory '${newDir}' created`);
            }
          } else {
            terminal.write('\r\nmkdir: missing operand');
          }
          break;
        
        case 'touch':
          if (args[0]) {
            const newFile = args[0];
            const currentDir = fileSystem[currentPath];
            if (currentDir && currentDir.type === 'directory') {
              currentDir.children[newFile] = { type: 'file', content: '' };
              setFileSystem({ ...fileSystem });
              terminal.write(`\r\nFile '${newFile}' created`);
            }
          } else {
            terminal.write('\r\ntouch: missing file operand');
          }
          break;
        
        case 'clear':
          terminal.clear();
          break;
        
        case 'help':
          terminal.write('\r\nAvailable commands:');
          terminal.write('\r\n  ls      - list directory contents');
          terminal.write('\r\n  pwd     - print working directory');
          terminal.write('\r\n  echo    - display text');
          terminal.write('\r\n  mkdir   - create directory');
          terminal.write('\r\n  touch   - create file');
          terminal.write('\r\n  clear   - clear terminal');
          terminal.write('\r\n  help    - show this help');
          break;
        
        default:
          if (command.trim()) {
            terminal.write(`\r\nCommand not found: ${cmd}`);
          }
      }
      writePrompt();
    };

    terminal.onKey(({ key, domEvent }) => {
      const code = domEvent.keyCode;
      
      if (code === 13) { // Enter
        executeCommand(currentLine);
        currentLine = '';
      } else if (code === 8) { // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          terminal.write('\b \b');
        }
      } else if (code >= 32 && code <= 126) { // Printable characters
        currentLine += key;
        terminal.write(key);
      }
    });

    terminal.write('Welcome to HackHub Terminal!\r\n');
    terminal.write('Type "help" for available commands.\r\n');
    writePrompt();

    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      terminal.dispose();
    };
  }, [isVisible, currentPath, fileSystem]);

  if (!isVisible) return null;

  return (
    <div className="border-t border-border bg-background">
      <div className="flex items-center justify-between px-3 py-1 bg-muted/30 border-b border-border">
        <span className="text-sm font-medium">Terminal</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={onClose}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      <div 
        ref={terminalRef} 
        className="h-48 p-2"
        style={{ height: '200px' }}
      />
    </div>
  );
};
