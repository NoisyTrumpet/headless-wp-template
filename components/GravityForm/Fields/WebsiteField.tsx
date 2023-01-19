import { WebsiteField as WebsiteFieldType, FieldError } from "graphql";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "utilities/useGravityForm";

interface Props {
  field: WebsiteFieldType;
  fieldErrors: FieldError[];
  formId: any;
}

const DEFAULT_VALUE = "";

export default function WebsiteField({ field, fieldErrors, formId }: Props) {
  const { id, type, label, description, cssClass, isRequired, placeholder } =
    field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield gfield-${type} ${cssClass ?? ""}`.trim()}>
      <label className={`text-md font-heading text-gray-800`} htmlFor={htmlId}>
        {label}
      </label>
      <input
        type="url"
        name={String(id)}
        id={htmlId}
        placeholder={field?.isRequired ? `${label}*` : `${placeholder}` || ""}
        className={`form-input[type='url'] w-full rounded-lg font-body text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300`}
        required={isRequired || false}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateWebsiteFieldValue,
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
