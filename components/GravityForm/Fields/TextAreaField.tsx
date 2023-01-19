import { TextAreaField as TextAreaFieldType, FieldError } from "graphql";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "utilities/useGravityForm";

interface Props {
  field: TextAreaFieldType;
  fieldErrors: FieldError[];
  formId: string;
}

const DEFAULT_VALUE = "";

export default function TextAreaField({ field, fieldErrors, formId }: Props) {
  const { id, type, label, description, cssClass, isRequired } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label className={`text-md font-heading text-gray-800`} htmlFor={htmlId}>
        {label}
      </label>
      <textarea
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        className={`form-input[type='textarea'] font-body w-full rounded-lg text-gray-500`}
        placeholder={(isRequired ? `${label}*` : label) ?? ``}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateTextAreaFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          });
        }}
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
