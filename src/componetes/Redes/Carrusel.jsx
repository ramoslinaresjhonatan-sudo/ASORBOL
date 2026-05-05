import React, { useState } from 'react';
import Css from './Carrusel.module.css';

const SocialFloat = () => {
    const [isOpen, setIsOpen] = useState(false);

    const socialLinks = [
        { icon: "logo-whatsapp", color: "#25D366", label: "WhatsApp" },
        { icon: "logo-facebook", color: "#1877F2", label: "Facebook" },
        { 
            icon: "logo-instagram", 
            color: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", 
            label: "Instagram",
            isGradient: true 
        },
        { icon: "logo-twitter", color: "#1DA1F2", label: "Twitter" },
        { icon: "logo-tiktok", color: "#000000", label: "TikTok" },
        { icon: "logo-youtube", color: "#FF0000", label: "YouTube" }
    ];

    return (
        <div className={`${Css.floatWrapper} ${isOpen ? Css.open : ''}`}>
            {/* Botones Secundarios (Desglosados) */}
            <div className={Css.menuItems}>
                {socialLinks.map((link, index) => (
                    <a 
                        key={index} 
                        href="#" 
                        className={`${Css.floatItem} ${link.isGradient ? Css.instaGradient : ''}`}
                        style={{ 
                            '--i': index, 
                            '--color': link.isGradient ? 'white' : link.color,
                            '--bg-color': link.isGradient ? link.color : 'white',
                            transitionDelay: `${index * 0.05}s` 
                        }}
                    >
                        <span className={Css.label}>{link.label}</span>
                        <div className={Css.iconContainer}>
                            <ion-icon name={link.icon}></ion-icon>
                        </div>
                    </a>
                ))}
            </div>

            {/* Botón Principal (Toggle) */}
            <button 
                className={Css.mainBtn} 
                onClick={() => setIsOpen(!isOpen)}
                title="Redes Sociales"
            >
                <div className={Css.iconWrapper}>
                    {isOpen ? (
                        <ion-icon name="close-outline"></ion-icon>
                    ) : (
                        <ion-icon name="share-social-outline"></ion-icon>
                    )}
                </div>
            </button>
        </div>
    );
}

export default SocialFloat;