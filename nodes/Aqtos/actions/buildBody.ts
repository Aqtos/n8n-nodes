import type { IExecuteFunctions } from "n8n-workflow";
import { formatDateTimeForZonedDateTime } from "../utils/helpers";

type Body = Record<string, unknown>;

function getOptionalString(
  ctx: IExecuteFunctions,
  name: string,
  i: number,
): string | undefined {
  const val = ctx.getNodeParameter(name, i, "") as string;
  return val || undefined;
}

export function buildLeadBody(ctx: IExecuteFunctions, i: number): Body {
  const body: Body = {};

  const leadId = getOptionalString(ctx, "leadId", i);
  if (leadId) body.leadId = leadId;

  const personId = getOptionalString(ctx, "leadPersonId", i);
  if (personId) body.personId = personId;

  const companyId = getOptionalString(ctx, "leadCompanyId", i);
  if (companyId) body.companyId = companyId;

  body.name = { first: (ctx.getNodeParameter("leadName", i, "") as string) || "" };

  const email = getOptionalString(ctx, "leadEmail", i);
  if (email) body.email = email;

  const phone = getOptionalString(ctx, "leadPhoneNumber", i);
  if (phone) body.phoneNumber = phone;

  const street = getOptionalString(ctx, "leadAddressStreet", i);
  if (street) body.addressStreet = street;

  const streetNumber = getOptionalString(ctx, "leadAddressStreetNumber", i);
  if (streetNumber) body.addressStreetNumber = streetNumber;

  const zip = getOptionalString(ctx, "leadAddressZipCode", i);
  if (zip) body.addressZipCode = zip;

  const personCompanyId = getOptionalString(ctx, "leadPersonCompanyId", i);
  if (personCompanyId) body.personCompanyId = personCompanyId;

  const jobTitle = getOptionalString(ctx, "leadJobTitle", i);
  if (jobTitle) body.jobTitle = jobTitle;

  body.origin = (ctx.getNodeParameter("leadOrigin", i, "") as string) || "";

  const budget = ctx.getNodeParameter("leadBudget", i, undefined) as number | undefined;
  if (budget !== undefined && budget !== null) body.budget = budget;

  const requestTitle = getOptionalString(ctx, "leadRequestTitle", i);
  if (requestTitle) body.requestTitle = requestTitle;

  const requestDesc = getOptionalString(ctx, "leadRequestDescription", i);
  if (requestDesc) body.requestDescription = requestDesc;

  const website = getOptionalString(ctx, "leadWebsiteUrl", i);
  if (website) body.websiteUrl = website;

  const tax = getOptionalString(ctx, "leadTaxNumber", i);
  if (tax) body.taxNumber = tax;

  const legalId = getOptionalString(ctx, "leadLegalIdentificationNumber", i);
  if (legalId) body.legalIdentificationNumber = legalId;

  const desc = getOptionalString(ctx, "leadDescription", i);
  if (desc) body.description = desc;

  const facebook = getOptionalString(ctx, "leadFacebook", i);
  if (facebook) body.facebook = facebook;

  const twitter = getOptionalString(ctx, "leadTwitter", i);
  if (twitter) body.twitter = twitter;

  const linkedIn = getOptionalString(ctx, "leadLinkedIn", i);
  if (linkedIn) body.linkedIn = linkedIn;

  body.informLead = (ctx.getNodeParameter("leadInformLead", i, false) as boolean) || false;

  const status = getOptionalString(ctx, "leadStatus", i);
  if (status) body.leadStatus = status;

  return body;
}

export function buildTaskBody(ctx: IExecuteFunctions, i: number): Body {
  const body: Body = {};

  body.projectId = (ctx.getNodeParameter("taskProjectId", i, "") as string) || "";

  body.title = (ctx.getNodeParameter("taskTitle", i, "") as string) || "";

  const statusId = getOptionalString(ctx, "taskStatusId", i);
  if (statusId) body.taskStatusId = statusId;

  const categoryId = getOptionalString(ctx, "taskCategoryId", i);
  if (categoryId) body.taskCategoryId = categoryId;

  body.priority = (ctx.getNodeParameter("taskPriority", i, "MEDIUM") as string) || "MEDIUM";

  const assignees = ctx.getNodeParameter("taskAssignees", i, []) as string[];
  if (assignees && assignees.length > 0) body.assignees = assignees;

  body.encrypted = (ctx.getNodeParameter("taskEncrypted", i, false) as boolean) || false;

  return body;
}

