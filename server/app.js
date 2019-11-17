const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const m = (name, text, id) => ({
  name, text, id
})

io.on('connection', socket => {
  
  socket.on('userJoined', (data, callback) => { 
    if (!data.name || !data.room) {
      return callback('Данные некоректны')
    } 

    users.remove(socket.id)

    socket.join(data.room)

    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })

    callback({ userId: socket.id })
    socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}`));
    socket.broadcast
      .to(data.room)
      .emit('admin', `Пользователь ${data.name} вошел в комнату`)
  })

  socket.on('createMessage', (data, callback) => {
    if (!data.text) {
      return callback('Текст не может быть пустым')
    }

    const users = users.get(data.id)

    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.id));
    }
    
  })
})

module.exports = {
  app,
  server
}
