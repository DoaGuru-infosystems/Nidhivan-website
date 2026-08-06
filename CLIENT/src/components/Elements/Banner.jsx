import React from 'react';

class Banner extends React.Component {
    render() {
        return (
            <div 
                className="relative flex items-center justify-center h-[75vh] min-h-[450px] md:min-h-[500px] w-full bg-cover bg-center bg-no-repeat overflow-hidden" 
                style={{ backgroundImage: `url(${this.props.bgimage})` }}
            >
                {/* Premium Gradient Overlay */}
<div className="absolute inset-0 bg-gradient-to-b from-brand-ink/45 via-brand-ink/45 to-brand-ink/0 z-0" />

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center mt-10">
                    
                    {/* Decorative Gold Accent */}
                    <div className="w-16 md:w-24 h-1 bg-brand-gold mx-auto mb-6 rounded-full shadow-[0_0_10px_rgba(249,186,81,0.5)]" />

                    <h2 className="text-amber-100 text-5xl md:text-6xl lg:text-7xl font-bold mb-6 heading-font drop-shadow-xl tracking-tight">
                        {this.props.title}
                    </h2>
                    
                    {this.props.description && (
                        <p className="text-gray-50 max-w-[750px] mx-auto text-lg md:text-xl  font-bold  leading-relaxed drop-shadow-md">
                            {this.props.description}
                        </p>
                    )}
                </div>
            </div>
        );
    }
}

export default Banner;
