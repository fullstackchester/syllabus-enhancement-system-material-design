import { Icon, IconProps } from '@tabler/icons-react';
import React from 'react';

export interface NavbarItems {
    link: string,
    label: string,
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
} 