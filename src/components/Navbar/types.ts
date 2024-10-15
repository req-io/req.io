import { ReactNode } from 'react';

type NavBarItemConfig = {
  name: string;
  label: string;
  onClick: () => void;
  isActive: boolean;
};

type NavBarItemsConfig = NavBarItemConfig[];

export type NavbarProps = {
  items: NavBarItemsConfig;
};

export type NavbarItemComponentMap = {
  [key: string]: ReactNode;
};
