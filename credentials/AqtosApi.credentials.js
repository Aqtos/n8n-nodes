export class AqtosApi {
  name = "aqtosApi";

  displayName = "Aqtos API";

  icon = "file:../icons/aqtos.svg";

  documentationUrl =
    "https://www.npmjs.com/package/n8n-nodes-aqtos#credentials";

  properties = [
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

  test = {
    request: {
      url: "={{ 'https://' + $credentials.instance + '.aqtos.io/api/person/list' }}",
      method: "GET",
      headers: {
        "X-API-KEY": "={{ $credentials.apiKey }}",
      },
    },
  };
}
