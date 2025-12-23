import type { INodeProperties } from "n8n-workflow";

export const contactProperties: INodeProperties[] = [
  {
    displayName: "Entity Type",
    name: "contactEntityType",
    type: "options",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    options: [
      {
        name: "Person",
        value: "PERSON",
      },
      {
        name: "Company",
        value: "COMPANY",
      },
    ],
    default: "PERSON",
    required: true,
    description: "The contact entity type",
  },
  {
    displayName: "Contact Type",
    name: "contactType",
    type: "options",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    options: [
      {
        name: "Contact",
        value: "CONTACT",
      },
      {
        name: "Lead",
        value: "LEAD",
      },
      {
        name: "Client",
        value: "CLIENT",
      },
    ],
    default: "CONTACT",
    required: true,
  },
  {
    displayName: "First Name",
    name: "contactFirstName",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    required: true,
    description: "The contact first name",
  },
  {
    displayName: "Last Name",
    name: "contactLastName",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    required: true,
    description: "The contact last name (required)",
  },
  {
    displayName: "Middle Name",
    name: "contactMiddleName",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "The contact middle name (optional)",
  },
  {
    displayName: "Email",
    name: "contactEmail",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "The email address",
  },
  {
    displayName: "Company Name or ID",
    name: "contactCompanyId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "loadCompanies",
    },
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description:
      'The company (optional). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: "Phone Number",
    name: "contactPhoneNumber",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Address Street",
    name: "contactAddressStreet",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "The street address",
  },
  {
    displayName: "Address Street Number",
    name: "contactAddressStreetNumber",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "The street number",
  },
  {
    displayName: "Address Zip Code",
    name: "contactAddressZipCode",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "The zip code",
  },
  {
    displayName: "Website URL",
    name: "contactWebsiteUrl",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Job Title",
    name: "contactJobTitle",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Tax Number",
    name: "contactTaxNumber",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Legal Identification Number",
    name: "contactLegalIdentificationNumber",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Description",
    name: "contactDescription",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Facebook",
    name: "contactFacebook",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "Facebook URL",
  },
  {
    displayName: "Twitter",
    name: "contactTwitter",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "Twitter URL",
  },
  {
    displayName: "LinkedIn",
    name: "contactLinkedIn",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "LinkedIn URL",
  },
  {
    displayName: "Inform Lead",
    name: "contactInformLead",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: false,
    description: "Whether to inform the lead",
  },
  {
    displayName: "Lead Status",
    name: "contactLeadStatus",
    type: "options",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    options: [
      {
        name: "Accepted",
        value: "ACCEPTED",
      },
      {
        name: "Contacted",
        value: "CONTACTED",
      },
      {
        name: "Created Proposal",
        value: "CREATED_PROPOSAL",
      },
      {
        name: "Disqualified",
        value: "DISQUALIFIED",
      },
      {
        name: "Negotiating",
        value: "NEGOTIATING",
      },
      {
        name: "Pending Contact",
        value: "PENDING_CONTACT",
      },
      {
        name: "Qualified",
        value: "QUALIFIED",
      },
      {
        name: "Sent",
        value: "SENT",
      },
      {
        name: "Unassigned",
        value: "UNASSIGNED",
      },
    ],
    default: "PENDING_CONTACT",
  },
  {
    displayName: "Lead Request Title",
    name: "contactLeadRequestTitle",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Lead Request Description",
    name: "contactLeadRequestDescription",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Lead Budget",
    name: "contactLeadBudget",
    type: "number",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: 0,
  },
  {
    displayName: "Lead Origin",
    name: "contactLeadOrigin",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
];
