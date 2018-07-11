
# nano-stream-mqtt

[![npm version](https://badge.fury.io/js/nano-stream-mqtt.svg)](https://badge.fury.io/js/nano-stream-mqtt)

A tiny and performant client that streams block data from a [Nano currency](https://nano.org/) node over the MQTT messaging protocol.

It builds on the socket stream of block data set up by the [nano-stream-x](https://github.com/lukes/nano-stream-x) library.

## Installation

Install both [`nano-stream-x`](https://github.com/lukes/nano-stream-x) and `nano-stream-mqtt` as global packages:

    npm install --global nano-stream-x
    npm install --global nano-stream-mqtt

## Usage

### Start the stream

    nano-stream-x

This will start a streaming server on `127.0.0.1:3000`. To override these:

    nano-stream-x host=ip6-localhost port=3001

### Start the MQTT client

    nano-stream-mqtt

By default you will connect to `mqtt://127.0.0.1`. To connect to a different host:

    nano-stream-mqtt host=mqtts://mosquitto.example.com

Data will be sent to the default topic `nanostream`. To set a different topic:

    nano-stream-mqtt topic=my_topic

To connect with a username and password:

    nano-stream-mqtt username=my_username password=my_password

### Configure your Nano node to send data to nano-stream-x

Your Nano node is easily configured to send block processing data to a server (in this case `nano-stream-x`). See the [wiki article](https://github.com/lukes/nano-stream-x/wiki/Configure-your-Nano-node-to-send-data-to-the-nano-stream-x) (external link) for how to set this up.
