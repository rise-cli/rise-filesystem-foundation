import fsextra from 'fs-extra'
import fs from 'fs'
import archiver from 'archiver'

/** @typedef {import('./types.d').FileSystemLocation} FileSystemLocation */
/** @typedef {import('./types.d').CopyInstructions} CopyInstructions */
/** @typedef {import('./types.d').WriteFileInstructions} WriteFileInstructions */
/** @typedef {import('./types.d').ZipInstructions} ZipInstructions */

/**
 * Folder
 */

/**
 * @param {FileSystemLocation} input
 */
export function getDirectories(input) {
    const x = input.other
    return fsextra
        .readdirSync(input.projectRoot + input.path, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
}

/**
 * @param {FileSystemLocation} input
 */
export async function makeDir(input) {
    try {
        await fsextra.mkdir(input.projectRoot + input.path)
    } catch (e) {
        if (e instanceof Error) {
            if (e.message.startsWith('EEXIST: file already exists')) {
                return
            }
            throw new Error(e.message)
        } else {
            throw new Error('Unknown Error')
        }
    }
}

/**
 * @param {FileSystemLocation} input
 */
export async function removeDir(input) {
    fsextra.removeSync(input.projectRoot + input.path)
}

/**
 * @param {CopyInstructions} input
 */
export function copyDir(input) {
    fsextra.copySync(
        input.projectRoot + input.source,
        input.projectRoot + input.target
    )
}

/**
 * @param {ZipInstructions} input
 * @returns {Promise<void>}
 */
export async function zipFolder(input) {
    const COMPRESSION_LEVEL = 9
    const source = input.projectRoot + input.source
    let target = input.projectRoot + input.target
    const name = input.name

    if (!fs.existsSync(target)) {
        fs.mkdirSync(target)
    }

    if (target[target.length - 1] !== '/') {
        target = target + '/'
    }

    const archive = archiver('zip', { zlib: { level: COMPRESSION_LEVEL } })
    const stream = fs.createWriteStream(target + name + '.zip')

    return new Promise((resolve, reject) => {
        archive
            .directory(source, false)
            .on('error', (err) => reject(err))
            .pipe(stream)

        stream.on('close', () => resolve())
        archive.finalize()
    })
}

/**
 * Files
 */

/**
 * @param {FileSystemLocation} input
 */
export async function getFile(input) {
    return await fsextra.readFile(input.projectRoot + input.path)
}

/**
 * @param {FileSystemLocation} input
 */
export function getJsFile(input) {
    return import(input.projectRoot + input.path)
}

/**
 * @param {WriteFileInstructions} input
 */
export function writeFile(input) {
    fsextra.writeFileSync(input.projectRoot + input.path, input.content)
}

/**
 * @param {FileSystemLocation} input
 */
export function removeFile(input) {
    fsextra.removeSync(input.projectRoot + input.path)
}

/**
 * @param {CopyInstructions} input
 */
export function copyFile(input) {
    fsextra.copyFileSync(
        input.projectRoot + input.source,
        input.projectRoot + input.target
    )
}

/**
 * @param {FileSystemLocation} input
 */
export async function getTextContent(input) {
    return fs.readFileSync(input.projectRoot + input.path, 'utf8')
}
