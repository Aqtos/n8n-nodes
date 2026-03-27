import { NodeOperationError } from "n8n-workflow";
import type { ILoadOptionsFunctions, INodePropertyOptions } from "n8n-workflow";
import { getBaseURL } from "../utils/helpers";

export async function loadCompanies(
  this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("aqtosApi");
  const baseURL = getBaseURL(credentials);

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "aqtosApi",
      {
        method: "GET",
        url: `${baseURL}/companies/all`,
        headers: {
          "Content-Type": "application/json",
        },
        qs: {
          page: 0,
          size: 100,
        },
      },
    );

    // Handle Page<CompanyView> response structure (Spring Page has 'content' array)
    const companies = Array.isArray(response)
      ? response
      : response?.content || response?.data || [];
    return companies.map((company: Record<string, unknown>) => {
      // Handle embedded ID structure (CompanyId with value property)
      let companyId: string;
      if (typeof company.id === "object" && company.id !== null) {
        const idObj = company.id as Record<string, unknown>;
        companyId = (idObj.value as string) || String(idObj);
      } else {
        companyId = (company.id as string) || String(company.id);
      }

      // Use name from CompanyView entity (implements LabeledEntity with getLabel() returning name)
      const companyName =
        (company.name as string) ||
        (company.companyName as string) ||
        companyId;

      return {
        name: companyName,
        value: companyId,
      };
    });
  } catch (error) {
    throw new NodeOperationError(this.getNode(), error as Error, {
      message: `Failed to load companies from ${baseURL}/company/list`,
    });
  }
}

export async function loadPersons(
  this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("aqtosApi");
  const baseURL = getBaseURL(credentials);

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "aqtosApi",
      {
        method: "GET",
        url: `${baseURL}/person/list`,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const persons = Array.isArray(response)
      ? response
      : response?.data || response?.content || [];
    return persons.map((person: Record<string, unknown>) => {
      const personName = person.name as Record<string, string> | undefined;
      const firstName = personName?.first || "";
      const lastName = personName?.last || "";
      const fullName =
        `${firstName} ${lastName}`.trim() || firstName || lastName;
      const name =
        fullName ||
        (person.email as string) ||
        (person.firstName as string) ||
        `${person.id}`;
      return {
        name: name || `${person.id}`,
        value: (person.id as string) || (person.personId as string),
      };
    });
  } catch (error) {
    throw new NodeOperationError(this.getNode(), error as Error, {
      message: `Failed to load persons from ${baseURL}/person/list`,
    });
  }
}

export async function loadProjects(
  this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("aqtosApi");
  const baseURL = getBaseURL(credentials);

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "aqtosApi",
      {
        method: "GET",
        url: `${baseURL}/projects/all`,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const projects = Array.isArray(response)
      ? response
      : response?.data || response?.content || [];
    return projects.map((project: Record<string, unknown>) => ({
      name:
        (project.name as string) ||
        (project.projectName as string) ||
        (project.title as string) ||
        `${project.id}`,
      value: (project.id as string) || (project.projectId as string),
    }));
  } catch (error) {
    throw new NodeOperationError(this.getNode(), error as Error, {
      message: `Failed to load projects from ${baseURL}/projects/all`,
    });
  }
}

export async function loadTaskStatuses(
  this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("aqtosApi");
  const baseURL = getBaseURL(credentials);

  // Get the selected project ID from the node parameters
  const projectId = this.getCurrentNodeParameter("taskProjectId") as string;

  // If no project is selected, return empty array
  if (!projectId) {
    return [];
  }

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "aqtosApi",
      {
        method: "GET",
        url: `${baseURL}/taskStatus/all`,
        headers: {
          "Content-Type": "application/json",
        },
        qs: {
          projectId: projectId,
        },
      },
    );

    const statuses = Array.isArray(response)
      ? response
      : response?.data || response?.content || [];
    return statuses.map((status: Record<string, unknown>) => ({
      name:
        (status.name as string) ||
        (status.statusName as string) ||
        (status.label as string) ||
        `${status.id}`,
      value: (status.id as string) || (status.statusId as string),
    }));
  } catch (error) {
    throw new NodeOperationError(this.getNode(), error as Error, {
      message: `Failed to load task statuses from ${baseURL}/taskStatus/all`,
    });
  }
}

