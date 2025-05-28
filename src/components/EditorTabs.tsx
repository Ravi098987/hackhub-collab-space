
import React from 'react';
import { FileNode } from '@/utils/fileSystem';
import { X, File } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditorTabsProps {
  openFiles: FileNode[];
  activeFileId: string | null;
  onTabSelect: (fileId: string) => void;
  onTabClose: (fileId: string) => void;
  unsavedFiles: Set<string>;
}

export const EditorTabs: React.FC<EditorTabsProps> = ({
  openFiles,
  activeFileId,
  onTabSelect,
  onTabClose,
  unsavedFiles
}) => {
  return (
    <div className="flex bg-muted/30 border-b border-border overflow-x-auto">
      {openFiles.map((file) => (
        <div
          key={file.id}
          className={`flex items-center gap-2 px-3 py-2 border-r border-border cursor-pointer hover:bg-accent/50 min-w-0 ${
            activeFileId === file.id ? 'bg-background' : ''
          }`}
          onClick={() => onTabSelect(file.id)}
        >
          <File className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm truncate max-w-32">
            {file.name}
            {unsavedFiles.has(file.id) && (
              <span className="text-orange-500 ml-1">●</span>
            )}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-destructive/10"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(file.id);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
};
