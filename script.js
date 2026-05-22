let client;

function logMessage(msg, color = "white")
{
    const messages = document.getElementById("messages");

    messages.innerHTML += `<span style="color:${color}">${msg}</span><br>`;

    messages.scrollTop = messages.scrollHeight;
}

function connectMQTT()
{
    const broker = document.getElementById("broker").value;
    const port = document.getElementById("port").value;
    const clientId = document.getElementById("clientId").value;

    const url = `wss://${broker}:${port}/mqtt`;

    client = mqtt.connect(url, {
        clientId: clientId
    });

    // ===== CONECTADO =====
    client.on("connect", () =>
    {
        const status = document.getElementById("status");

        status.innerText = "Conectado ao broker";
        status.style.color = "red";
        status.style.fontWeight = "bold";

        logMessage("Conectado ao broker MQTT", "red");
    });

    // ===== RECEBIMENTO =====
    client.on("message", (topic, message) =>
    {
        logMessage(`[${topic}] ${message.toString()}`);
    });

    // ===== ERRO =====
    client.on("error", (err) =>
    {
        const status = document.getElementById("status");

        status.innerText = "Erro na conexão";
        status.style.color = "orange";

        logMessage("Erro: " + err, "orange");
    });

    // ===== DESCONECTADO =====
    client.on("close", () =>
    {
        const status = document.getElementById("status");

        status.innerText = "Desconectado";
        status.style.color = "white";

        logMessage("Desconectado do broker", "gray");
    });
}

function subscribeTopic()
{
    const topic = document.getElementById("subTopic").value;

    client.subscribe(topic, () =>
    {
        logMessage("Inscrito em: " + topic, "lightgreen");
    });
}

function publishMessage()
{
    const topic = document.getElementById("pubTopic").value;
    const message = document.getElementById("message").value;

    client.publish(topic, message);

    logMessage(`Enviado para ${topic}: ${message}`, "cyan");
}
