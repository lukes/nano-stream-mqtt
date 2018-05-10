#!/usr/bin/env node

var mqtt = require('mqtt')
// const util = require('util');
const ipc = require('node-ipc');

ipc.config.id = 'nanoStreamMQTT';
ipc.config.retry = 1500;
ipc.config.logger = () => {}; // Make ipc logger a no-op

const args = {};
// Collect all args passed in
process.argv.slice(2).forEach((arg) => {
  const [key, value] = arg.split('=');
  args[key] = value;
});

const HOST = args.host || 'mqtt://127.0.0.1';
const TOPIC = args.topic || 'nanostream';

const options = {};
if (args.username) options.username = args.username;
if (args.password) options.password = args.password;

const connection = mqtt.connect(HOST, options);

connection.on('error', function(e) {
  console.error('Error from mqtt: ', e);
});

const publishCallback = (failed, error) => {
  if (failed) {
    console.error(`Error encountered when publishing to topic ${TOPIC}`, error);
  }
};

// Wait for connection to become established
connection.on('connect', function () {
  console.debug('Connected to MQTT server');
  console.debug(`Will publish to topic "${TOPIC}"`);

  // Connect to the block data streaming socket
  ipc.connectTo(
    'nanoStream', () => {
      ipc.of.nanoStream.on('error', (err) => {
        if (err.errno == 'ECONNREFUSED') {
          console.error('Error trying to connect to nano-stream-x, nano-stream-x is not running');
        } else {
          console.error('Error trying to connect to nano-stream-x', err);
        }
      });
      ipc.of.nanoStream.on('connect', () => console.debug('Connected to nano-stream-x'));
      ipc.of.nanoStream.on(
        'payload', // topic
        function(data){
          connection.publish(TOPIC, data, publishCallback);
          console.debug(`Sending data to topic ${TOPIC}`);
        }
      );
    }
  );
});
