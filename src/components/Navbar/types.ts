type NavBarItemConfig = {
  name: string;
  label: string;
  action: () => void;
  active: boolean;
}

type NavBarItemsConfig = NavBarItemConfig[];

type NavbarProps = {
  items: NavBarItemsConfig;
}