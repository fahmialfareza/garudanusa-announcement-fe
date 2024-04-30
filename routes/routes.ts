import {
  IconCalculator,
  IconLayout2,
  IconSalad,
  IconSmartHome,
  IconTargetArrow,
  Icon,
  IconProps,
} from "@tabler/icons-react";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  FunctionComponent,
  CSSProperties,
} from "react";

export type TablerIconsProps = Partial<
  ForwardRefExoticComponent<
    Omit<IconProps, "ref"> & RefAttributes<FunctionComponent<IconProps>>
  >
> & {
  className?: string;
  size?: string | number;
  stroke?: string | number;
  strokeWidth?: string | number;
  style?: CSSProperties;
};

interface NavLink {
  label: string;
  path: string;
  icon?: React.FC<TablerIconsProps>;
}

const navLinks: NavLink[] = [
  {
    label: "Pengaturan Profil",
    path: "/profile",
    icon: IconSmartHome,
  },
  {
    label: "Data Pendaftar",
    path: "/data-pendaftar",
    icon: IconSalad,
  },
  {
    label: "Upload Data",
    path: "/upload-data",
    icon: IconLayout2,
  },
  {
    label: "Pengelola",
    path: "/pengelola",
    icon: IconCalculator,
  },
  {
    label: "Cek Kelolosan",
    path: "/cek-kelolosan",
    icon: IconTargetArrow,
  },
  {
    label: "Cek Kelolosan",
    path: "/cek-kelolosan",
    icon: IconTargetArrow,
  },
];