export function buildContactBody(ctx: IExecuteFunctions, i: number): Body {
  const body: Body = {};

  body.entityType = (ctx.getNodeParameter("contactEntityType", i, "PERSON") as string) || "PERSON";
  body.type = (ctx.getNodeParameter("contactType", i, "CONTACT") as string) || "CONTACT";

  const first = (ctx.getNodeParameter("contactFirstName", i, "") as string) || "";
  const last = (ctx.getNodeParameter("contactLastName", i, "") as string) || "";
  const middle = (ctx.getNodeParameter("contactMiddleName", i, "") as string) || "";
  const nameObj: Record<string, string> = { first, last };
  if (middle) nameObj.middle = middle;
  body.name = nameObj;

  const email = getOptionalString(ctx, "contactEmail", i);
  if (email) body.email = email;

  const companyId = getOptionalString(ctx, "contactCompanyId", i);
  if (companyId) body.companyId = companyId;

  const phone = getOptionalString(ctx, "contactPhoneNumber", i);
  if (phone) body.phoneNumber = phone;

  const street = getOptionalString(ctx, "contactAddressStreet", i);
  if (street) body.addressStreet = street;

  const streetNumber = getOptionalString(ctx, "contactAddressStreetNumber", i);
  if (streetNumber) body.addressStreetNumber = streetNumber;

  const zip = getOptionalString(ctx, "contactAddressZipCode", i);
  if (zip) body.addressZipCode = zip;

  const website = getOptionalString(ctx, "contactWebsiteUrl", i);
  if (website) body.websiteUrl = website;

  const jobTitle = getOptionalString(ctx, "contactJobTitle", i);
  if (jobTitle) body.jobTitle = jobTitle;

  const tax = getOptionalString(ctx, "contactTaxNumber", i);
  if (tax) body.taxNumber = tax;

  const legalId = getOptionalString(ctx, "contactLegalIdentificationNumber", i);
  if (legalId) body.legalIdentificationNumber = legalId;

  const desc = getOptionalString(ctx, "contactDescription", i);
  if (desc) body.description = desc;

  const facebook = getOptionalString(ctx, "contactFacebook", i);
  if (facebook) body.facebook = facebook;

  const twitter = getOptionalString(ctx, "contactTwitter", i);
  if (twitter) body.twitter = twitter;

  const linkedIn = getOptionalString(ctx, "contactLinkedIn", i);
  if (linkedIn) body.linkedIn = linkedIn;

  body.informLead = (ctx.getNodeParameter("contactInformLead", i, false) as boolean) || false;

  const leadStatus = getOptionalString(ctx, "contactLeadStatus", i);
  if (leadStatus) body.leadStatus = leadStatus;

  const leadRequestTitle = getOptionalString(ctx, "contactLeadRequestTitle", i);
  if (leadRequestTitle) body.leadRequestTitle = leadRequestTitle;

  const leadRequestDesc = getOptionalString(ctx, "contactLeadRequestDescription", i);
  if (leadRequestDesc) body.leadRequestDescription = leadRequestDesc;

  const leadBudget = ctx.getNodeParameter("contactLeadBudget", i, undefined) as number | undefined;
  if (leadBudget !== undefined && leadBudget !== null) body.leadBudget = leadBudget;

  const leadOrigin = getOptionalString(ctx, "contactLeadOrigin", i);
  if (leadOrigin) body.leadOrigin = leadOrigin;

  return body;
}

