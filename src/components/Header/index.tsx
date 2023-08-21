import { Component } from "solid-js";

export interface HeaderProps {}

const Header: Component<HeaderProps> = () => {
  return (
    <div class="px-4 py-2 flex justify-between items-center bg-neutral-100 border-b">
      <img
        src="https://raw.githubusercontent.com/nejcm/assets/master/assets/nm-logo.svg"
        width="45"
        height="45"
        alt="NM"
      />
    </div>
  );
};
export default Header;
