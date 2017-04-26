# recursive-uncache

`require` per caches all modules. 
If you remove a module from `require.cache`, but the parent module doesn't reevaluate its `require` calls, the old state persists.

`recursive-uncache` removes a module and all recursive parents from the cache.

### Install

```sh
npm install --save-dev recursive-uncache
```

### Usage

```js
uncache = require("recursive-uncache")

uncache(module,base=".",verbose=false) // module must be a absolute path
// example with chokidar
chokidar.watch(["./src"],{ignoreInitial: true})
.on("all", (ev, filepath) => uncache(filepath))
```

## License
Copyright (c) 2017 Paul Pflugradt
Licensed under the MIT license.
