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
      },
    ],
    default: "create",
    required: true,
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
