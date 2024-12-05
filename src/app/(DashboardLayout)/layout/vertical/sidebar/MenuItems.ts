import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconGitMerge,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconAppWindow,
  IconRibbonHealth,
} from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconAperture,
    href: "/",
    chipColor: "secondary",
  },
  {
    id: uniqueId(),
    title: "Employees",
    icon: IconUserCircle,
    href: "/employees",
  },
  {
    id: uniqueId(),
    title: "Cows",
    icon: IconBox,
    href: "/cows",
  },
  {
    id: uniqueId(),
    title: "Milk Production",
    icon: IconBasket,
    href: "/milk-production",
  },
  {
    id: uniqueId(),
    title: "Health",
    icon: IconRibbonHealth,
    href: "/health",
  },
  {
    id: uniqueId(),
    title: "Breeding",
    icon: IconGitMerge,
    href: "/breeding",
  },
  {
    id: uniqueId(),
    title: "Milk Sales",
    icon: IconCurrencyDollar,
    href: "/milk-sales",
  },
  {
    id: uniqueId(),
    title: "Finance",
    icon: IconChartLine,
    href: "/finance",
  },
  
];

export default Menuitems;
