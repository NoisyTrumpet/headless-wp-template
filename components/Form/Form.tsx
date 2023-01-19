import { gql, useQuery } from "@apollo/client";
import { GravityForm } from "components/GravityForm";
import { Loading } from "features";
import { Page_Flexiblecontent_Blocks_Form } from "graphql";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";

interface FormProps extends Page_Flexiblecontent_Blocks_Form {
  className?: string;
}

const Form = ({ className, title, content, form }: FormProps) => {
  const { data, loading, error } = useQuery(FORM_QUERY, {
    variables: {
      id: form,
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
    <div className={`${className} relative my-12 w-full px-6 md:px-0`}>
      <div className={`container mx-auto text-center`}>
        <h2 className={`font-heading text-4xl text-primary`}>
          <Balancer>{title}</Balancer>
        </h2>
        <Balancer>
          <div
            className={`text-md my-4 mx-auto max-w-xl font-body text-gray-800`}
            dangerouslySetInnerHTML={{ __html: content ?? `` }}
          />
        </Balancer>
        {hasForm && (
          <GravityForm form={formData} isLoading={loading} formId={form} />
        )}
      </div>
    </div>
  );
};

export default Form;

const FORM_QUERY = gql`
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
          id
          type

          ... on NameField {
            id
            type
            label
            description
            cssClass
            inputs {
              key
              label
              placeholder
              choices {
                text
                value
              }
            }
          }
          ... on EmailField {
            id
            label
            description
            cssClass
            isRequired
            placeholder
          }
          ... on TextField {
            id
            label
            description
            cssClass
            isRequired
            placeholder
          }
          ... on TextAreaField {
            id
            label
            description
            cssClass
            isRequired
            placeholder
          }
          ... on CheckboxField {
            id
            label
            isRequired
            description
            cssClass
            choices {
              isSelected
              text
              value
            }
            inputs {
              id
            }
          }
          ... on MultiSelectField {
            id
            label
            description
            isRequired
            cssClass
            choices {
              isSelected
              text
              value
            }
          }
          ... on SelectField {
            id
            label
            description
            isRequired
            defaultValue
            cssClass
            placeholder
            choices {
              text
              isSelected
              value
            }
          }
          ... on WebsiteField {
            id
            placeholder
            label
            description
            isRequired
            cssClass
            value
          }
          ... on PhoneField {
            id
            label
            description
            cssClass
            isRequired
            placeholder
          }
          ... on DateField {
            id
            label
            description
            cssClass
            isRequired
            placeholder
          }

          ... on NumberField {
            id
            label
            description
            cssClass
            isRequired
            placeholder
          }
          ... on RadioField {
            id
            label
            description
            cssClass
            isRequired
            choices {
              isSelected
              text
              value
            }
          }
          ... on AddressField {
            id
            addressType
            addressValues {
              city
              country
              lineTwo
              state
              street
              zip
            }
            value
            type
            label
            adminLabel
            cssClass
            inputName
            inputType
            hasAutocomplete
            isRequired
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
        }
      }
    }
  }
`;
