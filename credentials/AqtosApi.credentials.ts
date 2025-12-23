import type {
  Icon,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from "n8n-workflow";

export class AqtosApi implements ICredentialType {
  name = "aqtosApi";

  displayName = "Aqtos API";

  icon: Icon = {
    light: "file:../icons/github.svg",
    dark: "file:../icons/github.dark.svg",
  };

  documentationUrl =
    "https://www.npmjs.com/package/n8n-nodes-aqtos#credentials";

  properties: INodeProperties[] = [
    {
      displayName: "Instance",
      name: "instance",
      type: "string",
      default: "",
      placeholder: "mycompany",
      description:
        "Your Aqtos instance (e.g., 'mycompany' for mycompany.aqtos.io)",
      required: true,
    },
    {
      displayName: "API Key",
      name: "apiKey",
      type: "string",
      typeOptions: {
        password: true,
      },
      default: "",
      required: true,
    },
  ];

  test: ICredentialTestRequest = {
    request: {
      url: "={{ 'https://' + $credentials.instance + '.aqtos.io/api/person/list' }}",
      method: "GET",
      headers: {
        "X-API-KEY": "={{ $credentials.apiKey }}",
      },
    },
  };
}
