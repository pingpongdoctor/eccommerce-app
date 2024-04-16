import {
  SparklesIcon,
  BeakerIcon,
  SquaresPlusIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

export const textInfor: {
  [index: string]: { mainText: string; text: string };
} = {
  comestic: {
    mainText: 'Comestic',
    text: 'Start finding your suitable comestic merchandise',
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
  'comestic',
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
    id: 'comestic',
    text: 'Comestic',
    revealText: 'Find Comestic Products Here',
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
    path: '/category/comestic',
    name: 'Comestic',
    description: 'Choose your high-quality comestic products',
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
        name: 'Comestic',
        href: '/category/comestic',
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
