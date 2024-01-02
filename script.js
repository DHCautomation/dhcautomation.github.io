const client = new Paho.MQTT.Client(process.env.GITHUB_SECRET_MQTT_SERVER || process.env.MQTT_SERVER || emqx.dhcautomation.ca, 1883, "web_" + parseInt(Math.random() * 100, 10));

client.onConnectionLost = function (responseObject) {
    if (responseObject.errorCode !== 0) {
        console.error("Connection lost:", responseObject.errorMessage);
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
    onFailure: function (responseObject) {
        console.error("Failed to connect:", responseObject.errorMessage);
    },
    useSSL: false, // Set to true if your MQTT server uses SSL
    userName: process.env.GITHUB_SECRET_MQTT_USERNAME || process.env.MQTT_USERNAME || 'your_default_username',
    password: process.env.GITHUB_SECRET_MQTT_PASSWORD || process.env.MQTT_PASSWORD || 'your_default_password',
};

client.connect(connectOptions);
