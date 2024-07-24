// import { gql } from "@apollo/client";

import {
  NameField as NameFieldType,
  NameFieldInput,
  FieldError,
} from "graphql";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  NameFieldValue,
} from "utilities/useGravityForm";

// export const NAME_FIELD_FIELDS = gql`
//   fragment NameFieldFields on NameField {
//     id
//     formId
//     label
//     description
//     cssClass
//     inputs {
//       key
//       label
//       placeholder
//       choices {
//         text
//         value
//       }
//     }
//   }
// `;

interface Props {
  field: any;
  fieldErrors: FieldError[];
  formId: string;
}

const DEFAULT_VALUE: NameFieldInput = {};

const AUTOCOMPLETE_ATTRIBUTES: { [key: string]: string } = {
  prefix: "honorific-prefix",
  first: "given-name",
  middle: "additional-name",
  last: "family-name",
  suffix: "honorific-suffix",
};

export default function NameField({ field, fieldErrors, formId }: Props) {
  const {
    databaseId: id,
    type,
    label,
    description,
    cssClass,
    inputs,
    isRequired,
  } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id,
  ) as NameFieldValue | undefined;
  const nameValues = fieldValue?.nameValues || DEFAULT_VALUE;

  const prefixInput = inputs?.find(
    (input: { key: string }) => input?.key === "prefix",
  );
  const otherInputs =
    inputs?.filter((input: { key: string }) => input?.key !== "prefix") || [];

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    const newNameValues = { ...nameValues, [name]: value };

    dispatch({
      type: ACTION_TYPES.updateNameFieldValue,
      fieldValue: {
        id,
        nameValues: newNameValues,
      },
    });
  }

  return (
    <fieldset
      id={htmlId}
      className={`gfield flex w-full flex-col justify-center gap-4 font-sans md:flex-row gfield-${type} ${
        cssClass ?? ""
      }`.trim()}
    >
      <legend
        className={`mb-2 text-left text-sm font-bold text-gray-700`}
      >{`${label} ${isRequired ? "(required)" : ""}`}</legend>
      {/* {prefixInput ? (
        <>
          <select
            name={String(prefixInput.key)}
            id={`input_${formId}_${id}_${prefixInput.key}`}
            autoComplete={AUTOCOMPLETE_ATTRIBUTES.prefix}
            value={nameValues.prefix || ""}
            onChange={handleChange}
          >
            <option value=""></option>
            {prefixInput.choices?.map((choice) => (
              <option key={choice?.value} value={String(choice?.value)}>
                {String(choice?.text)}
              </option>
            ))}
          </select>
          <label htmlFor={`input_${formId}_${id}_${prefixInput.key}`}>
            {prefixInput.label}
          </label>
        </>
      ) : null} */}
      {otherInputs.map(
        (input: { key: string; label: string; placeholder: string }) => {
          const key = input?.key as keyof NameFieldInput;
          const inputLabel = input?.label || "";
          const placeholder = input?.placeholder || "";
          return (
            (key === "first" || key === "last") && (
              <div key={key} className={`w-full`}>
                <label
                  className="hidden text-left text-sm font-medium text-gray-700"
                  htmlFor={`input_${formId}_${id}_${key}`}
                >
                  {inputLabel}
                </label>
                <input
                  type="text"
                  className={`form-input[type='text'] font-body w-full rounded-lg bg-slate-50 px-2 py-2`}
                  name={String(key)}
                  id={`input_${formId}_${id}_${key}`}
                  placeholder={
                    placeholder || isRequired ? `${inputLabel}*` : inputLabel
                  }
                  autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
                  value={nameValues?.[key] || ""}
                  onChange={handleChange}
                />
              </div>
            )
          );
        },
      )}
      {description ? <p className="field-description">{description}</p> : null}
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
