import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.theme === 'dark' || 
      (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.theme = newDarkMode ? 'dark' : 'light';
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-dark-card shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <>
          <SunIcon className="h-5 w-5 text-yellow-500 group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-sm font-medium">Light Mode</span>
        </>
      ) : (
        <>
          <MoonIcon className="h-5 w-5 text-primary-600 group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-sm font-medium">Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle; 