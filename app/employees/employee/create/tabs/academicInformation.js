const tabPrefix = "ai_";

import SimpleModelDropdown from "@/components/widgets/SimpleModelDropdown";
import TextInput from "@/components/widgets/TextInput";
import ToggleButton from "@/components/widgets/ToggleButton";
import CustomDatePicker from "@/components/widgets/DatePicker";
import withTooltip from "@/components/widgets/withTooltip";


const escolaridadGroup = {
    key: `${tabPrefix}escolaridad`,
    title: "Escolaridad",
    variant: "stack",
    widgets: [
        {
            key: `${tabPrefix}education_level`,
            component: SimpleModelDropdown,
            props: {
                name: `${tabPrefix}education_level`,
                label: "Nivel de escolaridad",
                appName: "employees",
                modelName: "education-level",
                displayField: "name",
            },
        },
    ],
};

const profesionGroup = {
    key: `${tabPrefix}profesion`,
    title: "Profesión",
    variant: "stack",
    widgets: [
        {
            key: `${tabPrefix}profession`,
            component: TextInput,
            props: {
                name: `${tabPrefix}profession`,
                label: "Profesión",
            },
        },
        {
            key: `${tabPrefix}profession_university`,
            component: SimpleModelDropdown,
            props: {
                name: `${tabPrefix}profession_university`,
                label: "Universidad profesión",
                appName: "employees",
                modelName: "academic-institution",
                displayField: "name",
            },
        },
        {
            key: `${tabPrefix}has_professional_card`,
            component: ToggleButton,
            props: {
                name: `${tabPrefix}has_professional_card`,
                label: "¿Cuenta con tarjeta profesional/resolución?",
            },
        },
        {
            key: `${tabPrefix}professional_card_number`,
            component: TextInput,
            hideOnToggle: { field: `${tabPrefix}has_professional_card`, value: true },
            props: {
                name: `${tabPrefix}professional_card_number`,
                label: "Número tarjeta/resolución",
            },
        },
        {
            key: `${tabPrefix}professional_card_issue_date`,
            component: CustomDatePicker,
            hideOnToggle: { field: `${tabPrefix}has_professional_card`, value: true },
            props: {
                name: `${tabPrefix}professional_card_issue_date`,
                label: "Fecha de expedición",
            },
        },
    ],
};

const especializacionGroup = {
    key: `${tabPrefix}especializacion`,
    title: "Especialización",
    variant: "stack",
    widgets: [
        {
            key: `${tabPrefix}specialization`,
            component: TextInput,
            props: {
                name: `${tabPrefix}specialization`,
                label: "Especialización",
            },
        },
        {
            key: `${tabPrefix}specialization_university`,
            component: SimpleModelDropdown,
            props: {
                name: `${tabPrefix}specialization_university`,
                label: "Universidad especialización",
                appName: "employees",
                modelName: "academic-institution",
                displayField: "name",
            },
        },
        {
            key: `${tabPrefix}has_specialization_resolution`,
            component: withTooltip(ToggleButton),
            props: {
                name: `${tabPrefix}has_specialization_resolution`,
                label: "¿Cuenta con tarjeta SST o resolución de especialización?",
                tooltip: "Aplica para el personal que preste servicios de SST.",
            },
        },
        {
            key: `${tabPrefix}specialization_resolution_number`,
            component: TextInput,
            hideOnToggle: { field: `${tabPrefix}has_specialization_resolution`, value: true },
            props: {
                name: `${tabPrefix}specialization_resolution_number`,
                label: "Número resolución de especialización",
            },
        },
        {
            key: `${tabPrefix}specialization_resolution_issue_date`,
            component: CustomDatePicker,
            hideOnToggle: { field: `${tabPrefix}has_specialization_resolution`, value: true },
            props: {
                name: `${tabPrefix}specialization_resolution_issue_date`,
                label: "Fecha de expedición resolución",
            },
        },
    ],
};

const academicInformationTab = {
    key: `${tabPrefix}academic_information`,
    label: "Información académica",
    groups: [
        escolaridadGroup,
        profesionGroup,
        especializacionGroup,
    ],
};

export default academicInformationTab;