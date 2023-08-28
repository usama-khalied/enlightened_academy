import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { Student, StudentRegisterationSlip } from '../model/Student';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const customPageSize: any = {
  width: 795,
  height: 442,
};
function numberToWords(number: number): string {
  const ones: string[] = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens: string[] = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens: string[] = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];



  function convertToWords(n: number): string {
    if (n < 10) {
      return ones[n];
    } else if (n >= 11 && n <= 19) {
      return teens[n - 10];
    } else if (n >= 20 && n < 100) {
      const tenDigit = Math.floor(n / 10);
      const oneDigit = n % 10;
      return tens[tenDigit] + (oneDigit !== 0 ? "-" + ones[oneDigit] : "");
    }
    return "";
  }

  if (number === 0) {
    return "zero";
  } else if (number < 100) {
    return convertToWords(number);
  } else if (number >= 1000 && number < 1000000) {
    const thousand = Math.floor(number / 1000);
    const remainder = number % 1000;
    return convertToWords(thousand) + " thousand" + (remainder !== 0 ? " " + convertToWords(remainder) : "");
  }
  return "";
}


@Injectable({
  providedIn: 'root'
})

export class VoucherService {
  totalFee: number = 0;
  data: Data[] = [{ course: '.NET', fee: 2000 }, { course: 'JAVA', fee: 2000 }];
  constructor() {
    this.calculateTotalFee();
  }

  ngOnInit() {
  }

