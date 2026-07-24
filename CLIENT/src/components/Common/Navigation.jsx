import React from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends React.Component {

    componentDidMount() {
        function loadScript(src) {

            return new Promise(function (resolve, reject) {
                var script = document.createElement('script');
                script.src = src;
                script.addEventListener('load', function () {
                    resolve();
                });
                script.addEventListener('error', function (e) {
                    reject(e);
                });
                document.body.appendChild(script);
            })
        };

        loadScript('/assets/js/mobilenav.js');

    };

    render() {
        return (
            <>
                <ul className="nav navbar-nav">
                    <li className="active"><NavLink to={ "/" }>Home</NavLink></li>
                    <li><NavLink to={ "/about" }>About Us</NavLink></li>

                    <li>
                        <NavLink to={ "" }>Our Projects</NavLink>
                        <ul className="sub-menu">
                            <li><NavLink to={ "/project-grid-3-columns" }> Ongoing Projects</NavLink></li>
                            <li><NavLink to={ "/project-masonry-3-columns" }>Completed Projects</NavLink></li>
                            <li><NavLink to={ "/project-carousel" }>Upcoming Projects</NavLink></li>
                        </ul>
                    </li>

                    <li><NavLink to={ "/blog-grid" }>Blogs</NavLink></li>
                    <li><NavLink to={ "/gallery" }>Gallery</NavLink></li>
                    <li><NavLink to={ "/contact-us" }>Contact Us</NavLink></li>
                </ul>
            </>
        );
    };
};

export default Navigation;