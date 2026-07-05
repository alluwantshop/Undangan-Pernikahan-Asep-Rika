function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Ambil parameter dari form
  var nama = e.parameter.nama;
  var whatsapp = e.parameter.whatsapp;
  var jumlah = e.parameter.jumlah;
  var kehadiran = e.parameter.kehadiran;
  var ucapan = e.parameter.ucapan;
  var timestamp = new Date();
  
  // Masukkan baris baru ke Sheet
  sheet.appendRow([timestamp, nama, whatsapp, jumlah, kehadiran, ucapan]);
  
  // Kembalikan response sukses
  return ContentService.createTextOutput(JSON.stringify({"result":"success", "data": e.parameter}))
    .setMimeType(ContentService.MimeType.JSON);
}