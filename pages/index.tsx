import { Snowfall } from '@/components/Snowfall';
import { IndustrialDecorations } from '@/components/IndustrialDecorations';
import { BackgroundImage } from '@/components/BackgroundImage';
import { Header } from '@/components/Header';
import { SocialButtons } from '@/components/SocialButtons';
import { ParallaxMachine } from '@/components/ParallaxMachine';
import { FanucHistoryCards } from '@/components/FanucHistoryCard';
import { ContactForm } from '@/components/ContactForm';
import { FanucStands } from '@/components/FanucStands';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Токарная обработка ЧПУ | Обучение программированию станков Fanuc</title>
        <meta 
          name="description" 
          content="Мастерство, проверенное Fanuc. Ваш путь от концепции до безупречной детали. Стань востребованным специалистом: программирование и работа на станках с ЧПУ." 
        />
        <meta 
          name="keywords" 
          content="токарная обработка, ЧПУ, FANUC, обучение ЧПУ, программирование станков, токарные станки, металлообработка, Сейуки Инаба" 
        />
      </Helmet>

      <div className="min-h-screen relative overflow-x-hidden">
        {/* Фоновое изображение */}
        <BackgroundImage />
        
        {/* Фоновые эффекты */}
        <Snowfall />
        <IndustrialDecorations />

        {/* Основной контент */}
        <div className="relative z-10">
          <Header />
          <SocialButtons />
          
          {/* Параллакс эффект со станком */}
          <ParallaxMachine />
          
          <main className="container max-w-7xl mx-auto px-4 space-y-8">
            {/* История FANUC */}
            <FanucHistoryCards />

            {/* Форма обратной связи */}
            <ContactForm />

            {/* Наглядные стойки Fanuc */}
            <FanucStands />

            {/* Подвал */}
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}

