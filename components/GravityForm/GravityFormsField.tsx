import { FieldError, FormField } from "graphql";
import * as React from "react";

import AddressField from "./Fields/AddressField";
import CheckboxField from "./Fields/CheckboxField";
import DateField from "./Fields/DateField";
import EmailField from "./Fields/EmailField";
import MultiSelectField from "./Fields/MultiSelectField";
import NameField from "./Fields/NameField";
import PhoneField from "./Fields/PhoneField";
import RadioField from "./Fields/RadioField";
import SelectField from "./Fields/SelectField";
import TextAreaField from "./Fields/TextAreaField";
import TextField from "./Fields/TextField";
// import TimeField from './Fields/TimeField'
import WebsiteField from "./Fields/WebsiteField";
import NumberField from "./Fields/NumberField";

interface Props {
  field: any;
  fieldErrors: FieldError[];
  formId: any;
}

const GravityFormsField = ({ field, fieldErrors, formId }: Props) => {
  switch (field?.type) {
    case "ADDRESS":
      return (
        <AddressField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "CHECKBOX":
      return (
        <CheckboxField
          field={field}
          fieldErrors={fieldErrors}
          formId={formId}
        />
      );
    case "DATE":
      return (
        <DateField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "EMAIL":
      return (
        <EmailField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "NUMBER":
      return (
        <NumberField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "MULTISELECT":
      return (
        <MultiSelectField
          field={field}
          fieldErrors={fieldErrors}
          formId={formId}
        />
      );
    case "NAME":
      return field ? (
        <NameField field={field} fieldErrors={fieldErrors} formId={formId} />
      ) : null;
    case "PHONE":
      return (
        <PhoneField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "RADIO":
      return (
        <RadioField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "SELECT":
      return (
        <SelectField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "TEXT":
      return (
        <TextField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "TEXTAREA":
      return (
        <TextAreaField
          field={field}
          fieldErrors={fieldErrors}
          formId={formId}
        />
      );
    // case 'time':
    //   return <TimeField field={field} fieldErrors={fieldErrors} />
    case "WEBSITE":
      return (
        <WebsiteField field={field} fieldErrors={fieldErrors} formId={formId} />
      );

    default:
      return null;
  }
};

export default GravityFormsField;
