import React from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface IconProps {
    name: any;
    size: number;
    color: string;
}

const Icon = ({ name, size, color }: IconProps) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};

export default Icon;