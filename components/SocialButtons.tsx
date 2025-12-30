'use client';

import { motion } from 'framer-motion';
import { socialLinksConfig } from '@/config/socialLinks';

export const SocialButtons = () => {
  const socialLinks = [
    {
      name: 'Telegram',
      shortName: 'TG',
      url: socialLinksConfig.telegram.url,
      messageUrl: socialLinksConfig.telegram.messageUrl,
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      color: '#0088cc',
      hoverColor: '#00A0E6',
    },
    {
      name: 'YouTube',
      shortName: 'YT',
      url: socialLinksConfig.youtube.url,
      messageUrl: null, // YouTube не поддерживает прямую отправку сообщений
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: '#FF0000',
      hoverColor: '#FF3333',
    },
    {
      name: 'ВКонтакте',
      shortName: 'VK',
      url: socialLinksConfig.vkontakte.url,
      messageUrl: socialLinksConfig.vkontakte.messageUrl,
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.785 16.241s.336-.041.508-.25c.097-.133.097-.384.097-.384s-.014-2.076.897-2.383c.914-.31 2.09 1.95 3.333 2.812.931.656 1.636.512 1.636.512l3.333-.048s1.745-.112.917-1.482c-.069-.11-.491-1.03-2.518-2.914-2.13-2.001-1.844-.417.719-2.776 1.545-1.448 2.162-2.328 1.969-2.705-.184-.354-1.317-.26-1.317-.26l-3.81.023s-.282-.018-.491.084c-.21.1-.345.333-.345.333s-.621 1.653-1.448 3.058c-1.748 2.976-2.448 3.134-2.735 2.95-.672-.438-.504-1.757-.504-2.695 0-2.93.448-4.142-.876-4.454-.438-.103-.761-.172-1.883-.182-1.44-.014-2.655.01-3.345.276-.447.172-.776.556-.57.58.258.03.838.194 1.145.71.41.67.395 2.174.395 2.174s.233 3.442-.544 3.865c-.533.29-1.262-.302-2.83-3.016-.8-1.38-1.407-2.9-1.407-2.9s-.117-.29-.328-.448c-.253-.2-.607-.26-.607-.26l-3.628.023s-.544.016-.744.25c-.172.2-.014.614-.014.614s2.762 6.476 5.89 9.74c2.87 2.99 6.134 2.79 6.134 2.79h1.517s.448-.026.673-.2c.172-.138.248-.333.248-.333s.018-1.31.69-1.505c.71-.207 1.62 1.4 2.586 2.02.71.46 1.241.36 1.241.36l2.897-.048s1.517-.095.8-1.242c-.056-.09-.4-.69-2.07-1.966-1.724-1.31-1.448-.552.569-.931 1.207-.228 2.69.95 3.38 1.43.69.48 1.207.36 1.207.36l3.38-.048s1.793-.112.931-1.5z"/>
        </svg>
      ),
      color: '#0077FF',
      hoverColor: '#3399FF',
    },
  ];

  return (
    <div className="flex flex-row items-center justify-center gap-3 md:gap-4 my-6 relative z-10 max-w-2xl mx-auto px-4">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
          title={social.name}
        >
          <div
            className="flex items-center justify-center gap-3 px-8 py-3 md:px-12 md:py-4 rounded-full transition-all duration-300 shadow-lg brushed-metal"
            style={{
              backgroundColor: social.color,
              boxShadow: `0 0 15px ${social.color}40, 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)`,
              border: `2px solid ${social.color}80`,
            }}
          >
            {/* Иконка */}
            <div className="flex-shrink-0 text-white">
              {social.icon}
            </div>
            
            {/* Полное название - видно на всех устройствах */}
            <span className="text-white font-bold text-sm md:text-base whitespace-nowrap">
              {social.name}
            </span>
          </div>
          
          {/* Эффект свечения при hover */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              backgroundColor: social.hoverColor,
              boxShadow: `0 0 20px ${social.hoverColor}, 0 0 40px ${social.hoverColor}60`,
            }}
          />
        </motion.a>
      ))}
    </div>
  );
};
