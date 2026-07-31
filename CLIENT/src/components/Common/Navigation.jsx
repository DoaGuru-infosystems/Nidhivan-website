import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  {
    label: 'Our Projects',
    to: '',
    children: [
      { label: 'Ongoing Projects', to: '/ongoing-projects' },
      { label: 'Completed Projects', to: '/completed-projects' },
      { label: 'Upcoming Projects', to: '/upcoming-projects' },
    ],
  },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact Us', to: '/contact-us' },
];

const Navigation = ({ onLinkClick }) => {
  const [openSubmenu, setOpenSubmenu] = React.useState(null);
  const location = useLocation();

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <ul className="nav navbar-nav">
      {navItems.map((item, index) => (
        <li key={item.label} className={item.children ? 'has-child' : ''}>
          {item.children ? (
            <>
              <a 
                href={item.to || '#'} 
                onClick={(e) => { e.preventDefault(); toggleSubmenu(index); }} 
                className={`cursor-pointer ${item.children.some(child => child.to === location.pathname) ? 'active' : ''}`}
              >
                {item.label}
                <ChevronDown
                  size={14}
                  style={{
                    marginLeft: '4px',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    transition: 'transform 0.3s ease',
                    transform: openSubmenu === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </a>
              <ul
                className="sub-menu"
                style={{
                  display: openSubmenu === index ? 'block' : '',
                }}
              >
                {item.children.map((child) => (
                  <li key={child.label}>
                    <NavLink to={child.to} end onClick={onLinkClick}>{child.label}</NavLink>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <NavLink to={item.to} end onClick={onLinkClick}>{item.label}</NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
