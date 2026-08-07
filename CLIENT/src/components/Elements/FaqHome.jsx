import React, { useState, useRef } from 'react';

var bgimg1 = new URL('../../images/background/cross-line2.png', import.meta.url).href;

const faqs = [
    {
        question: "Kya aapki properties legally verified hain?",
        answer: "Bilkul. Hamare har plot aur farmhouse ki registry clean hoti hai. Legal verification, mutation aur nakal sab kuch hum khud handle karte hain, taaki aapko office office chakkar na lagane pade ye check karne ke liye ki paperwork asli hai ya nahi."
    },
    {
        question: "Kya aap home ya agricultural loan mein help karte hain?",
        answer: "Haan, karte hain. Hum kuch leading banks ke saath loan assistance dete hain, aur documentation ke poore process mein team aapke saath baithti hai taaki ye confusing ya lamba na lage."
    },
    {
        question: "Kya purchase se pehle site visit possible hai?",
        answer: "Haan, aur hum recommend bhi karenge ki aap zaroor karein. Hum Pariyat Dam location ke paas guided visits arrange karte hain taaki decide karne se pehle aap khud zameen, aas paas ka area aur road access dekh sakein. Slot fix karne ke liye call ya WhatsApp kar dein."
    },
    {
        question: "Minimum plot size kitna available hai?",
        answer: "Block ke hisaab se plot sizes thode alag hote hain. Ek quick call pe hamari team aapko bigha aur square feet mein exact sizes bata degi, jo abhi actually available hai us hisaab se."
    },
    {
        question: "Kya farmhouse plots Vastu compliant hain?",
        answer: "Haan. Layout plan karte waqt hi orientation, road facing aur natural sunlight ka dhyan rakha gaya hai, isliye plots Vastu principles follow karte hain, ye baad mein add nahi kiya gaya."
    },
    {
        question: "Registry aur possession mein kitna time lagta hai?",
        answer: "Ye thoda depend karta hai ki aapke documents kitni jaldi ready hote hain, lekin ek baar sab kuch order mein aa jaye toh zyada time nahi lagta. Apni booking ke hisaab se exact timeline hamari team se pooch lein, wo aapko clear jawab denge."
    },
    {
        question: "Kya is zameen pe kheti ki ja sakti hai?",
        answer: "Haan, ye agricultural land hai, isliye aap kheti bhi kar sakte hain aur farmhouse bhi bana sakte hain, dono saath mein bhi ho sakta hai. Hamare kaafi buyers weekend home ke saath saath asli kheti bhi karte hain."
    }
];

const FaqItem = ({ faq, index, isOpen, onToggle }) => {
    const contentRef = useRef(null);

    return (
        <div
            className={`rounded-2xl bg-white overflow-hidden transition-all duration-300 border ${
                isOpen ? 'border-[#118A43]/40 shadow-lg shadow-[#118A43]/5' : 'border-slate-200 shadow-sm'
            }`}
        >
            <button
                className="w-full px-6 py-5 text-left flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#118A43] focus-visible:ring-offset-2 rounded-2xl"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                        isOpen ? 'bg-[#118A43] text-white' : 'bg-[#F4B54B]/15 text-[#8a6d1f]'
                    }`}
                >
                    {String(index + 1).padStart(2, '0')}
                </span>

                <span className={`flex-1 font-semibold text-base md:text-lg ${isOpen ? 'text-[#118A43]' : 'text-slate-800'}`}>
                    {faq.question}
                </span>

                <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'bg-[#118A43] border-[#118A43] rotate-45' : 'border-slate-300 text-slate-400'
                    }`}
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1V13M1 7H13" stroke={isOpen ? '#fff' : 'currentColor'} strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                </span>
            </button>

            <div
                ref={contentRef}
                style={{
                    maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px'
                }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
            >
                <p className="px-6 pb-5 pl-[4.25rem] text-slate-600 leading-relaxed text-[15px]">
                    {faq.answer}
                </p>
            </div>
        </div>
    );
};

const FaqHome = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative py-16 md:py-24 bg-gradient-to-b from-white to-[#FAF8F3]">
            <div className="max-w-3xl mx-auto px-4">
                <div className="mb-14 text-center flex flex-col items-center">
                    <div className="sx-separator-outer separator-center mb-4">
                        <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                            <h3 className="sep-line-one">Frequently Asked Questions</h3>
                        </div>
                    </div>
                    <p className="text-slate-500 max-w-md">
                        Straight answers to what buyers usually ask us before visiting the site.
                    </p>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            faq={faq}
                            index={index}
                            isOpen={activeIndex === index}
                            onToggle={() => setActiveIndex(activeIndex === index ? -1 : index)}
                        />
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <p className="text-slate-500 text-sm">
                        Still have a question? {' '}
                        <a href="tel:87703 75800" className="text-[#118A43] font-semibold hover:underline">
                            Call or WhatsApp our team
                        </a>{' '}
                        directly, we're happy to help.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FaqHome;