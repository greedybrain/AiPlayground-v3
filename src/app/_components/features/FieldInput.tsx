import React, { InputHTMLAttributes } from "react";

export interface IFieldInput extends InputHTMLAttributes<HTMLInputElement> {}

const FieldInput = ({ ...restInputProps }: IFieldInput) => {
    return <input {...restInputProps} />;
};

export default FieldInput;
