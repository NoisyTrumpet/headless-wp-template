import { MultiSelectField as MultiSelectFieldType, FieldError } from "graphql";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValues,
} from "utilities/useGravityForm";
import Select, { ActionMeta } from "react-select";
import OptionTypeBase from "react-select";

// import styles from "../GravityForm.module.scss";

interface Props {
  field: MultiSelectFieldType;
  fieldErrors: FieldError[];
  formId: any;
}

interface Option extends OptionTypeBase {
  value: string;
  label: string;
}

const DEFAULT_VALUE: string[] = [];

export default function MultiSelectField({
  field,
  fieldErrors,
  formId,
}: Props) {
  const { id, type, label, description, cssClass, isRequired, choices } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id
  ) as StringFieldValues | undefined;
  const values = fieldValue?.values || DEFAULT_VALUE;
  const options =
    choices?.map((choice) => ({ value: choice?.value, label: choice?.text })) ||
    [];
  const selectedOptions = options.filter((option) =>
    values.includes(String(option?.value))
  );

  function handleChange(value: any, actionMeta: ActionMeta<any>) {
    const values = value.map((option: Option) => option.value);
    dispatch({
      type: ACTION_TYPES.updateMultiSelectFieldValue,
      fieldValue: { id, values },
    });
  }

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId}>{label}</label>
      <Select
        className={`mb-sm mt-xs`}
        isMulti
        name={String(id)}
        inputId={htmlId}
        required={Boolean(isRequired)}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
      />
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
