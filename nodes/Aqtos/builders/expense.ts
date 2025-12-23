import type { IExecuteFunctions } from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";
import { formatDateTimeForZonedDateTime } from "../utils/helpers";

export function buildCreateExpenseBody(
  context: IExecuteFunctions,
  itemIndex: number
): Record<string, unknown> {
  const body: Record<string, unknown> = {};
  const getParam = (name: string) =>
    context.getNodeParameter(name, itemIndex, "") as string;
  const getParamNumber = (name: string) =>
    context.getNodeParameter(name, itemIndex, undefined) as number | undefined;
  const getParamBoolean = (name: string) =>
    context.getNodeParameter(name, itemIndex, false) as boolean;
  const getParamDateTime = (name: string) =>
    context.getNodeParameter(name, itemIndex, "") as string;

  // Validate required fields
  const title = getParam("expenseTitle");
  if (!title || title.trim() === "") {
    throw new NodeOperationError(
      context.getNode(),
      "Title is required for expense creation",
      { itemIndex }
    );
  }
  body.title = title;

  const amount = getParamNumber("expenseAmount");
  if (amount === undefined || amount === null) {
    throw new NodeOperationError(
      context.getNode(),
      "Amount is required for expense creation",
      { itemIndex }
    );
  }
  body.amount = amount;

  const currencyCode = getParam("expenseCurrencyCode");
  if (!currencyCode || currencyCode.trim() === "") {
    throw new NodeOperationError(
      context.getNode(),
      "Currency code is required for expense creation",
      { itemIndex }
    );
  }
  body.currencyCode = currencyCode;

  const status = getParam("expenseStatus");
  if (!status || status.trim() === "") {
    throw new NodeOperationError(
      context.getNode(),
      "Status is required for expense creation",
      { itemIndex }
    );
  }
  body.status = status;

  const dueDate = getParamDateTime("expenseDueDate");
  if (!dueDate || dueDate.trim() === "") {
    throw new NodeOperationError(
      context.getNode(),
      "Due date is required for expense creation",
      { itemIndex }
    );
  }
  body.dueDate = formatDateTimeForZonedDateTime(dueDate);

  // Optional fields
  if (getParam("expenseId")) body.expenseId = getParam("expenseId");
  if (getParam("expenseNote")) body.note = getParam("expenseNote");
  if (getParam("expenseCategoryId"))
    body.expenseCategoryId = getParam("expenseCategoryId");
  const recurring = getParamBoolean("expenseRecurring");
  body.recurring = recurring;

  // If recurring is true, build recurrence rule from structured fields
  if (recurring) {
    const frequency = getParam("expenseRecurrenceFrequency");
    const interval = getParamNumber("expenseRecurrenceInterval");

    if (!frequency || frequency.trim() === "") {
      throw new NodeOperationError(
        context.getNode(),
        "Recurrence frequency is required when recurring is true",
        { itemIndex }
      );
    }

    if (interval === undefined || interval === null || interval < 1) {
      throw new NodeOperationError(
        context.getNode(),
        "Recurrence interval is required and must be at least 1 when recurring is true",
        { itemIndex }
      );
    }

    // Build the iCal recurrence rule string
    // RFC 2445 requires RRULE: prefix and no trailing semicolon
    const ruleParts: string[] = [`FREQ=${frequency}`, `INTERVAL=${interval}`];

    // Add BYDAY for weekly recurrence
    if (frequency === "WEEKLY") {
      const days = context.getNodeParameter(
        "expenseRecurrenceDays",
        itemIndex,
        []
      ) as string[];
      if (days && days.length > 0) {
        ruleParts.push(`BYDAY=${days.join(",")}`);
      }
    }

    // Add BYMONTHDAY for monthly recurrence
    if (frequency === "MONTHLY") {
      const monthDays = getParam("expenseRecurrenceMonthDays");
      if (monthDays && monthDays.trim() !== "") {
        // Validate and clean the month days
        const days = monthDays
          .split(",")
          .map((d) => d.trim())
          .filter((d) => {
            const num = parseInt(d, 10);
            return !isNaN(num) && num >= 1 && num <= 31;
          });
        if (days.length > 0) {
          ruleParts.push(`BYMONTHDAY=${days.join(",")}`);
        }
      }
    }

    // Add BYWEEKNO for monthly or yearly recurrence
    if (frequency === "MONTHLY" || frequency === "YEARLY") {
      const weekNumbers = getParam("expenseRecurrenceWeekNumbers");
      if (weekNumbers && weekNumbers.trim() !== "") {
        // Validate and clean the week numbers
        const weeks = weekNumbers
          .split(",")
          .map((w) => w.trim())
          .filter((w) => {
            const num = parseInt(w, 10);
            return !isNaN(num) && num >= 1 && num <= 53;
          });
        if (weeks.length > 0) {
          ruleParts.push(`BYWEEKNO=${weeks.join(",")}`);
        }
      }
    }

    // Join parts with semicolons and add RRULE: prefix (RFC 2445 format)
    const recurrenceRule = `RRULE:${ruleParts.join(";")}`;

    // Send recurrenceRule as an object with value property (RecurrenceRule is an embeddable class)
    body.recurrenceRule = { value: recurrenceRule };
  }

  const paymentDate = getParamDateTime("expensePaymentDate");
  if (paymentDate && paymentDate.trim() !== "")
    body.paymentDate = formatDateTimeForZonedDateTime(paymentDate);
  if (getParam("expenseVendorId")) body.vendorId = getParam("expenseVendorId");
  if (getParam("expenseCreator")) body.creator = getParam("expenseCreator");
  if (getParam("expenseIssuedToOwnerAccountId"))
    body.issuedToOwnerAccountId = getParam("expenseIssuedToOwnerAccountId");
  if (getParam("expenseCorrelationId"))
    body.correlationId = getParam("expenseCorrelationId");

  return body;
}
