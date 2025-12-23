import type { IExecuteFunctions } from "n8n-workflow";
import { formatDateTimeForZonedDateTime } from "../utils/helpers";

export function buildCreateInvoiceBody(
  context: IExecuteFunctions,
  itemIndex: number
): Record<string, unknown> {
  const body: Record<string, unknown> = {};
  const getParam = (name: string) =>
    context.getNodeParameter(name, itemIndex, "") as string;
  const getParamNumber = (name: string) =>
    context.getNodeParameter(name, itemIndex, undefined) as number | undefined;
  const getParamBoolean = (name: string) =>
    context.getNodeParameter(name, itemIndex, false) as boolean;
  const getParamDateTime = (name: string) =>
    context.getNodeParameter(name, itemIndex, "") as string;

  if (getParam("invoiceReceiver")) body.receiver = getParam("invoiceReceiver");
  const issueDate = getParamDateTime("invoiceIssueDate");
  body.issueDate = formatDateTimeForZonedDateTime(issueDate);
  const dueDate = getParamDateTime("invoiceDueDate");
  body.dueDate = formatDateTimeForZonedDateTime(dueDate);
  body.currencyCode = getParam("invoiceCurrencyCode");
  if (getParam("invoicePaymentTerms"))
    body.paymentTerms = getParam("invoicePaymentTerms");
  body.invoiceType = getParam("invoiceType");
  body.taxLiberated = getParamBoolean("invoiceTaxLiberated");
  body.issuedToOwnerAccountId = getParam("invoiceIssuedToOwnerAccountId");
  if (getParamNumber("invoiceDiscountPercentage") !== undefined)
    body.discountPercentage = getParamNumber("invoiceDiscountPercentage");
  if (getParam("invoiceTermsAndConditions"))
    body.termsAndConditions = getParam("invoiceTermsAndConditions");
  body.sendInvoice = getParamBoolean("invoiceSendInvoice");
  if (getParam("invoiceReceivingClientContact"))
    body.receivingClientContact = getParam("invoiceReceivingClientContact");
  if (getParam("invoiceSendToEmail"))
    body.sendToEmail = getParam("invoiceSendToEmail");
  if (getParamBoolean("invoiceMarkAsReady") !== undefined)
    body.markAsReady = getParamBoolean("invoiceMarkAsReady");
  if (getParam("invoiceLanguageId"))
    body.languageId = getParam("invoiceLanguageId");

  return body;
}
