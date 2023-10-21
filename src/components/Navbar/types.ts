type NavBarItemConfig = {
  name: string;
  label: string;
  onClick: () => void;
  isActive: boolean;
}

type NavBarItemsConfig = NavBarItemConfig[];

type NavbarProps = {
  items: NavBarItemsConfig;
}