import React from 'react';
import { NavLink } from 'react-router-dom';

class Banner extends React.Component {
    render() {
        return (
            <div 
                className="relative flex items-center justify-center h-[50vh] min-h-[400px] w-full bg-cover bg-center bg-no-repeat" 
                style={{ backgroundImage: `url(${this.props.bgimage})` }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-brand-ink/60 z-0" />
                
                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">
                    <div className="mb-6">
                        <h2 className="text-white text-5xl md:text-6xl font-bold mb-4 heading-font drop-shadow-md">
                            {this.props.title}
                        </h2>
                        {this.props.description && (
                            <p className="text-gray-200 max-w-[600px] mx-auto text-lg font-light leading-relaxed">
                                {this.props.description}
                            </p>
                        )}
                    </div>
                    
                    {/* Breadcrumbs */}
                    <div className="bg-brand-ink/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 shadow-lg">
                        <ul className="flex flex-wrap items-center justify-center gap-3 text-gray-300 font-bold tracking-widest uppercase text-xs">
                            <li>
                                <NavLink to={"/"} className="hover:text-brand-gold transition-colors">Home</NavLink>
                            </li>
                            <li className="text-brand-gold/50">/</li>
                            <li className="text-brand-gold">{this.props.pagename}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;
