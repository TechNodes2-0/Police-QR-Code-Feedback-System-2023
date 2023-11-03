import React from 'react';
import useColorMode from '../hooks/useColorMode';
import { FiSun, FiMoon } from 'react-icons/fi'; // Import the icons

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <li>
      <label
        className={`relative m-0 block h-7.5 w-14 rounded-full ${
          colorMode === 'dark' ? 'bg-primary' : 'bg-stroke'
        }`}
      >
        <input
          type="checkbox"
          onChange={() => {
            if (typeof setColorMode === 'function') {
              setColorMode(colorMode === 'light' ? 'dark' : 'light');
            }
          }}
          className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
            colorMode === 'dark' && '!right-[3px] !translate-x-full'
          }`}
        >
          <span className="dark:hidden">
            <FiSun
              size="16"
              className={`fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary`}
            />
          </span>
          <span className="hidden dark:inline-block">
            <FiMoon
              size="16"
              className={`fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary`}
            />
          </span>
        </span>
      </label>
    </li>
  );
};

export default DarkModeSwitcher;
