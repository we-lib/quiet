var mkdirp = require('mkdirp')
var quiet = require('./')
var fs = require('fs')
var path = require('path')
var assert = require('assert')
var _ = require('underscore')

var _songsData = {
  meta: {
    name: 'songs',
    type: 'mp3'
  },
  list: [
    { id: 1 },
    { id: 3 },
    { id: 5 }
  ]
}

describe('quiet', function(){
  before(function(){
    mkdirp.sync(r('./tmp/'))
    var songsJson = JSON.stringify(_songsData)
    fs.writeFileSync(r('./tmp/songs.json'), songsJson)
  })

  var songsDb = quiet(r('./tmp/songs.json'))
  songsDb.on('error', function(err){
    console.error(err)
  })

  it('resolves path', function(){
    assert.ok(songsDb.file === r('./tmp/songs.json'))
  })

  it('loads file', function(done){
    songsDb.once('load', function(){
      songsData = songsDb.data
      assert.ok(_.isEqual(songsData, _songsData))
      //assert.equal(songsData, _songsData)
      done()
    }).load()
  })

  it('saves file', function(done){
    songsData.list.push({ id: 9 })
    songsDb.once('save', function(){
      songsDb.once('load', function(){
        assert.ok(_.isEqual(songsDb.data, songsData))
        //assert.equal(songsDb.data, songsData)
        done()
      }).load()
    }).save()
  })
})

function r(file){
  return path.resolve(__dirname, file)
}