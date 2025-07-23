"use client";

import FormBuilder from "@/components/widgets/BasicFormBuilder";
import SimpleModelDropdown from "@/components/widgets/SimpleModelDropdown";
import SimpleSignatureInput from "@/components/widgets/SimpleSignatureInput";

const schema = {
  initialValues: {
    permissionGroup: null,
    username: "",
  },
  tabs: [
    {
      key: "personal_information",
      label: "Información personal",
      groups: [
        {
          key: "personal_information",
          title: "Información personal",
          variant: "stack",
          widgets: [
            {
              key: "document_type",
              component: SimpleModelDropdown,
              props: {
                name: "Tipo de documento",
                appName: "common",
                modelName: "document-type",
                displayField: "name",
              },
            },
            {
                key: "gender",
                component: SimpleModelDropdown,
                props: {
                  name: "Género",
                  appName: "employees",
                  modelName: "gender",
                  displayField: "name",
                },
              },
            // {
            //   key: "signature",
            //   component: SimpleSignatureInput,
            //   props: {
            //     name: "Firma",
            //   },
            // },
          ],
        },
        {
          key: "col2",
          title: "Grupo de permisos 2",
          variant: "stack",
          widgets: [
            {
              key: "group2",
              component: SimpleModelDropdown,
              props: {
                name: "Grupo de permisos 2",
                appName: "common",
                modelName: "group",
                displayField: "name",
              },
            },
          ],
        },
      ],
    },
    {
      key: "settings",
      label: "Settings",
      groups: [
        {
          key: "wide",
          title: "Grupo de permisos 3",
          variant: "fullWidth",
          widgets: [
            {
              key: "group3",
              component: SimpleModelDropdown,
              props: {
                name: "Grupo de permisos 3",
                appName: "common",
                modelName: "group",
                displayField: "name",
              },
            },
          ],
        },
      ],
    },
  ],
  onSubmit: (values) => {
    console.log("Form submitted:", values);
    // send to API…
  },
};

export default function MyFormPage() {
  return <FormBuilder schema={schema} />;
}
