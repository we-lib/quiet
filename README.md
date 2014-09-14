# quiet

Loads and saves json data from/to fs

## Usage

```js
var quiet = require('quiet')
var songsDb = quiet('./songs.json')
console.log(songsDb.file) // abs path

songsDb.once('load', function(){
  // file loaded
  var songsData = songsDb.data
  console.log(songsData)  // parsed obj
  // ...
}).load()

// ...
songsData.list.push({ id: 77 })
songsDb.once('save', function(){
  // file saved
}).save()
```