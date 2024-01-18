import {
  SparklesIcon,
  BeakerIcon,
  SquaresPlusIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

export const categories = ['comestic', 'supplement', 'book', 'jewelry'];
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
    name: 'Comestic',
    description: 'Choose your high-quality comestic products',
    icon: BeakerIcon,
  },
  {
    name: 'Book',
    description: 'Find all kinds of lovely book here',
    icon: BookOpenIcon,
  },
  {
    name: 'Supplement',
    description: 'Take care your health with our supplement',
    icon: SquaresPlusIcon,
  },
  {
    name: 'Jewelry',
    description: 'Lovely jewelry for minimalists',
    icon: SparklesIcon,
  },
];

export const footerInfor: {
  id: string;
  detail: { id: string; name: string }[];
  heading: string;
}[] = [
  {
    id: '1',
    detail: [
      {
        id: '1',
        name: 'Comestic',
      },
      {
        id: '2',
        name: 'Supplement',
      },
      {
        id: '3',
        name: 'Jewelry',
      },
      {
        id: '4',
        name: 'Book',
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
      },
      {
        id: '2',
        name: 'Blog',
      },
      {
        id: '3',
        name: 'Partner',
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
      },
      {
        id: '2',
        name: 'Pricing',
      },
      {
        id: '3',
        name: 'Returning',
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
      },
      {
        id: '2',
        name: 'Terms',
      },
    ],
  },
];

export const solidBlureDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPsaO2oBwAFSAIW6flkfAAAAABJRU5ErkJggg==';
