import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { ApplicationError, NodeConnectionTypes, NodeOperationError } from "n8n-workflow";

import * as loadOptions from "./loadOptions";
import { allProperties } from "./properties";
import { getBaseURL } from "./utils/helpers";
import {
  buildLeadBody,
  buildTaskBody,
  buildContactBody,
  buildExpenseBody,
  buildInvoiceBody,
} from "./actions/buildBody";

export class AqtosApi implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Aqtos",
    subtitle:
      "={{ $credentials && $credentials.instance ? $credentials.instance + '.aqtos.io' : 'Configure Aqtos instance' }}",
    name: "aqtosApi",
    icon: "file:../../icons/aqtos.svg",
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
      loadLanguages: loadOptions.loadLanguages,
      loadContactViews: loadOptions.loadContactViews,
      loadClientContacts: loadOptions.loadClientContacts,
      loadTasks: loadOptions.loadTasks,
      loadOwnerAccounts: loadOptions.loadOwnerAccounts,
    },
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const credentials = await this.getCredentials("aqtosApi");
    const baseURL = getBaseURL(credentials);

    for (let i = 0; i < items.length; i++) {
      try {
        const resource = this.getNodeParameter("resource", i) as string;
        const operation = this.getNodeParameter("operation", i) as string;

        if (operation === "create") {
          const bodyContentType = this.getNodeParameter("bodyContentType", i) as string;

          let body: Record<string, unknown>;
          if (bodyContentType === "raw") {
            const raw = this.getNodeParameter("bodyRaw", i) as string | object;
            body = typeof raw === "string" ? JSON.parse(raw) : (raw as Record<string, unknown>);
          } else {
            body = buildBodyForResource(this, resource, i);
          }

          const commandName = `Create${resource.charAt(0).toUpperCase() + resource.slice(1)}Command`;
          const url = `${baseURL}/submitCommand/${commandName}`;

          const response = await this.helpers.httpRequestWithAuthentication.call(
            this,
            "aqtosApi",
            {
              method: "POST",
              url,
              body,
              headers: {
                "Content-Type": "application/json",
              },
              json: true,
            },
          );

          returnData.push({
            json: typeof response === "object" ? response : { result: response },
            pairedItem: { item: i },
          });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: { error: (error as Error).message },
            pairedItem: { item: i },
          });
          continue;
        }
        throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
      }
    }

    return [returnData];
  }
}

function buildBodyForResource(
  ctx: IExecuteFunctions,
  resource: string,
  i: number,
): Record<string, unknown> {
  switch (resource) {
    case "lead":
      return buildLeadBody(ctx, i);
    case "task":
      return buildTaskBody(ctx, i);
    case "contact":
      return buildContactBody(ctx, i);
    case "expense":
      return buildExpenseBody(ctx, i);
    case "invoice":
      return buildInvoiceBody(ctx, i);
    default:
      throw new ApplicationError(`Unsupported resource: ${resource}`);
  }
}
