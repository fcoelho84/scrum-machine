import type { Socket } from 'net'
import type { NextApiRequest, NextApiResponse } from 'next'
import { type Server as IOServer } from 'socket.io'
import { Server } from 'socket.io'

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: Socket & { io?: IOServer | undefined }
}
const SocketHandler = (
  req: NextApiRequest,
  res: NextApiResponseWithSocket
): void => {
  if (res.socket?.io) {
    res.status(200).json({
      success: true,
      message: 'Socket is already running',
    })
    return
  }

  res.socket.io = new Server({ path: '/api/socket' })

  res.socket.io.on('connection', (socket) => {
    socket.on('join', async (roomId: string) => {
      await socket.join(roomId)
    })
  })

  res.end()
}

export default SocketHandler
