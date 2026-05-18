# MQTT_PROJETO
Esse será um protótipo de MQTT para nossos primeiros testes
# MQTT ESP32 Dashboard

Projeto de comunicação MQTT utilizando ESP32 + Broker Público HiveMQ + Dashboard Web.

---

# Visão Geral

Este projeto demonstra:

* conexão Wi-Fi no ESP32
* comunicação MQTT
* publicação de mensagens
* subscribe em tópicos
* dashboard web MQTT
* monitoramento em tempo real

Arquitetura:

```txt
ESP32 ---> Broker MQTT ---> Dashboard Web
```

ou:

```txt
ESP32 ---> HiveMQ ---> MQTTX / Navegador / Celular
```

---

# Broker MQTT Utilizado

Broker público HiveMQ:

[https://www.hivemq.com/mqtt/public-mqtt-broker/](https://www.hivemq.com/mqtt/public-mqtt-broker/)

---

# Dados de Conexão

## Broker

```txt
broker.hivemq.com
```

---

## MQTT TCP

### Porta

```txt
1883
```

### URL TCP

```txt
mqtt://broker.hivemq.com:1883
```

### Segurança

```txt
Sem TLS/SSL
```

---

## MQTT WebSocket Seguro (WSS)

### Porta

```txt
8884
```

### Path

```txt
/mqtt
```

### URL WSS

```txt
wss://broker.hivemq.com:8884/mqtt
```

### Segurança

```txt
TLS/SSL habilitado
```

---

# Tópico MQTT Utilizado

```txt
wesley/teste
```

---

# Bibliotecas Utilizadas

## ESP32

### Wi-Fi

```cpp
#include <WiFi.h>
```

### MQTT

```cpp
#include <PubSubClient.h>
```

Biblioteca:

[https://github.com/knolleary/pubsubclient](https://github.com/knolleary/pubsubclient)

---

## Dashboard Web

Biblioteca JavaScript MQTT:

[https://github.com/mqttjs/MQTT.js](https://github.com/mqttjs/MQTT.js)

CDN utilizada:

```html
<script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
```

---

# Exemplo de Publish

```cpp
client.publish("wesley/teste", "Ola do ESP32");
```

---

# Exemplo de Subscribe

```cpp
client.subscribe("wesley/teste");
```

---

# Fluxo MQTT

## Publicação

O ESP32 publica uma mensagem:

```txt
Ola do ESP32
```

O broker recebe a mensagem e redistribui para todos os clientes inscritos no tópico.

---

## Subscribe

Clientes inscritos no tópico:

```txt
wesley/teste
```

recebem as mensagens automaticamente.

---

# Cliente MQTT Web

Cliente oficial HiveMQ:

[https://www.hivemq.com/demos/websocket-client/](https://www.hivemq.com/demos/websocket-client/)

---

# Dashboard Web

O dashboard web permite:

* conectar no broker MQTT
* publicar mensagens
* assinar tópicos
* visualizar mensagens em tempo real

Arquivos:

```txt
index.html
style.css
script.js
```

---

# Estrutura do Projeto

```txt
mqtt_dashboard/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

# Tipo de Comunicação

## Modelo

```txt
Publish / Subscribe
```

## Protocolo

```txt
MQTT
```

## Transporte

```txt
TCP/IP
```

## Comunicação

```txt
Assíncrona
```

---

# Possíveis Expansões

* controle de LEDs
* automação residencial
* sensores IoT
* envio de JSON
* integração com Node-RED
* integração com Home Assistant
* comunicação entre múltiplos ESP32
* MQTT com TLS
* autenticação MQTT
* dashboards em tempo real

---

# Autor

Projeto de estudo utilizando ESP32 + MQTT + HiveMQ.
