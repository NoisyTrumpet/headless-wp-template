import { GfForm as GravityFormsFormType } from "graphql";
import { GravityFormProvider } from "utilities/useGravityForm";
import * as React from "react";

import GravityFormsForm from "./GravityFormsForm";

interface Props {
  form: GravityFormsFormType;
  isLoading: boolean;
  formId?: number;
}

const GravityForm = ({ form, isLoading, formId }: Props) => {
  if (isLoading && !formId) {
    return <div>Loading...</div>;
  }

  // console.log(formId);

  return (
    <GravityFormProvider>
      <GravityFormsForm form={form} formId={formId} />
    </GravityFormProvider>
  );
};

export default GravityForm;
