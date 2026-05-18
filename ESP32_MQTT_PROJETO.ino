#include <WiFi.h>
#include <PubSubClient.h>

// ================= WIFI =================
const char* ssid = "Lourdes_Conectnet";
const char* password = "26112004";

// ================= MQTT =================
const char* mqtt_server = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient client(espClient);

// ========================================

void connectWiFi();
void connectMQTT();
void callback(char* topic, byte* payload, unsigned int length);

void setup()
{
    Serial.begin(115200);

    connectWiFi();

    client.setServer(mqtt_server, 1883);
    client.setCallback(callback);
}

void loop()
{
    if (!client.connected())
    {
        connectMQTT();
    }

    client.loop();

    static unsigned long lastMsg = 0;

    if (millis() - lastMsg > 3000)
    {
        lastMsg = millis();

        String mensagem = "Ola do ESP32";

        client.publish("wesley/teste", mensagem.c_str());

        Serial.println("Mensagem enviada:");
        Serial.println(mensagem);
    }
}

// ========================================

void connectWiFi()
{
    Serial.println();
    Serial.print("Conectando WiFi: ");

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println();
    Serial.println("WiFi conectado!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
}

// ========================================

void connectMQTT()
{
    while (!client.connected())
    {
        Serial.println("Conectando MQTT...");

        String clientId = "ESP32_";
        clientId += String(random(0xffff), HEX);

        if (client.connect(clientId.c_str()))
        {
            Serial.println("MQTT conectado!");

            client.subscribe("wesley/teste");

            client.publish("wesley/teste", "ESP32 online");
        }
        else
        {
            Serial.print("Falhou, rc=");
            Serial.print(client.state());
            Serial.println(" tentando novamente...");

            delay(2000);
        }
    }
}

// ========================================

void callback(char* topic, byte* payload, unsigned int length)
{
    Serial.print("Mensagem recebida [");
    Serial.print(topic);
    Serial.print("]: ");

    for (int i = 0; i < length; i++)
    {
        Serial.print((char)payload[i]);
    }

    Serial.println();
}