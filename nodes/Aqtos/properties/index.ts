// This file contains all property definitions
// Extracted from the original 2873-line file for better organization
import type { INodeProperties } from "n8n-workflow";

// Import resource-specific properties
import { leadProperties } from "./lead";
import { taskProperties } from "./task";
import { contactProperties } from "./contact";
import { expenseProperties } from "./expense";
import { invoiceProperties } from "./invoice";

// Common properties shared across all resources
export const commonProperties: INodeProperties[] = [
  {
    displayName: "Resource",
    name: "resource",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Contact",
        value: "contact",
      },
      {
        name: "Expense",
        value: "expense",
      },
      {
        name: "Invoice",
        value: "invoice",
      },
      {
        name: "Lead",
        value: "lead",
      },
      {
        name: "Task",
        value: "task",
      },
    ],
    default: "lead",
    required: true,
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["contact", "expense", "invoice", "lead", "task"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create",
        description: "Create a new item",
        routing: {
          request: {
            method: "POST",
            url: "=/submitCommand/Create{{ $parameter.resource.charAt(0).toUpperCase() + $parameter.resource.slice(1) }}Command",
            body: "={{ $parameter.bodyContentType === 'raw' ? (typeof $parameter.bodyRaw === 'string' ? JSON.parse($parameter.bodyRaw) : $parameter.bodyRaw) : (() => { const r = $parameter.resource; const b = {}; if (r === 'lead') { if ($parameter.leadId) b.leadId = $parameter.leadId; if ($parameter.leadPersonId) b.personId = $parameter.leadPersonId; if ($parameter.leadCompanyId) b.companyId = $parameter.leadCompanyId; b.name = { first: $parameter.leadName || '' }; if ($parameter.leadEmail) b.email = $parameter.leadEmail; if ($parameter.leadPhoneNumber) b.phoneNumber = $parameter.leadPhoneNumber; if ($parameter.leadAddressStreet) b.addressStreet = $parameter.leadAddressStreet; if ($parameter.leadAddressStreetNumber) b.addressStreetNumber = $parameter.leadAddressStreetNumber; if ($parameter.leadAddressZipCode) b.addressZipCode = $parameter.leadAddressZipCode; if ($parameter.leadPersonCompanyId) b.personCompanyId = $parameter.leadPersonCompanyId; if ($parameter.leadJobTitle) b.jobTitle = $parameter.leadJobTitle; b.origin = $parameter.leadOrigin || ''; if ($parameter.leadBudget !== undefined && $parameter.leadBudget !== null) b.budget = $parameter.leadBudget; if ($parameter.leadRequestTitle) b.requestTitle = $parameter.leadRequestTitle; if ($parameter.leadRequestDescription) b.requestDescription = $parameter.leadRequestDescription; if ($parameter.leadWebsiteUrl) b.websiteUrl = $parameter.leadWebsiteUrl; if ($parameter.leadTaxNumber) b.taxNumber = $parameter.leadTaxNumber; if ($parameter.leadLegalIdentificationNumber) b.legalIdentificationNumber = $parameter.leadLegalIdentificationNumber; if ($parameter.leadDescription) b.description = $parameter.leadDescription; if ($parameter.leadFacebook) b.facebook = $parameter.leadFacebook; if ($parameter.leadTwitter) b.twitter = $parameter.leadTwitter; if ($parameter.leadLinkedIn) b.linkedIn = $parameter.leadLinkedIn; b.informLead = $parameter.leadInformLead || false; if ($parameter.leadStatus) b.leadStatus = $parameter.leadStatus; } else if (r === 'task') { if ($parameter.taskParent) b.parent = $parameter.taskParent; b.projectId = $parameter.taskProjectId || ''; if ($parameter.taskCreator) b.creator = $parameter.taskCreator; b.title = $parameter.taskTitle || ''; if ($parameter.taskStatusId) b.taskStatusId = $parameter.taskStatusId; if ($parameter.taskCategoryId) b.taskCategoryId = $parameter.taskCategoryId; b.priority = $parameter.taskPriority || 'MEDIUM'; const assignees = $parameter.taskAssignees || []; if (assignees && assignees.length > 0) b.assignees = assignees; b.encrypted = $parameter.taskEncrypted || false; } else if (r === 'contact') { b.entityType = $parameter.contactEntityType || 'PERSON'; b.type = $parameter.contactType || 'CONTACT'; const fn = $parameter.contactFirstName || ''; const ln = $parameter.contactLastName || ''; const mn = $parameter.contactMiddleName || ''; const nameObj = { first: fn, last: ln }; if (mn) nameObj.middle = mn; b.name = nameObj; if ($parameter.contactEmail) b.email = $parameter.contactEmail; if ($parameter.contactCompanyId) b.companyId = $parameter.contactCompanyId; if ($parameter.contactPhoneNumber) b.phoneNumber = $parameter.contactPhoneNumber; if ($parameter.contactAddressStreet) b.addressStreet = $parameter.contactAddressStreet; if ($parameter.contactAddressStreetNumber) b.addressStreetNumber = $parameter.contactAddressStreetNumber; if ($parameter.contactAddressZipCode) b.addressZipCode = $parameter.contactAddressZipCode; if ($parameter.contactWebsiteUrl) b.websiteUrl = $parameter.contactWebsiteUrl; if ($parameter.contactJobTitle) b.jobTitle = $parameter.contactJobTitle; if ($parameter.contactTaxNumber) b.taxNumber = $parameter.contactTaxNumber; if ($parameter.contactLegalIdentificationNumber) b.legalIdentificationNumber = $parameter.contactLegalIdentificationNumber; if ($parameter.contactDescription) b.description = $parameter.contactDescription; if ($parameter.contactFacebook) b.facebook = $parameter.contactFacebook; if ($parameter.contactTwitter) b.twitter = $parameter.contactTwitter; if ($parameter.contactLinkedIn) b.linkedIn = $parameter.contactLinkedIn; b.informLead = $parameter.contactInformLead || false; if ($parameter.contactLeadStatus) b.leadStatus = $parameter.contactLeadStatus; if ($parameter.contactLeadRequestTitle) b.leadRequestTitle = $parameter.contactLeadRequestTitle; if ($parameter.contactLeadRequestDescription) b.leadRequestDescription = $parameter.contactLeadRequestDescription; if ($parameter.contactLeadBudget !== undefined && $parameter.contactLeadBudget !== null) b.leadBudget = $parameter.contactLeadBudget; if ($parameter.contactLeadOrigin) b.leadOrigin = $parameter.contactLeadOrigin; } return b; })() }}",
            headers: {
              "X-API-KEY": "={{ $credentials.apiKey }}",
              "Content-Type": "application/json",
            },
          },
        },
      },
    ],
    default: "create",
    required: true,
  },
  {
    displayName: "Headers",
    name: "headers",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    placeholder: "Add Header",
    options: [
      {
        displayName: "Headers",
        name: "headers",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: "",
            description: "The name of the header",
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "The value of the header",
          },
        ],
      },
    ],
    description: "Headers to send with the request",
  },
  {
    displayName: "Body Input Method",
    name: "bodyContentType",
    type: "options",
    options: [
      {
        name: "Form Fields",
        value: "json",
        description: "Use structured form fields to build the request body",
      },
      {
        name: "Custom JSON",
        value: "raw",
        description: "Provide your own JSON body (sent as application/JSON)",
      },
    ],
    default: "json",
    description:
      "Choose how to provide the request body. All requests are sent as application/JSON.",
    displayOptions: {
      show: {
        resource: ["contact", "expense", "invoice", "lead", "task"],
        operation: ["create"],
      },
    },
  },
  {
    displayName: "Custom JSON Body",
    name: "bodyRaw",
    type: "json",
    default: "{}",
    description: "The request body as JSON. Will be sent as application/JSON.",
    displayOptions: {
      show: {
        resource: ["contact", "expense", "invoice", "lead", "task"],
        operation: ["create"],
        bodyContentType: ["raw"],
      },
    },
  },
];

// Combine all properties
export const allProperties: INodeProperties[] = [
  ...commonProperties,
  ...leadProperties,
  ...taskProperties,
  ...contactProperties,
  ...expenseProperties,
  ...invoiceProperties,
];
