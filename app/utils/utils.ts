import {
  ArrowPathIcon,
  ChartPieIcon,
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

export const footerInfor: {
  id: string;
  detail: { id: string; name: string }[];
  heading: string;
}[] = [
  {
    id: '1305fb2e1c1052bfb5fd5ae6a6a283f28825f05a05b1b659e414de1e7f27d83aaccd600cb6e49e1a223467a0e95c88cc60533727e4a4c8d2ae77519d08d1dd58',
    detail: [
      {
        id: '95f6e5874940c5d25dadc16a65acc5b091ac63576cdd8bc269e2c5ddd3db6063715b24067f5d4f0fb032566564cef9c86e4988dde68fb27b7745ee7089bbfffc',
        name: 'Comestic',
      },
      {
        id: '2b2fb4f381afe28a6f42d9277973d17d7dc490e7d30be6824be209c70d4c55bf8ab1c741ca67d800673e9d6d80d960af089b464d346192d69a12c9b2acd1183a',
        name: 'Supplement',
      },
      {
        id: '21c1171a40800bdc11a5113dc86a98c5aab17aea140e9bd80a77034c06aba8ea1f8d6a13c11ded3380f9d39b67bd8fc162cd5825679792ed5042ebf2f1673d9f',
        name: 'Jewelry',
      },
      {
        id: 'a1f8b8ea35e8a876208cfa8911a4b5a81b547e4711c68488b83956fe9be2ff34ce11ad2f69d21d150153f23af6918292678a36a7e3f0aaa1eb1fe4a1300fba85',
        name: 'Book',
      },
    ],
    heading: 'Products',
  },
  {
    id: 'c1368b04c82228df0f71a89e1fe8639356617b9121e03a6119744d051c07b0fd5a98752fb178c9611ad81cdcaf915eeb7d7489b1542755c972dc34cf27a57ed6',
    heading: 'Company',
    detail: [
      {
        id: 'f1941fef01abdff5cd46d101637cf8fe825b55f49b44b97b02c5148a892f80ad19807e2e2173c36052fa6d0d192965ca2c8e71df896c1ab6634e418ea31b4e6c',
        name: 'About',
      },
      {
        id: '953e16305c2df10ed6abb8cc70a9c25673f216e5fcd3570b8945b6a50cb6fc4799ea573ece53a8ef3ec96051d551e380a18d955c5591dabfb043bae737ca21c9',
        name: 'Blog',
      },
      {
        id: '543af1d1e8d872b4905f74cdacc9b2c3793f842d9ce796a9c9c2f7d080591be1202a39f94af2bebcf32333267b104512c9a530eb780053e1bfae9f0a03bfb0c8',
        name: 'Partner',
      },
    ],
  },
  {
    id: 'aa378e87c23d53ba560db1c4f91876537beffe057a997ae6c61cfc88dd2e517d375962bdd8ba98482b9906bd8aa5560e4d1cfd242bc871eb63057dd85c31b168',
    heading: 'Support',
    detail: [
      {
        id: 'c5f82ede8a38c90f7a64f7c32e38d1e5d25d2dcc58e629677db6e8658dc06e24fbede29db828a8be870716cd4087f44d03ae377ace740d6f42e752666b4a0c28',
        name: 'Contact',
      },
      {
        id: 'b2b9cb2bebd7bf2c653f0901a07b828e6c3c6d54a9705700b778041cde128343ea6fc13f884e1e855215bd3ddabbdd6ce7601d49c3dfd7e62fe388ac43a5c9f7',
        name: 'Pricing',
      },
      {
        id: '3a5daf99343a187b11eec932781de411c5dc844e40eeeba8b6b90e2d06c167921e701647492a20c32af5125dab0a1e2a223683fc4d16fd491165f45a0bca463d',
        name: 'Returning',
      },
    ],
  },
  {
    id: '94de97de4c4ef2d3a68559e943d6a0ddb3d5a247ab2beddb5a393c8a03adad786967435bdaaf22ce1ea6bb82530d0c9984a409a59e4b62cc1018dca0d3a3a57f',
    heading: 'Legal',
    detail: [
      {
        id: 'e0326c615800db49a103dd5c5605352b406a5d03db1408428dc09d9e00c5328883c1511418b9652e602c9b0df893fcf65ed7647fb5ff216472067556c431f585',
        name: 'Privacy',
      },
      {
        id: '399b671bd5dab9bb26ddd692bf394d63d028551c344dd00b1d4a03765dbea9c7329e88da941c424ab7d3ba8b46375fa4969b7210c0328eec4f83d461a318373c',
        name: 'Terms',
      },
    ],
  },
];
