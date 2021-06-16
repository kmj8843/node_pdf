const PDFDocument = require('pdfkit');
const fs = require('fs');

const TABLE_HEIGHT = 20;
const TABLE_WIDTH = 240;
const TABLE_START = 10;

let textInRowFirst = (doc, text, heigth) => {
    doc.y = heigth;
    doc.x = TABLE_START;
    doc.fillColor('black')
    doc.text(text, {
        paragraphGap: 5,
        indent: 5,
        align: 'justify',
        columns: 1,
    });
    return doc
}

let textInRowSecond = (doc, text, heigth) => {
    doc.y = heigth;
    doc.x = TABLE_WIDTH / 2 + TABLE_START;
    doc.fillColor('black')
    doc.text(text, {
        paragraphGap: 5,
        indent: 5,
        align: 'justify',
        columns: 2,
    });
    return doc
}


let row = (doc, heigth) =>{
    doc.lineJoin('miter')
        .rect(TABLE_START, heigth, TABLE_WIDTH, TABLE_HEIGHT)
        .stroke()
    return doc
}

// Create a document
const doc = new PDFDocument(); // 612 * 792
// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream(`output/pdfkit-${ Date.now() }.pdf`));
doc.lineCap('butt')
    .moveTo(130, 90) // rect(p1, p2, p3, p4) 의 p3 / 2 + p1 이 첫번째 인자
    .lineTo(130, 230)
    .stroke();
// doc.lineCap('butt')
//     .moveTo(270, 90)
//     .lineTo(270, 230)
//     .stroke();

row(doc, 90);
row(doc, 110);
row(doc, 130);
row(doc, 150);
row(doc, 170);
row(doc, 190);
row(doc, 210);

textInRowFirst(doc, 'Name', 100);
textInRowFirst(doc, 'Age', 120);
textInRowFirst(doc, 'Dirección', 140);
textInRowFirst(doc, 'Comuna', 160);
textInRowFirst(doc, 'Ciudad', 180);
textInRowFirst(doc, 'Telefono', 200);
textInRowFirst(doc, 'e-mail', 220);

textInRowSecond(doc, '홍길동', 100);
textInRowSecond(doc, '25', 120);
textInRowSecond(doc, 'Dirección', 140);
textInRowSecond(doc, 'Comuna', 160);
textInRowSecond(doc, 'Ciudad', 180);
textInRowSecond(doc, 'Telefono', 200);
textInRowSecond(doc, 'e-mail', 220);

doc.end();