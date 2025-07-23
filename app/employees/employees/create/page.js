"use client";

import FormBuilder from "@/components/widgets/BasicFormBuilder";
import SimpleModelDropdown from "@/components/widgets/SimpleModelDropdown";

const schema = {
  initialValues: {
    permissionGroup: null,
    username: "",
  },
  tabs: [
    {
      key: "details",
      label: "Details",
      groups: [
        {
          key: "col1",
          variant: "stack",
          widgets: [
            {
              key: "group1",
              component: SimpleModelDropdown,
              props: {
                name: "Grupo de permisos 1",
                appName: "common",
                modelName: "group",
                displayField: "name",
              },
            },
          ],
        },
        {
          key: "col2",
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
