
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
            id: 'components',
            name: 'components',
            type: 'folder',
            isOpen: false,
            children: [
              {
                id: 'Button.jsx',
                name: 'Button.jsx',
                type: 'file',
                content: `import React from 'react';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={\`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 \${className}\`}
    >
      {children}
    </button>
  );
};

export default Button;`
              }
            ]
          },
          {
            id: 'main.js',
            name: 'main.js',
            type: 'file',
            content: `// Welcome to HackHub Enhanced IDE
console.log("Hello, World!");

function greetTeam() {
  console.log("Let's build something amazing!");
}

// Example of modern JavaScript features
const teamMembers = ['Alice', 'Bob', 'Charlie'];
const greeting = teamMembers.map(name => \`Hello, \${name}!\`);

console.log(greeting);
greetTeam();`
          },
          {
            id: 'styles.css',
            name: 'styles.css',
            type: 'file',
            content: `/* HackHub Project Styles */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}`
          },
          {
            id: 'app.py',
            name: 'app.py',
            type: 'file',
            content: `# HackHub Python Backend
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({
        'message': 'Welcome to HackHub API!',
        'status': 'success'
    })

@app.route('/api/health')
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True)`
          }
        ]
      },
      {
        id: 'public',
        name: 'public',
        type: 'folder',
        isOpen: false,
        children: [
          {
            id: 'index.html',
            name: 'index.html',
            type: 'file',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HackHub Project</title>
    <link rel="stylesheet" href="../src/styles.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to HackHub</h1>
        <div class="card">
            <h2>Your Hackathon Project</h2>
            <p>Start building your amazing project here!</p>
        </div>
    </div>
    <script src="../src/main.js"></script>
</body>
</html>`
          }
        ]
      },
      {
        id: 'README.md',
        name: 'README.md',
        type: 'file',
        content: `# HackHub Enhanced IDE Project

## Features

🗂️ **File Management System**
- Tree-structured file explorer
- Create, rename, delete files and folders
- Support for multiple file types (.js, .py, .html, .css, .txt, etc.)

🖥️ **Integrated Terminal**
- Built-in terminal with basic shell commands
- Interactive command execution
- File system operations

🧩 **Enhanced Features**
- Full-screen coding mode (F11)
- Auto-save to localStorage
- Multi-file tabs with unsaved indicators
- Code runner for JavaScript, HTML, CSS
- Dark/Light theme toggle

## Getting Started

1. Use the file explorer to navigate your project
2. Create new files and folders using the + buttons
3. Open the terminal for command-line operations
4. Run your code using the integrated code runner
5. Toggle between light and dark themes

## Supported File Types

- JavaScript (.js, .jsx)
- TypeScript (.ts, .tsx)
- Python (.py)
- HTML (.html)
- CSS (.css)
- Markdown (.md)
- JSON (.json)
- Plain text (.txt)

Happy coding! 🚀`
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
