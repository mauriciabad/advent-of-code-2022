type Command = CDCommand | LSCommand

type CDCommand = {
  command: 'cd',
  folder: string | '..' | '/',
}
type LSCommand = {
  command: 'ls',
  files: File[],
  directories: string[]
}

type File = {
  size: number,
  name: string
}
type Folder = {
  name: string
  files: File[]
  folders: Folder[]
}
type FileSystemTree = Folder

export function answer(input: string): string {
  const commands = parseComands(input)

  const fileSystemTree = buildFileSystemTree(commands)

  // console.log(JSON.stringify(fileSystemTree, null, 2))

  const sizes: Record<string, number> = {}
  forEachFolder(fileSystemTree, (folder, path) => {
    const dir = path[path.length - 1]
    const size = getFolderSize(folder)
    // console.log('Size:', dir, size);

    if (size <= 100_000) sizes[dir] = size
  })
  // console.log(sizes);

  const result = sum(Object.values(sizes))
  return String(result)
}

function forEachFolder<F extends (folder: Folder, path: string[]) => void>(folder: Folder, callback: F, path: string[] = []): void {

  folder.folders.forEach(subFolder => {
    forEachFolder(subFolder, callback, [...path, subFolder.name])
  })
  const pwd = [...path, folder.name]
  callback(folder, pwd)
}

function getFolderSize(folder: Folder): number {
  return sum([
    ...folder.files.map(f => f.size),
    ...folder.folders.map(getFolderSize)
  ])
}

function buildFileSystemTree(commands: Command[]): FileSystemTree {
  const pwd: string[] = ['/']
  const fileSystemTree: FileSystemTree = {
    name: '/',
    files: [],
    folders: [],
  }

  commands.forEach((command) => {
    switch (command.command) {
      case 'cd': {
        if (command.folder === '/') {
          pwd.length = 0
          pwd.push('/')
        } else if (command.folder === '..') {
          pwd.pop()
        } else {
          pwd.push(command.folder)
          getCurrentFolderAndCreate(fileSystemTree, pwd)
        }
        break;
      }
      case 'ls': {
        command.directories.forEach(directory => {
          getCurrentFolderAndCreate(fileSystemTree, [...pwd, directory])
        })
        const currentFolder = getCurrentFolderAndCreate(fileSystemTree, pwd)
        currentFolder.files = command.files

        break;
      }
    }
  })

  return fileSystemTree
}

function getCurrentFolderAndCreate(fileSystemTree: FileSystemTree, pwd: string[]): Folder {
  let currentFolder: Folder = fileSystemTree
  if (pwd[0] !== '/') throw new Error("First folder must bee root");

  pwd.forEach(dir => {
    if (dir === '/') return
    let newFolder = currentFolder.folders.find(f => f.name === dir)
    if (!newFolder) {
      newFolder = {
        name: dir,
        files: [],
        folders: []
      }
      currentFolder.folders.push(newFolder)
    }

    currentFolder = newFolder
  })
  return currentFolder
}


function parseComands(input: string): Command[] {
  return input
    .split('$ ')
    .slice(1)
    .map((rawCommand) => {
      const commandName = rawCommand.match(/^\w+\b/)?.[0]

      switch (commandName) {
        case 'cd': {
          const folder = rawCommand.match(/^cd (\w+|\.\.|\/)/)?.[1]
          if (!folder) throw new Error("Missing folder name");

          return {
            command: 'cd',
            folder
          }
        }
        case 'ls': {
          const rawFileSizes = rawCommand.split('\n').slice(1).filter(Boolean)
          const files = rawFileSizes.flatMap(rawFileSize => {
            const match = rawFileSize.match(/^(\d+) (\w[\w\.]*)/)
            if (!match) return []

            return [{
              size: Number(match[1]),
              name: match[2]
            }]
          })
          const directories = rawFileSizes.flatMap(rawFileSize => {
            const match = rawFileSize.match(/^dir (\w+)/)
            if (!match) return []

            return [match[1]]
          })

          return {
            command: 'ls',
            files,
            directories
          }
        }
        default: throw new Error("unknown command"); break;
      }
    })
}

// ------------------- helper functions -----------------

function sum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0)
}
