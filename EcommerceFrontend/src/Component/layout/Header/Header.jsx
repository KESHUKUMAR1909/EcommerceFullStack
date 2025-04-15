import { ReactNavbar } from "overlay-navbar";
import { FaUser, FaSearch, FaShoppingCart } from "react-icons/fa";
import logo from "../../../assets/logo.png"; // Make sure the path is correct

const options = {
  // Logo & Burger
  burgerColor: "#eb4034",
  logo: logo,
  logoWidth: "20vmax",
  logoHoverColor: "#eb4034",
  logoHoverSize: "10px",

  // Navbar background
  navColor1: "white", // This ensures visibility

  // Navigation Links
  link1Text: "Home",
  link2Text: "Product",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.5vmax",
  link1Color: "rgba(35, 35, 35, 0.8)",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",

  // Layout adjustments
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",

  // Profile Icon
  profileIcon: true,
  ProfileIconElement: FaUser,
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35, 0.8)",
  profileIconColorHover: "#eb4034",

  // Search Icon
  searchIcon: true,
  SearchIconElement: FaSearch,
  searchIconColor: "rgba(35, 35, 35, 0.8)",
  searchIconColorHover: "#eb4034",
  searchIconUrl:'/search',

  // Cart Icon
  cartIcon: true,
  CartIconElement: FaShoppingCart,
  cartIconUrl: "/cart",
  cartIconColor: "rgba(35, 35, 35, 0.8)",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
