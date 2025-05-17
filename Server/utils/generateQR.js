const QRCode = require('qrcode');

   const generateQR = async (prescriptionId) => {
     try {
       return await QRCode.toDataURL(prescriptionId);
     } catch (error) {
       throw new Error('Failed to generate QR code');
     }
   };

   module.exports = generateQR;