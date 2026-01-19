# Pasos para tener localmente un web-push

<https://www.npmjs.com/package/web-push>
<https://github.com/web-push-libs/web-push>

1. Clonamos el repo

```sh
git clone https://github.com/web-push-libs/web-push.git ./
```

2. Instalamos las dependencias

```sh
npm i
```

3. Generar las VAPID KEYS

```sh
node src/cli.js generate-vapid-keys --json
```
> Me devuelve un json con la clave publica y la clave privada

```json
{"publicKey":"BKKg1o6TJTQDb8Vqo9c8KEAGYL_-EMy6zlgflDAfd5vfzYGcpVKNc9EJEXkRBPr1Fmgp8jOtDI12RuBZ10YxNUM","privateKey":"TQv2ja6z_pRtTXkOxA-l9475Js9zJ6saI1wDElXX3EI"}
```

4. Setear la clave pública dentro de nuestra PWA (Progressive Web App)

5. Suscribirse al servidor de Google.

```json
{"endpoint":"https://fcm.googleapis.com/fcm/send/eLBQEbgYmK0:APA91bHqTBk1K0ZTmlcxSp5fSYOKeZ-QtmkzfhmWYLQxZy0lpd0rnOSK4AiaGcp3z7pGBdu4vAJAspbG5bNWzD5Jrs1WBi-i1HQ-0Th0U2Ck4AbSqdsKANV7g2o9bDpoMbg2w99-vg8F","expirationTime":null,"keys":{"p256dh":"BDtylLI6RkVOdz_2300klHcEAMUIHKe9Sw84LSsWB-mpAQJBy2g-3z4XXP08x3Wdy_zu3gThb8_rVbfhK0EsjPw","auth":"FA1mrsZz0yaJeg0QKUClmA"}}
``` 

6. Enviar las notificaciones

```sh
node src/cli.js send-notification --endpoint="https://fcm.googleapis.com/fcm/send/eLBQEbgYmK0:APA91bHqTBk1K0ZTmlcxSp5fSYOKeZ-QtmkzfhmWYLQxZy0lpd0rnOSK4AiaGcp3z7pGBdu4vAJAspbG5bNWzD5Jrs1WBi-i1HQ-0Th0U2Ck4AbSqdsKANV7g2o9bDpoMbg2w99-vg8F" --key="BDtylLI6RkVOdz_2300klHcEAMUIHKe9Sw84LSsWB-mpAQJBy2g-3z4XXP08x3Wdy_zu3gThb8_rVbfhK0EsjPw" --auth="FA1mrsZz0yaJeg0QKUClmA" --payload="30% en asados" --ttl=0 --vapid-subject="mailto: mlapeducacionit@gmail.com" --vapid-pubkey="BKKg1o6TJTQDb8Vqo9c8KEAGYL_-EMy6zlgflDAfd5vfzYGcpVKNc9EJEXkRBPr1Fmgp8jOtDI12RuBZ10YxNUM" --vapid-pvtkey="TQv2ja6z_pRtTXkOxA-l9475Js9zJ6saI1wDElXX3EI"
```