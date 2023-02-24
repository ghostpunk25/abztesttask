import logo from 'img/header/Logo.svg';

export const Header = () => {
   return (
      <header className="header" >
         <div className="header__container">
            <div className="header__logo">
               <a href='##' className="header__picture">
                  <img src={logo} alt="logo" className="header" />
               </a>
            </div>
            <div className="header__control">
               <a href="##" className="header__button btn">Users</a>
               <a href="##" className="header__button btn">Sign Up</a>
            </div>
         </div>
      </header >
   );
};