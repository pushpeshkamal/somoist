const express = require("express");
const cors = require("cors");
const app = express();
var SerialPort = require("serialport");
var Data;
app.use(cors());

const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
  delimiter: "\r\n",
});

var port = new SerialPort("/dev/cu.usbmodem143401", {
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  flowControl: false,
});

port.pipe(parser);

parser.on("data", function (data) {
  Data = data;
});

//redirection link

app.use("/data", (req, res) => {
  res.send({
    token: [Data],
  });
});

app.use("/login", (req, res) => {
  res.send({
    hello: "test123",
  });
});

app.listen(8080, () =>
  console.log("API is running on http://localhost:8080/login")
);
