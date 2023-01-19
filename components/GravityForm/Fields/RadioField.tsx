import { gql } from "@apollo/client";

import { RadioField as RadioFieldType, FieldError } from "graphql";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "utilities/useGravityForm";

export const RADIO_FIELD_FIELDS = gql`
  fragment RadioFieldFields on RadioField {
    id
    label
    description
    cssClass
    choices {
      text
      value
    }
  }
`;

interface Props {
  field: RadioFieldType;
  fieldErrors: FieldError[];
  formId: string;
}

const DEFAULT_VALUE = "";

export default function RadioField({ field, fieldErrors, formId }: Props) {
  const { id, type, label, description, cssClass, choices } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: ACTION_TYPES.updateRadioFieldValue,
      fieldValue: {
        id,
        value: event.target.value,
      },
    });
  }

  return (
    <fieldset
      id={htmlId}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
    >
      <legend className="font-heading text-gray-800">{label}</legend>
      {choices?.map((input) => {
        const text = input?.text || "";
        const inputValue = input?.value || "";
        return (
          <div key={inputValue} className={`flex gap-4`}>
            <input
              type="radio"
              name={String(id)}
              id={`choice_${formId}_${id}_${inputValue}`}
              value={inputValue}
              onChange={handleChange}
            />
            <label
              htmlFor={`choice_${formId}_${id}_${value}`}
              className="font-body text-gray-800"
            >
              {text}
            </label>
          </div>
        );
      })}
      {description ? (
        <p className="field-description mt-4 font-body text-sm italic text-gray-700">
          {description}
        </p>
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
