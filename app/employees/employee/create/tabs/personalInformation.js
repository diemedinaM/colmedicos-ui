import SimpleModelDropdown from "@/components/widgets/SimpleModelDropdown";
import DynamicModelDropdown from "@/components/widgets/DynamicModelDropdown";
import CustomDatePicker from "@/components/widgets/DatePicker";
import TextInput from "@/components/widgets/TextInput";
import SimpleSignatureInput from "@/components/widgets/SimpleSignatureInput";
import ToggleButton from "@/components/widgets/ToggleButton";


const personalInformationGroup = {
    key: "personal_information",
    title: "Información personal",
    variant: "stack",
    alignment: "left",
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
            key: "document_number",
            component: TextInput,
            props: {
                name: "document_number",
                label: "Documento",
            },
        },
        {
            key: "expiration_date",
            component: CustomDatePicker,
            props: {
                name: "expiration_date",
                label: "Fecha de nacimiento",
            },
        },
        {
            key: "first_name",
            component: TextInput,
            props: {
                name: "first_name",
                label: "Nombres",
            },
        },
        {
            key: "last_name",
            component: TextInput,
            props: {
                name: "last_name",
                label: "Apellidos",
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
        }
    ],
}

const locationInformationGroup = {
    key: "location_information",
    title: "Ubicación",
    variant: "stack",
    alignment: "right",
    widgets: [
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
        },
        {
            key: "neighborhood",
            component: TextInput,
            props: {
                name: "neighborhood",
                label: "Barrio",
            },
        },
        {
            key: "address",
            component: TextInput,
            props: {
                name: "address",
                label: "Dirección",
            },
        },
        {
            key: "social_class",
            component: DynamicModelDropdown,
            // Use a function to access form state
            props: {
                name: "social_class",
                label: "Estrato",
                appName: "employees",
                modelName: "social-class",
                displayField: "name",
                parentField: "country",
                query: "country",
            },
        },
    ]
}

const contactInformationGroup = {
    key: "contact_information",
    title: "Contacto",
    variant: "stack",
    alignment: "right",
    widgets: [
        {
            key: "personal_email",
            component: TextInput,
            props: {
                name: "personal_email",
                label: "Correo personal",

            }
        },
        {
            key: "username",
            component: TextInput,
            props: {
                name: "username",
                label: "Usuario",

            }
        }
    ]
}

const emergencyContactGroup = {
    key: "emergency_contact",
    title: "Contacto de emergencia",
    variant: "stack",
    alignment: "right",
    widgets: [
        {
            key: "emergency_contact_name",
            component: TextInput,
            props: {
                name: "name",
                label: "Nombre",

            }
        },
    ]
}


const dependentsInformationGroup = {
    key: "dependents_information",
    title: "Dependientes",
    variant: "stack",
    alignment: "right",
    widgets: [

    ]
}

const petInformationGroup = {
    key: "pet_information",
    title: "Mascotas",
    variant: "stack",
    alignment: "right",
    widgets: [
        {
            key: "has_pets",
            component: ToggleButton,
            props: {
                name: "has_pets",
                label: "¿Tiene mascotas?",
            },
        }
    ]
}
const signatureGroup = {
    key: "signature",
    title: "Firma",
    variant: "stack",
    alignment: "left",
    widgets: [
        {
            key: "signature",
            component: SimpleSignatureInput,
            props: {
                name: "signature",
                label: "Firma",
            },
        },
    ]
}


const personalInformationTab = {
    key: "personal_information",
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