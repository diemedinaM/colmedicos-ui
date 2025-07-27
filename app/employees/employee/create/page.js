"use client";

import { FormBuilder } from "@/components/forms";
import personalInformationTab from "./tabs/personalInformation";
import academicInformationTab from "./tabs/academicInformation";
import socialSecurityTab from "./tabs/socialSecurity";
import finantialInformationTab from "./tabs/finantialInformation";
import endowementTab from "./tabs/endowement";
import workInformationTab from "./tabs/workInformation";
import bonusesTab from "./tabs/bonuses";
import documentationTab from "./tabs/documentation";
import permissionsTab from "./tabs/permissions";
import hiringNoveltyTab from "./tabs/hiringNovelty";


const schema = {
    initialValues: {},
    tabs: [
        personalInformationTab,
        academicInformationTab,
        socialSecurityTab,
        finantialInformationTab,
        endowementTab,
        workInformationTab,
        bonusesTab,
        documentationTab,
        permissionsTab,
        hiringNoveltyTab,
    ],
    onSubmit: (values) => {
        console.log("Form submitted:", values);
        // send to API…
    },
};

export default function MyFormPage() {
    return <FormBuilder schema={schema} />;
}
