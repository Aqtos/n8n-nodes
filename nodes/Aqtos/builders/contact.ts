import type { IExecuteFunctions } from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";

export function buildCreateContactBody(
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

  // Required fields - validate they're not empty
  const entityType = getParam("contactEntityType");
  const type = getParam("contactType");
  const firstName = getParam("contactFirstName");

  if (!entityType || !type || !firstName) {
    throw new NodeOperationError(
      context.getNode(),
      "Required fields missing: entityType, type, and firstName are required for contact creation",
      { itemIndex }
    );
  }

  body.entityType = entityType;
  body.type = type;
  // API expects name to be a Name object with 'first' (required), 'last' (required), and 'middle' (optional)
  const lastName = getParam("contactLastName");
  if (!lastName) {
    throw new NodeOperationError(
      context.getNode(),
      "Last name is required for contact creation",
      { itemIndex }
    );
  }
  const middleName = getParam("contactMiddleName");
  // Build name object: first and last are required, middle is optional
  const nameObject: Record<string, string> = {
    first: firstName,
    last: lastName,
  };
  if (middleName) {
    nameObject.middle = middleName;
  }
  body.name = nameObject;
  if (getParam("contactEmail")) body.email = getParam("contactEmail");
  if (getParam("contactCompanyId"))
    body.companyId = getParam("contactCompanyId");
  if (getParam("contactPhoneNumber"))
    body.phoneNumber = getParam("contactPhoneNumber");
  if (getParam("contactAddressStreet"))
    body.addressStreet = getParam("contactAddressStreet");
  if (getParam("contactAddressStreetNumber"))
    body.addressStreetNumber = getParam("contactAddressStreetNumber");
  if (getParam("contactAddressZipCode"))
    body.addressZipCode = getParam("contactAddressZipCode");
  if (getParam("contactWebsiteUrl"))
    body.websiteUrl = getParam("contactWebsiteUrl");
  if (getParam("contactJobTitle")) body.jobTitle = getParam("contactJobTitle");
  if (getParam("contactTaxNumber"))
    body.taxNumber = getParam("contactTaxNumber");
  if (getParam("contactLegalIdentificationNumber"))
    body.legalIdentificationNumber = getParam(
      "contactLegalIdentificationNumber"
    );
  if (getParam("contactDescription"))
    body.description = getParam("contactDescription");
  if (getParam("contactFacebook")) body.facebook = getParam("contactFacebook");
  if (getParam("contactTwitter")) body.twitter = getParam("contactTwitter");
  if (getParam("contactLinkedIn")) body.linkedIn = getParam("contactLinkedIn");
  body.informLead = getParamBoolean("contactInformLead");
  if (getParam("contactLeadStatus"))
    body.leadStatus = getParam("contactLeadStatus");
  if (getParam("contactLeadRequestTitle"))
    body.leadRequestTitle = getParam("contactLeadRequestTitle");
  if (getParam("contactLeadRequestDescription"))
    body.leadRequestDescription = getParam("contactLeadRequestDescription");
  if (getParamNumber("contactLeadBudget") !== undefined)
    body.leadBudget = getParamNumber("contactLeadBudget");
  if (getParam("contactLeadOrigin"))
    body.leadOrigin = getParam("contactLeadOrigin");

  return body;
}
