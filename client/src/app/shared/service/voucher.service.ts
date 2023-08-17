import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { Student, StudentRegisterationSlip } from '../model/Student';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const customPageSize: any = {
  width: 795,
  height: 442,
};


@Injectable({
  providedIn: 'root'
})

export class VoucherService {
  // studentDataForRegisterationSlip : StudentRegisterationSlip; 
  constructor() {
    // this.studentDataForRegisterationSlip = new StudentRegisterationSlip(
    //   0,
    //   '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   ''
    // );
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
    // var RfqReference = this.rfqMasterService.formData.RfqReference;
    // var ContractName = this.rfqMasterService.formData.ContractName;
    var SubTotal = '';
    if (OpenType == 'Qvise') {
      // SubTotal = this.RfqItemsService.rfqItemsList[0].QviseSubTotal;
    }
    else {
      // SubTotal = this.RfqItemsService.rfqItemsList[0].ProviderSubTotal;
    }

    // var CountryName = this.RfqItemsService.rfqItemsList[0].CountryName;
    var CountryName = 'Pakistan'
    var ModeShipDesc = 'Karachi Pakistan Limited';
    var Validaty = 'Type';
    var DeliveryTime = '12/4/122';

    var ShipmentCharges = (Math.round(40 * 100) / 100).toFixed(2);
    var GrandTotal = 0.90;
    var QotationNumber = 123;
    var QotationRecDate = '12/08/2023';
    var DecimalGrandTotal = (Math.round(GrandTotal * 100) / 100).toFixed(2);

    let docDefinition: any = {
      // pageSize: customPageSize,
      content: [
        {

          table: {
            widths: ['33%', '33%', '33%'],
            body: [
              [
                {
                  stack: [
                    {
                      border: [true, true, true, true],
                      image: await this.getBase64ImageFromURL("../../../assets/logo.png"),
                      width: 30,
                      height: 30,
                      alignment: 'center',
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
                  ],
                  margin: [10, 0],
                },
                // {
                //   stack: [
                //     {
                //       text: '', // Empty string
                //       margin: [0, 10], // Add margin for spacing (10 units top and bottom)
                //     }
                //   ]
                // },
                {
                  stack: [
                    {
                      image: await this.getBase64ImageFromURL("../../../assets/logo.png"),
                      width: 30,
                      height: 30,
                      alignment: 'center',
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
        }
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
