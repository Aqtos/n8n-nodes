import type { INodeProperties } from "n8n-workflow";

export const invoiceProperties: INodeProperties[] = [
  {
    displayName: "Issue Date",
    name: "invoiceIssueDate",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    required: true,
    description: "The invoice issue date",
  },
  {
    displayName: "Due Date",
    name: "invoiceDueDate",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    required: true,
    description: "The invoice due date",
  },
  {
    displayName: "Currency Code",
    name: "invoiceCurrencyCode",
    type: "string",
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    required: true,
    description: "The currency code (e.g., USD, EUR)",
  },
  {
    displayName: "Invoice Type",
    name: "invoiceType",
    type: "options",
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    options: [
      {
        name: "Sending",
        value: "SENDING",
      },
      {
        name: "Receiving",
        value: "RECEIVING",
      },
    ],
    default: "SENDING",
    required: true,
  },
  {
    displayName: "Tax Liberated",
    name: "invoiceTaxLiberated",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: false,
    required: true,
    description: "Whether the invoice is tax liberated",
  },
  {
    displayName: "Owner Bank Account Name or ID",
    name: "invoiceIssuedToOwnerAccountId",
    type: "options",
    description:
      'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "loadOwnerAccounts",
    },
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    required: true,
  },
  {
    displayName: "Receiver Contact Name or ID",
    name: "invoiceReceiver",
    type: "options",
    description:
      'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "loadContactViews",
    },
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Discount Percentage",
    name: "invoiceDiscountPercentage",
    type: "number",
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: 0.0,
  },
  {
    displayName: "Terms and Conditions",
    name: "invoiceTermsAndConditions",
    type: "string",
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Send Invoice",
    name: "invoiceSendInvoice",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: false,
    description: "Whether to send the invoice",
  },
  {
    displayName: "Receiving Client Contact Name or ID",
    name: "invoiceReceivingClientContact",
    type: "options",
    description:
      'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "loadClientContacts",
    },
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Send To Email",
    name: "invoiceSendToEmail",
    type: "string",
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "The email address to send to",
  },
  {
    displayName: "Mark As Ready",
    name: "invoiceMarkAsReady",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: false,
    description: "Whether to mark the invoice as ready",
  },
];
