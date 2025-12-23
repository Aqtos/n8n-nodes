import type { IExecuteFunctions } from "n8n-workflow";

export function buildCreateLeadBody(
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

  if (getParam("leadId")) body.leadId = getParam("leadId");
  if (getParam("leadPersonId")) body.personId = getParam("leadPersonId");
  if (getParam("leadCompanyId")) body.companyId = getParam("leadCompanyId");
  // API expects name to be a Name object with 'first' property (and possibly 'last')
  const leadName = getParam("leadName");
  body.name = { first: leadName };
  if (getParam("leadEmail")) body.email = getParam("leadEmail");
  if (getParam("leadPhoneNumber"))
    body.phoneNumber = getParam("leadPhoneNumber");
  if (getParam("leadAddressStreet"))
    body.addressStreet = getParam("leadAddressStreet");
  if (getParam("leadAddressStreetNumber"))
    body.addressStreetNumber = getParam("leadAddressStreetNumber");
  if (getParam("leadAddressZipCode"))
    body.addressZipCode = getParam("leadAddressZipCode");
  if (getParam("leadPersonCompanyId"))
    body.personCompanyId = getParam("leadPersonCompanyId");
  if (getParam("leadJobTitle")) body.jobTitle = getParam("leadJobTitle");
  body.origin = getParam("leadOrigin");
  if (getParamNumber("leadBudget") !== undefined)
    body.budget = getParamNumber("leadBudget");
  if (getParam("leadRequestTitle"))
    body.requestTitle = getParam("leadRequestTitle");
  if (getParam("leadRequestDescription"))
    body.requestDescription = getParam("leadRequestDescription");
  if (getParam("leadWebsiteUrl")) body.websiteUrl = getParam("leadWebsiteUrl");
  if (getParam("leadTaxNumber")) body.taxNumber = getParam("leadTaxNumber");
  if (getParam("leadLegalIdentificationNumber"))
    body.legalIdentificationNumber = getParam("leadLegalIdentificationNumber");
  if (getParam("leadDescription"))
    body.description = getParam("leadDescription");
  if (getParam("leadFacebook")) body.facebook = getParam("leadFacebook");
  if (getParam("leadTwitter")) body.twitter = getParam("leadTwitter");
  if (getParam("leadLinkedIn")) body.linkedIn = getParam("leadLinkedIn");
  body.informLead = getParamBoolean("leadInformLead");
  if (getParam("leadStatus")) body.leadStatus = getParam("leadStatus");

  return body;
}
