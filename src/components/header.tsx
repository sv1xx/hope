import { ModeToggle } from './modeToggle';

const Header = () => {
  return (
    <header>
      <div className="mx-auto w-full max-w-7xl px-2.5">
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
