'use client';

import { JSX, ReactNode } from 'react';
import clsx from 'clsx';
import { useOutSideClickAutoClose } from '@/utils/use-outside-click-auto-close';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type OptionsType = ReactNode[] | string[];

export interface DropDownProps {
  onSelect?: (e: React.MouseEvent<HTMLLIElement>) => void;
  options: OptionsType;
  size: Size;
  dropDownOpenBtn?: JSX.Element;
  footerBtn?: ReactNode;
}

export default function DropDown({
  onSelect,
  dropDownOpenBtn,
  options,
  size,
  footerBtn,
}: DropDownProps) {
  const { ref, isOpen, setIsOpen } = useOutSideClickAutoClose(false);

  const hashedIndex = size.charCodeAt(0) % options.length;

  const handleClickOption = (e: React.MouseEvent<HTMLLIElement>) => {
    setIsOpen(false);
    if (onSelect) {
      onSelect(e);
    }
  };

  return (
    <div className="h-fit w-fit" ref={ref}>
      <div className="cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
        {dropDownOpenBtn}
      </div>

      {isOpen && (
        <ul
          className={clsx(
            'bg-bg200 z-100 rounded-lg',
            size === 'xl' && 'h-fit max-h-120 px-4 py-4'
          )}
        >
          <div className="overflow-scroll">
            {options.map((option, idx) => {
              return (
                <li
                  className={clsx(
                    'hover:bg-bg100 flex items-center justify-center rounded-lg',
                    size === 'xs' && 'text-xs-rg h-10 w-[94px]',
                    size === 'sm' && 'text-md-rg h-10 w-[109px]',
                    size === 'md' && 'text-md-rg h-10 w-30',
                    size === 'lg' && 'text-lg-rg h-[47px] w-[135px]'
                  )}
                  onClick={handleClickOption}
                  key={hashedIndex + idx}
                >
                  {option}
                </li>
              );
            })}
          </div>
          {footerBtn && <div className="mt-4 h-12 w-full">{footerBtn}</div>}
        </ul>
      )}
    </div>
  );
}
