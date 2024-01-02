// script.js

const client = new Paho.MQTT.Client("YOUR_SERVER_ADDRESS", 8083, "web_" + parseInt(Math.random() * 100, 10));

client.onConnectionLost = function (responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Connection lost: " + responseObject.errorMessage);
    }
};

client.onMessageArrived = function (message) {
    console.log("Message arrived:", message.payloadString);
    document.getElementById("mqttData").innerHTML = message.payloadString;
};

const connectOptions = {
    onSuccess: function () {
        console.log("Connected to MQTT");
        client.subscribe("your/mqtt/topic");
    },
    useSSL: true,
    userName: "YOUR_USERNAME",
    password: "YOUR_PASSWORD",
};

client.connect(connectOptions);
