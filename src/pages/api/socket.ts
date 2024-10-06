import { type NextApiRequest } from 'next'
import { Server } from 'socket.io'

const SocketHandler = (req: NextApiRequest, res: any): void => {
  if (res.socket.server.io) {
    res.end()
    return
  }

  const io = new Server(res.socket.server, { path: '/api/socket' })
  res.socket.server.io = io

  io.on('connection', (socket) => {
    socket.on('join', console.log)
  })

  res.end()
}

export default SocketHandler
