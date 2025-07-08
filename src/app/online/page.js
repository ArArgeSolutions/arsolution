"use client";
import { useTranslation } from 'react-i18next';
import i18n from "../../../i18n";
import Link from 'next/link';

export default function Online() {
	const { t, i18n } = useTranslation();

	return (
		<>
			<header className="bg-gray-800 text-white py-4">
				<div className="container mx-auto flex flex-col md:flex-row flex-wrap justify-between items-center px-4">
					<div className="flex flex-col items-center mb-4 md:mb-0">
						<div className="flex items-center justify-center mb-2">
							<img src="/big.png" alt="Site Logo" className="h-12 w-24 mr-2" />
							<img src="/logo.png" alt="Site Logo" className="h-12 w-24" />
						</div>
						<h2 className="text-lg md:text-xl font-bold text-center">
							{t('companyName')}
						</h2>
					</div>

					<nav className="w-full md:w-auto text-center mt-4 md:mt-0 flex flex-col md:flex-row md:space-x-4">
						<a href="/" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">{t('home')}</a>
						<a href="/course" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">Kayıt</a>
						<a href="https://airadar.arsolution.com.tr/user/login" className="text-white bg-gray-800 px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 hover:text-gray-200 block md:inline-block transition-transform transform hover:scale-105">Giriş</a>
					</nav>
				</div>
			</header>

			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">				
				<div className="flex flex-col justify-center items-center text-center px-8 py-12">
					<h2 className="text-3xl font-bold mb-4">Kişi Kayıt</h2>
					<p className="mb-8">Kişi kaydı, eğitim içeriklerine erişim ve bireysel öğrenme planları için gereklidir. Hemen kaydolun!</p>
					<Link href="/course" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded">Kayıt Ol</Link>
				</div>
			</div>
		</>
	)
}