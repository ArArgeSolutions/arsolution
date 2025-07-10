"use client";
import "./styles/apple.css";
import Head from "next/head";
import { FiArrowRight } from "react-icons/fi";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ReCAPTCHA from "react-google-recaptcha";
import i18n from "../../i18n";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const [showChat, setShowChat] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Slayt resimlerini belirleme
  const banners = [
    "/WebsiteBanners/Banner/(1).png",
    "/WebsiteBanners/Banner/(2).png",
    "/WebsiteBanners/Banner/(3).png",
  ];

  const brochures = [
    "/WebsiteBanners/Broşür/broş1.png",
    "/WebsiteBanners/Broşür/broş2.png",
    "/WebsiteBanners/Broşür/broş3.png",
  ];

  const images = [
    "/5.jpg",
    "/6.jpg",
    "/1.png",
    "/2.png",
    "/3.png",
    "/4.png",
    "/7.jpg",
    "/8.jpg",
    "/9.jpg",
  ];

  function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
      return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }, [theme]);

    return (
      <div
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`w-24 h-10 flex items-center rounded-full cursor-pointer px-1 transition-colors duration-500 ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-500 flex items-center justify-center text-lg ${
            theme === "dark" ? "translate-x-0" : "translate-x-14"
          }`}
        >
          {theme === "dark" ? "🌙" : "🌞"}
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (showChat) {
      setIsVisible(true);
      // animasyonu başlatmak için kısa gecikmeyle sınıf ekle
      setTimeout(() => {
        popupRef.current?.classList.remove("translate-y-10", "opacity-0");
        popupRef.current?.classList.add("translate-y-0", "opacity-100");
      }, 10); // sadece 10ms gecikme animasyonun başlamasını sağlar
    } else {
      // önce animasyonlu çıkış ver
      popupRef.current?.classList.remove("translate-y-0", "opacity-100");
      popupRef.current?.classList.add("translate-y-10", "opacity-0");

      // sonra DOM'dan kaldır
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [showChat]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const nextSlide = () => {
    setCurrentImageIndex2((prevIndex) =>
      prevIndex === brochures.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex2((prevIndex) =>
      prevIndex === 0 ? brochures.length - 1 : prevIndex - 1
    );
  };

  const canvasContainerRef = useRef();

  // Otomatik slayt geçişi
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex2((prevIndex) =>
        prevIndex === brochures.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Her 3 saniyede bir geçiş yapıyor

    return () => clearInterval(interval); // Temizlik için interval'i temizliyoruz
  }, [brochures.length]);

  // 3D model yükleme ve sahne oluşturma
  let model = null;
  let rotationFromScroll = 0; // scroll değeri burada saklanacak

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    // Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasContainerRef.current.clientWidth /
        canvasContainerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(
      canvasContainerRef.current.clientWidth,
      canvasContainerRef.current.clientHeight
    );
    canvasContainerRef.current.appendChild(renderer.domElement);

    // Light
    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 20, 0);
    scene.add(light);

    // GLB Model
    const loader = new GLTFLoader();
    loader.load("/models/Quest3.glb", (gltf) => {
      model = gltf.scene;
      model.scale.set(10, 10, 10);
      scene.add(model);
      model.rotation.y = window.scrollY * 0.005;
    });

    // Scroll listener – sadece değeri güncelliyoruz
    const onScroll = () => {
      rotationFromScroll = window.scrollY * 0.005; // bu değeri animasyonda kullanacağız
    };
    window.addEventListener("scroll", onScroll);

    // Animate loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y = rotationFromScroll;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!canvasContainerRef.current) return;
      camera.aspect =
        canvasContainerRef.current.clientWidth /
        canvasContainerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        canvasContainerRef.current.clientWidth,
        canvasContainerRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
      if (canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Lütfen reCAPTCHA doğrulamasını tamamlayın.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token: recaptchaToken }),
      });

      if (!res.ok) throw new Error("Gönderilemedi");
      alert("Mesaj gönderildi!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("HATA:", err);
      alert("Hata oluştu.");
    }
  };

  return (
    <div className="bg-[#e6f0f8] dark:bg-[#0e1c36] text-[#0E1C36] dark:text-white bg-[url('/dots-pattern.png')]  ">
      <Head>
        <title>{t("title")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* Apple font import */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      // Menu bar

      
      {/* Apple-like Navbar */}
      <nav className="apple-navbar">
        <div className="flex items-center space-x-2 ml-15">
          <img src="/logo.png" className="logopng" />
        </div>
        <div className="apple-navbar-links">
          <a href="#" className="apple-navbar-link">
            {t("home")}
          </a>
          <a href="#products" className="apple-navbar-link">
            {t("products")}
          </a>
          <a href="#about" className="apple-navbar-link">
            {t("about")}
          </a>
          <a href="#gallery" className="apple-navbar-link">
            {t("gallery")}
          </a>
          <a href="#contact" className="apple-navbar-link">
            {t("contact")}
          </a>
          <a href="/online" className="apple-navbar-link">
            Online Kayıt
          </a>
        </div>
        <div className=" flex apple-navbar-right relative gap-x-4">
          <ThemeToggle />
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-black text-white font-medium py-2 px-4 border border-gray-600 rounded hover:bg-gray-800 transition"
          >
            {language === "tr"
              ? "Türkçe"
              : language === "en"
              ? "English"
              : "中文"}
          </button>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-32 bg-black text-white border border-gray-600 rounded shadow-lg z-50">
              {[
                { value: "tr", label: "Türkçe" },
                { value: "en", label: "English" },
                { value: "zh", label: "中文" },
              ].map((lang) => (
                <li
                  key={lang.value}
                  className="px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer"
                  onClick={() => {
                    setLanguage(lang.value);
                    setDropdownOpen(false);
                  }}
                >
                  {lang.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
      {/* Main Section */}
      {/* Yazılar Slayt Gösterisi Altında, Yan Yana Hizalanmış */}
      {/* 3D object */}
      <div className="w-full flex text-main dark:text-main-invert justify-center items-center p-6 md:p-10 text-center">
        <div
          ref={canvasContainerRef}
          className="w-full h-[500px] bg-transparent"
          style={{
            position: "fixed",
            top: "20px",
            right: "5px",
            width: "300px",
            height: "300px",
            zIndex: 999,
            pointerEvents: "none",
          }}
        ></div>
      </div>
      {/* Sabit Buton */}
      {/* Sabit Bize Ulaşın Butonu */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 z-999 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition duration-300"
      >
        {t("contactUs")}
      </button>
      {/* Popup Form */}
      {isVisible && (
        <div
          ref={popupRef}
          className="fixed bottom-20 right-4 z-[1000] bg-white p-4 rounded-lg shadow-xl w-80
      transform transition-all duration-300 translate-y-10 opacity-0"
        >
          <h2 className="text-lg text-black font-semibold mb-2">
            {t("contactForm")}
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={t("name")}
              required
              value={form.name}
              onChange={handleChange}
              className="w-full text-black p-2 mb-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder={t("email")}
              required
              value={form.email}
              onChange={handleChange}
              className="w-full text-black p-2 mb-2 border rounded"
            />
            <textarea
              name="message"
              placeholder={t("message")}
              required
              value={form.message}
              onChange={handleChange}
              className="w-full text-black p-2 mb-2 border rounded"
            />
            <ReCAPTCHA
              sitekey="6Ld-Hn4rAAAAAKHk4TYueva3c7opk5yZVj1SiDRL"
              onChange={(token) => setRecaptchaToken(token)}
              className="my-4"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              {t("submit")}
            </button>
          </form>
        </div>
      )}
      {/* Slayt Gösterisi En Üste Alındı */}
      <div className="relative w-full pt-[100px] flex flex-col justify-center items-center px-4 md:px-8">
        <div className="relative w-full max-w-full h-[550px] overflow-hidden rounded-lg">
          <div
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex2 * 100}%)` }}
          >
            {banners.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Slide ${idx + 1}`}
                className="w-full flex-shrink-0 h-full object-contain"
              />
            ))}
          </div>

          {/* Sol Ok Butonu */}
          <button
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white text-main dark:text-main-invert rounded-full p-2 opacity-70 hover:opacity-100 transition-transform duration-200 hover:scale-110"
            onClick={prevSlide}
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>

          {/* Sağ Ok Butonu */}
          <button
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white text-main dark:text-main-invert rounded-full p-2 opacity-70 hover:opacity-100 transition-transform duration-200 hover:scale-110"
            onClick={nextSlide}
          >
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Sayfa Göstergesi (Küçük Noktalar) */}
        <div className="mt-4 flex justify-center space-x-2">
          {brochures.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentImageIndex2 === index ? "bg-gray-400" : "bg-gray-800"
              } transition-colors duration-300`}
            />
          ))}
        </div>
      </div>
      {/* Yazılar Slayt Gösterisi Altında, Yan Yana Hizalanmış */}
      <div className="w-full flex text-main dark:text-main-invert justify-center items-center p-6 md:p-10 text-center">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          {/* Explore Yazısı */}
          <span className="  text-4xl md:text-6xl lg:text-8xl text-main dark:text-main-invert font-bold animate-glow">
            {t("explore")}
          </span>

          {/* Interact Yazısı */}
          <span className=" text-4xl md:text-6xl lg:text-8xl text-main dark:text-main-invert font-bold animate-glow">
            {t("interact")}
          </span>

          {/* Immerse Yazısı */}
          <span className=" text-4xl md:text-6xl lg:text-8xl text-main dark:text-main-invert font-bold animate-glow">
            {t("immerse")}
          </span>
        </div>
      </div>
      {/* Background Video */}
      <section id="products">
        <div className="relative w-full h-screen overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src="/videos/ArVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* İçerik */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 ">
            <h1 className="text-5xl font-bold mb-4 animate-glow">AIRADAR</h1>
            <p className="text-xl">{t("airadarDescription")}</p>
            <a
              href="https://airadar.arsolution.com.tr/main"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 mt-4 text-black bg-white rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105"
              style={{
                boxShadow: "0 0 15px rgba(255, 255, 255, 0.8)", // Tüm kenarlarda beyazımsı gölge
              }}
            >
              {t("goToProduct")} <FiArrowRight className="ml-2" />
            </a>
          </div>

          {/* İsteğe bağlı: karartma efekti */}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-[1]" />
        </div>
      </section>
      {/* YouTube Kartları Yazının Altına Alındı */}
      {/* <div className="w-full flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-10">
        <ProductCard
          title="AIRADAR"
          videoUrl="https://www.youtube.com/embed/_9xYzu7gwx0?si=d7evHEszCwEjpnXV"
          description={t("airadarDescription")}
          productUrl="https://airadar.arsolution.com.tr/main"
        />
        <ProductCard
          title="AIRADAR"
          videoUrl="https://www.youtube.com/embed/5v-TnYFrNYA?si=hGUlnj56CHEQDv7R"
          description={t("airadarDescription")}
          productUrl="https://airadar.arsolution.com.tr/main"
        />
      </div> */}
      {/* About Us Section */}
      <section
        id="about"
        className="py-12 md:py-20 bg-transparent text-white bg-[url('/dots-pattern.png')]"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center text-main dark:text-main-invert">
            {t("aboutUs")}
          </h2>
          <div className="text-base sm:text-lg leading-relaxed space-y-4 p-4 sm:p-6 bg-black bg-opacity-50 rounded-lg shadow-lg ">
            <p>{t("aboutUsContent")}</p>
          </div>
        </div>
      </section>
      <section
        id="founders"
        className="py-12 md:py-20 bg-transparent bg-[url('/dots-pattern.png')] text-main dark:text-main-invert"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col md:flex-row">
          <div className="w-full md:w-2/3  space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
            >
              <FounderCard
                imageUrl="/burcuibili.png"
                name="Dr. Aysel Burcu İBİLİ"
                description={t("burcuBio")}
              />
            </motion.div>

            <hr
              className="w-3/4 mx-auto my-4 md:my-8"
              style={{
                padding: "1px",
                border: "none",
                height: "2px",
                background:
                  "linear-gradient(to right, transparent, gray, transparent)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.1 }}
            >
              <FounderCard
                imageUrl="/eminibili.png"
                name="Doç. Dr. Emin İBİLİ"
                description={t("eminBio")}
              />
            </motion.div>
          </div>

          <motion.div
            className="w-full md:w-[40%] flex items-center justify-center mt-8 md:mt-0"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <img
              src="WebsiteBanners/Broşür/1.png"
              alt="Side Image"
              className="h-[500px] md:h-[700px] lg:h-[900px] w-auto object-contain rounded-lg"
            />
          </motion.div>
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
                className={`w-auto h-auto max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl max-h-64 sm:max-h-96 md:max-h-128 object-contain rounded-lg transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex2
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                } absolute`}
                style={{
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
                  transition: "opacity 1s ease-in-out",
                }}
              />
            ))}
          </div>

          {/* Sayfa Göstergesi (Küçük Noktalar) */}
          <div className="mt-4 flex justify-center space-x-2">
            {brochures.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  currentImageIndex2 === index ? "bg-gray-400" : "bg-gray-800"
                } transition-colors duration-300`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Alt HR */}
      <hr
        className="w-3/4 mx-auto my-8"
        style={{
          padding: "1px",
          border: "none",
          height: "2px",
          background:
            "linear-gradient(to right, transparent, gray, transparent)",
        }}
      />
      {/* Spatial.io tarzı yatay kaydırmalı galeri */}
      <section
        id="gallery"
        onMouseEnter={() => setIsGalleryHovered(true)}
        onMouseLeave={() => setIsGalleryHovered(false)}
        className="relative py-20 bg-transparent text-main dark:text-main-invert bg-[url('/dots-pattern.png')]"
      >
        {/* Karartma efekti */}
        {/* {isGalleryHovered && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 pointer-events-none transition-opacity duration-300"></div>
        )} */}

        <div className="container mx-auto px-4 relative z-50">
          <h2 className="text-4xl font-bold mb-10 text-center">
            {t("gallery")}
          </h2>

          {/* Scrollable Gallery */}
          <div
            onMouseEnter={() =>
              (document.getElementById(
                "scrollGallery"
              ).style.animationPlayState = "paused")
            }
            onMouseLeave={() =>
              (document.getElementById(
                "scrollGallery"
              ).style.animationPlayState = "running")
            }
            className="overflow-hidden relative"
          >
            <div
              id="scrollGallery"
              className="flex animate-scrollGallery gap-6"
              style={{
                animation: "scrollGallery 30s linear infinite",
                minWidth: `${images.length * 2 * 420}px`,
              }}
            >
              {[...images, ...images].map((src, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredImageIndex(index)}
                  onMouseLeave={() => setHoveredImageIndex(null)}
                  className={`flex-shrink-0 transition-transform duration-500 transform ${
                    hoveredImageIndex === index ? "scale-105 z-50" : ""
                  } ${
                    hoveredImageIndex !== null && hoveredImageIndex !== index
                      ? "opacity-30"
                      : "opacity-100"
                  }`}
                  style={{
                    width: "400px",
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#111827",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                  }}
                >
                  <img
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
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
      <hr
        className="w-3/4 mx-auto my-8"
        style={{
          padding: "1px",
          border: "none",
          height: "2px",
          background:
            "linear-gradient(to right, transparent, gray, transparent)",
        }}
      />
      {/* Sticker Component */}
      <Sticker />
      <section
        id="contact"
        className="py-16 px-4 md:px-10 text-white text-main dark:text-main-invert bg-transparent bg-[url('/s-pattdotern.png')]"
      >
        {/* Sol taraf: iletişim bilgileri */}
        <div className="max-w-6xl mx-auto flex flex-col text-main dark:text-main-invert md:flex-row justify-between items-start gap-10">
          <div>
            <h2 className="text-2xl text-main dark:text-main-invert font-bold mb-4">
              {t("contact")}
            </h2>
            <p>
              <strong>{t("email")}:</strong> info@arsolution.com.tr
            </p>
            <p>
              <strong>{t("address")}:</strong> Pınarbaşı, Hürriyet Cd., 07070
              Konyaaltı/Antalya
            </p>
            <p>
              <strong>{t("phone")}:</strong> +90 242 310 15 60
            </p>
            <p>
              <strong>{t("fax")}:</strong> +90 242 227 95 35
            </p>
          </div>

          {/* Sağ taraf: sosyal medya ikonları */}
          <div className="flex flex-col space-y-4 text-2xl text-main dark:text-main-invert mt-6 md:mt-0">
            <a
              href="https://www.facebook.com/people/Ar-Arge-Technologi/pfbid045Vk5NdAeac28odVbHmXjE6apVYprJMz5DyLfP5ZH9hB2khsLRNoT1wauKPT4XR9l/?eav=AfYL5h6PYDRFYVFed9k3G9VhYuUdxIT4bKC6R34VejQQacZALuS5Irxw_lRMV9sh8iE&paipv=0"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook className="text-4xl hover:text-blue-500 transition" />
            </a>
            <a
              href="https://x.com/ar_arge_tech"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaTwitter className="text-4xl hover:text-blue-500 transition" />
            </a>
            <a
              href="https://www.linkedin.com/company/ar-arge-teknoloji%CC%87-sanayi%CC%87-ve-ti%CC%87caret-anoni%CC%87m-%C5%9Fi%CC%87rketi%CC%87/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-300 transition"
            >
              <FaLinkedin className="text-4xl hover:text-blue-500 transition" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
//Mail atmak için

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
      <h2 className="text-2xl font-semibold text-center text-main dark:text-main-invert  animate-green-glow">
        {title}
      </h2>
      <p className="text-center  text-main dark:text-main-invert">
        {description}
      </p>
      <div className="flex justify-center">
        <a
          href={productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 mt-4 text-black bg-white rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105"
          style={{
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.8)", // Tüm kenarlarda beyazımsı gölge
          }}
        >
          {t("goToProduct")} <FiArrowRight className="ml-2" />
        </a>
      </div>
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
    <div className="flex flex-col md:flex-row bg-transparent  p-6 rounded-lg shadow-lg">
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
    <div
      style={{ bottom: "1rem" }}
      className={`fixed bottom-4 left-4 ${
        isSmall ? "w-48 h-24" : "w-80 h-40 sm:w-96 sm:h-48"
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
