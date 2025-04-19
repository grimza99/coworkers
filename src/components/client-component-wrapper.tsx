'use client';

import { DropDown, SelectedDropDown } from './common/dropDown/drop-down';

export default function Wrapper() {
  return (
    <div>
      <DropDown onClick={(value) => console.log(value)} isOpen={true} value="profile" />
      <DropDown onClick={(value) => console.log(value)} isOpen={true} value="item" />
      <SelectedDropDown
        onClick={(value) => console.log(value)}
        selected="테스트"
        value="taskList"
      />
      <SelectedDropDown
        onClick={(value) => console.log(value)}
        selected="테스트"
        value="recurring"
      />
    </div>
  );
}
