import test from 'node:test'
import assert from 'assert'
import {
    getDirectories,
    makeDir,
    removeDir,
    copyDir,
    getFile,
    getJsFile,
    writeFile,
    removeFile,
    copyFile,
    zipFolder,
    getTextContent
} from '../index.mjs'

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('realFilesystem can read, create, and delete directories', async () => {
    const projectRoot = __dirname + '/fsScenarios/makeDir'

    const res = getDirectories({ path: '/', projectRoot })
    assert.equal(JSON.stringify(res), JSON.stringify([]))

    await makeDir({ path: '/example', projectRoot })

    // creating again wont throw an error
    await makeDir({ path: '/example', projectRoot })

    const res2 = getDirectories({ path: '/', projectRoot })

    assert.equal(JSON.stringify(res2), JSON.stringify(['example']))
    removeDir({ path: '/example', projectRoot })
})

test('realFilesystem can copy a directory with files in it', async () => {
    const projectRoot = __dirname + '/fsScenarios/copyDir'

    copyDir({
        source: '/source',
        target: '/target',
        projectRoot
    })

    const res = getDirectories({ path: '/', projectRoot })
    assert.equal(JSON.stringify(res), JSON.stringify(['source', 'target']))

    const fileA = await getFile({ path: '/target/fileA.txt', projectRoot })
    assert.ok(fileA)

    const fileB = await getFile({ path: '/target/fileA.txt', projectRoot })
    assert.ok(fileB)

    removeDir({ path: '/target', projectRoot })
})

test('realFilesystem can get a js file', async () => {
    const projectRoot = __dirname + '/fsScenarios/jsDir'
    const app = await getJsFile({ path: '/app.js', projectRoot })

    assert.strictEqual(app.default.name, 'example-app')
})

test('realFilesystem can write a file', async () => {
    const projectRoot = __dirname + '/fsScenarios/writeFile'
    writeFile({
        path: '/fileA.js',
        content: 'export default {name: "made-app"}',
        projectRoot
    })

    const app = await getJsFile({ path: '/fileA.js', projectRoot })
    assert.strictEqual(app.default.name, 'made-app')
    removeFile({ path: '/fileA.js', projectRoot })
})

test('realFilesystem can copy files', async () => {
    const projectRoot = __dirname + '/fsScenarios/copyFile'
    copyFile({
        source: '/source/fileA.js',
        target: '/target/fileA.js',
        projectRoot
    })

    const app = await getJsFile({ path: '/target/fileA.js', projectRoot })

    assert.strictEqual(app.default.name, 'copy-app')
    removeFile({ path: '/target/fileA.js', projectRoot })
})

test('realFilesystem can make a zip a folder', async () => {
    const projectRoot = __dirname + '/fsScenarios/zip'
    await zipFolder({
        source: '/source',
        target: '/target',
        name: 'lambdaCode',
        projectRoot
    })

    const x = getFile({
        path: '/target/lambdaCode.zip',
        projectRoot
    })

    assert.ok(x)
    removeFile({ path: '/target/lambdaCode.zip', projectRoot })
})

test('realFilesystem can get text content of file', async () => {
    const projectRoot = __dirname + '/fsScenarios/textDir'
    const text = await getTextContent({ path: '/text.txt', projectRoot })
    assert.strictEqual(text, 'Text in text file')
})
