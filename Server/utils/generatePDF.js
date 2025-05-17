const PDFDocument = require('pdfkit');
   const fs = require('fs');

   const generatePDF = (prescription, qrCode) => {
     return new Promise((resolve, reject) => {
       const doc = new PDFDocument();
       const stream = fs.createWriteStream(`prescription_${prescription._id}.pdf`);

       doc.pipe(stream);
       doc.fontSize(16).text('Prescription', { align: 'center' });
       doc.fontSize(12).text(`Patient ID: ${prescription.patientId}`);
       doc.text(`Doctor ID: ${prescription.doctorId}`);
       doc.text(`Symptoms: ${prescription.symptoms.join(', ')}`);
       doc.text('Medications:');
       prescription.medications.forEach(med => {
         doc.text(`- ${med.name}: ${med.dosage}, ${med.frequency}, ${med.duration}`);
       });
       doc.text(`Instructions: ${prescription.instructions}`);
       doc.text(`Expiry: ${prescription.expiryDate}`);
       doc.text(`Max Uses: ${prescription.maxUses}`);
       doc.image(qrCode, { fit: [100, 100], align: 'center' });
       doc.end();

       stream.on('finish', () => resolve(`prescription_${prescription._id}.pdf`));
       stream.on('error', reject);
     });
   };

   module.exports = generatePDF;