export async function loadProjectPeople(
  this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("aqtosApi");
  const baseURL = getBaseURL(credentials);

  // Get the selected project ID from the node parameters
  const projectId = this.getCurrentNodeParameter("taskProjectId") as string;

  // If no project is selected, return empty array
  if (!projectId) {
    return [];
  }

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "aqtosApi",
      {
        method: "GET",
        url: `${baseURL}/projects/people`,
        headers: {
          "Content-Type": "application/json",
        },
        qs: {
          projectId: projectId,
        },
      },
    );

    const people = Array.isArray(response)
      ? response
      : response?.data || response?.content || [];
    return people.map((person: Record<string, unknown>) => {
      const personName = person.name as Record<string, string> | undefined;
      const firstName = personName?.first || "";
      const lastName = personName?.last || "";
      const fullName =
        `${firstName} ${lastName}`.trim() || firstName || lastName;
      const name =
        fullName ||
        (person.email as string) ||
        (person.firstName as string) ||
        `${person.id}`;
      return {
        name: name || `${person.id}`,
        value: (person.id as string) || (person.personId as string),
      };
    });
  } catch (error) {
    throw new NodeOperationError(this.getNode(), error as Error, {
      message: `Failed to load project people from ${baseURL}/projects/people`,
    });
  }
}

export async function loadTaskCategories(
  this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("aqtosApi");
  const baseURL = getBaseURL(credentials);

  // Get the selected project ID from the node parameters
  const projectId = this.getCurrentNodeParameter("taskProjectId") as string;

  // If no project is selected, return empty array
  if (!projectId) {
    return [];
  }

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "aqtosApi",
      {
        method: "GET",
        url: `${baseURL}/taskCategory/all`,
        headers: {
          "Content-Type": "application/json",
        },
        qs: {
          projectId: projectId,
        },
      },
    );

    const categories = Array.isArray(response)
      ? response
      : response?.data || response?.content || [];
    return categories.map((category: Record<string, unknown>) => ({
      name:
        (category.name as string) ||
        (category.categoryName as string) ||
        (category.label as string) ||
        `${category.id}`,
      value: (category.id as string) || (category.categoryId as string),
    }));
  } catch (error) {
    throw new NodeOperationError(this.getNode(), error as Error, {
      message: `Failed to load task categories from ${baseURL}/taskCategory/all`,
    });
  }
}

export async function loadExpenseCategories(
  this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("aqtosApi");
  const baseURL = getBaseURL(credentials);

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "aqtosApi",
      {
        method: "GET",
        url: `${baseURL}/finance/expenseCategory/all`,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const categories = Array.isArray(response)
      ? response
      : response?.data || response?.content || [];
    return categories.map((category: Record<string, unknown>) => ({
      name:
        (category.name as string) ||
        (category.categoryName as string) ||
        (category.label as string) ||
        `${category.id}`,
      value: (category.id as string) || (category.categoryId as string),
    }));
  } catch (error) {
    throw new NodeOperationError(this.getNode(), error as Error, {
      message: `Failed to load expense categories from ${baseURL}/finance/expenseCategory/all`,
    });
  }
}

export async function loadVendors(
  this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("aqtosApi");
  const baseURL = getBaseURL(credentials);

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "aqtosApi",
      {
        method: "GET",
        url: `${baseURL}/vendor/all`,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const vendors = Array.isArray(response)
      ? response
      : response?.data || response?.content || [];
    return vendors.map((vendor: Record<string, unknown>) => ({
      name:
        (vendor.name as string) ||
        (vendor.vendorName as string) ||
        `${vendor.id}`,
      value: (vendor.id as string) || (vendor.vendorId as string),
    }));
  } catch (error) {
    throw new NodeOperationError(this.getNode(), error as Error, {
      message: `Failed to load vendors from ${baseURL}/vendor/all`,
    });
  }
}

