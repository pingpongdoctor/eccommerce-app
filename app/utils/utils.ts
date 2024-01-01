import {
  ArrowPathIcon,
  ChartPieIcon,
  SparklesIcon,
  BeakerIcon,
  SquaresPlusIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

export const categories = ['comestic', 'supplement', 'food', 'other'];
export const categoryInfor: {
  id: string;
  text: string;
  revealText: string;
  className: string;
}[] = [
  {
    id: 'comestic',
    text: 'Comestic Collection',
    revealText: 'Discover Comestic Products',
    className: 'w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl',
  },
  {
    id: 'supplement',
    text: 'Supplement Products',
    revealText: 'Find Your Wanted Supplements',
    className: 'w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl',
  },
  {
    id: 'book',
    text: 'Books',
    revealText: 'Enjoy Canadian Food',
    className: 'w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl',
  },
  {
    id: 'jewelry',
    text: 'Jewelry',
    revealText: 'What ever you find can be here',
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
    name: 'All Categories',
    description: 'Take a look at what we can serve you',
    icon: ChartPieIcon,
  },
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
