import nodemailer from 'nodemailer'
import { CronJob } from 'cron';
import 'dotenv/config'

const redColor = { background: '#ffeaea', color: '#ff3333' }
const yellowColor = { background: '#ffe5c1', color: '#ffaa33' }
const greenColor = { background: '#e5faef', color: '#00cc66' }

function getColor(value) {
  if (value < 50) return redColor
  else if (value < 90) return yellowColor
  return greenColor
}

const mailTransporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  }
})

async function fetchResults() {
  const rawResponse = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${process.env.SITE}&category=accessibility&category=best-practices&category=performance&category=seo&strategy=mobile`)
  const response = await rawResponse.json()

  const performance = Math.floor(Number(response.lighthouseResult.categories.performance.score) * 100)
  const accessibility = Math.floor((response.lighthouseResult.categories.accessibility.score) * 100)
  const practices = Math.floor((response.lighthouseResult.categories['best-practices'].score) * 100)
  const seo = Math.floor((response.lighthouseResult.categories.seo.score) * 100)

  await new Promise(resolve => setTimeout(resolve, 80000));

  return {
    performance,
    accessibility,
    practices,
    seo
  }
}

async function sendReport() {

  try {
    const data1 = await fetchResults()
    const data2 = await fetchResults(data1)
    const data3 = await fetchResults(data2)
    const data4 = await fetchResults(data3)

    const performance = Math.max(data1.performance, data2.performance, data3.performance, data4.performance)
    const accessibility = Math.max(data1.accessibility, data2.accessibility, data3.accessibility, data4.accessibility)
    const practices = Math.max(data1.practices, data2.practices, data3.practices, data4.practices)
    const seo = Math.max(data1.seo, data2.seo, data3.seo, data4.seo)

    const performance_color = getColor(performance)
    const accessibility_color = getColor(accessibility)
    const practices_color = getColor(practices)
    const seo_color = getColor(seo)

    const day = new Date().getDate()
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()

    const template = `<table style="font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ; background-color: black; width: 650px; margin: 0 auto;" align="center"><tr><td><table style="width: 600px; color: white; padding: 20px; margin: auto; "><tr><td><h1 style="text-align: center; color: white;">Reporte diario de metricas del <br> sitio publico</h1><p style="text-align: center; color: white;">Reporte generado automaticamente para el <br> monitoreo de las metricas del Sitio <Strong><a href="https://www.bancofinandina.com" style="text-decoration: none; color: #e31952;" target="_blank" rel="no-rel">Banco Finandina</a></Strong></p><h2 style="margin-bottom: 0; color: white">Resultados</h2><p style="margin-top: 0; color: white">Fecha: ${day}/${month}/${year}</p><table style="margin: auto; border-spacing: 20px;"><tr><td><div style="width: 50px; height: 50px; border-radius: 50px; background-color: ${performance_color.background}; border: 5px solid ${performance_color.color}; margin: auto;"><p style="color: ${performance_color.color}; font-size: 22px; text-align: center; margin: 0; padding-top: 9px;">${performance}</p></div><p style="text-align: center; color: white; margin: 0;">Performance</p></td><td><div style="width: 50px; height: 50px; border-radius: 50px; background-color: ${accessibility_color.background}; border: 5px solid ${accessibility_color.color}; margin: auto;"><p style="color: ${accessibility_color.color}; font-size: 22px; text-align: center; margin: 0; padding-top: 9px;">${accessibility}</p></div><p style="text-align: center; color: white; margin: 0;">Accessibility</p></td><td><div style="width: 50px; height: 50px; border-radius: 50px; background-color: ${practices_color.background}; border: 5px solid ${practices_color.color}; margin: auto;"><p style="color: ${practices_color.color}; font-size: 22px; text-align: center; margin: 0; padding-top: 9px;">${practices}</p></div><p style="text-align: center; color: white; margin: 0;">Best Practices</p></td><td><div style="width: 50px; height: 50px; border-radius: 50px; background-color: ${seo_color.background}; border: 5px solid ${seo_color.color}; margin: auto;"><p style="color: ${seo_color.color}; font-size: 22px; text-align: center; margin: 0; padding-top: 9px;">${seo}</p></div><p style="text-align: center; color: white; margin: 0;">SEO</p></td></tr></table><p style="text-align: start; color: white;">Atentamente,<br><strong style="font-size: 24px;">Alberto Arias</strong><br><span style="font-size: 10px;">Web developer</span></p><hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;"><p style="text-align: center; font-size: 12px; color: white;"><strong>Alberto Arias ${year}</strong><br>Todos los derechos reservados</p></td></tr></table></td></tr></table>`

    const options = {
      from: process.env.ALIAS,
      to: process.env.DESTINATION,
      subject: `Reporte del sitio publico ${day}/${month}/${year}`,
      html: template
    }

    mailTransporter.sendMail(options)
  } catch (e) { console.error(`Something is going wrong, ${e}`) }
}

//sendReport()
new CronJob('0 8 * * 1-5', sendReport, null, true, 'America/Bogota')