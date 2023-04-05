import "react-toastify/dist/ReactToastify.css";
import { gql, useMutation } from "@apollo/client";

import {
  FieldError,
  FormField,
  FormFieldValuesInput,
  FormIdTypeEnum,
  GfForm as GravityFormsFormType,
  SubmitGfFormInput,
} from "graphql";
import useGravityForm from "utilities/useGravityForm";
import { toast, ToastContainer } from "react-toastify";
// import styles from "./GravityForm.module.scss";

import GravityFormsField from "./GravityFormsField";
import { Button } from "components/Button";
import removeHtml from "utilities/removeHtml";

interface Props {
  form: GravityFormsFormType;
  formId?: number;
}

const successOptions = {
  autoClose: 3000,
  // closeButton: FontAwesomeCloseButton,
  type: toast.TYPE.SUCCESS,
  hideProgressBar: false,
  position: toast.POSITION.TOP_RIGHT,
  pauseOnHover: true,
  // transition: MyCustomTransition,
  // progress: 0.2
  // and so on ...
};

const fieldError = {
  autoClose: 3000,
  // closeButton: FontAwesomeCloseButton,
  type: toast.TYPE.ERROR,
  hideProgressBar: false,
  position: toast.POSITION.TOP_RIGHT,
  pauseOnHover: true,
  // transition: MyCustomTransition,
  // progress: 0.2
  // and so on ...
};

const GravityFormsForm = ({ form, formId }: Props) => {
  const { formFields, title, id, databaseId, submitButton, confirmations } =
    form ?? {
      formFields: {
        nodes: [],
      },
      title: "",
      id: "",
      databaseId: 0,
      submitButton: {
        text: "",
      },
      confirmations: [
        {
          message: "",
        },
      ],
    };

  const { state } = useGravityForm();

  const [submitGfForm, { data, loading, error }] = useMutation(
    gql`
      mutation SubmitGfForm($input: SubmitGfFormInput!) {
        submitGfForm(input: $input) {
          clientMutationId
          confirmation {
            message
          }
          entry {
            formId
          }
          errors {
            message
            id
          }
        }
      }
    `,
    {
      onCompleted: (data: any) => {
        if (
          data?.submitGfForm?.errors &&
          data?.submitGfForm?.errors.length > 0
        ) {
          data?.submitGfForm?.errors.forEach((error: FieldError) => {
            return toast.error(error.message);
          });
        }
        if (data?.submitGfForm?.confirmation) {
          toast.success(
            removeHtml(data?.submitGfForm?.confirmation?.message),
            successOptions
          );
        }
      },
    }
  );

  const haveEntryId = Boolean(data?.entry?.entryId);
  const haveFieldErrors = Boolean(data?.entry?.errors?.length);
  const wasSuccessfullySubmitted = haveEntryId && !haveFieldErrors;
  const hasConfirmation = confirmations && confirmations.length > 0;
  const defaultConfirmation = hasConfirmation && confirmations[0]?.message;
  const fields = formFields?.nodes || [];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;
    // alert(event?.target?.value)
    submitGfForm({
      variables: {
        input: {
          id: formId,
          fieldValues: state,
        },
      },
    })
      .catch((errors: any) => toast(errors, fieldError))
      .then((data: any) => {
        console.log("Submitted");
      });
  };

  function getFieldErrors(id: number): FieldError[] {
    if (!haveFieldErrors) return [];

    return data?.submitGfForm?.errors.filter(
      (error: FieldError) => error?.id === id
    );
  }
  console.log(state);

  return (
    <>
      <form
        // className={`${styles[`form`]}`}
        method="post"
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        <div className={`mx-auto flex max-w-xl flex-col gap-4`}>
          {fields
            ? fields.map((field, index) => {
                return (
                  <GravityFormsField
                    key={`${field?.id}-${index}`}
                    formId={formId}
                    field={field}
                    fieldErrors={getFieldErrors(Number(field?.id))}
                  />
                );
              })
            : null}
          {error ? (
            <div className="error-message text-primary">{error.message}</div>
          ) : null}
          <Button
            type="primary"
            disabled={loading}
            className={`mx-auto max-w-fit`}
          >
            {submitButton?.text ?? "Submit"}
          </Button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default GravityFormsForm;
