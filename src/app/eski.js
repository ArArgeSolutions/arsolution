"use client";
import Head from 'next/head';
import { FiArrowRight } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from "../../i18n";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);

  // Slayt resimlerini belirleme
  const images = [
    '/WebsiteBanners/Banner/(1).png',
    '/WebsiteBanners/Banner/(2).png',
    '/WebsiteBanners/Banner/(3).png'
  ];

  const brochures = [
    '/WebsiteBanners/Broşür/broş1.png',
    '/WebsiteBanners/Broşür/broş2.png',
    '/WebsiteBanners/Broşür/broş3.png'
  ];

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Otomatik slayt geçişi
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex2((prevIndex) =>
        prevIndex === brochures.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Her 3 saniyede bir geçiş yapıyor

    return () => clearInterval(interval); // Temizlik için interval'i temizliyoruz
  }, [brochures.length]);

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* Language Selector */}
      <div style={{ bottom: "11rem" }} className="fixed left-4 z-50">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-black text-white border-none p-2 sm:p-3 md:p-4 rounded-md text-sm sm:text-base md:text-lg lg:text-xl"
          style={{
            direction: 'rtl', // Seçeneklerin yukarı doğru açılması için
          }}
        >
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
          <option value="zh">中文</option>
        </select>
      </div>

      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex flex-col md:flex-row flex-wrap justify-between items-center px-4">

          {/* Logo ve Başlık Kısmı */}
          <div className="flex flex-col items-center mb-4 md:mb-0">
            {/* İkonlar (Big ve Logo) */}
            <div className="flex items-center justify-center mb-2">
              <img src="/big.png" alt="Site Logo" className="h-12 w-24 mr-2" />
              <img src="/logo.png" alt="Site Logo" className="h-12 w-24" />
            </div>
            {/* ArArge Başlık */}
            <h2 className="text-lg md:text-xl font-bold text-center">
              {t('companyName')}
            </h2>
          </div>

          {/* Navigation Menüsü */}
          <nav className="w-full md:w-auto text-center mt-4 md:mt-0 flex flex-col md:flex-row md:space-x-4">
            <a href="#" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">{t('home')}</a>
            <a href="#about" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">{t('about')}</a>
            <a href="#gallery" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">{t('gallery')}</a>
            <a href="#footer" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">{t('contact')}</a>
            <a href="/online" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">Online Kayıt</a>
            {/* <a href="/course" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">Kurs Kayıt</a> */}
            {/* <a href="/company" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">Şirket Kayıt</a> */}
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex flex-col min-h-screen bg-black bg-[url('/dots-pattern.png')]">

        {/* Slayt Gösterisi En Üste Alındı */}
        <div className="relative w-full mt-8 flex flex-col justify-center items-center px-4 md:px-8">
          <div className="relative flex justify-center items-center w-full">
            <img
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
              className="w-full md:max-w-4xl h-auto object-contain rounded-lg transition-opacity duration-500 ease-in-out"
            />

            {/* Sol Ok Butonu */}
            <button
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full p-2 opacity-70 hover:opacity-100 transition-transform duration-200 hover:scale-110"
              onClick={prevSlide}
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>

            {/* Sağ Ok Butonu */}
            <button
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full p-2 opacity-70 hover:opacity-100 transition-transform duration-200 hover:scale-110"
              onClick={nextSlide}
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Sayfa Göstergesi (Küçük Noktalar) */}
          <div className="mt-4 flex justify-center space-x-2">
            {images.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-gray-400' : 'bg-gray-800'
                  } transition-colors duration-300`}
              />
            ))}
          </div>
        </div>

        {/* Yazılar Slayt Gösterisi Altında, Yan Yana Hizalanmış */}
        <div className="w-full flex justify-center items-center p-6 md:p-10 text-center">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            {/* Explore Yazısı */}
            <span className="text-white text-4xl md:text-6xl lg:text-8xl font-bold animate-glow">
              {t('explore')}
            </span>

            {/* Interact Yazısı */}
            <span className="text-white text-4xl md:text-6xl lg:text-8xl font-bold animate-glow">
              {t('interact')}
            </span>

            {/* Immerse Yazısı */}
            <span className="text-white text-4xl md:text-6xl lg:text-8xl font-bold animate-glow">
              {t('immerse')}
            </span>
          </div>
        </div>

        {/* YouTube Kartları Yazının Altına Alındı */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-10">
          <ProductCard
            title="AIRADAR"
            videoUrl="https://www.youtube.com/embed/_9xYzu7gwx0?si=d7evHEszCwEjpnXV"
            description={t('airadarDescription')}
            productUrl="https://airadar.arsolution.com.tr/main"
          />
          <ProductCard
            title="AIRADAR"
            videoUrl="https://www.youtube.com/embed/5v-TnYFrNYA?si=hGUlnj56CHEQDv7R"
            description={t('airadarDescription')}
            productUrl="https://airadar.arsolution.com.tr/main"
          />
        </div>
      </div>

      {/* About Us Section */}
      <section
        id="about"
        className="py-12 md:py-20 bg-transparent text-white bg-[url('/dots-pattern.png')]"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center">
            {t('aboutUs')}
          </h2>
          <div className="text-base sm:text-lg leading-relaxed space-y-4 p-4 sm:p-6 bg-black bg-opacity-50 rounded-lg shadow-lg">
            <p>{t('aboutUsContent')}</p>
          </div>
        </div>
      </section>


      <section id="founders" className="py-12 md:py-20 bg-transparent text-white bg-[url('/dots-pattern.png')]">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col md:flex-row">

          {/* Sol tarafta kurucuların bilgileri */}
          <div className="w-full md:w-2/3 space-y-8 md:space-y-10">
            <FounderCard
              imageUrl="/burcuibili.png"
              name="Dr. Aysel Burcu İBİLİ"
              description={t('burcuBio')}
            />
            <hr className="w-3/4 mx-auto my-4 md:my-8" style={{
              padding: '1px',
              border: 'none',
              height: '2px',
              background: 'linear-gradient(to right, transparent, gray, transparent)'
            }} />
            <FounderCard
              imageUrl="/eminibili.png"
              name="Doç. Dr. Emin İBİLİ"
              description={t('eminBio')}
            />
          </div>

          {/* Sağda tek bir ince uzun resim */}
          <div className="w-full md:w-1/3 flex items-center justify-center mt-8 md:mt-0">
            <img
              src="WebsiteBanners/Broşür/1.png" // Sağda yer alacak tek resim
              alt="Side Image"
              className="h-[500px] md:h-[700px] lg:h-[900px] w-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </section>



      {/* Kurucuların altındaki slayt gösterisi */}
      <section className="py-20 md:py-40 bg-transparent text-white">
        <div className="relative w-full mt-8 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
          <div className="relative flex justify-center items-center w-full">
            {brochures.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Brochure ${index + 1}`}
                className={`w-auto h-auto max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl max-h-64 sm:max-h-96 md:max-h-128 object-contain rounded-lg transition-opacity duration-1000 ease-in-out ${index === currentImageIndex2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  } absolute`}
                style={{
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)', // Daha küçük cihazlar için daha yumuşak bir gölge
                  transition: 'opacity 1s ease-in-out',
                }}
              />
            ))}
          </div>

          {/* Sayfa Göstergesi (Küçük Noktalar) */}
          <div className="mt-4 flex justify-center space-x-2">
            {brochures.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentImageIndex2 === index ? 'bg-gray-400' : 'bg-gray-800'
                  } transition-colors duration-300`}
              />
            ))}
          </div>
        </div>
      </section>

      
      {/* Alt HR */}
      <hr className="w-3/4 mx-auto my-8" style={{
        padding: '1px',
        border: 'none',
        height: '2px',
        background: 'linear-gradient(to right, transparent, gray, transparent)'
      }} />

      {/* Photo Gallery Section */}
      <section
        id="gallery"
        className="py-20 bg-transparent text-white bg-[url('/dots-pattern.png')]"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-center">{t('gallery')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              '/5.jpg',
              '/6.jpg',
              '/1.png',
              '/2.png',
              '/3.png',
              '/4.png',
              '/7.jpg',
              '/8.jpg',
              '/9.jpg',
            ].map((src, index) => (
              <div
                key={index}
                className="transform transition-transform duration-300 hover:scale-150 hover:z-10 relative"
              >
                <img
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      {/* <section
        id="video-gallery"
        className="py-20 bg-transparent text-white bg-[url('/dots-pattern.png')]"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-center">{t('videoGallery')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/_9xYzu7gwx0?si=d7evHEszCwEjpnXV"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            </div>
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/shYu8LIoOmY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            </div>
          </div>
        </div>
      </section> */}

      {/* Our Team Section */}
      {/* <section
        id="team"
        className="py-20 bg-transparent text-white bg-[url('/dots-pattern.png')]"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-center">{t('ourTeam')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMemberCard
              imageUrl="/eminibili.png"
              name="Doç. Dr. Emin İBİLİ"
              position={t('eminRole')}
            />
            <TeamMemberCard
              imageUrl="/burcuibili.png"
              name="Dr. Öğr. Üyesi Aysel Burcu İBİLİ"
              position={t('burcuRole')}
            />
            <TeamMemberCard
              imageUrl="/nurullahokumus.png"
              name="Prof. Dr. Nurullah OKUMUŞ"
              position={t('nurullahRole')}
            />
            <TeamMemberCard
              imageUrl="/ahmetyardimci.png"
              name="Prof. Dr. Ahmet YARDIMCI"
              position={t('ahmetRole')}
            />
            <TeamMemberCard
              imageUrl="/nesezayim.png"
              name="Doç. Dr. Neşe ZAYİM"
              position={t('neseRole')}
            />
            <TeamMemberCard
              imageUrl="/utkusenol.png"
              name="Prof. Dr. A. Utku ŞENOL"
              position={t('utkuRole')}
            />
            <TeamMemberCard
              imageUrl="/cetinsahin.png"
              name="Dr. Çetin ŞAHİN"
              position={t('cetinRole')}
            />
          </div>
        </div>
      </section> */}

      <hr className="w-3/4 mx-auto my-8" style={{
        padding: '1px',
        border: 'none',
        height: '2px',
        background: 'linear-gradient(to right, transparent, gray, transparent)'
      }} />

      {/* Footer Section */}
      <footer
        id="footer"
        className="bg-black text-white py-8 bg-[url('/dots-pattern.png')]"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-center md:text-left">
                {t('contact')}
              </h3>
              <p className="text-center md:text-left">
                {t('email')}: info@arsolution.com.tr
              </p>
              <p className="text-center md:text-left">
                {t('address')}: Pınarbaşı, Hürriyet Cd., 07070 Konyaaltı/Antalya
              </p>
              <p className="text-center md:text-left">{t('phone')}: +90 242 310 15 60</p>
              <p className="text-center md:text-left">{t('fax')}: +90 242 227 95 35</p>
            </div>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://www.facebook.com/people/Ar-Arge-Technologi/pfbid027dgA4fo4d8KeadAMELBtYUscNts2gqrJXdDQ9JbZrgYNb3gRuAFf2BNy1kSXqg47l/?eav=AfYL5h6PYDRFYVFed9k3G9VhYuUdxIT4bKC6R34VejQQacZALuS5Irxw_lRMV9sh8iE&paipv=0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-5xl hover:text-gray-400" />
              </a>
              <a
                href="https://x.com/ar_arge_tech"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-5xl hover:text-gray-400" />
              </a>
              <a
                href="https://www.linkedin.com/company/ar-arge-teknoloji̇-sanayi̇-ve-ti̇caret-anoni̇m-şi̇rketi̇/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-5xl hover:text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticker Component */}
      <Sticker />
    </>
  );
}

// Product Card Component
const ProductCard = ({ title, videoUrl, description, productUrl }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-transparent text-white p-6 rounded-lg transition-transform transform hover:scale-105 w-full md:w-96">
      <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
        <iframe
          width="100%"
          height="100%"
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full object-cover"
        ></iframe>
      </div>
      <h2 className="text-2xl font-semibold text-center animate-green-glow">{title}</h2>
      <p className="text-center">{description}</p>
      <a
        href={productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-4 py-2 mt-4 text-black bg-white rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105"
        style={{
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)', // Tüm kenarlarda beyazımsı gölge
        }}
      >
        {t('goToProduct')} <FiArrowRight className="ml-2" />
      </a>
    </div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ imageUrl, name, position }) => {
  return (
    <div className="bg-transparent text-center p-4 rounded-lg transform transition-transform duration-300 hover:scale-110 hover:z-10 relative">
      <img
        src={imageUrl}
        alt={name}
        className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full mb-4"
      />
      <h3 className="text-lg md:text-xl font-semibold">{name}</h3>
      <p className="text-gray-400">{position}</p>
    </div>
  );
};

// Founder Card Component
const FounderCard = ({ imageUrl, name, description }) => {
  return (
    <div className="flex flex-col md:flex-row bg-transparent text-white p-6 rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full mx-auto mb-4 md:mb-0 md:mr-6"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// Sticker Component
const Sticker = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const shrinkTimer = setTimeout(() => {
      setIsSmall(true);
    }, 5000); // Shrink after 5 seconds

    return () => {
      clearTimeout(shrinkTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{ bottom: "10rem" }}
      className={`fixed bottom-4 right-4 ${isSmall ? 'w-48 h-24' : 'w-80 h-40 sm:w-96 sm:h-48'
        } bg-opacity-80 rounded-md shadow-lg z-50 transition-all duration-500`}
    >
      <img
        src="/excellence.png"
        alt="Excellence Sticker"
        className="w-full h-full object-cover rounded-md"
      />
    </div>
  );
};
