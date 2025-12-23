import type { IExecuteFunctions } from "n8n-workflow";

export function buildCreateTaskBody(
  context: IExecuteFunctions,
  itemIndex: number
): Record<string, unknown> {
  const body: Record<string, unknown> = {};
  const getParam = (name: string) =>
    context.getNodeParameter(name, itemIndex, "") as string;
  const getParamBoolean = (name: string) =>
    context.getNodeParameter(name, itemIndex, false) as boolean;

  if (getParam("taskParent")) body.parent = getParam("taskParent");
  body.projectId = getParam("taskProjectId");
  if (getParam("taskCreator")) body.creator = getParam("taskCreator");
  body.title = getParam("taskTitle");
  if (getParam("taskStatusId")) body.taskStatusId = getParam("taskStatusId");
  if (getParam("taskCategoryId"))
    body.taskCategoryId = getParam("taskCategoryId");
  body.priority = getParam("taskPriority");
  const assignees = context.getNodeParameter(
    "taskAssignees",
    itemIndex,
    []
  ) as string[];
  if (assignees && assignees.length > 0) {
    body.assignees = assignees;
  }
  body.encrypted = getParamBoolean("taskEncrypted");

  return body;
}
