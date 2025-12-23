import type { INodeType, INodeTypeDescription } from "n8n-workflow";
import { NodeConnectionTypes } from "n8n-workflow";

// Import load options
import * as loadOptions from "./loadOptions";

// Import all properties
import { allProperties } from "./properties";

export class AqtosApi implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Aqtos",
    name: "aqtosApi",
    icon: "file:aqtos.svg",
    group: ["input"],
    version: 1,
    description: "Consume Aqtos API",
    documentationUrl: "https://www.npmjs.com/package/n8n-nodes-aqtos",
    defaults: {
      name: "Aqtos API",
    },
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    usableAsTool: true,
    credentials: [
      {
        name: "aqtosApi",
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: "={{ 'https://' + $credentials.instance + '.aqtos.io/api' }}",
      headers: {
        "X-API-KEY": "={{ $credentials.apiKey }}",
        "Content-Type": "application/json",
      },
    },
    properties: allProperties,
  };

  methods = {
    loadOptions: {
      loadCompanies: loadOptions.loadCompanies,
      loadPersons: loadOptions.loadPersons,
      loadProjects: loadOptions.loadProjects,
      loadTaskStatuses: loadOptions.loadTaskStatuses,
      loadProjectPeople: loadOptions.loadProjectPeople,
      loadTaskCategories: loadOptions.loadTaskCategories,
      loadExpenseCategories: loadOptions.loadExpenseCategories,
      loadVendors: loadOptions.loadVendors,
      loadAccounts: loadOptions.loadAccounts,
      loadLanguages: loadOptions.loadLanguages,
      loadContactViews: loadOptions.loadContactViews,
      loadClientContacts: loadOptions.loadClientContacts,
      loadTasks: loadOptions.loadTasks,
      loadOwnerAccounts: loadOptions.loadOwnerAccounts,
    },
  };
}
