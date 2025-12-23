import type { INodeProperties } from "n8n-workflow";

export const expenseProperties: INodeProperties[] = [
  {
    displayName: "Title",
    name: "expenseTitle",
    type: "string",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    required: true,
    description: "The expense title",
  },
  {
    displayName: "Amount",
    name: "expenseAmount",
    type: "number",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: 0,
    required: true,
    description: "The expense amount",
  },
  {
    displayName: "Currency Code",
    name: "expenseCurrencyCode",
    type: "string",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    required: true,
    description: "The currency code (e.g., USD, EUR)",
  },
  {
    displayName: "Status",
    name: "expenseStatus",
    type: "options",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    options: [
      {
        name: "Unpaid",
        value: "UNPAID",
      },
      {
        name: "Paid",
        value: "PAID",
      },
    ],
    default: "UNPAID",
    required: true,
    description: "The expense status",
  },
  {
    displayName: "Due Date",
    name: "expenseDueDate",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    required: true,
    description: "The expense due date",
  },
  {
    displayName: "Note",
    name: "expenseNote",
    type: "string",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "The expense note",
  },
  {
    displayName: "Expense ID",
    name: "expenseId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description: "The expense ID (optional)",
  },
  {
    displayName: "Expense Category Name or ID",
    name: "expenseCategoryId",
    type: "options",
    description:
      'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "loadExpenseCategories",
    },
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Recurring",
    name: "expenseRecurring",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: false,
    required: true,
    description: "Whether the expense is recurring",
  },
  {
    displayName: "Recurrence Frequency",
    name: "expenseRecurrenceFrequency",
    type: "options",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
        expenseRecurring: [true],
      },
    },
    options: [
      {
        name: "Daily",
        value: "DAILY",
      },
      {
        name: "Weekly",
        value: "WEEKLY",
      },
      {
        name: "Monthly",
        value: "MONTHLY",
      },
      {
        name: "Yearly",
        value: "YEARLY",
      },
    ],
    default: "DAILY",
    required: true,
    description: "How often the expense recurs",
  },
  {
    displayName: "Recurrence Interval",
    name: "expenseRecurrenceInterval",
    type: "number",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
        expenseRecurring: [true],
      },
    },
    default: 1,
    required: true,
    description:
      "The interval between recurrences (e.g., 1 = every time, 2 = every other time)",
  },
  {
    displayName: "Recurrence Days",
    name: "expenseRecurrenceDays",
    type: "multiOptions",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
        expenseRecurring: [true],
        expenseRecurrenceFrequency: ["WEEKLY"],
      },
    },
    options: [
      {
        name: "Friday",
        value: "FR",
      },
      {
        name: "Monday",
        value: "MO",
      },
      {
        name: "Saturday",
        value: "SA",
      },
      {
        name: "Sunday",
        value: "SU",
      },
      {
        name: "Thursday",
        value: "TH",
      },
      {
        name: "Tuesday",
        value: "TU",
      },
      {
        name: "Wednesday",
        value: "WE",
      },
    ],
    default: [],
    description: "Days of the week for weekly recurrence (e.g., Mon, Wed, Fri)",
  },
  {
    displayName: "Recurrence Month Days",
    name: "expenseRecurrenceMonthDays",
    type: "string",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
        expenseRecurring: [true],
        expenseRecurrenceFrequency: ["MONTHLY"],
      },
    },
    default: "",
    description:
      "Comma-separated days of the month (1-31), e.g., '1,15' for 1st and 15th",
  },
  {
    displayName: "Recurrence Week Numbers",
    name: "expenseRecurrenceWeekNumbers",
    type: "string",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
        expenseRecurring: [true],
        expenseRecurrenceFrequency: ["MONTHLY", "YEARLY"],
      },
    },
    default: "",
    description: "Comma-separated week numbers (1-53), e.g., '1,3,5'",
  },
  {
    displayName: "Payment Date",
    name: "expensePaymentDate",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Vendor Name or ID",
    name: "expenseVendorId",
    type: "options",
    description:
      'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "loadVendors",
    },
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },

  {
    displayName: "Owner Account Name or ID",
    name: "expenseIssuedToOwnerAccountId",
    type: "options",
    description:
      'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "loadOwnerAccounts",
    },
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
  {
    displayName: "Correlation ID",
    name: "expenseCorrelationId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["expense"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
  },
];
