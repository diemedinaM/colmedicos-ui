import SimpleModelDropdown from "@/components/widgets/SimpleModelDropdown";
import DynamicModelDropdown from "@/components/widgets/DynamicModelDropdown";
import CustomDatePicker from "@/components/widgets/DatePicker";
import TextInput from "@/components/widgets/TextInput";
import SimpleSignatureInput from "@/components/widgets/SimpleSignatureInput";
import ToggleButton from "@/components/widgets/ToggleButton";


const tabPrefix = "pi_";

const personalInformationGroup = {
    key: `${tabPrefix}personal_information`,
    title: "Información personal",
    variant: "stack",
    alignment: "left",
    widgets: [
        {
            key: `${tabPrefix}document_type`,
            component: SimpleModelDropdown,
            props: {
                name: `${tabPrefix}document_type`,
                label: "Tipo de documento",
                appName: "common",
                modelName: "document-type",
                displayField: "name",
            },
        },
        {
            key: `${tabPrefix}document_number`,
            component: TextInput,
            props: {
                name: `${tabPrefix}document_number`,
                label: "Documento",
            },
        },
        {
            key: `${tabPrefix}expiration_date`,
            component: CustomDatePicker,
            props: {
                name: `${tabPrefix}expiration_date`,
                label: "Fecha de nacimiento",
            },
        },
        {
            key: `${tabPrefix}first_name`,
            component: TextInput,
            props: {
                name: `${tabPrefix}first_name`,
                label: "Nombres",
            },
        },
        {
            key: `${tabPrefix}last_name`,
            component: TextInput,
            props: {
                name: `${tabPrefix}last_name`,
                label: "Apellidos",
            },
        },
        {
            key: `${tabPrefix}gender`,
            component: SimpleModelDropdown,
            props: {
                name: `${tabPrefix}gender`,
                label: "Género",
                appName: "employees",
                modelName: "gender",
                displayField: "name",
            },
        },
        {
            key: `${tabPrefix}ethnic_group`,
            component: SimpleModelDropdown,
            props: {
                name: `${tabPrefix}ethnic_group`,
                label: "Grupo étnico",
                appName: "employees",
                modelName: "ethnic-group",
                displayField: "name",
            },
        },
        {
            key: `${tabPrefix}marital_status`,
            component: SimpleModelDropdown,
            props: {
                name: `${tabPrefix}marital_status`,
                label: "Estado civil",
                appName: "employees",
                modelName: "marital-status",
                displayField: "name",
            },
        }
    ],
}

const locationInformationGroup = {
    key: `${tabPrefix}location_information`,
    title: "Ubicación",
    variant: "stack",
    alignment: "right",
    widgets: [
        {
            key: `${tabPrefix}country`,
            component: SimpleModelDropdown,
            props: {
                name: `${tabPrefix}country`,
                label: "País",
                appName: "common",
                modelName: "country",
                displayField: "name",
            },
        },
        {
            key: `${tabPrefix}province`,
            component: DynamicModelDropdown,
            // Use a function to access form state
            props: {
                name: `${tabPrefix}province`,
                label: "Departamento",
                appName: "common",
                modelName: "province",
                displayField: "name",
                parentField: `${tabPrefix}country`,
                query: "country",
                clearFieldsOnChange: [`${tabPrefix}city`],
            },
        },
        {
            key: `${tabPrefix}city`,
            component: DynamicModelDropdown,
            // Use a function to access form state
            props: {
                name: `${tabPrefix}city`,
                label: "Ciudad",
                appName: "common",
                modelName: "city",
                displayField: "name",
                parentField: `${tabPrefix}province`,
                query: "province",
            },
        },
        {
            key: `${tabPrefix}neighborhood`,
            component: TextInput,
            props: {
                name: `${tabPrefix}neighborhood`,
                label: "Barrio",
            },
        },
        {
            key: `${tabPrefix}address`,
            component: TextInput,
            props: {
                name: `${tabPrefix}address`,
                label: "Dirección",
            },
        },
        {
            key: `${tabPrefix}social_class`,
            component: DynamicModelDropdown,
            // Use a function to access form state
            props: {
                name: `${tabPrefix}social_class`,
                label: "Estrato",
                appName: "employees",
                modelName: "social-class",
                displayField: "name",
                parentField: `${tabPrefix}country`,
                query: "country",
            },
        },
    ]
}

const contactInformationGroup = {
    key: `${tabPrefix}contact_information`,
    title: "Contacto",
    variant: "stack",
    alignment: "right",
    widgets: [
        {
            key: `${tabPrefix}personal_email`,
            component: TextInput,
            props: {
                name: `${tabPrefix}personal_email`,
                label: "Correo personal",

            }
        },
        {
            key: `${tabPrefix}username`,
            component: TextInput,
            props: {
                name: `${tabPrefix}username`,
                label: "Usuario",

            }
        }
    ]
}

