const client = mqtt.connect(mqtt://emqx.dhcautomation.ca:1883);

client.on('connect', function () {
    console.log('Connected to MQTT');
    client.subscribe('your/mqtt/topic');
});

client.on('message', function (topic, message) {
    console.log('Message arrived:', message.toString());
    document.getElementById('mqttData').innerHTML = message.toString();
});

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
