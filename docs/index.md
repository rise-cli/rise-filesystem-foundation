# Rise Filesystem Foundation

## Install

```bash
npm i rise-filsystem-foundation
```

## Usage

### filesystem.getDirectories

```js
import * as filesystem from 'rise-filesystem-foundation'
const x = filesystem.getDirectories({
    path: '/',
    projectRoot: __dirname
})
```

### filesystem.makeDir

```js
import * as filesystem from 'rise-filesystem-foundation'
await filesystem.makeDir({
    path: '/example',
    projectRoot: __dirname
})
```

### filesystem.removeDir

```js
import * as filesystem from 'rise-filesystem-foundation'
filesystem.removeDir({
    path: '/example',
    projectRoot: __dirname
})
```

### filesystem.copyDir

```js
import * as filesystem from 'rise-filesystem-foundation'
filesystem.copyDir({
    source: '/source',
    target: '/target',
    projectRoot: __dirname
})
```

### filesystem.getFile

```js
import * as filesystem from 'rise-filesystem-foundation'
const x = await filesystem.getFile({
    path: '/target/fileA.txt',
    projectRoot: __dirname
})
```

### filesystem.getJsFile

```js
import * as filesystem from 'rise-filesystem-foundation'
const x = await filesystem.getJsFile({
    path: '/target/app.js',
    projectRoot: __dirname
})
```

### filesystem.writeFile

```js
import * as filesystem from 'rise-filesystem-foundation'
filesystem.writeFile({
    path: '/fileA.js',
    content: 'export default {name: "app"}',
    projectRoot: __dirname
})
```

### filesystem.removeFile

```js
import * as filesystem from 'rise-filesystem-foundation'
filesystem.removeFile({
    path: '/fileA.js',
    projectRoot: __dirname
})
```

### filesystem.copyFile

```js
import * as filesystem from 'rise-filesystem-foundation'
filesystem.copyFile({
    source: '/source/fileA.js',
    target: '/target/fileA.js',
    projectRoot: __dirname
})
```

### filesystem.zipFolder

```js
import * as filesystem from 'rise-filesystem-foundation'
await filesystem.zipFolder({
    source: '/source',
    target: '/target',
    name: 'lambdaCode',
    projectRoot: __dirname
})
```

### filesystem.getTextContent

```js
import * as filesystem from 'rise-filesystem-foundation'
const text = await filesystem.getTextContent({
    path: '/text.txt',
    projectRoot: __dirname
})
```
