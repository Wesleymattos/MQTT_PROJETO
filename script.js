let client;

function logMessage(msg) {
    const messages = document.getElementById("messages");
    messages.innerHTML += msg + "<br>";
    messages.scrollTop = messages.scrollHeight;
}

function connectMQTT() {

    const broker = document.getElementById("broker").value;
    const port = document.getElementById("port").value;
    const clientId = document.getElementById("clientId").value;

    const url = `wss://${broker}:${port}/mqtt`;

    client = mqtt.connect(url, {
        clientId: clientId
    });

    client.on("connect", () => {
        document.getElementById("status").innerText = "Conectado";
        logMessage("Conectado ao broker MQTT");
    });

    client.on("message", (topic, message) => {
        logMessage(`[${topic}] ${message.toString()}`);
    });

    client.on("error", (err) => {
        logMessage("Erro: " + err);
    });
}

function subscribeTopic() {

    const topic = document.getElementById("subTopic").value;

    client.subscribe(topic, () => {
        logMessage("Inscrito em: " + topic);
    });
}

function publishMessage() {

    const topic = document.getElementById("pubTopic").value;
    const message = document.getElementById("message").value;

    client.publish(topic, message);

    logMessage(`Enviado para ${topic}: ${message}`);
}
