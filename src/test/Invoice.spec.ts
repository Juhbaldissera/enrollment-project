import { Invoice } from '../domain/entity/Invoice';
import { InvoiceEvent } from '../domain/entity/InvoiceEvent';

describe('Invoice', () => {
    it('should get correct balance', () => {
        const invoice = new Invoice('code', 1, 2021, 1416.66);
        invoice.addEvent(new InvoiceEvent('penalty', 141.67));
        invoice.addEvent(new InvoiceEvent('interests', 2571.24));
        invoice.addEvent(new InvoiceEvent('payment', 4129.57));
        expect(invoice.getBalance()).toEqual(0);
    });
});
