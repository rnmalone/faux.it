import React, {ChangeEvent} from 'react';
import Icon from "../Icon";
import {IconType} from "../Icon/Icon";

import './Input.scss';

interface IInputProps {
    value: string;
    onChange(event: ChangeEvent<HTMLInputElement>): void;
    placeholder: string
    onUse(): void;
}

export default function Input({ value, onChange, placeholder, onUse }: IInputProps) {

    return (
        <div className="Input">
            <input
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
            <Icon onClick={onUse} type={IconType.Search} />
        </div>
       )
}