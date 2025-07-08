'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";


export default function AdminPage(props) {
  const { token } = props.params;

  const [applications, setApplications] = useState([]);
  const [companyApplications, setCompanyApplications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true); 
  const [expandedRows, setExpandedRows] = useState([]);

  // Satırı açıp kapatma işlemi
  const toggleExpand = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  // Satırın açık olup olmadığını kontrol etme
  const isExpanded = (id) => expandedRows.includes(id);


  // Sunucudan başvuruları çek
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`https://airadar.arsolution.com.tr/course-registry`);
        // const response = await axios.get(`http://localhost:3005/course-registry`);

        const data = response.data;
        const formattedData = data.map((item) => ({
          id: item._id,
          name: `${item.name} ${item.surname}`,
          email: item.email,
          password: item.password,
          date: new Date(item.createdAt).toLocaleDateString(),
          status: item.status,
          active: item.active,
        }));
        setApplications(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Başvurular çekilirken hata oluştu:', error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Şirket başvurularını getir
  useEffect(() => {
    const fetchCompanyApplications = async () => {
      try {
        const response = await axios.get(`https://airadar.arsolution.com.tr/course-registry/company/all-registries`);
        // const response = await axios.get(`http://localhost:3005/course-registry/company/all-registries`);

        const data = response.data;
        const formattedData = data.map((item) => ({
          id: item._id,
          name: item.company,
          email: item.email,
          address: item.address,
          website: item.website,
          description: item.description,
          date: new Date(item.createdAt).toLocaleDateString(),
          status: item.status,
        }));
        setCompanyApplications(formattedData);
      } catch (error) {
        console.error('Şirket başvuruları çekilirken hata oluştu:', error);
      }
    };

    fetchCompanyApplications();
  }, [token]);

  // Şirket başvurusunu kabul et
  const acceptCompanyApplication = async (id) => {
    try {
      await axios.post(`https://airadar.arsolution.com.tr/course-registry/company/accept`, { id });
      // await axios.post(`http://localhost:3005/course-registry/company/accept`, { id });

      setCompanyApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === id ? { ...app, status: 'accepted' } : app
        )
      );
    } catch (error) {
      console.error('Şirket başvurusu kabul edilirken hata oluştu:', error);
    }
  };

  // Şirket başvurusunu reddet
  const rejectCompanyApplication = async (id) => {
    try {
      await axios.post(`https://airadar.arsolution.com.tr/course-registry/company/reject`, { id });
      // await axios.post(`http://localhost:3005/course-registry/company/reject`, { id });

      setCompanyApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === id ? { ...app, status: 'rejected' } : app
        )
      );
    } catch (error) {
      console.error('Şirket başvurusu kabul edilirken hata oluştu:', error);
    }
  };

  // Kabul Et fonksiyonu
  const acceptApplication = async (id) => {
    try {
      await axios.post(`https://airadar.arsolution.com.tr/course-registry/accept`, { id });
      // await axios.post(`http://localhost:3005/course-registry/accept`, { id });

      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === id ? { ...app, status: 'accepted' } : app
        )
      );
    } catch (error) {
      console.error('Başvuru kabul edilirken hata oluştu:', error);
    }
  };

  // Reddet fonksiyonu
  const rejectApplication = async (id) => {
    try {
      await axios.post(`https://airadar.arsolution.com.tr/course-registry/reject`, { id });
      // await axios.post(`http://localhost:3005/course-registry/reject`, { id });

      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === id ? { ...app, status: 'rejected' } : app
        )
      );
    } catch (error) {
      console.error('Başvuru reddedilirken hata oluştu:', error);
    }
  };

  // Filtreleme Fonksiyonu
  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  // Şirket Başvuruları Filtreleme Fonksiyonu
  const filteredCompanyApplications = companyApplications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  })

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Filtreler</h2>
        <ul>
          <li className={`cursor-pointer mb-2 ${filter === 'all' ? 'text-yellow-300' : ''}`} onClick={() => setFilter('all')}>Tümü</li>
          <li className={`cursor-pointer mb-2 ${filter === 'accepted' ? 'text-yellow-300' : ''}`} onClick={() => setFilter('accepted')}>Kabul Edilenler</li>
          <li className={`cursor-pointer mb-2 ${filter === 'rejected' ? 'text-yellow-300' : ''}`} onClick={() => setFilter('rejected')}>Reddedilenler</li>
          <li className={`cursor-pointer mb-2 ${filter === 'pending' ? 'text-yellow-300' : ''}`} onClick={() => setFilter('approved')}>Bekleyenler</li>
        </ul>
      </aside>

      {/* Başvurular Tablosu */}
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Şirket Başvuruları</h1>
        <table className="min-w-full bg-white shadow-lg rounded-lg border mb-8">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="border px-4 py-2">İsim</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Başvuru Tarihi</th>
          <th className="border px-4 py-2">Durum</th>
          <th className="border px-4 py-2">İşlemler</th>
          <th className="border px-4 py-2">Detay</th>
        </tr>
      </thead>
      <tbody>
        {filteredCompanyApplications.map((app) => (
          <React.Fragment key={app.id}>
            <tr className="text-center">
              <td className="border px-4 py-2 text-left text-gray-800">{app.name}</td>
              <td className="border px-4 py-2 text-left text-gray-800">{app.email}</td>
              <td className="border px-4 py-2 text-gray-800">{app.date}</td>
              <td className="border px-4 py-2 text-gray-800">
                {app.status === 'approved'
                  ? 'Bekliyor'
                  : app.status === 'accepted'
                  ? 'Kabul Edildi'
                  : app.status === 'rejected'
                  ? 'Reddedildi'
                  : 'Bilinmiyor'}
              </td>
              <td className="border px-4 py-2">
                {app.status === 'approved' && (
                  <>
                    <button
                      className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                      onClick={() => acceptCompanyApplication(app.id)}
                    >
                      Kabul Et
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => rejectCompanyApplication(app.id)}
                    >
                      Reddet
                    </button>
                  </>
                )}
                {app.status === 'enrolled' && app.active === false && (
                  <p className="text-black">KAYDEDİLDİ</p>
                )}
              </td>
              <td className="text-center border px-4 py-2">
                <button onClick={() => toggleExpand(app.id)} className="focus:outline-none">
                  {isExpanded(app.id) ? (
                    <FaAngleUp className="text-2xl text-black mx-auto" />
                  ) : (
                    <FaAngleDown className="text-2xl text-black mx-auto" />
                  )}
                </button>
              </td>
            </tr>
            {isExpanded(app.id) && (
              <tr>
                <td colSpan="6" className="border px-4 py-2 bg-gray-100 text-left text-black">
                  <p>
                    <strong>Website:</strong> {app.website || 'Belirtilmemiş'}
                  </p>
                  <p>
                    <strong>Address:</strong> {app.address || 'Belirtilmemiş'}
                  </p>
                  <p>
                    <strong>Description:</strong> {app.description || 'Belirtilmemiş'}
                  </p>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>

        <h1 className="text-2xl font-bold mb-4 text-gray-800">Başvurular</h1>
        <table className="min-w-full bg-white shadow-lg rounded-lg border">
          <thead className="bg-gray-800">
            <tr>
              <th className="border px-4 py-2">İsim</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Başvuru Tarihi</th>
              <th className="border px-4 py-2">Durum</th>
              <th className="border px-4 py-2">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id} className="text-center">
                <td className="border px-4 py-2 text-left text-gray-800">{app.name}</td>
                <td className="border px-4 py-2 text-left text-gray-800">{app.email}</td>
                <td className="border px-4 py-2 text-gray-800">{app.date}</td>
                <td className="border px-4 py-2 text-gray-800">
                  {app.status === 'approved'
                    ? 'Bekliyor'
                    : app.status === 'accepted'
                      ? 'Kabul Edildi'
                      : app.status === 'rejected'
                        ? 'Reddedildi'
                        : 'Bilinmiyor'}
                </td>
                <td className="border px-4 py-2">
                  {app.status === 'approved' && (
                    <>
                      <button className="bg-green-500 text-white px-3 py-1 mr-2 rounded" onClick={() => acceptApplication(app.id)}>Kabul Et</button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => rejectApplication(app.id)}>Reddet</button>
                    </>
                  )}

                  {app.status === 'enrolled' && app.active == false && (<> <p className='text-black'>KAYDEDİLDİ</p> </>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}