  calculateTotalFee() {
    this.data.forEach((p) => {
      if (p.fee) {
        this.totalFee += p.fee;
      }
    });
  }
  formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('/');
  }
  async generatePDF(action = 'open', OpenType: any) {
    if (OpenType == 'Qvise') {

    }
    else {
    }

    var GrandTotal = 0.90;


    let docDefinition: any = {
      content: [
        {

          table: {
            widths: ['33%', '33%', '33%'],
            body: [
              [
                {
                  stack: [
                    {
                      image: await this.getBase64ImageFromURL("../../../assets/logo.png"),
                      width: 30,
                      height: 30,
                      alignment: 'center',
                      margin: [0, 5, 0, 0],
                    },
                    {
                      text: `${OpenType} `,
                      fontSize: 10,
                      bold: true,
                      alignment: 'center',
                    },
                    {
                      text: `(Registration Slip For Academy)`,
                      fontSize: 8,
                      bold: false,
                      margin: [0, 2, 0, 0],
                      alignment: 'center',
                    },
                    {
                      text: `Bank -  Al Falah `,
                      fontSize: 9,
                      margin: [0, 30, 0, 0],
                      bold: false,
                      alignment: 'left',
                      border: [false, false, false, true],
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `Account No. 32374367343 `,
                      fontSize: 9,
                      bold: false,
                      margin: [0, 2, 0, 0],
                      alignment: 'left',
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `IBAN. 32374367343 `,
                      fontSize: 9,
                      margin: [0, 2, 0, 0],
                      bold: false,
                      alignment: 'left',
                      border: [false, true, false, false],
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    // Student Information
                    {
                      text: `Student : Muhammad Usama`,
                      fontSize: 9,
                      margin: [0, 30, 0, 0],
                      bold: false,
                      alignment: 'left',
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `Student ID. 02221`,
                      fontSize: 9,
                      bold: false,
                      margin: [0, 2, 0, 0],
                      alignment: 'left',
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `CNIC : 442232323232`,
                      fontSize: 9,
                      margin: [0, 2, 0, 0],
                      bold: false,
                      alignment: 'left',
                      border: [false, true, false, false],
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `Phone : 031422323233`,
                      fontSize: 9,
                      margin: [0, 2, 0, 0],
                      bold: false,
                      alignment: 'left',
                      border: [false, true, false, false],
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      style: 'tableExample',
                      table: {
                        widths: ['50%', '50%'],
                        body: [
                          ['Courses', 'Fee'],
                          ...this.data.map((p) => [
                            { text: p.course, fontSize: 9, alignment: 'center' },
                            { text: p.fee, fontSize: 9, alignment: 'center' },
                          ]),
                          [
                            { text: 'Total', fontSize: 9, alignment: 'center', bold: true },
                            { text: `${this.totalFee} /=`, fontSize: 9, alignment: 'center', bold: true },
                          ],
                        ]
                      }
                    },
                    {
                      text: `Amount in words: ${numberToWords(this.totalFee)} only`,
                      fontSize: 9,
                      margin: [0, 2, 4, 0],
                      bold: true,
                      alignment: 'left',
                      border: [false, true, false, false],
                    },
                    {
                      text: `Depositor's Signature`,
                      fontSize: 9,
                      margin: [0, 45, 10, 0],
                      bold: false,
                      alignment: 'right',
                    },
                  ],
                  margin: [10, 0],
                },

                {
                  stack: [
                    {
                      image: await this.getBase64ImageFromURL("../../../assets/logo.png"),
                      width: 30,
                      height: 30,
                      alignment: 'center',
                      margin: [0, 5, 0, 0],
                    },
                    {
                      text: `${OpenType} `,
                      fontSize: 10,
                      bold: true,
                      alignment: 'center',
                    },
                    {

                      text: `(Registration Slip For Student)`,
                      fontSize: 8,
                      bold: false,
                      margin: [0, 2, 0, 0],
                      alignment: 'center',
                    },
                    {
                      text: `Bank -  Al Falah `,
                      fontSize: 9,
                      margin: [0, 30, 0, 0],
                      bold: false,
                      alignment: 'left',
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `Account No. 32374367343 `,
                      fontSize: 9,
                      bold: false,
                      margin: [0, 2, 0, 0],
                      alignment: 'left',
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `IBAN. 32374367343 `,
                      fontSize: 9,
                      margin: [0, 2, 0, 0],
                      bold: false,
                      alignment: 'left',
                      border: [false, true, false, false],
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    // Student Information
                    {
                      text: `Student : Muhammad Usama`,
                      fontSize: 9,
                      margin: [0, 30, 0, 0],
                      bold: false,
                      alignment: 'left',
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `Student ID. 02221`,
                      fontSize: 9,
                      bold: false,
                      margin: [0, 2, 0, 0],
                      alignment: 'left',
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `CNIC : 442232323232`,
                      fontSize: 9,
                      margin: [0, 2, 0, 0],
                      bold: false,
                      alignment: 'left',
                      border: [false, true, false, false],
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `Phone : 031422323233`,
                      fontSize: 9,
                      margin: [0, 2, 0, 0],
                      bold: false,
                      alignment: 'left',
                      border: [false, true, false, false],
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      style: 'tableExample',
                      table: {
                        widths: ['50%', '50%'],
                        body: [
                          ['Courses', 'Fee'],
                          ...this.data.map((p) => [
                            { text: p.course, fontSize: 9, alignment: 'center' },
                            { text: p.fee, fontSize: 9, alignment: 'center' },
                          ]),
                          [
                            { text: 'Total', fontSize: 9, alignment: 'center', bold: true },
                            { text: `${this.totalFee} /=`, fontSize: 9, alignment: 'center', bold: true },
                          ],
                        ]
                      }
                    },
                    {
                      text: `Amount in words: ${numberToWords(this.totalFee)} only`,
                      fontSize: 9,
                      margin: [0, 2, 4, 0],
                      bold: true,
                      alignment: 'left',
                      border: [false, true, false, false],
                    },
                    {
                      text: `Depositor's Signature`,
                      fontSize: 9,
                      margin: [0, 45, 10, 0],
                      bold: false,
                      alignment: 'right',
                    },
                  ],
                  margin: [10, 0],
                },
                {
                  stack: [
                    {
                      canvas: [{ type: 'rect', w: 10, h: 10, r: 5, color: 'transparent' }],
                      image: await this.getBase64ImageFromURL("../../../assets/logo.png"),
                      width: 30,
                      height: 30,
                      alignment: 'center',
                      margin: [0, 5, 0, 0],
                    },
                    {
                      text: `${OpenType} `,
                      fontSize: 10,
                      bold: true,
                      alignment: 'center',
                    },
                    {
                      text: `(Registration Slip For Bank)`,
                      fontSize: 8,
                      bold: false,
                      alignment: 'center',
                      margin: [0, 2, 0, 0],

                    },
                    {
                      text: `Bank -  Al Falah `,
                      fontSize: 9,
                      margin: [0, 30, 0, 0],
                      bold: false,
                      alignment: 'left',
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `Account No. 32374367343 `,
                      fontSize: 9,
                      bold: false,
                      margin: [0, 2, 0, 0],
                      alignment: 'left',
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `IBAN. 32374367343 `,
                      fontSize: 9,
                      margin: [0, 2, 0, 0],
                      bold: false,
                      alignment: 'left',
                      border: [false, true, false, false],
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    // Student Information
                    {
                      text: `Student : Muhammad Usama`,
                      fontSize: 9,
                      margin: [0, 30, 0, 0],
                      bold: false,
                      alignment: 'left',
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `Student ID. 02221`,
                      fontSize: 9,
                      bold: false,
                      margin: [0, 2, 0, 0],
                      alignment: 'left',
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `CNIC : 442232323232`,
                      fontSize: 9,
                      margin: [0, 2, 0, 0],
                      bold: false,
                      alignment: 'left',
                      border: [false, true, false, false],
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      text: `Phone : 031422323233`,
                      fontSize: 9,
                      margin: [0, 2, 0, 0],
                      bold: false,
                      alignment: 'left',
                      border: [false, true, false, false],
                    },
                    {
                      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 130, y2: 0, lineWidth: 0.5, lineColor: 'black' }],
                      margin: [0, 2, 0, 0],
                    },
                    {
                      style: 'tableExample',
                      table: {
                        widths: ['50%', '50%'],
                        body: [
                          ['Courses', 'Fee'],
                          ...this.data.map((p) => [
                            { text: p.course, fontSize: 9, alignment: 'center' },
                            { text: p.fee, fontSize: 9, alignment: 'center' },
                          ]),
                          [
                            { text: 'Total', fontSize: 9, alignment: 'center', bold: true },
                            { text: `${this.totalFee} /=`, fontSize: 9, alignment: 'center', bold: true },
                          ],
                        ]
                      }
                    },
                    {
                      text: `Amount in words: ${numberToWords(this.totalFee)} only`,
                      fontSize: 9,
                      margin: [0, 2, 4, 0],
                      bold: true,
                      alignment: 'left',
                      border: [false, true, false, false],
                    },
                    {
                      text: `Depositor's Signature`,
                      fontSize: 9,
                      margin: [0, 45, 10, 0],
                      bold: false,
                      alignment: 'right',
                    },
                  ],
                  margin: [10, 0],
                },

              ],
            ],
          },

          layout: {
            hLineWidth: function (i: any, node: any) {
              return (i === 0 || i === node.table.body.length) ? 1 : 0.5; // Reduce top and bottom border width
            },
            vLineWidth: function (i: any, node: any) {
              return (i === 0 || i === node.table.widths.length) ? 1 : 0.5; // Reduce left and right border width
            },
            hLineColor: function (i: any, node: any) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'black'; // Lighter top and bottom border color
            },
            vLineColor: function (i: any, node: any) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'black'; // Lighter left and right border color
            },
            hLineStyle: function (i: any, node: any) {
              if (i === 0 || i === node.table.body.length) {
                return null;
              }
              return { dash: { length: 10, space: 10 } }; // Custom dashed border style for top and bottom
            },
            vLineStyle: function (i: any, node: any) {
              if (i === 0 || i === node.table.widths.length) {
                return null;
              }
              return { dash: { length: 4 } }; // Custom dashed border style for left and right
            },
          },
        }
      ],
      styles: {
        customTable: {
          border: 'dotted'
        },
        tableExample: {
          margin: [0, 10, 0, 10]
        },
      }
    };




    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }

  runReport(OpenType: any) {

    this.generatePDF('open', OpenType);
  }
  getBase64ImageFromURL(url: any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx: CanvasRenderingContext2D | null;
        ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          var dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        }
        else {
          console.error('Failed to get the 2D rendering context.');
        }
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }
}

class Data {
  course: string | undefined;
  fee: number | undefined
}   
