'use client';

import { DropDown, SelectedDropDown } from './common/dropDown/drop-down';

export default function Wrapper() {
  return (
    <div>
      <DropDown
        onClick={(value) => console.log(value)}
        value="profile"
        openBtn={<div>여기에 프로필 </div>}
      />
      <DropDown onClick={(value) => console.log(value)} value="item" />
      <SelectedDropDown onClick={() => {}} value="recurring" />
      <SelectedDropDown onClick={() => {}} value="recurring" />
    </div>
  );
}
