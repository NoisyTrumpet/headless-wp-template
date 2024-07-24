import { PhoneField as PhoneFieldType, FieldError } from "graphql";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "utilities/useGravityForm";

interface Props {
  field: PhoneFieldType;
  fieldErrors: FieldError[];
  formId: string;
}

const DEFAULT_VALUE = "";

export default function PhoneField({ field, fieldErrors, formId }: Props) {
  const {
    databaseId: id,
    type,
    label,
    description,
    cssClass,
    isRequired,
    placeholder,
  } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id,
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div
      className={`gfield gfield flex w-full flex-col justify-center gap-2 font-sans gfield-${type} ${cssClass}`.trim()}
    >
      <label
        className={`mb-2 text-left font-sans text-sm font-bold text-gray-700`}
        htmlFor={htmlId}
      >
        {label}
      </label>
      <input
        type="tel"
        name={String(id)}
        className={`form-input[type='tel'] font-body w-full rounded-lg bg-slate-50 p-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300`}
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder || isRequired ? `${label}*` : label || ""}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updatePhoneFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          });
        }}
      />
      {description ? (
        <p className="field-description font-body text-sm italic">
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
    </div>
  );
}
