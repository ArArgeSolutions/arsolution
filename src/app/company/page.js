"use client";
import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import i18n from "../../../i18n";


const CompanyRegisterForm = () => {
  const { t, i18n } = useTranslation();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://airadar.arsolution.com.tr/course-registry/company/register", {
        company: companyName,
        email: email,
        phone: phone,
        password: password,
        address: address,
        website: website,
        description: description
      });

      // const response = await axios.post("http://localhost:3005/course-registry/company/register", {
      //   company: companyName,
      //   email: email,
      //   phone: phone,
      //   password: password,
      //   address: address,
      //   website: website,
      //   description: description
      // });

      setMessage(response.data.message);

      setCompanyName("");
      setEmail("");
      setPhone("");
      setPassword("")
      setAddress("")
      setWebsite("")
      setDescription("")
    } catch (error) {
      console.error("Şirket kaydı sırasında hata oluştu:", error);
      setMessage("Şirket kaydı başarısız oldu.");
    }
  };

  return (
    <>
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
            <a href="/" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">{t('home')}</a>
            <a href="/course" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">Kayıt</a>
						<a href="https://airadar.arsolution.com.tr/user/login" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">Giriş</a>
          </nav>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center min-h-[83.2vh] bg-gray-900 text-gray-100">
        <h1 className="text-3xl font-bold mb-6">Şirket Kayıt</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Şirket Adı */}
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">Şirket Adı</label>
          <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required className="block w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded mb-4 focus:outline-none focus:border-blue-500" />

          {/* Email */}
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">E-posta</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="block w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded mb-4 focus:outline-none focus:border-blue-500" />

          {/* Telefon */}
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Telefon</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="block w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded mb-4 focus:outline-none focus:border-blue-500" />

          {/* Password */}
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Şifre</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded mb-4 focus:outline-none focus:border-blue-500" />
          
          {/* Website */}
          <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">Website (Opsiyonel)</label>
          <input     type="url"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="block w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded mb-4 focus:outline-none focus:border-blue-500"
          />
          
          {/* Adres */}
          <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">Adres (Opsiyonel)</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="block w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded mb-4 focus:outline-none focus:border-blue-500"/>

          {/* Açıklama */}
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Açıklama (Opsiyonel)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded mb-4 focus:outline-none focus:border-blue-500"
            rows="4"
          />

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">Kayıt Ol</button>
        </form>
        {message && <p className="mt-4 text-lg text-green-400">{message}</p>}
      </div>
    </>
  );
};

export default CompanyRegisterForm;