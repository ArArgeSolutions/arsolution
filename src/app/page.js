"use client";
import Head from 'next/head';
import { FiArrowRight } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from "../../i18n";

// Apple-like global styles
const appleStyles = `
  html, body {
    background: #f5f6fa !important;
    color: #202124;
    font-family: 'Inter', 'Roboto', Arial, sans-serif;
    font-weight: 400;
    margin: 0;
    padding: 0;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  .apple-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 64px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    z-index: 100;
    padding: 0 32px;
    border-bottom: none;
  }
  .apple-navbar-logo {
    font-weight: 700;
    font-size: 22px;
    letter-spacing: 1px;
    color: #202124;
    margin-right: 32px;
  }
  .apple-navbar-links {
    display: flex;
    gap: 24px;
    align-items: center;
    flex: 1;
    justify-content: flex-start;
  }
  .apple-navbar-link {
    color: #202124;
    font-weight: 500;
    font-size: 16px;
    text-decoration: none;
    transition: all 0.2s ease;
    padding: 4px 8px;
    border-radius: 6px;
    position: relative;
    background: none;
    text-align: center;
  }
  .apple-navbar-link:hover {
    color: #1a73e8;
    text-shadow: 0 1px 4px rgba(26,115,232,0.08);
    background: #f1f3f4;
  }
  .apple-navbar-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .apple-select {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 15px;
    color: #202124;
    font-weight: 500;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    transition: border 0.2s;
    outline: none;
  }
  .apple-select:focus {
    border: 1.5px solid #1a73e8;
    outline: 2px solid #1a73e8;
  }
  .apple-main-container {
    margin-top: 80px;
    padding: 32px 16px 0 16px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .apple-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    padding: 16px;
    margin-bottom: 32px;
    width: 100%;
    max-width: 480px;
  }
  .apple-btn-primary {
    background: #1a73e8;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-weight: 500;
    font-size: 16px;
    box-shadow: 0 2px 8px rgba(26,115,232,0.2);
    transition: background 0.2s;
    cursor: pointer;
    outline: none;
  }
  .apple-btn-primary:hover {
    background: #1669c1;
  }
  .apple-btn-secondary {
    background: #fff;
    color: #1a73e8;
    border: 1px solid #1a73e8;
    border-radius: 8px;
    padding: 10px 20px;
    font-weight: 500;
    font-size: 16px;
    transition: background 0.2s, color 0.2s;
    cursor: pointer;
    outline: none;
  }
  .apple-btn-secondary:hover {
    background: #e8f0fe;
    color: #1669c1;
  }
  .apple-link {
    color: #1a73e8;
    font-size: 14px;
    text-decoration: none;
    transition: all 0.2s;
  }
  .apple-link:hover {
    text-decoration: underline;
    color: #1669c1;
  }
  .apple-form-label {
    font-weight: 500;
    font-size: 15px;
    color: #202124;
    margin-bottom: 6px;
    display: block;
  }
  .apple-form-input {
    width: 100%;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 15px;
    margin-bottom: 16px;
    outline: none;
    transition: border 0.2s;
  }
  .apple-form-input:focus {
    border: 1.5px solid #1a73e8;
    outline: 2px solid #1a73e8;
  }
  .apple-table-container {
    width: 100%;
    overflow-x: auto;
    padding: 8px 0;
  }
  .apple-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    background: #fff;
  }
  .apple-table th, .apple-table td {
    border: 1px solid #e0e0e0;
    padding: 12px 16px;
    font-size: 15px;
  }
  .apple-table th {
    background: #f1f3f4;
    font-weight: 600;
  }
  .apple-table tr:last-child td {
    border-bottom: none;
  }
  .apple-alert-info {
    background: #e8f0fe;
    border-left: 4px solid #1a73e8;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 16px;
  }
  .apple-alert-success {
    background: #e6f4ea;
    border-left: 4px solid #34a853;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 16px;
  }
  .apple-alert-error {
    background: #fce8e6;
    border-left: 4px solid #d93025;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 16px;
  }
  .apple-modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.4);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .apple-modal {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.2);
    max-width: 95vw;
    min-width: 320px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }
  .apple-modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 22px;
    color: #202124;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    .apple-navbar {
      height: 56px;
      padding: 0 8px;
    }
    .apple-navbar-logo {
      font-size: 18px;
      margin-right: 16px;
    }
    .apple-navbar-links {
      gap: 12px;
    }
    .apple-main-container {
      padding: 16px 4px 0 4px;
    }
    .apple-card {
      padding: 10px;
      max-width: 100%;
    }
    .apple-table th, .apple-table td {
      padding: 8px 8px;
      font-size: 14px;
    }
  }
`;

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
        {/* Apple font import */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <style>{appleStyles}</style>
      </Head>

      {/* Apple-like Navbar */}
      <nav className="apple-navbar">
        <span className="apple-navbar-logo">AIRADAR</span>
        <div className="apple-navbar-links">
          <a href="#" className="apple-navbar-link">{t('home')}</a>
          <a href="#about" className="apple-navbar-link">{t('about')}</a>
          <a href="#gallery" className="apple-navbar-link">{t('gallery')}</a>
          <a href="#contact" className="apple-navbar-link">{t('contact')}</a>
          <a href="/online" className="apple-navbar-link">Online Kayıt</a>
        </div>
        <div className="apple-navbar-right">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="apple-select"
          >
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </nav>

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
