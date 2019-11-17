const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const m = (name, text, id) => ({
  name, text, id
})

io.on('connection', socket => {
  
  socket.on('userJoined', (data, callback) => { 
    if (!data.name || !data.room) {
      return callback('Данные некоректны')
    } 

    socket.join(data.room)

    callback({ userId: socket.id })
    socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}`))
    socket.emit("newMessage", m("TEST", `Добро пожаловать`));
    socket.broadcast
      .to(data.room)
      .emit('admin', `Пользователь ${data.name} вошел в комнату`)
  })

  socket.on('createMessage', data => {
    setTimeout(() => {
      socket.emit('newMessage', {
        text: data.text + ' SERVER'
      })
    }, 500)
  })
})

module.exports = {
  app,
  server
}
