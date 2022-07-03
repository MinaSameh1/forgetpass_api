import app from './server'
import { connect, disconnect } from './utils/db'

// Start the application by listening to specific port
const port = Number(process.env.PORT || 8080)

process.on('exit', async () => {
  await disconnect()
})

async function start() {
  await connect()
  app.listen(port, () => {
    console.info('Express application started on port: ' + port)
  })
}
start()
