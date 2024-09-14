const Header = ({ courseName } : {courseName: string}) => {

  return (
    <header>
      <h1>{courseName}</h1>
    </header>
  );
};

export default Header;