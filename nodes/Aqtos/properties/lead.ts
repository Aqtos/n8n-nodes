import type { INodeProperties } from "n8n-workflow";

export const leadProperties: INodeProperties[] = [
  {
    displayName: "Name",
    name: "leadName",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    required: true,
    description: "The name of the lead",
  },
  {
    displayName: "Email",
    name: "leadEmail",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "The email address",
  },
  {
    displayName: "Phone Number",
    name: "leadPhoneNumber",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Origin",
    name: "leadOrigin",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    required: true,
    description: "The origin of the lead",
  },
  {
    displayName: "Lead ID",
    name: "leadId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "The lead ID (optional)",
  },
  {
    displayName: "Person Name or ID",
    name: "leadPersonId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "loadPersons",
    },
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description:
      "Choose from the list, or specify an ID using an <a href='https://docs.n8n.io/code/expressions/'>expression</a>. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code/expressions/\">expression</a>.",
  },
  {
    displayName: "Company Name or ID",
    name: "leadCompanyId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "loadCompanies",
    },
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description:
      'The company (optional). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: "Address Street",
    name: "leadAddressStreet",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "The street address",
  },
  {
    displayName: "Address Street Number",
    name: "leadAddressStreetNumber",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "The street number",
  },
  {
    displayName: "Address Zip Code",
    name: "leadAddressZipCode",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "The zip code",
  },
  {
    displayName: "Person Company Name or ID",
    name: "leadPersonCompanyId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "loadCompanies",
    },
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description:
      "Choose from the list, or specify an ID using an <a href='https://docs.n8n.io/code/expressions/'>expression</a>. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code/expressions/\">expression</a>.",
  },
  {
    displayName: "Job Title",
    name: "leadJobTitle",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Budget",
    name: "leadBudget",
    type: "number",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: 0,
    description: "The budget amount",
  },
  {
    displayName: "Request Title",
    name: "leadRequestTitle",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Request Description",
    name: "leadRequestDescription",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Website URL",
    name: "leadWebsiteUrl",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Tax Number",
    name: "leadTaxNumber",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Legal Identification Number",
    name: "leadLegalIdentificationNumber",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Description",
    name: "leadDescription",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Facebook",
    name: "leadFacebook",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "Facebook URL",
  },
  {
    displayName: "Twitter",
    name: "leadTwitter",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "Twitter URL",
  },
  {
    displayName: "LinkedIn",
    name: "leadLinkedIn",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "LinkedIn URL",
  },
  {
    displayName: "Inform Lead",
    name: "leadInformLead",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: false,
    description: "Whether to inform the lead",
  },
  {
    displayName: "Lead Status",
    name: "leadStatus",
    type: "string",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "PENDING_CONTACT",
  },
];
