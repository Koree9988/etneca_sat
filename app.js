const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const { SerialPort, ReadlineParser } = require('serialport')
const port = new SerialPort({ path:'/dev/ttyUSB0', baudRate:9600})
const parser = port.pipe(new ReadlineParser())


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        port.write('chat,'+Date.now()+',sid01,'+'rid01,'+msg)
        console.log('chat,'+Date.now()+',sid01,'+'rid01,'+msg)
    });

    socket.broadcast.emit('hi');
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
port.on("open", function () {
    // console.log('open');
    port.on('data', function(data) {
    });
});
parser.on('data',(data) =>{
    const payload = data.split(',')
    // console.log(payload)
    if(payload.length < 2)
        return;

    const dateTime = Date.now()
    const mobileId = payload[payload.length-2]
    const message = payload[payload.length-1]
    
    //send data to html file
    const msgPack ={
        timestamp:this.dateTime,
        mobileId:this.mobileId,
        message:this.message
    }
    parsers.emit('dataPack',(msgPack));
    
    console.log(`${dateTime} : ${mobileId} : ${message}`);
});

// serialPort.on('readable', function () {
//     console.log('Data:', port.read());
// });
// port.on("open",  () => {
//     console.log('open');
// });
// port.on('data', (data) =>{
//        parser.on('data', () => {
//         console.log()
//        }) 
//     });


server.listen(3000, () => {
  console.log('listening on *:3000');
});



