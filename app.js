const pdfmake = require('pdfmake');
const fs = require('fs');
const fonts = require('./public/fonts/fonts');
const printer = new pdfmake(fonts);

const forbiddenHeader = [
    { text: '표현 리스트', style: 'tableHeader' },
    { text: '사유',        style: 'tableHeader' }
];

const ingredientsHeader = [
    { text: 'OCR 인식 데이터',    style: 'tableHeader' }, 
    { text: '제안',               style: 'tableHeader' }, 
    { text: '실제 전성분 데이터', style: 'tableHeader' }, 
    { text: '일치',               style: 'tableHeader' }
];

const nessaryHeader = [
    { text: '표시 사항',    style: 'tableHeader' }, 
    { text: '유무',    style: 'tableHeader' }
]

let makeRow = (body, text, fillColor = null) => {
    let tempArray = new Array();
    text.forEach( (value) => {
        tempArray.push( { text: value, fillColor: fillColor } );
    });
    body.push( tempArray );
}

let forbiddenBody = new Array();
forbiddenBody.push(forbiddenHeader);
makeRow(forbiddenBody, [ '빠른', '속효성 표현으로 소구 불가' ]);
makeRow(forbiddenBody, [ '끈적임 없는', '완곡한 표현으로 소구 불가' ]);
makeRow(forbiddenBody, [ '항균', '인체세정용 제품에서 임상 완료 후 사용 가능' ]);
makeRow(forbiddenBody, [ '항바이러스', '화장품의 정의를 벗어난 표현으로 소구 불가' ]);
makeRow(forbiddenBody, [ '친환경', '화장품의 정의를 벗어난 표현으로 소구 불가' ]);
makeRow(forbiddenBody, [ '천연', '천연화장품 인증 완료 후 사용 가능' ]);
makeRow(forbiddenBody, [ '자연친화적', '화장품의 정의를 벗어난 표현으로 소구 불가' ]);

let ingredientsBody = new Array();
ingredientsBody.push(ingredientsHeader);
makeRow(ingredientsBody, [ '정지수', '정제수', '정제수', 'O' ]);
makeRow(ingredientsBody, [ '글리세린', '글리세린', '글리세린', 'O' ]);
makeRow(ingredientsBody, [ '대이소듐코코암포다이아세테이트', '다이소듐코코암포다이아세테이트', '다이소듐코코암포다이아세테이트', 'O' ], '#ffeb3b');
makeRow(ingredientsBody, [ '소듐코코일알라니네이트', '소듐코코일알라니네이트', '소듐코코일알라니네이트', 'O' ]);
makeRow(ingredientsBody, [ '셀룰로오스', '셀룰로오스', '셀룰로오스', 'O' ]);

let nessaryBody = new Array();
nessaryBody.push(nessaryHeader);
makeRow(nessaryBody, ['제품명', 'X']);
makeRow(nessaryBody, ['화장품책임판매업자', 'O']);
makeRow(nessaryBody, ['화장품제조업자', 'O']);
makeRow(nessaryBody, ['용량', 'X']);
makeRow(nessaryBody, ['분리배출', 'O']);
makeRow(nessaryBody, ['전성분', 'X']);


let docDefinition = {
	content: [
        // 금지표현 검토
		{   text: '금지표현 검토', style: 'header' },
        {   image: 'public/image/forbidden.png', fit: [300, 300], },
		{   style: 'forbidden_table', layout: 'lightHorizontalLines',
			table: {
				headerRows: 1,
                widths: [120, 350],
				body: forbiddenBody
			},
		},

        // 전성분 검토
        {   text: '전성분 검토', style: 'header', pageBreak: 'before' },
        {   image: 'public/image/ingredients.png', fit: [300, 300], },
		{   style: 'ingredients_table', layout: 'lightHorizontalLines',
			table: {
				headerRows: 1,
                widths: [150, 150, 150, 40],
				body: ingredientsBody
			},
		},

        // 필수 표기사항 검토
        {   text: '필수 표기사항 검토', style: 'header', pageBreak: 'before' },
        {   image: 'public/image/necessary.png', fit: [300, 300], },
        {   style: 'ingredients_table', layout: 'lightHorizontalLines',
            table: {
                headerRows: 1,
                widths: [120, 40],
                body: nessaryBody
            },
        },
    ],
	styles: {
        header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		},
        forbidden_table: {
            margin: [0, 5, 0, 15]
        },
        ingredients_table: {
            margin: [0, 5, 0, 15],
            fontSize: 10
        }
	},
	defaultStyle: {
		// alignment: 'justify'
		font: 'malgun'
	}
};

let pdfDoc = printer.createPdfKitDocument(docDefinition);

pdfDoc.pipe(fs.createWriteStream(`output/pdfmake-${ Date.now() }.pdf`));
// pdfDoc.pipe(fs.createWriteStream(`output/pdfmake.pdf`));
pdfDoc.end();