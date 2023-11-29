import React, { HTMLAttributes } from "react";

import Wrapper from "../ui/Wrapper";

export interface IFormField extends HTMLAttributes<HTMLDivElement> {}

const FormField = ({ children, ...restDivProps }: IFormField) => {
    return <Wrapper {...restDivProps}>{children}</Wrapper>;
};

export default FormField;
