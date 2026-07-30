import React from 'react';
import { NavLink } from 'react-router-dom';
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

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <ul className="nav navbar-nav">
      {navItems.map((item, index) => (
        <li key={item.label} className={item.children ? 'has-child' : ''}>
          {item.children ? (
            <>
              <NavLink to={item.to || '#'} onClick={(e) => { e.preventDefault(); toggleSubmenu(index); }}>
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
              </NavLink>
              <ul
                className="sub-menu"
                style={{
                  display: openSubmenu === index ? 'block' : '',
                }}
              >
                {item.children.map((child) => (
                  <li key={child.label}>
                    <NavLink to={child.to} onClick={onLinkClick}>{child.label}</NavLink>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <NavLink to={item.to} onClick={onLinkClick}>{item.label}</NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
