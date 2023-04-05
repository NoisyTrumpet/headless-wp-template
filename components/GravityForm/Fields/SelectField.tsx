// import { gql } from "@apollo/client";

import { SelectField as SelectFieldType, FieldError } from "graphql";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "utilities/useGravityForm";

interface Props {
  field: SelectFieldType;
  fieldErrors: FieldError[];
  formId: any;
}

export default function SelectField({ field, fieldErrors, formId }: Props) {
  const {
    databaseId: id,
    type,
    label,
    description,
    cssClass,
    isRequired,
    defaultValue,
    choices,
  } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || String(defaultValue);

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId}>{label}</label>
      <select
        className={`ml-xs my-sm`}
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateSelectFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          });
        }}
      >
        {choices?.map((choice) => (
          <option key={choice?.value || ""} value={choice?.value || ""}>
            {choice?.text || ""}
          </option>
        ))}
      </select>
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length
        ? fieldErrors.map((fieldError) => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </div>
  );
}
