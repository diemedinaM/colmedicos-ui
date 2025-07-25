import React, { useState } from "react";

const tooltipButtonStyle = {
    marginLeft: 8,
    background: "#0074D9",
    color: "#fff",
    borderRadius: "50%",
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 14,
    border: "none",
    outline: "none",
    position: "relative",
};

const tooltipBoxStyle = {
    position: "absolute",
    left: "110%",
    top: "50%",
    transform: "translateY(-50%)",
    background: "#fff",
    color: "#333",
    border: "1px solid #0074D9",
    borderRadius: 4,
    padding: "8px 12px",
    zIndex: 100,
    whiteSpace: "pre-line",
    minWidth: 180,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
};

/**
 * withTooltip - Higher-order component that wraps any widget and displays a blue "?" icon next to it.
 * When hovered, a tooltip with the provided help text appears.
 *
 * @param {React.ComponentType} Component - The widget component to wrap.
 * @returns {React.FC} - A new component that renders the original widget with a tooltip if the `tooltip` prop is provided.
 *
 * @example
 * import withTooltip from './withTooltip';
 *
 * const TooltipTextInput = withTooltip(TextInput);
 *
 * <TooltipTextInput
 *   name="email"
 *   label="Email"
 *   tooltip="Enter your email address."
 * />
 */
export default function withToolTip(Component) {
    return function WithToolTipComponent(props) {
        const { tooltip, ...rest } = props;
        const [show, setShow] = useState(false);

        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <Component {...rest} />
                {tooltip && (
                    <div
                        style={tooltipButtonStyle}
                        onMouseEnter={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                        tabIndex={0}
                        aria-label="Mostrar ayuda"
                    >
                        ?
                        {show && (
                            <div style={tooltipBoxStyle}>
                                {tooltip}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };
}