export async function loadLanguages(
  this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("aqtosApi");
  const baseURL = getBaseURL(credentials);

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "aqtosApi",
      {
        method: "GET",
        url: `${baseURL}/language/list`,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const languages = Array.isArray(response)
      ? response
      : response?.data || response?.content || [];
    return languages.map((language: Record<string, unknown>) => ({
      name:
        (language.name as string) ||
        (language.languageName as string) ||
        (language.code as string) ||
        `${language.id}`,
      value: (language.id as string) || (language.languageId as string),
    }));
  } catch (error) {
    throw new NodeOperationError(this.getNode(), error as Error, {
      message: `Failed to load languages from ${baseURL}/language/list`,
    });
  }
}

export async function loadContactViews(
  this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("aqtosApi");
  const baseURL = getBaseURL(credentials);

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "aqtosApi",
      {
        method: "GET",
        url: `${baseURL}/contact/all`,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const views = Array.isArray(response)
      ? response
      : response?.data || response?.content || [];
    return views.map((view: Record<string, unknown>) => ({
      name:
        (view.name as string) ||
        (view.viewName as string) ||
        (view.label as string) ||
        `${view.id}`,
      value: (view.id as string) || (view.viewId as string),
    }));
  } catch (error) {
    throw new NodeOperationError(this.getNode(), error as Error, {
      message: `Failed to load contact views from ${baseURL}/contact/all`,
    });
  }
}

export async function loadTasks(
  this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("aqtosApi");
  const baseURL = getBaseURL(credentials);

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "aqtosApi",
      {
        method: "GET",
        url: `${baseURL}/task/list`,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const tasks = Array.isArray(response)
      ? response
      : response?.data || response?.content || [];
    return tasks.map((task: Record<string, unknown>) => ({
      name: (task.title as string) || (task.name as string) || `${task.id}`,
      value: (task.id as string) || (task.taskId as string),
    }));
  } catch (error) {
    throw new NodeOperationError(this.getNode(), error as Error, {
      message: `Failed to load tasks from ${baseURL}/task/list`,
    });
  }
}

export async function loadOwnerAccounts(
  this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("aqtosApi");
  const baseURL = getBaseURL(credentials);

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "aqtosApi",
      {
        method: "GET",
        url: `${baseURL}/finance/ownerAccount/all`,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const ownerAccounts = Array.isArray(response)
      ? response
      : response?.data || response?.content || [];
    return ownerAccounts.map((account: Record<string, unknown>) => ({
      name:
        (account.name as string) ||
        (account.accountName as string) ||
        (account.label as string) ||
        `${account.id}`,
      value: (account.id as string) || (account.accountId as string),
    }));
  } catch (error) {
    throw new NodeOperationError(this.getNode(), error as Error, {
      message: `Failed to load owner accounts from ${baseURL}/finance/ownerAccount/all`,
    });
  }
}

export async function loadClientContacts(
  this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("aqtosApi");
  const baseURL = getBaseURL(credentials);

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "aqtosApi",
      {
        method: "GET",
        url: `${baseURL}/client/all`,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const clientViews = Array.isArray(response)
      ? response
      : response?.data || response?.content || [];

    const clientContacts: INodePropertyOptions[] = [];

    for (const clientView of clientViews) {
      const view = clientView as Record<string, unknown>;

      const contacts = view.clientContacts as
        | Record<string, unknown>[]
        | undefined;

      if (Array.isArray(contacts)) {
        for (const contact of contacts) {
          const contactObj = contact as Record<string, unknown>;
          const contactId = contactObj.id as string | undefined;

          if (contactId) {
            const clientName = view.name as Record<string, string> | undefined;
            const firstName = clientName?.first || "";
            const lastName = clientName?.last || "";
            const fullName =
              `${firstName} ${lastName}`.trim() || firstName || lastName;
            const name = fullName;
            clientContacts.push({ name, value: contactId });
          }
        }
      }
    }
    return clientContacts;
  } catch (error) {
    throw new NodeOperationError(this.getNode(), error as Error, {
      message: `Failed to load client contacts from ${baseURL}/client/all`,
    });
  }
}
