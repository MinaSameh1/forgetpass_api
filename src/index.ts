import app from './server'
import config from 'config'
import { connect, disconnect } from './utils/db'

// Start the application by listening to specific port
const port = Number(process.env.PORT || 8080)

process.on('exit', async () => {
  await disconnect()
})

async function start() {
  if(process.env['production']) await connect(process.env['DB_URI'] || config.get<string>('dbUri'))
  else await connect(config.get<string>('dbUri'))
  app.listen(port, () => {
    console.info('Express application started on port: ' + port)
  })
}
start()
