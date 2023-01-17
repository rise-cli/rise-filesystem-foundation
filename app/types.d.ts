export type FileSystemLocation = {
    path: string
    projectRoot: string
}

export type CopyInstructions = {
    source: string
    target: string
    projectRoot: string
}

export type WriteFileInstructions = {
    path: string
    content: string
    projectRoot: string
}

export type ZipInstructions = {
    source: string
    target: string
    name: string
    projectRoot: string
}
