'use client';
import Image from 'next/image';
import glowyLab from '../../public/assets/glowy-lab.png';
import Link from 'next/link';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { footerInfor } from '../utils/utils';
import { usePathname } from 'next/navigation';

export default function FooterComponent() {
  const pathname = usePathname();

  return (
    <div className={`${pathname.startsWith('/admin') ? 'bg-gray-900' : ''}`}>
      <div
        className={`flex flex-col p-4 text-sm text-gray-600 md:p-8 lg:flex-row lg:items-center lg:gap-14 lg:p-12 xl:mx-auto xl:max-w-7xl ${
          pathname.startsWith('/admin') ? 'text-white' : ''
        }`}
      >
        <div className="mb-8 md:mb-10 lg:max-w-[400px]">
          <Link href="/" className="inline-block w-32">
            {pathname.startsWith('/admin') ? (
              <p className="mb-4 w-32 font-dancingScript text-4xl font-bold">
                Glowy
              </p>
            ) : (
              <Image
                src={glowyLab}
                alt="logo"
                className="relative -left-[1.7rem] h-32 w-auto md:mb-4"
                placeholder="blur"
              />
            )}
          </Link>
          <p className="mb-4 md:mb-8">
            Making the world a better place through constructing elegant
            hierarchies.
          </p>
          <div className=" relative -left-1 flex gap-8 *:h-5 *:w-auto hover:*:text-indigo-600 md:gap-8 md:*:h-7">
            <IconBrandFacebook />
            <IconBrandInstagram />
            <IconBrandYoutube />
          </div>
        </div>

        <ul className="flex list-none flex-wrap justify-between gap-4 gap-y-10 md:flex-row md:gap-8 lg:grow lg:gap-10 xl:flex-nowrap">
          {footerInfor.map((infor) => (
            <li
              key={infor.id}
              className="w-[45%] *:mb-4 first:*:mb-6 last:*:mb-0 md:w-auto md:flex-1"
            >
              <p className="font-semibold text-gray-900">{infor.heading}</p>
              {infor.detail.map((ele) => (
                <Link className="block" href={ele.href} key={ele.id}>
                  {ele.name}
                </Link>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
