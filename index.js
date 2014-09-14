var fs = require('fs')
var events = require('events')
var util = require('util')

module.exports = function(file){
  return new Db(file)
}

util.inherits(Db, events.EventEmitter)

function Db(file){
  this.file = file
  this.data = null
}
Db.prototype.load = function(){
  var self = this
  fs.readFile(this.file, function(err, buf){
    if (err) return self.emit('error', err)
    self.data = JSON.parse(buf.toString())
    self.emit('load')
  })
}
Db.prototype.save = function(){
  var self = this
  var str = JSON.stringify(this.data)
  fs.writeFile(this.file, str, function(err){
    if (err) return self.emit('error', err)
    self.emit('save')
  })
}