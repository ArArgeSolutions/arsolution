'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import i18n from "../../../i18n";

export default function Application() {
	const { t, i18n } = useTranslation();
	const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
	const [message, setMessage] = useState('');
	
	
	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			name: formData.firstName,
			surname: formData.lastName,
			email: formData.email,
			password: formData.password
		};

		try {
			const response = await axios.post('https://airadar.arsolution.com.tr/course-registry/register', payload);
			// const response = await axios.post('http://localhost:3005/course-registry/register', payload);

			setMessage(response.data.message)
		} catch (error) {
			setMessage('Başvuru sırasında bir hata oluştu.');
		}
	};

	return (
		<>
			<header className="bg-gray-800 text-white py-4">
				<div className="container mx-auto flex flex-col md:flex-row flex-wrap justify-between items-center px-4">
					<div className="flex flex-col items-center mb-4 md:mb-0">
						<div className="flex items-center justify-center mb-2">
							<img src="/big.png" alt="Site Logo" className="h-12 w-24 mr-2" />
							<img src="/logo.png" alt="Site Logo" className="h-12 w-24" />
						</div>
						<h2 className="text-lg md:text-xl font-bold text-center">{t('companyName')}</h2>
					</div>

					<nav className="w-full md:w-auto text-center mt-4 md:mt-0 flex flex-col md:flex-row md:space-x-4">
						<a href="/" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">{t('home')}</a>
						<a href="/course" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">Kayıt</a>
						<a href="https://airadar.arsolution.com.tr/user/login" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">Giriş</a>
					</nav>
				</div>
			</header>

			<div className="flex flex-col items-center justify-center min-h-[83.2vh] bg-gray-900 text-gray-100">
				<h1 className="text-3xl font-bold mb-6">Kişi kayıt</h1>
				<form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">					
					<label className="block text-sm font-medium text-gray-300 mb-2">Ad:</label>
					<input type="text" placeholder="İsim" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required className="block w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded mb-4 focus:outline-none focus:border-blue-500" />
				
					<label className="block text-sm font-medium text-gray-300 mb-2">Soyad:</label>
					<input type="text" placeholder="Soyisim" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required className="block w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded mb-4 focus:outline-none focus:border-blue-500" />
				
					<label className="block text-sm font-medium text-gray-300 mb-2">E-posta:</label>
					<input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="block w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded mb-4 focus:outline-none focus:border-blue-500" />
				
					<label className="block text-sm font-medium text-gray-300 mb-2">Şifre:</label>
					<input type="password" placeholder="Şifre" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required className="block w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded mb-4 focus:outline-none focus:border-blue-500" />
				
					<button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Kayıt Ol</button>
				</form>

				{message && <p className="mt-4 text-lg text-green-400">{message}</p>}
			</div>
		</>
	);
}