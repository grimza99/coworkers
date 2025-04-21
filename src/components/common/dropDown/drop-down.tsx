'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import dropDownIcon from '@/../public/icons/dropdown-icon.svg';
import clsx from 'clsx';
import Image from 'next/image';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface OptionsType {
  optionsItem: ReactNode[] | string[];
  id: number;
}

interface DropDownProps {
  onSelect?: (e: React.MouseEvent<HTMLLIElement>) => void;
  options: OptionsType;
  openBtn?: ReactNode;
  size: Size;
}

export function DropDown({ onSelect, openBtn, options, size }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  const handleClickOption = (e: React.MouseEvent<HTMLLIElement>) => {
    setIsOpen(false);
    if (onSelect) {
      onSelect(e);
    }
  };
  return (
    <div className="h-fit w-fit" ref={ref}>
      <div className="cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
        {openBtn}
      </div>

      {isOpen && (
        <ul className={clsx('bg-bg200 z-100 rounded-lg', size === 'xl' && 'px-4 py-4')}>
          {options.optionsItem?.map((option, idx) => {
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
                key={options.id + idx}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

interface SelectedDropDownProps extends DropDownProps {
  selected?: string;
}

export function SelectedDropDown({ onSelect, options, selected, size }: SelectedDropDownProps) {
  const [currentSelected, setCurrentSelected] = useState(selected ?? options.optionsItem[0]);

  const handleClickOption = (e: React.MouseEvent<HTMLLIElement>) => {
    setCurrentSelected(e.currentTarget.textContent!);
    onSelect?.(e);
  };

  const openButton = (
    <div
      className={clsx(
        'bg-bg200 flex items-center justify-center rounded-xl',
        size === 'xs' && 'text-xs-rg h-10 w-[94px] px-2 py-2',
        size === 'sm' && 'text-md-rg bg-bg400 h-11 w-[109px] px-3 py-[10px]',
        size === 'md' && 'text-md-rg h-11 w-30 px-[14px] py-[10px]',
        size === 'xl' && 'text-lg-rg h-fit w-[97px]'
      )}
    >
      <div className="flex w-full justify-between">
        <p className="w-full truncate overflow-hidden whitespace-nowrap">{currentSelected}</p>
        <Image src={dropDownIcon} width={16} height={7} alt="\/" />
      </div>
    </div>
  );

  return (
    <>
      <DropDown
        openBtn={openButton}
        onSelect={(e) => handleClickOption(e)}
        options={options}
        size={size}
      />
    </>
  );
}
