import React, { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { FileSystemManager, FileNode } from '@/utils/fileSystem';
import { FileExplorer } from './FileExplorer';
import { EditorTabs } from './EditorTabs';
import { EnhancedCodeRunner } from './EnhancedCodeRunner';
import { Terminal } from './Terminal';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Maximize, Minimize, Save, Terminal as TerminalIcon, Sun, Moon } from "lucide-react";

interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  language?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  value: externalValue, 
  onChange: externalOnChange, 
  language: externalLanguage 
}) => {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [openFiles, setOpenFiles] = useState<FileNode[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [unsavedFiles, setUnsavedFiles] = useState<Set<string>>(new Set());
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Initialize file system
  useEffect(() => {
    const savedFiles = FileSystemManager.loadFileSystem();
    setFiles(savedFiles);
    
    // Open the first file by default
    const firstFile = findFirstFile(savedFiles);
    if (firstFile) {
      setOpenFiles([firstFile]);
      setActiveFileId(firstFile.id);
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (unsavedFiles.size > 0) {
        FileSystemManager.saveFileSystem(files);
        setUnsavedFiles(new Set());
        console.log('Auto-saved files');
      }
    }, 5000); // Auto-save every 5 seconds

    return () => clearInterval(interval);
  }, [files, unsavedFiles]);

  // Handle full-screen toggle with F11
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F11') {
        e.preventDefault();
        setIsFullScreen(!isFullScreen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen]);

  const findFirstFile = (fileNodes: FileNode[]): FileNode | null => {
    for (const node of fileNodes) {
      if (node.type === 'file') return node;
      if (node.children) {
        const found = findFirstFile(node.children);
        if (found) return found;
      }
    }
    return null;
  };

  const getActiveFile = () => {
    if (!activeFileId) return null;
    return FileSystemManager.findFileById(files, activeFileId);
  };

  const getLanguageFromFileName = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const languageMap: { [key: string]: string } = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'md': 'markdown',
      'xml': 'xml',
      'yaml': 'yaml',
      'yml': 'yaml',
      'txt': 'plaintext'
    };
    return languageMap[ext || ''] || 'plaintext';
  };

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (!activeFileId || value === undefined) return;

    const updatedFiles = FileSystemManager.updateFileContent(files, activeFileId, value);
    setFiles(updatedFiles);
    setUnsavedFiles(prev => new Set([...prev, activeFileId]));

    // Also update the open file
    setOpenFiles(prev => prev.map(file => 
      file.id === activeFileId ? { ...file, content: value } : file
    ));

    externalOnChange?.(value);
  }, [activeFileId, files, externalOnChange]);

  const handleFileSelect = (file: FileNode) => {
    // Add to open files if not already open
    if (!openFiles.find(f => f.id === file.id)) {
      setOpenFiles(prev => [...prev, file]);
    }
    setActiveFileId(file.id);
  };

  const handleTabClose = (fileId: string) => {
    setOpenFiles(prev => prev.filter(f => f.id !== fileId));
    if (activeFileId === fileId) {
      const remaining = openFiles.filter(f => f.id !== fileId);
      setActiveFileId(remaining.length > 0 ? remaining[0].id : null);
    }
    setUnsavedFiles(prev => {
      const newSet = new Set(prev);
      newSet.delete(fileId);
      return newSet;
    });
  };

  const handleFileCreate = (parentId: string | null, name: string, type: 'file' | 'folder') => {
    const newFile: FileNode = {
      id: `${Date.now()}-${name}`,
      name,
      type,
      content: type === 'file' ? '' : undefined,
      children: type === 'folder' ? [] : undefined,
      isOpen: type === 'folder'
    };

    const updatedFiles = FileSystemManager.addFile(files, parentId, newFile);
    setFiles(updatedFiles);
    FileSystemManager.saveFileSystem(updatedFiles);

    if (type === 'file') {
      handleFileSelect(newFile);
    }
  };

  const handleFileRename = (id: string, newName: string) => {
    const updateNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, name: newName };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };

    const updatedFiles = updateNode(files);
    setFiles(updatedFiles);
    FileSystemManager.saveFileSystem(updatedFiles);

    // Update open files as well
    setOpenFiles(prev => prev.map(file => 
      file.id === id ? { ...file, name: newName } : file
    ));
  };

  const handleFileDelete = (id: string) => {
    const updatedFiles = FileSystemManager.deleteFile(files, id);
    setFiles(updatedFiles);
    FileSystemManager.saveFileSystem(updatedFiles);

    // Close the tab if it's open
    handleTabClose(id);
  };

  const handleFolderToggle = (id: string) => {
    const toggleNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === id && node.type === 'folder') {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: toggleNode(node.children) };
        }
        return node;
      });
    };

    const updatedFiles = toggleNode(files);
    setFiles(updatedFiles);
    FileSystemManager.saveFileSystem(updatedFiles);
  };

  const manualSave = () => {
    FileSystemManager.saveFileSystem(files);
    setUnsavedFiles(new Set());
  };

  const activeFile = getActiveFile();
  const currentLanguage = activeFile ? getLanguageFromFileName(activeFile.name) : (externalLanguage || 'javascript');

  const editorContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{currentLanguage}</Badge>
          <Button size="sm" variant="outline" onClick={() => setShowOutput(!showOutput)}>
            {showOutput ? 'Hide Output' : 'Show Output'}
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowTerminal(!showTerminal)}>
            <TerminalIcon className="w-4 h-4 mr-1" />
            {showTerminal ? 'Hide Terminal' : 'Show Terminal'}
          </Button>
          <Button size="sm" variant="outline" onClick={manualSave}>
            <Save className="w-4 h-4 mr-1" />
            Save All
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsFullScreen(!isFullScreen)}
          >
            {isFullScreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      {openFiles.length > 0 && (
        <EditorTabs
          openFiles={openFiles}
          activeFileId={activeFileId}
          onTabSelect={setActiveFileId}
          onTabClose={handleTabClose}
          unsavedFiles={unsavedFiles}
        />
      )}

      {/* Editor */}
      <div className="flex-1 border rounded-lg overflow-hidden">
        <Editor
          height="100%"
          language={currentLanguage}
          value={activeFile?.content || externalValue || ''}
          onChange={handleEditorChange}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: !isFullScreen },
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

      {/* Output Panel */}
      {showOutput && activeFile && (
        <div className="mt-4">
          <EnhancedCodeRunner 
            code={activeFile.content || ''} 
            language={currentLanguage}
            fileName={activeFile.name}
          />
        </div>
      )}

      {/* Terminal Panel */}
      <Terminal 
        isVisible={showTerminal}
        onClose={() => setShowTerminal(false)}
      />
    </div>
  );

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="h-full p-4">
          {editorContent}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* File Explorer */}
      <FileExplorer
        files={files}
        onFileSelect={handleFileSelect}
        onFileCreate={handleFileCreate}
        onFileRename={handleFileRename}
        onFileDelete={handleFileDelete}
        onFolderToggle={handleFolderToggle}
        selectedFileId={activeFileId}
      />

      {/* Main Editor Area */}
      <div className="flex-1 p-4">
        {editorContent}
      </div>
    </div>
  );
};
