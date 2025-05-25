import React from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IconProps {
    name: any;
    size: number;
    color: string;
}

const Icon = ({ name, size, color }: IconProps) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

export default Icon;