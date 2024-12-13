import { extendVariants, Tabs as TabsNextUI } from '@nextui-org/react';

export const TabsCustom = extendVariants(TabsNextUI, {
  variants: {
    color: {
      default: {
        tabContent: 'group-data-[selected=true]:text-white text-navyBlue',
        tabList: 'bg-lightGraySolid',
        tab: 'bg-white',
        cursor: 'bg-navyBlue',
      },
    },
    size: {
      default: {
        tab: 'justify-start',
        panel: 'pl-[61px]',
        cursor: 'w-full',
      },
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'default',
  },
});
