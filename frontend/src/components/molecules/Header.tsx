type Props = {
  user: string;
  img: string;
  handleClick: () => void;
};

const Header = ({ user, handleClick, img }: Props) => {
  return (
    <header
      className="relative top-0 z-20 w-full px-2 py-5 shadow-xl bg-base-300"
    >
      <div className="w-full max-w-[1444px] m-auto flex justify-between items-center">
        <div className="flex gap-2 justify-center items-center">
          <div className="size-14">
            <img src={img} alt="" className="w-full h-full" />
          </div>
          <div>
            <h2>Selamat Datang,</h2>
            <p className="font-semibold">{user}</p>
          </div>
        </div>
        <button className="btn btn-outline" onClick={handleClick}>
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
