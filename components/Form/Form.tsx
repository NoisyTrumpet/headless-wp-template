import { gql, useQuery } from "@apollo/client";
import Content from "components/Content/Content";
import { GravityForm } from "components/GravityForm";
import { Loading } from "features";
import { FlexibleContentBlocksFormLayout } from "graphql";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";

interface FormProps extends FlexibleContentBlocksFormLayout {
  className?: string;
  form?: number;
}

const Form = ({ className, title, content, form }: FormProps) => {
  const { data, loading, error } = useQuery(FORM_FRAGMENT, {
    variables: {
      id: form,
      idType: "DATABASE_ID",
    },
  });

  const [formData, setFormData] = useState({} as any);
  const hasForm = formData && form;

  useEffect(() => {
    if (data) {
      setFormData(data?.gfForm);
    }
  }, [data]);

  if (loading) {
    return (
      <div className={`${className} relative my-12 w-full px-6 md:px-0`}>
        <div className={`container mx-auto text-center`}>
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative my-12 w-full px-6 md:px-0 `}>
      <div className={`container mx-auto flex  flex-col gap-6 text-center`}>
        <h2 className={`font-sans text-4xl font-bold text-primary`}>
          <Balancer>{title}</Balancer>
        </h2>
        <Content
          className={`text-md mx-auto my-4 max-w-xl font-sans text-gray-800`}
          content={content}
        />
        <GravityForm form={formData} formId={form ?? 1} />
      </div>
    </div>
  );
};

export default Form;

export const FORM_BLOCK_FRAGMENT = gql`
  fragment FormBlockFragment on FlexibleContentBlocksFormLayout {
    title
    content
    form
  }
`;

const FORM_FRAGMENT = gql`
  query FormQuery($id: ID!) {
    gfForm(id: $id, idType: DATABASE_ID) {
      id
      title
      submitButton {
        text
      }
      confirmations {
        message
      }
      cssClass
      formFields {
        nodes {
          databaseId
          type

          ... on NameField {
            databaseId
            type
            label
            description
            cssClass
            isRequired
            inputs {
              id
              label
              ... on NameInputProperty {
                id
                name
                placeholder
                label
                key
                isHidden
                hasChoiceValue
                defaultValue
                customLabel
                choices {
                  isSelected
                  text
                  value
                }
                autocompleteAttribute
              }
            }
          }
          ... on EmailField {
            databaseId
            adminLabel
            canPrepopulate
            cssClass
            databaseId
            description
            descriptionPlacement
            displayOnly
            errorMessage
            hasAutocomplete
            hasEmailConfirmation
            inputType
            inputName
            isRequired
            label
            placeholder
            visibility
          }
          ... on TextField {
            databaseId
            label
            description
            cssClass
            isRequired
            placeholder
          }
          ... on TextAreaField {
            databaseId
            label
            description
            cssClass
            isRequired
            placeholder
          }
          ... on CheckboxField {
            canPrepopulate
            checkboxValues {
              inputId
              text
              value
            }
            choices {
              ... on CheckboxFieldChoice {
                isSelected
                text
                value
              }
              value
              text
            }
            cssClass
            databaseId
            description
            displayOnly
            errorMessage
            hasChoiceValue
            hasSelectAll
            inputName
            inputType
            inputs {
              ... on CheckboxInputProperty {
                id
                name
                label
              }
            }
            isRequired
            label
            labelPlacement
            type
            value
          }
          ... on MultiSelectField {
            id
            choices {
              ... on MultiSelectFieldChoice {
                isSelected
                text
                value
              }
            }
            cssClass
            databaseId
            errorMessage
            displayOnly
            description
            hasChoiceValue
            hasEnhancedUI
            inputName
            inputType
            inputs {
              ... on CheckboxInputProperty {
                id
                name
                label
              }
            }
            isRequired
            label
            type
            value
            values
          }
          ... on SelectField {
            canPrepopulate
            choices {
              ... on SelectFieldChoice {
                isSelected
                text
                value
              }
            }
            autocompleteAttribute
            cssClass
            databaseId
            defaultValue
            description
            displayOnly
            errorMessage
            hasAutocomplete
            hasChoiceValue
            hasEnhancedUI
            inputs {
              id
              label
            }
            isRequired
            label
            placeholder
            shouldAllowDuplicates
            type
          }
          ... on WebsiteField {
            databaseId
            placeholder
            label
            description
            isRequired
            cssClass
            value
          }
          ... on PhoneField {
            databaseId
            label
            description
            cssClass
            isRequired
            placeholder
          }
          ... on DateField {
            databaseId
            label
            description
            cssClass
            isRequired
            placeholder
          }

          ... on NumberField {
            databaseId
            label
            description
            cssClass
            isRequired
            placeholder
          }
          ... on RadioField {
            choices {
              text
              value
              ... on RadioFieldChoice {
                isOtherChoice
                isSelected
                text
                value
              }
            }
            cssClass
            conditionalLogic {
              actionType
              logicType
              rules {
                fieldId
                operator
                value
              }
            }
            databaseId
            description
            displayOnly
            errorMessage
            hasChoiceValue
            hasOtherChoice
            inputType
            inputs {
              id
              label
            }
            isRequired
            label
            shouldAllowDuplicates
            type
            value
          }
          ... on AddressField {
            addressType
            addressValues {
              city
              country
              lineTwo
              state
              street
              zip
            }
            adminLabel
            canPrepopulate
            cssClass
            databaseId
            defaultCountry
            defaultProvince
            defaultState
            description
            descriptionPlacement
            displayOnly
            errorMessage
            hasAutocomplete
            inputName
            inputType
            inputs {
              label
              id
              ... on AddressInputProperty {
                id
                name
                autocompleteAttribute
                customLabel
                defaultValue
                isHidden
                key
                label
                placeholder
              }
            }
            isRequired
            label
            shouldCopyValuesOption
            type
            value
          }
        }
      }
    }
  }
`;
