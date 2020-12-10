import axios from 'axios'
import * as functions from 'firebase-functions';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firedsdsdsbase!" + new Date());
});

export const pdf = functions.https.onRequest(async (req, res) => {
  const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
  
  // const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  const existingPdfBytes = await axios.get<ArrayBuffer>(url,{responseType: 'arraybuffer'}).then(res => res.data)

  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { height } = firstPage.getSize()
  firstPage.drawText('This text was added with JavaScript!', {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45),
  })

  const pdfBytes = await pdfDoc.save()
  res.type("aplication/pdf").send(Buffer.from(pdfBytes))
})
