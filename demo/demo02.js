const events = require('events')
const eventEmitter = new events.EventEmitter()

const handler = () => console.log('i hear a scream!')
eventEmitter.on('scream', handler)
eventEmitter.emit('scream')