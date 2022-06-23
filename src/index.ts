import app from './server';
import { connect, disconnect } from './utils/db'

// Start the application by listening to specific port
const port = Number(process.env.PORT || 8080);

process.on('Start', async () => {
	await connect()
})

process.on('exit', async ()=>{
	await disconnect()
})

app.listen(port, () => {
	console.info('Express application started on port: ' + port);
});

