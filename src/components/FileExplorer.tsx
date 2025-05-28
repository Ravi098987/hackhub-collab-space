
import React, { useState } from 'react';
import { FileNode } from '@/utils/fileSystem';
import { 
  File, 
  Folder, 
  FolderOpen, 
  Plus, 
  Edit3, 
  Trash2,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FileExplorerProps {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
  onFileCreate: (parentId: string | null, name: string, type: 'file' | 'folder') => void;
  onFileRename: (id: string, newName: string) => void;
  onFileDelete: (id: string) => void;
  onFolderToggle: (id: string) => void;
  selectedFileId?: string;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  onFileSelect,
  onFileCreate,
  onFileRename,
  onFileDelete,
  onFolderToggle,
  selectedFileId
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [creatingIn, setCreatingIn] = useState<string | null>(null);
  const [creatingType, setCreatingType] = useState<'file' | 'folder'>('file');
  const [newItemName, setNewItemName] = useState('');

  const handleRename = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const confirmRename = () => {
    if (editingId && editingName.trim()) {
      onFileRename(editingId, editingName.trim());
    }
    setEditingId(null);
    setEditingName('');
  };

  const startCreating = (parentId: string | null, type: 'file' | 'folder') => {
    setCreatingIn(parentId);
    setCreatingType(type);
    setNewItemName('');
  };

  const confirmCreate = () => {
    if (newItemName.trim()) {
      onFileCreate(creatingIn, newItemName.trim(), creatingType);
    }
    setCreatingIn(null);
    setNewItemName('');
  };

  const cancelCreate = () => {
    setCreatingIn(null);
    setNewItemName('');
  };

  const renderFileNode = (node: FileNode, depth: number = 0) => {
    const isSelected = selectedFileId === node.id;
    const isEditing = editingId === node.id;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`flex items-center gap-1 px-2 py-1 hover:bg-accent/50 cursor-pointer group ${
            isSelected ? 'bg-accent' : ''
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {node.type === 'folder' && (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0"
              onClick={() => onFolderToggle(node.id)}
            >
              {node.isOpen ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          )}
          
          <div className="flex-1 flex items-center gap-2 min-w-0">
            {node.type === 'folder' ? (
              node.isOpen ? <FolderOpen className="h-4 w-4 flex-shrink-0" /> : <Folder className="h-4 w-4 flex-shrink-0" />
            ) : (
              <File className="h-4 w-4 flex-shrink-0" />
            )}
            
            {isEditing ? (
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={confirmRename}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmRename();
                  if (e.key === 'Escape') setEditingId(null);
                }}
                className="h-6 text-xs"
                autoFocus
              />
            ) : (
              <span
                className="text-sm truncate flex-1"
                onClick={() => node.type === 'file' && onFileSelect(node)}
              >
                {node.name}
              </span>
            )}
          </div>

          <div className="opacity-0 group-hover:opacity-100 flex gap-1">
            {node.type === 'folder' && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    startCreating(node.id, 'file');
                  }}
                  title="New File"
                >
                  <File className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    startCreating(node.id, 'folder');
                  }}
                  title="New Folder"
                >
                  <Folder className="h-3 w-3" />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                handleRename(node.id, node.name);
              }}
              title="Rename"
            >
              <Edit3 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onFileDelete(node.id);
              }}
              title="Delete"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Show creation input when creating in this folder */}
        {creatingIn === node.id && (
          <div
            className="flex items-center gap-2 px-2 py-1"
            style={{ paddingLeft: `${(depth + 1) * 16 + 8}px` }}
          >
            {creatingType === 'folder' ? <Folder className="h-4 w-4" /> : <File className="h-4 w-4" />}
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onBlur={confirmCreate}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmCreate();
                if (e.key === 'Escape') cancelCreate();
              }}
              placeholder={`New ${creatingType}...`}
              className="h-6 text-xs"
              autoFocus
            />
          </div>
        )}

        {node.type === 'folder' && node.isOpen && node.children && (
          <div>
            {node.children.map(child => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 border-r border-border bg-card h-full flex flex-col">
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Explorer</h3>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => startCreating(null, 'file')}
              title="New File"
            >
              <File className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => startCreating(null, 'folder')}
              title="New Folder"
            >
              <Folder className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {files.map(file => renderFileNode(file))}
        
        {/* Show creation input when creating at root level */}
        {creatingIn === null && newItemName === '' && (
          <div className="px-2 py-1">
            {/* This div is here to trigger the creation flow */}
          </div>
        )}
        
        {creatingIn === null && newItemName !== '' && (
          <div className="px-2 py-1 flex items-center gap-2">
            {creatingType === 'folder' ? <Folder className="h-4 w-4" /> : <File className="h-4 w-4" />}
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onBlur={confirmCreate}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmCreate();
                if (e.key === 'Escape') cancelCreate();
              }}
              placeholder={`New ${creatingType}...`}
              className="h-6 text-xs"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};
