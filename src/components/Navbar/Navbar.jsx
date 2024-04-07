import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
      navbar.classList.add('fixed');
    } else {
      navbar.classList.remove('fixed');
    }
  });

  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount } = useContext(StoreContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = () => {
    // Aqui você faria uma chamada à sua API para verificar as credenciais do usuário
    // Se as credenciais forem válidas, você define isAuthenticated como true
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Aqui você faria uma chamada à sua API para encerrar a sessão do usuário
    // Após isso, você define isAuthenticated como false
    setIsAuthenticated(false);
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Cardápio</a>
        <a href='#app-download' onClick={() => setMenu("Contact us")} className={menu === "Contact us" ? "active" : ""}>Contatos</a>
        <a href='#footer' onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>Aplicativo</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {/* Renderiza o botão Entrar somente se o usuário não estiver autenticado */}
        {!isAuthenticated && <button onClick={handleAuthentication}>Entrar</button>}
        {/* Renderiza o botão Sair somente se o usuário estiver autenticado */}
        {isAuthenticated && <button onClick={handleLogout}>Sair</button>}
        {/* Adicione o ícone desejado aqui, que aparecerá quando o usuário estiver autenticado */}
        {isAuthenticated && <img src={assets.user_icon} alt="User Icon" />}
      </div>
    </div>
  )
}

export default Navbar;
