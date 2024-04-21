import {
  SparklesIcon,
  BeakerIcon,
  SquaresPlusIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

export const textInfor: {
  [index: string]: { mainText: string; text: string };
} = {
  cosmetic: {
    mainText: 'Cosmetic',
    text: 'Start finding your suitable cosmetic merchandise',
  },
  book: {
    mainText: 'Books',
    text: 'Here is where you start your smart journey',
  },
  jewelry: {
    mainText: 'Jewelry',
    text: 'This is the place for minimalist people',
  },
  supplement: {
    mainText: 'Supplement',
    text: 'Get healthier now with high-quality supplement',
  },
};

export const categories: Categories[] = [
  'cosmetic',
  'supplement',
  'book',
  'jewelry',
];
export const categoryInfor: {
  id: string;
  text: string;
  revealText: string;
  className: string;
}[] = [
  {
    id: 'cosmetic',
    text: 'Cosmetic',
    revealText: 'Find Cosmetic Products Here',
    className: 'w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl',
  },
  {
    id: 'supplement',
    text: 'Supplement',
    revealText: 'Find Supplements Here',
    className: 'w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl',
  },
  {
    id: 'book',
    text: 'Books',
    revealText: 'Find Books Here',
    className: 'w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl',
  },
  {
    id: 'jewelry',
    text: 'Jewelry',
    revealText: 'Find Jewelry Here',
    className: 'w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl',
  },
];

export const inputBoxInforArr: InputBoxInfor[] = [
  {
    id: '1',
    name: 'username',
  },
  { id: '2', name: 'email' },
  { id: '3', name: 'message' },
];

export const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const dropdownItemInforArr: DropdownItemInfor[] = [
  {
    path: '/category/cosmetic',
    name: 'Cosmetic',
    description: 'Choose your high-quality cosmetic products',
    icon: BeakerIcon,
  },
  {
    path: '/category/book',
    name: 'Book',
    description: 'Find all kinds of lovely book here',
    icon: BookOpenIcon,
  },
  {
    path: '/category/supplement',
    name: 'Supplement',
    description: 'Take care your health with our supplement',
    icon: SquaresPlusIcon,
  },
  {
    path: '/category/jewelry',
    name: 'Jewelry',
    description: 'Lovely jewelry for minimalists',
    icon: SparklesIcon,
  },
];

export const footerInfor: {
  id: string;
  detail: { id: string; name: string; href: string }[];
  heading: string;
}[] = [
  {
    id: '1',
    detail: [
      {
        id: '1',
        name: 'Cosmetic',
        href: '/category/cosmetic',
      },
      {
        id: '2',
        name: 'Supplement',
        href: '/category/supplement',
      },
      {
        id: '3',
        name: 'Jewelry',
        href: '/category/jewelry',
      },
      {
        id: '4',
        name: 'Book',
        href: '/category/book',
      },
    ],
    heading: 'Products',
  },
  {
    id: '2',
    heading: 'Company',
    detail: [
      {
        id: '1',
        name: 'About',
        href: '/beta-page',
      },
      {
        id: '2',
        name: 'Blog',
        href: '/blog',
      },
      {
        id: '3',
        name: 'Partner',
        href: '/beta-page',
      },
    ],
  },
  {
    id: '3',
    heading: 'Support',
    detail: [
      {
        id: '1',
        name: 'Contact',
        href: '/beta-page',
      },
      {
        id: '2',
        name: 'Pricing',
        href: '/beta-page',
      },
      {
        id: '3',
        name: 'Returning',
        href: '/beta-page',
      },
    ],
  },
  {
    id: '4',
    heading: 'Legal',
    detail: [
      {
        id: '1',
        name: 'Privacy',
        href: '/beta-page',
      },
      {
        id: '2',
        name: 'Terms',
        href: '/beta-page',
      },
    ],
  },
];

export const solidBlurDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPccehcPQAHSwLJQnqfnAAAAABJRU5ErkJggg==';

export const emailTemplates: EmailTemplates[] = ['welcome', 'confirm-payment'];

export const templateEnvs: TemplateEnvs = {
  welcome: 'SENGRID_TEMPLATE_ID_WELCOME',
  'confirm-payment': 'SENGRID_TEMPLATE_CONFIRM_PAYMENT',
};

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const linkClassname =
  'transition-all hover:border-b-2 hover:border-gray-900 hover:pb-[2px] hover:pt-[4px] order-2';

export const navigationLinksInfor = [
  {
    id: 1,
    linkName: 'Home',
    className:
      'transition-all hover:border-b-2 hover:border-gray-900 hover:pb-[2px] hover:pt-[4px]',
    href: '/',
  },
  {
    id: 3,
    linkName: 'Products',
    className: linkClassname,
    href: '/product',
  },
  {
    id: 4,
    linkName: 'Blogs',
    className: linkClassname,
    href: '/blog',
  },

  {
    id: 5,
    linkName: 'Orders',
    className: linkClassname,
    href: '/order-history',
  },

  {
    id: 6,
    linkName: 'Cart',
    className: linkClassname,
    href: '/shopping-cart',
  },
];

export const statusDesign: Record<
  OrderStatus,
  { flag: string; background: string }
> = {
  prepare: {
    flag: ' text-purple-300 group-hover:text-purple-500',
    background: 'bg-purple-500/5 hover:bg-purple-500/10',
  },
  onTheWay: {
    flag: 'text-blue-300 group-hover:text-blue-500',
    background: 'bg-blue-500/5 hover:bg-blue-500/10',
  },
  delivered: {
    flag: 'text-green-300 group-hover:text-green-500',
    background: 'bg-green-500/5 hover:bg-green-500/10',
  },
};

export const orderTableColumnsInfor = [
  { name: 'User', className: 'w-[156px]' },
  { name: 'Order Number', className: 'w-[150px]' },
  { name: 'Status' },
  { name: 'Date Placed', className: 'w-[100px]' },
  { name: 'Delivery Date', className: 'w-[100px]' },
];
