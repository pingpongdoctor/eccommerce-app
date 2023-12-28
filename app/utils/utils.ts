export const categoryParams = ["comestic", "supplement"];
export const categoryInfor: {
  id: string;
  text: string;
  revealText: string;
  className: string;
}[] = [
  {
    id: "comestic",
    text: "Comestic Collection",
    revealText: "Discover Comestic Products",
    className: "w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl",
  },
  {
    id: "supplement",
    text: "Supplement Products",
    revealText: "Find Your Wanted Supplements",
    className: "w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl",
  },
  {
    id: "food",
    text: "Canadian Food",
    revealText: "Enjoy Canadian Food",
    className: "w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl",
  },
  {
    id: "other",
    text: "Other Merchandises",
    revealText: "What ever you find can be here",
    className: "w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl",
  },
];

export const inputBoxInforArr: InputBoxInfor[] = [
  {
    id: "1",
    name: "username",
  },
  { id: "2", name: "email" },
  { id: "3", name: "message" },
];

export const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
