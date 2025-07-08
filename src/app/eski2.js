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
          <a href="#" className="apple-navbar-link">{t('contact')}</a>
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

      {/* Main Content Container */}
      <main className="apple-main-container">
        {/* Slayt Gösterisi */}
        <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', marginBottom: 32 }}>
          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <img
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
              style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 12, transition: 'opacity 0.5s' }}
            />
            <button
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: '#fff', color: '#202124', border: '1px solid #e0e0e0', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 8, cursor: 'pointer', transition: 'all 0.2s' }}
              onClick={prevSlide}
            >
              <FaChevronLeft size={22} />
            </button>
            <button
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: '#fff', color: '#202124', border: '1px solid #e0e0e0', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 8, cursor: 'pointer', transition: 'all 0.2s' }}
              onClick={nextSlide}
            >
              <FaChevronRight size={22} />
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, gap: 8 }}>
            {images.map((_, index) => (
              <span
                key={index}
                style={{ width: 10, height: 10, borderRadius: '50%', background: currentImageIndex === index ? '#1a73e8' : '#e0e0e0', display: 'inline-block', transition: 'background 0.2s' }}
              />
            ))}
          </div>
        </div>

        {/* Explore, Interact, Immerse */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, marginBottom: 32 }}>
          <span style={{ color: '#202124', fontWeight: 600, fontSize: 36, letterSpacing: 0.5 }}> {t('explore')} </span>
          <span style={{ color: '#202124', fontWeight: 600, fontSize: 36, letterSpacing: 0.5 }}> {t('interact')} </span>
          <span style={{ color: '#202124', fontWeight: 600, fontSize: 36, letterSpacing: 0.5 }}> {t('immerse')} </span>
        </div>

        {/* Product Cards (YouTube) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', width: '100%', marginBottom: 32 }}>
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

        {/* About Us Section */}
        <section id="about" style={{ width: '100%', marginBottom: 32 }}>
          <div className="apple-card" style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontWeight: 600, fontSize: 24, textAlign: 'center', marginBottom: 16 }}>{t('aboutUs')}</h2>
            <div style={{ fontSize: 16, lineHeight: 1.6, color: '#202124' }}>
              <p>{t('aboutUsContent')}</p>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section id="founders" style={{ width: '100%', marginBottom: 32 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ flex: 2, minWidth: 320 }}>
              <FounderCard
                imageUrl="/burcuibili.png"
                name="Dr. Aysel Burcu İBİLİ"
                description={t('burcuBio')}
              />
              <div style={{ height: 16 }} />
              <FounderCard
                imageUrl="/eminibili.png"
                name="Doç. Dr. Emin İBİLİ"
                description={t('eminBio')}
              />
            </div>
            <div style={{ flex: 1, minWidth: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="WebsiteBanners/Broşür/1.png"
                alt="Side Image"
                style={{ height: 320, width: 'auto', objectFit: 'cover', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              />
            </div>
          </div>
        </section>

        {/* Brochure Slideshow */}
        <section style={{ width: '100%', marginBottom: 32 }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 900, margin: '0 auto' }}>
            <div style={{ position: 'relative', height: 220 }}>
              {brochures.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Brochure ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: 12,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: index === currentImageIndex2 ? 1 : 0,
                    zIndex: index === currentImageIndex2 ? 2 : 1,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transition: 'opacity 1s',
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, gap: 8 }}>
              {brochures.map((_, index) => (
                <span
                  key={index}
                  style={{ width: 8, height: 8, borderRadius: '50%', background: currentImageIndex2 === index ? '#1a73e8' : '#e0e0e0', display: 'inline-block', transition: 'background 0.2s' }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" style={{ width: '100%', marginBottom: 32 }}>
          <div className="apple-card" style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ fontWeight: 600, fontSize: 24, textAlign: 'center', marginBottom: 16 }}>{t('gallery')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
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
                  style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'transform 0.3s', cursor: 'pointer' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 12 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Product Card Component
const ProductCard = ({ title, videoUrl, description, productUrl }) => {
  const { t } = useTranslation();
  return (
    <div className="apple-card" style={{ maxWidth: 400, minWidth: 260, flex: 1 }}>
      <div style={{ width: '100%', height: 180, borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
        <iframe
          width="100%"
          height="100%"
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', borderRadius: 12, objectFit: 'cover' }}
        ></iframe>
      </div>
      <h2 style={{ fontWeight: 600, fontSize: 20, textAlign: 'center', marginBottom: 8 }}>{title}</h2>
      <p style={{ textAlign: 'center', color: '#202124', fontSize: 15 }}>{description}</p>
      <a
        href={productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="apple-btn-primary"
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '16px auto 0 auto', fontSize: 15, fontWeight: 500, textDecoration: 'none', boxShadow: '0 2px 8px rgba(26,115,232,0.2)' }}
      >
        {t('goToProduct')} <FiArrowRight style={{ marginLeft: 8 }} />
      </a>
    </div>
  );
};

// Team Member Card Component (not used, but Apple-styled)
const TeamMemberCard = ({ imageUrl, name, position }) => {
  return (
    <div className="apple-card" style={{ textAlign: 'center', maxWidth: 320, margin: '0 auto' }}>
      <img
        src={imageUrl}
        alt={name}
        style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px auto' }}
      />
      <h3 style={{ fontWeight: 600, fontSize: 18 }}>{name}</h3>
      <p style={{ color: '#5f6368', fontSize: 15 }}>{position}</p>
    </div>
  );
};

// Founder Card Component (Apple-styled)
const FounderCard = ({ imageUrl, name, description }) => {
  return (
    <div className="apple-card" style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 16 }}>
      <img
        src={imageUrl}
        alt={name}
        style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginRight: 16 }}
      />
      <div>
        <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 6 }}>{name}</h3>
        <p style={{ color: '#202124', fontSize: 15 }}>{description}</p>
      </div>
    </div>
  );
};
