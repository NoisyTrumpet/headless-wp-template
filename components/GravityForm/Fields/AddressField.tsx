import { gql } from "@apollo/client";
import React from "react";

import {
  AddressField as AddressFieldType,
  AddressFieldInput,
  FieldError,
} from "graphql";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  AddressFieldValue,
} from "utilities/useGravityForm";

export const ADDRESS_FIELD_FIELDS = gql`
  fragment AddressFieldFields on AddressField {
    id
    label
    inputName
    description
    cssClass
    inputs {
      placeholder
      name
      label
      key
      isHidden
      id
      defaultValue
      customLabel
      autocompleteAttribute
    }
  }
`;

interface Props {
  field: AddressFieldType;
  fieldErrors: FieldError[];
  formId: string;
}

const DEFAULT_VALUE: AddressFieldInput = {};

const AUTOCOMPLETE_ATTRIBUTES: { [key: string]: string } = {
  street: "address-line1",
  lineTwo: "address-line2",
  city: "address-level2",
  state: "address-level1",
  country: "country-name",
};

export default function AddressField({ field, fieldErrors, formId }: Props) {
  const { id, type, label, description, cssClass, inputs } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id
  ) as AddressFieldValue | undefined;
  const addressValues = fieldValue?.addressValues || DEFAULT_VALUE;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const newAddressValues = { ...addressValues, [name]: value };

    dispatch({
      type: ACTION_TYPES.updateAddressFieldValue,
      fieldValue: {
        id,
        addressValues: newAddressValues,
      },
    });
  }

  return (
    <fieldset
      id={htmlId}
      className={`gfield flex flex-col gap-4 gfield-${type} ${cssClass}`.trim()}
    >
      <legend className={`font-heading my-4 text-gray-800`}>{label}</legend>
      {inputs?.map((input) => {
        const key = input?.key as keyof AddressFieldInput;
        const inputLabel = input?.label || "";
        const placeholder = input?.placeholder || "";
        const isCountry = key === "country";

        // Enforce country to folllow the ISO 3166-1 alpha-2 standard
        if (isCountry) {
          return (
            <div key={key}>
              <label
                className={`hidden`}
                htmlFor={`input_${formId}_${id}_${key}`}
              >
                {inputLabel}
              </label>
              <input
                type="text"
                name={String(key)}
                id={`input_${formId}_${id}_${key}`}
                className={`form-input[type='text'] font-body w-full rounded-lg text-gray-700`}
                placeholder={`${inputLabel}`}
                autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
                value={addressValues?.[key] ?? "US"}
                onChange={handleChange}
                pattern="[A-Z]{2}"
                title="Please enter a valid country code (e.g. US)"
              />
            </div>
          );
        }

        return (
          <div key={key}>
            <label
              className={`hidden`}
              htmlFor={`input_${formId}_${id}_${key}`}
            >
              {inputLabel}
            </label>
            <input
              type="text"
              name={String(key)}
              id={`input_${formId}_${id}_${key}`}
              className={`form-input[type='text'] font-body w-full rounded-lg text-gray-700`}
              placeholder={inputLabel}
              autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
              value={addressValues?.[key] ?? ""}
              onChange={handleChange}
            />
          </div>
        );
      })}
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
