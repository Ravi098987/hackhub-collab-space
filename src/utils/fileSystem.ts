
export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  isOpen?: boolean;
}

export class FileSystemManager {
  private static STORAGE_KEY = 'hackhub_file_system';

  static saveFileSystem(files: FileNode[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(files));
  }

  static loadFileSystem(): FileNode[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return this.getDefaultFileSystem();
  }

  static getDefaultFileSystem(): FileNode[] {
    return [
      {
        id: 'src',
        name: 'src',
        type: 'folder',
        isOpen: true,
        children: [
          {
            id: 'main.js',
            name: 'main.js',
            type: 'file',
            content: `// Welcome to HackHub IDE
console.log("Hello, World!");

function greetTeam() {
  console.log("Let's build something amazing!");
}

greetTeam();`
          },
          {
            id: 'utils.js',
            name: 'utils.js',
            type: 'file',
            content: `// Utility functions
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`
          }
        ]
      },
      {
        id: 'README.md',
        name: 'README.md',
        type: 'file',
        content: `# My Hackathon Project

## Getting Started

This is your hackathon project workspace. Start coding!

## Features
- Modern JavaScript
- Team collaboration
- Version control ready

Good luck with your hackathon!`
      }
    ];
  }

  static findFileById(files: FileNode[], id: string): FileNode | null {
    for (const file of files) {
      if (file.id === id) return file;
      if (file.children) {
        const found = this.findFileById(file.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  static updateFileContent(files: FileNode[], id: string, content: string): FileNode[] {
    return files.map(file => {
      if (file.id === id) {
        return { ...file, content };
      }
      if (file.children) {
        return {
          ...file,
          children: this.updateFileContent(file.children, id, content)
        };
      }
      return file;
    });
  }

  static addFile(files: FileNode[], parentId: string | null, newFile: FileNode): FileNode[] {
    if (!parentId) {
      return [...files, newFile];
    }

    return files.map(file => {
      if (file.id === parentId && file.type === 'folder') {
        return {
          ...file,
          children: [...(file.children || []), newFile]
        };
      }
      if (file.children) {
        return {
          ...file,
          children: this.addFile(file.children, parentId, newFile)
        };
      }
      return file;
    });
  }

  static deleteFile(files: FileNode[], id: string): FileNode[] {
    return files.filter(file => {
      if (file.id === id) return false;
      if (file.children) {
        file.children = this.deleteFile(file.children, id);
      }
      return true;
    });
  }
}
