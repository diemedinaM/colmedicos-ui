"use client";

import FormBuilder from "@/components/widgets/BasicFormBuilder";
import SimpleModelDropdown from "@/components/widgets/SimpleModelDropdown";
import SimpleSignatureInput from "@/components/widgets/SimpleSignatureInput";
import DynamicModelDropdown from "@/components/widgets/DynamicModelDropdown";

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
                                name: "document_type",
                                label: "Tipo de documento",
                                appName: "common",
                                modelName: "document-type",
                                displayField: "name",
                            },
                        },
                        {
                            key: "gender",
                            component: SimpleModelDropdown,
                            props: {
                                name: "gender",
                                label: "Género",
                                appName: "employees",
                                modelName: "gender",
                                displayField: "name",
                            },
                        },
                        {
                            key: "ethnic-group",
                            component: SimpleModelDropdown,
                            props: {
                                name: "ethnic_group",
                                label: "Grupo étnico",
                                appName: "employees",
                                modelName: "ethnic-group",
                                displayField: "name",
                            },
                        },
                        {
                            key: "marital-status",
                            component: SimpleModelDropdown,
                            props: {
                                name: "marital_status",
                                label: "Estado civil",
                                appName: "employees",
                                modelName: "marital-status",
                                displayField: "name",
                            },
                        },
                        {
                            key: "country",
                            component: SimpleModelDropdown,
                            props: {
                                name: "country",
                                label: "País",
                                appName: "common",
                                modelName: "country",
                                displayField: "name",
                            },
                        },
                        {
                            key: "province",
                            component: DynamicModelDropdown,
                            // Use a function to access form state
                            props: {
                                name: "province",
                                label: "Departamento",
                                appName: "common",
                                modelName: "province",
                                displayField: "name",
                                parentField: "country",
                                query: "country",
                                clearFieldsOnChange: ["city"],
                            },
                        },
                        {
                            key: "city",
                            component: DynamicModelDropdown,
                            // Use a function to access form state
                            props: {
                                name: "city",
                                label: "Ciudad",
                                appName: "common",
                                modelName: "city",
                                displayField: "name",
                                parentField: "province",
                                query: "province",
                            },
                        }, ,
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
        }
    ],
    onSubmit: (values) => {
        console.log("Form submitted:", values);
        // send to API…
    },
};

export default function MyFormPage() {
    return <FormBuilder schema={schema} />;
}