export function buildExpenseBody(ctx: IExecuteFunctions, i: number): Body {
  const body: Body = {};

  const expenseId = getOptionalString(ctx, "expenseId", i);
  if (expenseId) body.expenseId = expenseId;

  body.title = (ctx.getNodeParameter("expenseTitle", i, "") as string) || "";
  body.amount = ctx.getNodeParameter("expenseAmount", i, 0) as number;
  body.currencyCode = (ctx.getNodeParameter("expenseCurrencyCode", i, "") as string) || "";
  body.status = (ctx.getNodeParameter("expenseStatus", i, "UNPAID") as string) || "UNPAID";

  const dueDate = ctx.getNodeParameter("expenseDueDate", i, "") as string;
  if (dueDate) body.dueDate = formatDateTimeForZonedDateTime(dueDate);

  const note = getOptionalString(ctx, "expenseNote", i);
  if (note) body.note = note;

  const categoryId = getOptionalString(ctx, "expenseCategoryId", i);
  if (categoryId) body.expenseCategoryId = categoryId;

  body.recurring = (ctx.getNodeParameter("expenseRecurring", i, false) as boolean) || false;

  if (body.recurring) {
    body.recurrenceFrequency =
      (ctx.getNodeParameter("expenseRecurrenceFrequency", i, "DAILY") as string) || "DAILY";
    body.recurrenceInterval = ctx.getNodeParameter("expenseRecurrenceInterval", i, 1) as number;

    const days = ctx.getNodeParameter("expenseRecurrenceDays", i, []) as string[];
    if (days && days.length > 0) body.recurrenceDays = days;

    const monthDays = (ctx.getNodeParameter("expenseRecurrenceMonthDays", i, "") as string) || "";
    if (monthDays) {
      body.recurrenceMonthDays = monthDays.split(",").map((d) => parseInt(d.trim(), 10));
    }

    const weekNumbers =
      (ctx.getNodeParameter("expenseRecurrenceWeekNumbers", i, "") as string) || "";
    if (weekNumbers) {
      body.recurrenceWeekNumbers = weekNumbers.split(",").map((w) => parseInt(w.trim(), 10));
    }
  }

  const paymentDate = ctx.getNodeParameter("expensePaymentDate", i, "") as string;
  if (paymentDate) body.paymentDate = formatDateTimeForZonedDateTime(paymentDate);

  const vendorId = getOptionalString(ctx, "expenseVendorId", i);
  if (vendorId) body.vendorId = vendorId;

  const ownerAccountId = getOptionalString(ctx, "expenseIssuedToOwnerAccountId", i);
  if (ownerAccountId) body.issuedToOwnerAccountId = ownerAccountId;

  const correlationId = getOptionalString(ctx, "expenseCorrelationId", i);
  if (correlationId) body.correlationId = correlationId;

  return body;
}

export function buildInvoiceBody(ctx: IExecuteFunctions, i: number): Body {
  const body: Body = {};

  const issueDate = ctx.getNodeParameter("invoiceIssueDate", i, "") as string;
  if (issueDate) body.issueDate = formatDateTimeForZonedDateTime(issueDate);

  const dueDate = ctx.getNodeParameter("invoiceDueDate", i, "") as string;
  if (dueDate) body.dueDate = formatDateTimeForZonedDateTime(dueDate);

  body.currencyCode = (ctx.getNodeParameter("invoiceCurrencyCode", i, "") as string) || "";
  body.type = (ctx.getNodeParameter("invoiceType", i, "SENDING") as string) || "SENDING";
  body.taxLiberated =
    (ctx.getNodeParameter("invoiceTaxLiberated", i, false) as boolean) || false;

  const ownerAccountId = getOptionalString(ctx, "invoiceIssuedToOwnerAccountId", i);
  if (ownerAccountId) body.issuedToOwnerAccountId = ownerAccountId;

  const receiver = getOptionalString(ctx, "invoiceReceiver", i);
  if (receiver) body.receiver = receiver;

  const discount = ctx.getNodeParameter("invoiceDiscountPercentage", i, 0) as number;
  if (discount) body.discountPercentage = discount;

  const terms = getOptionalString(ctx, "invoiceTermsAndConditions", i);
  if (terms) body.termsAndConditions = terms;

  body.sendInvoice =
    (ctx.getNodeParameter("invoiceSendInvoice", i, false) as boolean) || false;

  const clientContact = getOptionalString(ctx, "invoiceReceivingClientContact", i);
  if (clientContact) body.receivingClientContact = clientContact;

  const sendToEmail = getOptionalString(ctx, "invoiceSendToEmail", i);
  if (sendToEmail) body.sendToEmail = sendToEmail;

  body.markAsReady =
    (ctx.getNodeParameter("invoiceMarkAsReady", i, false) as boolean) || false;

  return body;
}