const emergencyContactGroup = {
    key: `${tabPrefix}emergency_contact`,
    title: "Contacto de emergencia",
    variant: "stack",
    alignment: "left",
    widgets: [
        {
            key: `${tabPrefix}emergency_contacts`,
            variant: "stackedInline",
            min: 1,
            max: 3,
            props: { name: `${tabPrefix}emergency_contacts` },
            label: "Contacto de emergencia",
            subWidgets: [
                {
                    key: `${tabPrefix}emergency_contact_name`,
                    component: TextInput,
                    props: {
                        name: `${tabPrefix}emergency_contact_name`,
                        label: "Nombre",

                    }
                },
                {
                    key: `${tabPrefix}emergency_contact_phone`,
                    component: TextInput,
                    props: {
                        name: `${tabPrefix}emergency_contact_phone`,
                        label: "Teléfono",
                    }
                },
                {
                    key: `${tabPrefix}emergency_contact_email`,
                    component: TextInput,
                    props: {
                        name: `${tabPrefix}emergency_contact_email`,
                        label: "Correo electrónico",
                    }
                },
                {
                    key: `${tabPrefix}emergency_contact_relationship`,
                    component: TextInput,
                    props: {
                        name: `${tabPrefix}emergency_contact_relationship`,
                        label: "Parentesco",
                    }
                }
            ]
        }
    ]
}

const dependentsInformationGroup = {
    key: `${tabPrefix}dependents_information`,
    title: "Dependientes",
    variant: "stack",
    alignment: "left",
    widgets: [
        {
            key: `${tabPrefix}has_dependents`,
            component: ToggleButton,
            props: {
                name: `${tabPrefix}has_dependents`,
                label: "¿Tiene dependientes?",
            },
        },
        {
            key: `${tabPrefix}dependents`,
            variant: "stackedInline",
            min: 0,
            max: 10,
            props: { name: `${tabPrefix}dependents` },
            label: "Dependiente",
            hideOnToggle: { field: `${tabPrefix}has_dependents`, value: true }, // Hide if has_dependents is false
            subWidgets: [
                {
                    key: `${tabPrefix}dependent_document_type`,
                    component: SimpleModelDropdown,
                    props: {
                        name: `${tabPrefix}dependent_document_type`,
                        label: "Tipo de documento",
                        appName: "common",
                        modelName: "document-type",
                        displayField: "name",
                    }
                },
                {
                    key: `${tabPrefix}dependent_document`,
                    component: TextInput,
                    props: {
                        name: `${tabPrefix}dependent_document`,
                        label: "Documento",
                    }
                },
                {
                    key: `${tabPrefix}dependent_name`,
                    component: TextInput,
                    props: {
                        name: `${tabPrefix}dependent_name`,
                        label: "Nombre",
                    }
                },
                {
                    key: `${tabPrefix}dependent_birth_date`,
                    component: CustomDatePicker,
                    props: {
                        name: `${tabPrefix}dependent_birth_date`,
                        label: "Fecha de nacimiento",
                    }
                },
                {
                    key: `${tabPrefix}dependent_relationship`,
                    component: SimpleModelDropdown,
                    props: {
                        name: `${tabPrefix}dependent_relationship`,
                        label: "Parentesco",
                        appName: "common",
                        modelName: "relationship",
                        displayField: "name",
                    }
                },
            ]
        }
    ]
}

const petInformationGroup = {
    key: `${tabPrefix}pet_information`,
    title: "Mascotas",
    variant: "stack",
    alignment: "left",
    widgets: [
        {
            key: `${tabPrefix}has_pets`,
            component: ToggleButton,
            props: {
                name: `${tabPrefix}has_pets`,
                label: "¿Tiene mascotas?",
            },
        },
        {
            key: `${tabPrefix}pets`,
            variant: "stackedInline",
            min: 0,
            max: 100,
            props: { name: `${tabPrefix}pets` },
            label: "Mascota",
            hideOnToggle: { field: `${tabPrefix}has_pets`, value: true }, // Hide if has_pets is false
            subWidgets: [
                {
                    key: `${tabPrefix}pet_type`,
                    component: SimpleModelDropdown,
                    props: {
                        name: `${tabPrefix}pet_type`,
                        label: "Tipo de mascota",
                        appName: "common",
                        modelName: "pet",
                        displayField: "name",
                    }
                }
            ]
        }
    ]
}

const signatureGroup = {
    key: `${tabPrefix}signature`,
    title: "Firma",
    variant: "stack",
    alignment: "right",
    widgets: [
        {
            key: `${tabPrefix}signature`,
            component: SimpleSignatureInput,
            props: {
                name: `${tabPrefix}signature`,
                label: "Firma",
            },
        },
    ]
}


const personalInformationTab = {
    key: `${tabPrefix}personal_information`,
    label: "Información personal",
    groups: [
        personalInformationGroup,
        locationInformationGroup,
        contactInformationGroup,
        signatureGroup,
        emergencyContactGroup,
        dependentsInformationGroup,
        petInformationGroup
    ],
}


export default personalInformationTab;