import { GfForm as GravityFormsFormType } from "graphql";
import { GravityFormProvider } from "utilities/useGravityForm";
import * as React from "react";

import GravityFormsForm from "./GravityFormsForm";

interface Props {
  form: GravityFormsFormType;
  formId: number;
}

const GravityForm = ({ form, formId }: Props) => {
  return (
    <GravityFormProvider>
      <GravityFormsForm form={form} formId={formId} />
    </GravityFormProvider>
  );
};

export default GravityForm;
