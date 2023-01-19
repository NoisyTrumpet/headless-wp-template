// import { gql } from "@apollo/client";

import {
  CheckboxField as CheckboxFieldType,
  CheckboxFieldInput as CheckboxInput,
  FieldError,
} from "graphql";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  CheckboxFieldValue,
} from "utilities/useGravityForm";

interface Props {
  field: CheckboxFieldType;
  fieldErrors: FieldError[];
  formId?: number;
}

const DEFAULT_VALUE: CheckboxInput[] = [];

export default function CheckboxField({ field, fieldErrors, formId }: Props) {
  const { id, type, label, description, cssClass, inputs, choices } = field;
  const checkboxInputs =
    choices?.map((choice, index) => ({ ...choice, id: inputs?.[index]?.id })) ||
    [];
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id
  ) as CheckboxFieldValue | undefined;
  const checkboxValues = fieldValue?.checkboxValues || DEFAULT_VALUE;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = event.target;
    const otherCheckboxValues = checkboxValues.filter(
      (checkboxValue: CheckboxInput) => checkboxValue.inputId !== Number(name)
    );
    const newCheckboxValues = checked
      ? [...otherCheckboxValues, { inputId: Number(name), value }]
      : otherCheckboxValues;

    dispatch({
      type: ACTION_TYPES.updateCheckboxFieldValue,
      fieldValue: {
        id,
        checkboxValues: newCheckboxValues,
      },
    });
  }

  return (
    <fieldset
      id={htmlId}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
    >
      <legend className="font-heading text-gray-800">{label}</legend>
      {checkboxInputs.map(({ id: inputId, text, value }, i) => (
        <div key={`${inputId}_${i}`} className={`flex gap-4`}>
          <input
            type="checkbox"
            name={String(inputId)}
            id={`input_${formId}_${id}_${inputId}`}
            value={String(value)}
            onChange={handleChange}
          />
          <label
            className="text-gray-800"
            htmlFor={`input_${formId}_${id}_${inputId}`}
          >
            {text}
          </label>
        </div>
      ))}
      {description ? (
        <p className="field-description mt-4 text-gray-700">{description}</p>
      ) : null}
      {fieldErrors?.length
        ? fieldErrors.map((fieldError) => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </fieldset>
  );
}
