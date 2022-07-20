// var serialport = require('serialport');
// var SerialPort = serialport.SerialPort;
// Open the port
// var port = new SerialPort("/dev/ttyUSB0", {
//     baudrate: 9600,
//     parser: serialport.parsers.readline("\n")
// });

const { SerialPort, ReadlineParser } = require('serialport')
const port = new SerialPort({ path:'/dev/ttyACM0', baudRate:115200})
const parser = port.pipe(new ReadlineParser())


// Read the port data
port.on("open", function () {
    console.log('open');
    port.on('data', function(data) {
    });
});
// parser.on('data',(data) =>{
//     console.log(data)
// });
parser.on('data',(data) =>{
    const payload = data.split(',')
    // console.log(payload)
    if(payload.length < 2)
        return;
    const mobileId = payload[payload.length-2]
    const message = payload[payload.length-1]
    console.log(`${Date.now()} : ${mobileId} : ${message}`);
});