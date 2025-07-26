/**
 * useMetaToggle - Utility to determine if an element should be hidden or disabled based on meta properties.
 *
 * @param {object} meta - Object with optional hideOnToggle and disableOnToggle.
 * @returns {[boolean, boolean]} [hidden, disabled]
 */
import { useFormContext } from "react-hook-form";

export default function useMetaToggle(meta) {
    const { watch } = useFormContext();
    if (!meta) return [false, false];
    const { hideOnToggle, disableOnToggle } = meta;
    let hidden = false, disabled = false;
    if (hideOnToggle && hideOnToggle.field) {
        const v = watch(hideOnToggle.field);
        const expected = hideOnToggle.value ?? true;
        if (v !== expected) hidden = true;
    }
    if (!hidden && disableOnToggle && disableOnToggle.field) {
        const v = watch(disableOnToggle.field);
        const expected = disableOnToggle.value ?? true;
        if (v !== expected) disabled = true;
    }
    return [hidden, disabled];
}
