import fsextra from 'fs-extra'
import fs from 'fs'
import archiver from 'archiver'

/**
 * Helpers
 */
function formatWithTrailingSlash(x) {
    return x[x.length - 1] !== '/' ? '/' : ''
}


/**
 * Folders
 */
export function getDirectories(input) {
    return fsextra
        .readdirSync(input.projectRoot + input.path, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
}

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

export async function removeDir(input) {
    const path = input.projectRoot + input.path
    fsextra.removeSync(path)
}

export function copyDir(input) {
    const source = input.projectRoot + input.source
    const target = input.projectRoot + input.target
    fsextra.copySync(source, target)
}

export async function zipFolder(input) {
    const COMPRESSION_LEVEL = 9
    const source = input.projectRoot + input.source
    const target = input.projectRoot + formatWithTrailingSlash(input.target)
    const name = input.name

    if (!fs.existsSync(target)) {
        fs.mkdirSync(target)
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
export async function getFile(input) {
    const path = input.projectRoot + input.path
    return await fsextra.readFile(path)
}

export function getJsFile(input) {
    const path = input.projectRoot + input.path
    return import(path)
}

export function writeFile(input) {
    const path = input.projectRoot + input.path
    fsextra.writeFileSync(path, input.content)
}

export function removeFile(input) {
    const path = input.projectRoot + input.path
    fsextra.removeSync(path)
}

export function copyFile(input) {
    const source = input.projectRoot + input.source
    const target = input.projectRoot + input.target
    fsextra.copyFileSync(source, target)
}

export async function getTextContent(input) {
    const path = input.projectRoot + input.path
    return fs.readFileSync(path, 'utf8')
}
