import React from 'react';
import { NavLink } from 'react-router-dom';

class Banner extends React.Component {
    render() {
        return (
            <div 
                className="relative flex items-center justify-center h-[500px] w-full bg-cover bg-center bg-no-repeat" 
                style={{ backgroundImage: `url(${this.props.bgimage})` }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 z-0" />
                
                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
                    <div className="mb-5">
                        <h2 className="text-white text-5xl font-extrabold mb-5 m-0">
                            {this.props.title}
                        </h2>
                        {this.props.description && (
                            <p className="text-white max-w-[555px]">
                                {this.props.description}
                            </p>
                        )}
                    </div>
                    
                    {/* Breadcrumbs */}
                    <div>
                        <ul className="flex flex-wrap items-center gap-2 text-white/80 font-medium text-sm">
                            <li>
                                <NavLink to={"/"} className="hover:text-white transition-colors">Home</NavLink>
                            </li>
                            <li>/</li>
                            <li className="text-white">{this.props.pagename}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;
