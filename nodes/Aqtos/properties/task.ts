import type { INodeProperties } from "n8n-workflow";

export const taskProperties: INodeProperties[] = [
  {
    displayName: "Project Name or ID",
    name: "taskProjectId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "loadProjects",
    },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    required: true,
    description:
      "Choose from the list, or specify an ID using an <a href='https://docs.n8n.io/code/expressions/'>expression</a>. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code/expressions/\">expression</a>.",
  },
  {
    displayName: "Title",
    name: "taskTitle",
    type: "string",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    required: true,
    description: "The task title",
  },
  {
    displayName: "Priority",
    name: "taskPriority",
    type: "options",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    options: [
      {
        name: "Low",
        value: "LOW",
      },
      {
        name: "Medium",
        value: "MEDIUM",
      },
      {
        name: "High",
        value: "HIGH",
      },
      {
        name: "Critical",
        value: "CRITICAL",
      },
    ],
    default: "MEDIUM",
    required: true,
    description: "The task priority",
  },
  {
    displayName: "Task Status Name or ID",
    name: "taskStatusId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "loadTaskStatuses",
      loadOptionsDependsOn: ["taskProjectId"],
    },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description:
      "Choose from the list, or specify an ID using an <a href='https://docs.n8n.io/code/expressions/'>expression</a>. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code/expressions/\">expression</a>.",
  },
  {
    displayName: "Task Category Name or ID",
    name: "taskCategoryId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "loadTaskCategories",
      loadOptionsDependsOn: ["taskProjectId"],
    },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: "",
    description:
      "Choose from the list, or specify an ID using an <a href='https://docs.n8n.io/code/expressions/'>expression</a>. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code/expressions/\">expression</a>.",
  },
  {
    displayName: "Encrypted",
    name: "taskEncrypted",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: false,
    description: "Whether the task is encrypted",
  },
  {
    displayName: "Assignee Names or IDs",
    name: "taskAssignees",
    type: "multiOptions",
    typeOptions: {
      loadOptionsMethod: "loadProjectPeople",
      loadOptionsDependsOn: ["taskProjectId"],
    },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"],
        bodyContentType: ["json"],
      },
    },
    default: [],
    required: true,
    description:
      "Choose from the list, or specify IDs using an <a href='https://docs.n8n.io/code/expressions/'>expression</a>. Choose from the list, or specify IDs using an <a href=\"https://docs.n8n.io/code/expressions/\">expression</a>.",
  },
];
