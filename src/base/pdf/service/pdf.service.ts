import { Injectable } from '@nestjs/common';
import { jsPDF } from 'jspdf';
import { Quote } from '../../quote/entity/quote.entity';
import { Customer } from '../../customer/entity/customer.entity';
import * as fs from 'fs';

@Injectable()
export class PdfService {
  /* Return path to the generated pdf */
  public generateContract(customer: Customer, quote: Quote): string {
    const text = `\n\n\n\n\n
    Your subscription contains :\n 
    Contract Number: ${quote.id} \n 
    Base price : ${quote.basePrice} \n 
    Deduction damage from third party : ${quote.deductionDamageFromThirdParty}\n
    Deduction damage to self : ${quote.deductionDamageToSelf} \n
    Price breakdown and rescue : ${quote.priceBreakDownAndRescue}\n\n
    As ${customer.username}, you accept the terms and conditions by signing this document.\n\n
    Please sign here `;

    //Create path
    if (!fs.existsSync(`customers/${customer.id}/${quote.id}/`)) {
      fs.mkdirSync(`customers/${customer.id}/${quote.id}/`, {
        recursive: true,
      });
    }
    const nosferaptiImg = fs.readFileSync(
      'public/image/nosferapti.png',
      'base64',
    );
    const pdfPath = `customers/${customer.id}/${quote.id}/${customer.id}_${quote.id}.pdf`;
    const doc = new jsPDF('p', 'mm', [297, 210]);
    doc.text(doc.splitTextToSize(text, 200), 0, 0);
    doc.rect(15, 155, 70, 20);
    doc.addImage(nosferaptiImg, 'png', 170, 10, 30, 30);
    doc.save(pdfPath);
    return pdfPath;
  }
}
