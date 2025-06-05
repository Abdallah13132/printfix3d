import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Envoi en cours...' });

        try {
            const response = await fetch('http://localhost:5000/api/send-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message envoyé avec succès!' });
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                throw new Error(data.error || 'Une erreur est survenue');
            }
        } catch (error) {
            setStatus({ type: 'error', message: error.message });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50"> 
            <div className="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans">
                {/* Header avec retour à l'accueil */}
                <header className="flex justify-between items-center mb-8 md:mb-12">
                    <Link to="/" className="flex items-center group">
                        <svg
                            className="w-10 h-10 md:w-12 md:h-12 text-primary-600 mr-3 transition-transform duration-300 group-hover:scale-110"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2L2 7L12 12L22 7L12 2Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 17L12 22L22 17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 12L12 17L22 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="text-2xl md:text-3xl font-bold text-primary-600">
                            PrintFix3D
                        </span>
                    </Link>
                    <Link
                        to="/"
                        className="px-6 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-all duration-300"
                    >
                        Retour à l'accueil
                    </Link>
                </header>

                {/* Contenu principal */}
                <main className="flex flex-col gap-8">
                    {/* Titre de la page */}
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary-600">Contactez-nous</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Une question sur nos services ? Besoin d'un devis personnalisé ? Notre équipe est là pour vous répondre
                            dans les plus brefs délais.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Formulaire de contact */}
                        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-primary-600">Envoyez-nous un message</h2>
                            
                            {status.message && (
                                <div className={`mb-4 p-4 rounded-lg ${
                                    status.type === 'success' ? 'bg-green-100 text-green-700' :
                                    status.type === 'error' ? 'bg-red-100 text-red-700' :
                                    'bg-blue-100 text-blue-700'
                                }`}>
                                    {status.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-gray-700">
                                            Prénom
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-gray-700">
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700">
                                        Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-700">
                                        Sujet
                                    </label>
                                    <select
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                                        required
                                    >
                                        <option value="">Sélectionnez un sujet</option>
                                        <option value="devis">Demande de devis</option>
                                        <option value="information">Demande d'information</option>
                                        <option value="support">Support technique</option>
                                        <option value="other">Autre</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105"
                                >
                                    Envoyer le message
                                </button>
                            </form>
                        </div>

                        {/* Informations de contact et carte */}
                        <div className="space-y-8">
                            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-primary-600">Nos coordonnées</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <span className="material-symbols-outlined text-primary-600 mr-3">location_on</span>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Adresse</h3>
                                            <p className="text-gray-600">123 Rue de l'Innovation<br />75001 Paris, France</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <span className="material-symbols-outlined text-primary-600 mr-3">schedule</span>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Horaires d'ouverture</h3>
                                            <p className="text-gray-600">
                                                Lundi - Vendredi: 9h00 - 18h00<br />
                                                Samedi: 10h00 - 16h00<br />
                                                Dimanche: Fermé
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="material-symbols-outlined text-primary-600 mr-3">phone</span>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Téléphone</h3>
                                            <p className="text-gray-600">+33 1 23 45 67 89</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="material-symbols-outlined text-primary-600 mr-3">mail</span>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Email</h3>
                                            <p className="text-gray-600">contact@printfix3d.fr</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Carte */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-64">
                                <div className="w-full h-full bg-primary-50 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-6xl text-primary-600">map</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t border-gray-200">
                    <div className="text-center text-sm text-gray-600">
                        <p>© {new Date().getFullYear()} PrintFix3D. Tous droits réservés.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Contact; 