# Informe Diario de Métricas de Sitio Web

Este proyecto consiste en un script en JavaScript que genera un informe diario de métricas de rendimiento de un sitio web y lo envía por correo electrónico. Utiliza las bibliotecas `nodemailer` y `cron` de Node.js para esta funcionalidad.

## Requisitos

- Node.js instalado en tu sistema.
- Cuenta de correo electrónico de Gmail para el envío de correos electrónicos.

## Configuración

1. Clona este repositorio en tu máquina local.

2. Instala las dependencias del proyecto ejecutando el siguiente comando en la terminal:

```bash
npm install
```

Crea un archivo .env en el directorio raíz del proyecto y agrega las siguientes variables de entorno:

- MAIL = your_mail
- PASSWORD = your_email_password
- DESTINATION = recipient_email
- SITE = your_website_url

Reemplaza your_email@gmail.com con tu dirección de correo electrónico de Gmail, your_email_password con la contraseña de tu cuenta de Gmail, recipient_email@example.com con la dirección de correo electrónico del destinatario del informe, y your_website_url con la URL del sitio web para el que deseas generar las métricas.

1. Asegúrate de habilitar el acceso a aplicaciones menos seguras en tu cuenta de Gmail para permitir que el script envíe correos electrónicos. Puedes hacerlo desde [aqui](https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4PYtIbnkUGzoTwAcIWGmNvodFjSq4h9CTenS-bOBFz9DTKB3272F9joHVrod-ITce1cIyFpmK6yujfXjkryVnRCCPGjfNPDNrH6HxBmePCYvNgidqQ).
2. Ejecuta el script con el siguiente comando:

```bash
npm start
```

El script generará el informe y lo enviará por correo electrónico a la dirección especificada en el archivo .env.

## Contribuir

Si deseas contribuir a este proyecto, ¡eres bienvenido! Si encuentras algún problema o tienes alguna mejora, no dudes en abrir un issue o enviar una solicitud de extracción.

## Licencia
Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.