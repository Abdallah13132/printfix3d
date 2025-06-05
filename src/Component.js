import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Component = () => {
    const [repairFormData, setRepairFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        images: []
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setRepairFormData({
            ...repairFormData,
            [e.target.id]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        Promise.all(files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve({
                        name: file.name,
                        data: reader.result.split(',')[1] // Get base64 data without prefix
                    });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }))
        .then(images => {
            setRepairFormData(prev => ({
                ...prev,
                images
            }));
        })
        .catch(error => {
            console.error('Error reading files:', error);
            setStatus({ type: 'error', message: 'Erreur lors du chargement des images' });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Envoi en cours...' });

        try {
            const response = await fetch('http://localhost:5000/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(repairFormData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Demande envoyée avec succès!' });
                setRepairFormData({
                    name: '',
                    email: '',
                    phone: '',
                    description: '',
                    images: []
                });
                // Reset file input
                const fileInput = document.getElementById('fileUpload');
                if (fileInput) fileInput.value = '';
            } else {
                throw new Error(data.error || 'Une erreur est survenue');
            }
        } catch (error) {
            setStatus({ type: 'error', message: error.message });
        }
    };

    return (
<div id="webcrumbs"> 
        	<div className="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans bg-gradient-to-b from-white to-gray-50">
	    <header className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
	        <div className="flex items-center mb-6 md:mb-0">
	            <svg
	                className="w-10 h-10 md:w-12 md:h-12 text-primary-600 mr-3 transition-transform duration-300 hover:scale-110"
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
	            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600">
	                PrintFix3D
	            </h1>
	            {/* Next: "Add tagline under logo" */}
	        </div>
	        <nav className="flex flex-wrap justify-center gap-2 md:gap-4 items-center">
	            <a
	                href="#services"
	                className="px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium text-sm md:text-base"
	            >
	                Services
	            </a>
	            <a
	                href="#how-it-works"
	                className="px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium text-sm md:text-base"
	            >
	                Comment ça marche
	            </a>
	            <a
	                href="#gallery"
	                className="px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium text-sm md:text-base"
	            >
	                Galerie
	            </a>
	            <a
	                href="#pricing"
	                className="px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium text-sm md:text-base"
	            >
	                Tarifs
	            </a>
	            <Link
	                to="/contact"
	                className="px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium text-sm md:text-base"
	            >
	                Contact
	            </Link>
	            <details className="relative group">
	                <summary className="px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center gap-1 md:gap-2 cursor-pointer list-none text-sm md:text-base">
	                    <span className="material-symbols-outlined text-gray-600 text-sm md:text-base">language</span>
	                    <span className="font-medium">FR</span>
	                    <span className="material-symbols-outlined text-gray-600 transition-transform duration-300 group-open:rotate-180 text-sm md:text-base">
	                        expand_more
	                    </span>
	                </summary>
	                <div className="absolute right-0 mt-2 w-36 md:w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-20">
	                    <a
	                        href="#"
	                        className="block px-4 py-2 hover:bg-gray-50 rounded-t-lg transition-colors duration-200 font-medium text-sm md:text-base"
	                    >
	                        Français
	                    </a>
	                    <a
	                        href="#"
	                        className="block px-4 py-2 hover:bg-gray-50 transition-colors duration-200 font-medium text-sm md:text-base"
	                    >
	                        English
	                    </a>
	                    <a
	                        href="#"
	                        className="block px-4 py-2 hover:bg-gray-50 rounded-b-lg transition-colors duration-200 font-medium text-sm md:text-base"
	                    >
	                        Español
	                    </a>
	                </div>
	            </details>
	            {/* Next: "Add mobile menu toggle button" */}
	        </nav>
	    </header>
	
	    <section className="mb-12 md:mb-20">
	        <div className="flex flex-col lg:flex-row items-center">
	            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
	                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
	                    Donner une seconde chance a votre objet
	                </h2>
	                <p className="text-base md:text-lg mb-6 md:mb-8 text-gray-700">
	                    Notre service de réparation et reproduction par impression 3D vous permet de remplacer facilement
	                    des pièces cassées ou manquantes. Téléchargez simplement une photo, et nous nous occupons du reste.
	                </p>
	                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
	                    <a
	                        href="#upload"
	                        className="px-4 py-2 md:px-6 md:py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 text-center font-medium transform hover:scale-105"
	                    >
	                        Commencer maintenant
	                    </a>
	                    <a
	                        href="#how-it-works"
	                        className="px-4 py-2 md:px-6 md:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 text-center font-medium"
	                    >
	                        En savoir plus
	                    </a>
	                </div>
	                {/* Next: "Add trust badges or customer count" */}
	            </div>
	            <div className="lg:w-1/2 relative">
	                <img
	                    src="https://images.unsplash.com/photo-1611505908502-5b67e53e3a76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50aW5nfGVufDB8fHx8MTc0NzY2NzE1OHww&ixlib=rb-4.1.0&q=80&w=1080"
	                    alt="Impression 3D"
	                    className="rounded-xl md:rounded-2xl shadow-xl w-full transform transition-transform duration-500 hover:shadow-2xl"
	                    keywords="3D printing, object repair, broken object, 3D printer"
	                />
	                <div className="absolute -bottom-3 -left-3 md:-bottom-5 md:-left-5 bg-white p-3 md:p-4 rounded-lg md:rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
	                    <span className="block text-lg md:text-xl font-bold text-primary-600">96%</span>
	                    <span className="text-xs md:text-sm">de clients satisfaits</span>
	                </div>
	                <div className="absolute -top-3 -right-3 md:-top-5 md:-right-5 bg-white p-3 md:p-4 rounded-lg md:rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
	                    <span className="block text-lg md:text-xl font-bold text-primary-600">48h</span>
	                    <span className="text-xs md:text-sm">délai moyen</span>
	                </div>
	                {/* Next: "Add image carousel or before/after slider" */}
	            </div>
	        </div>
	    </section>
	
	    <section
	        id="upload"
	        className="mb-12 md:mb-20 bg-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg border border-gray-100"
	    >
	        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Envoyez-nous votre objet à réparer</h2>
	        
	        {status.message && (
	            <div className={`mb-6 p-4 rounded-lg ${
	                status.type === 'success' ? 'bg-green-100 text-green-700' :
	                status.type === 'error' ? 'bg-red-100 text-red-700' :
	                'bg-blue-100 text-blue-700'
	            }`}>
	                {status.message}
	            </div>
	        )}

	        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
	            <div className="bg-gray-50 p-4 md:p-6 rounded-lg md:rounded-xl hover:shadow-md transition-all duration-300">
	                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3 md:mb-4 transition-transform duration-300 hover:scale-110">
	                    <span className="material-symbols-outlined text-primary-600">photo_camera</span>
	                </div>
	                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">1. Prenez des photos</h3>
	                <p className="text-sm md:text-base text-gray-600">
	                    Capturez plusieurs angles de votre objet cassé pour que nous puissions bien comprendre le problème.
	                </p>
	            </div>
	            <div className="bg-gray-50 p-4 md:p-6 rounded-lg md:rounded-xl hover:shadow-md transition-all duration-300">
	                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3 md:mb-4 transition-transform duration-300 hover:scale-110">
	                    <span className="material-symbols-outlined text-primary-600">upload_file</span>
	                </div>
	                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">2. Téléchargez-les</h3>
	                <p className="text-sm md:text-base text-gray-600">
	                    Utilisez notre formulaire sécurisé pour nous envoyer les images et la description du problème.
	                </p>
	            </div>
	            <div className="bg-gray-50 p-4 md:p-6 rounded-lg md:rounded-xl hover:shadow-md transition-all duration-300">
	                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3 md:mb-4 transition-transform duration-300 hover:scale-110">
	                    <span className="material-symbols-outlined text-primary-600">landscape</span>
	                </div>
	                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">3. Recevez votre devis</h3>
	                <p className="text-sm md:text-base text-gray-600">
	                    Nous vous envoyons un devis détaillé sous 24h avec les différentes options possibles.
	                </p>
	            </div>
	        </div>

	        <form onSubmit={handleSubmit}>
	            <div className="bg-gray-50 p-4 md:p-6 rounded-lg md:rounded-xl mb-6 md:mb-8">
	                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 hover:border-primary-400 transition-colors duration-300">
	                    <input 
	                        type="file" 
	                        id="fileUpload" 
	                        className="hidden" 
	                        multiple 
	                        accept="image/*"
	                        onChange={handleFileChange}
	                    />
	                    <label htmlFor="fileUpload" className="flex flex-col items-center cursor-pointer">
	                        <span className="material-symbols-outlined text-4xl md:text-5xl text-gray-400 mb-3 md:mb-4 transition-transform duration-300 hover:scale-110">
	                            upload_file
	                        </span>
	                        <span className="text-base md:text-lg font-medium mb-1 md:mb-2 text-center">
	                            Glissez vos images ici ou cliquez pour les sélectionner
	                        </span>
	                        <span className="text-xs md:text-sm text-gray-500 text-center">
	                            JPG, PNG ou GIF - Max 10 Mo par image
	                        </span>
	                    </label>
	                </div>
	                {repairFormData.images.length > 0 && (
	                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
	                        {repairFormData.images.map((image, index) => (
	                            <div key={index} className="relative">
	                                <img
	                                    src={`data:image/jpeg;base64,${image.data}`}
	                                    alt={`Uploaded ${index + 1}`}
	                                    className="w-full h-24 object-cover rounded-lg"
	                                />
	                                <button
	                                    type="button"
	                                    onClick={() => {
	                                        setRepairFormData(prev => ({
	                                            ...prev,
	                                            images: prev.images.filter((_, i) => i !== index)
	                                        }));
	                                    }}
	                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
	                                >
	                                    ×
	                                </button>
	                            </div>
	                        ))}
	                    </div>
	                )}
	            </div>

	            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
	                <div>
	                    <label className="block text-sm font-medium mb-1 md:mb-2" htmlFor="description">
	                        Description du problème
	                    </label>
	                    <textarea
	                        id="description"
	                        value={repairFormData.description}
	                        onChange={handleChange}
	                        rows="4"
	                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-sm md:text-base"
	                        placeholder="Décrivez comment l'objet s'est cassé et ce que vous souhaitez réparer..."
	                        required
	                    ></textarea>
	                </div>
	                <div>
	                    <label className="block text-sm font-medium mb-1 md:mb-2" htmlFor="contact">
	                        Vos coordonnées
	                    </label>
	                    <input
	                        type="text"
	                        id="name"
	                        value={repairFormData.name}
	                        onChange={handleChange}
	                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg mb-2 md:mb-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-sm md:text-base"
	                        placeholder="Nom complet"
	                        required
	                    />
	                    <input
	                        type="email"
	                        id="email"
	                        value={repairFormData.email}
	                        onChange={handleChange}
	                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg mb-2 md:mb-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-sm md:text-base"
	                        placeholder="E-mail"
	                        required
	                    />
	                    <input
	                        type="tel"
	                        id="phone"
	                        value={repairFormData.phone}
	                        onChange={handleChange}
	                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-sm md:text-base"
	                        placeholder="Téléphone"
	                    />
	                </div>
	            </div>

	            <div className="text-center">
	                <button
	                    type="submit"
	                    className="px-6 py-2 md:px-8 md:py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 font-medium transform hover:scale-105 text-sm md:text-base"
	                >
	                    Envoyer ma demande
	                </button>
	            </div>
	        </form>
	    </section>
	
	    <section id="how-it-works" className="mb-12 md:mb-20">
	        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">Comment fonctionne notre service ?</h2>
	        <div className="relative">
	            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
	            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
	                <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
	                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mb-3 md:mb-4 mx-auto">
	                        1
	                    </div>
	                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-center">Envoi des photos</h3>
	                    <p className="text-sm md:text-base text-gray-600 text-center">
	                        Téléchargez des photos de votre objet cassé sous plusieurs angles
	                    </p>
	                </div>
	                <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
	                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mb-3 md:mb-4 mx-auto">
	                        2
	                    </div>
	                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-center">Modélisation 3D</h3>
	                    <p className="text-sm md:text-base text-gray-600 text-center">
	                        Nos experts créent un modèle 3D précis de la pièce à remplacer
	                    </p>
	                </div>
	                <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
	                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mb-3 md:mb-4 mx-auto">
	                        3
	                    </div>
	                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-center">Impression 3D</h3>
	                    <p className="text-sm md:text-base text-gray-600 text-center">
	                        La pièce est imprimée avec le matériau adapté à vos besoins
	                    </p>
	                </div>
	                <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
	                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mb-3 md:mb-4 mx-auto">
	                        4
	                    </div>
	                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-center">Livraison</h3>
	                    <p className="text-sm md:text-base text-gray-600 text-center">
	                        Votre pièce est finalisée, contrôlée et livrée chez vous
	                    </p>
	                </div>
	            </div>
	            {/* Next: "Add video demonstration or animation" */}
	        </div>
	    </section>
	
	    <section id="gallery" className="mb-12 md:mb-20">
	        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">Nos réalisations</h2>
	        <p className="text-center text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto text-gray-600">
	            Découvrez quelques exemples de pièces que nous avons reproduites ou réparées pour nos clients.
	        </p>
	
	        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
	            <div className="group relative overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
	                <img
	                    src="https://images.unsplash.com/photo-1645084102549-e766a3a24827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBwYXJ0fGVufDB8fHx8MTc0NzY2NzIwMnww&ixlib=rb-4.1.0&q=80&w=1080"
	                    alt="Pièce de remplacement pour aspirateur"
	                    className="w-full h-48 md:h-64 object-cover transform group-hover:scale-105 transition-all duration-500"
	                    keywords="3D printed part, vacuum cleaner, replacement part, 3D printing"
	                />
	                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
	                    <h3 className="text-white font-semibold text-sm md:text-base">
	                        Pièce de remplacement pour aspirateur
	                    </h3>
	                    <p className="text-gray-200 text-xs md:text-sm">Matériau: PLA renforcé</p>
	                </div>
	            </div>
	
	            <div className="group relative overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
	                <img
	                    src="https://images.unsplash.com/photo-1680536555364-9dd4a1ab313e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjB0YWJsZXQlMjBzdGFuZHxlbnwwfHx8fDE3NDc2NjcyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
	                    alt="Support de tablette cassé"
	                    className="w-full h-48 md:h-64 object-cover transform group-hover:scale-105 transition-all duration-500"
	                    keywords="3D printed tablet stand, broken stand, replacement part, 3D printing repair"
	                />
	                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
	                    <h3 className="text-white font-semibold text-sm md:text-base">Support de tablette réparé</h3>
	                    <p className="text-gray-200 text-xs md:text-sm">Matériau: ABS haute résistance</p>
	                </div>
	            </div>
	
	            <div className="group relative overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
	                <img
	                    src="https://images.unsplash.com/photo-1626785774573-4b799315345d"
	                    alt="Engrenage pour machine à café"
	                    className="w-full h-48 md:h-64 object-cover transform group-hover:scale-105 transition-all duration-500"
	                    keywords="3D printed gear, coffee machine part, mechanical part, 3D printing"
	                />
	                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
	                    <h3 className="text-white font-semibold text-sm md:text-base">Engrenage pour machine à café</h3>
	                    <p className="text-gray-200 text-xs md:text-sm">Matériau: PETG alimentaire</p>
	                </div>
	            </div>
	
	            <div className="group relative overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
	                <img
	                    src="https://images.unsplash.com/photo-1489367874814-f5d040621dd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjB0b3klMjBwYXJ0fGVufDB8fHx8MTc0NzY2NzIzMXww&ixlib=rb-4.1.0&q=80&w=1080"
	                    alt="Pièce de jouet cassé"
	                    className="w-full h-48 md:h-64 object-cover transform group-hover:scale-105 transition-all duration-500"
	                    keywords="3D printed toy part, broken toy, children toy repair, 3D printing"
	                />
	                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
	                    <h3 className="text-white font-semibold text-sm md:text-base">Pièce de jouet remplacée</h3>
	                    <p className="text-gray-200 text-xs md:text-sm">Matériau: PLA coloré non-toxique</p>
	                </div>
	            </div>
	
	            <div className="group relative overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
	                <img
	                    src="https://images.unsplash.com/photo-1581092162384-8987c1d64718"
	                    alt="Boîtier électronique"
	                    className="w-full h-48 md:h-64 object-cover transform group-hover:scale-105 transition-all duration-500"
	                    keywords="3D printed electronics case, custom case, electronic housing, 3D printing"
	                />
	                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
	                    <h3 className="text-white font-semibold text-sm md:text-base">Boîtier électronique sur mesure</h3>
	                    <p className="text-gray-200 text-xs md:text-sm">Matériau: ABS ignifuge</p>
	                </div>
	            </div>
	
	            <div className="group relative overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
	                <img
	                    src="https://images.unsplash.com/photo-1567016432779-094069958ea5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBmdXJuaXR1cmUlMjBwYXJ0fGVufDB8fHx8MTc0NzY2NzIzN3ww&ixlib=rb-4.1.0&q=80&w=1080"
	                    alt="Pièce de meuble IKEA"
	                    className="w-full h-48 md:h-64 object-cover transform group-hover:scale-105 transition-all duration-500"
	                    keywords="3D printed furniture part, IKEA part, furniture repair, 3D printing"
	                />
	                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
	                    <h3 className="text-white font-semibold text-sm md:text-base">Connecteur pour meuble</h3>
	                    <p className="text-gray-200 text-xs md:text-sm">Matériau: PETG haute résistance</p>
	                </div>
	            </div>
	        </div>
	
	        <div className="text-center mt-6 md:mt-10">
	            <a
	                href="#more-gallery"
	                className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium text-sm md:text-base"
	            >
	                Voir plus d'exemples
	                <span className="material-symbols-outlined ml-1 md:ml-2 text-sm md:text-base">arrow_forward</span>
	            </a>
	            {/* Next: "Add gallery filtering options" */}
	        </div>
	    </section>
	
	    <section id="pricing" className="mb-12 md:mb-20">
	        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">Nos tarifs</h2>
	        <p className="text-center text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto text-gray-600">
	            Des solutions adaptées à tous les budgets et à tous les besoins.
	        </p>
	
	        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
	            <div className="bg-white p-6 md:p-8 rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
	                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto transition-transform duration-300 hover:scale-110">
	                    <span className="material-symbols-outlined text-2xl md:text-3xl text-primary-600">build</span>
	                </div>
	                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-center">Réparation Simple</h3>
	                <p className="text-sm md:text-base text-gray-600 text-center mb-4 md:mb-6">
	                    Pour les petites pièces et réparations simples
	                </p>
	                <p className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">20€ - 50€</p>
	                <ul className="mb-6 md:mb-8 space-y-1 md:space-y-2 text-sm md:text-base">
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Pièces jusqu'à 50g
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Modélisation 3D basique
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Matériaux standards (PLA/ABS)
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Délai: 3-5 jours ouvrés
	                    </li>
	                </ul>
	                <a
	                    href="#contact"
	                    className="block text-center py-2 md:py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-all duration-300 font-medium text-sm md:text-base"
	                >
	                    Demander un devis
	                </a>
	            </div>
	
	            <div className="bg-white p-6 md:p-8 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary-600 transform hover:-translate-y-2 scale-100 md:scale-105 relative">
	                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-medium">
	                    Le plus populaire
	                </div>
	                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto transition-transform duration-300 hover:scale-110">
	                    <span className="material-symbols-outlined text-2xl md:text-3xl text-primary-600">
	                        construction
	                    </span>
	                </div>
	                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-center">Réparation Standard</h3>
	                <p className="text-sm md:text-base text-gray-600 text-center mb-4 md:mb-6">
	                    Pour la plupart des objets du quotidien
	                </p>
	                <p className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">40€ - 90€</p>
	                <ul className="mb-6 md:mb-8 space-y-1 md:space-y-2 text-sm md:text-base">
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Pièces jusqu'à 150g
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Modélisation 3D avancée
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Choix étendu de matériaux
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Délai: 2-4 jours ouvrés
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Finitions de base
	                    </li>
	                </ul>
	                <a
	                    href="#contact"
	                    className="block text-center py-2 md:py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 font-medium text-sm md:text-base transform hover:scale-105"
	                >
	                    Demander un devis
	                </a>
	            </div>
	
	            <div className="bg-white p-6 md:p-8 rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
	                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto transition-transform duration-300 hover:scale-110">
	                    <span className="material-symbols-outlined text-2xl md:text-3xl text-primary-600">
	                        precision_manufacturing
	                    </span>
	                </div>
	                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-center">Réparation Premium</h3>
	                <p className="text-sm md:text-base text-gray-600 text-center mb-4 md:mb-6">
	                    Pour les pièces complexes et techniques
	                </p>
	                <p className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">80€ - 200€</p>
	                <ul className="mb-6 md:mb-8 space-y-1 md:space-y-2 text-sm md:text-base">
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Pièces jusqu'à 500g
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Modélisation 3D professionnelle
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Matériaux techniques spécialisés
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Délai: 1-3 jours ouvrés
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Finitions professionnelles
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-green-500 mr-2 text-sm md:text-base">
	                            check_circle
	                        </span>
	                        Tests de résistance
	                    </li>
	                </ul>
	                <a
	                    href="#contact"
	                    className="block text-center py-2 md:py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-all duration-300 font-medium text-sm md:text-base"
	                >
	                    Demander un devis
	                </a>
	                {/* Next: "Add comparison table toggle" */}
	            </div>
	        </div>
	    </section>
	
	    <section id="testimonials" className="mb-12 md:mb-20">
	        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">Ce que disent nos clients</h2>
	
	        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
	            <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
	                <div className="flex items-center mb-3 md:mb-4">
	                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full mr-3 md:mr-4 overflow-hidden flex items-center justify-center">
	                        <span className="material-symbols-outlined text-gray-500">person</span>
	                    </div>
	                    <div>
	                        <h4 className="font-semibold text-sm md:text-base">Sophie Martin</h4>
	                        <div className="flex text-yellow-400 text-xs md:text-sm">
	                            <span className="material-symbols-outlined">star</span>
	                            <span className="material-symbols-outlined">star</span>
	                            <span className="material-symbols-outlined">star</span>
	                            <span className="material-symbols-outlined">star</span>
	                            <span className="material-symbols-outlined">star</span>
	                        </div>
	                    </div>
	                </div>
	                <p className="text-sm md:text-base text-gray-600 italic">
	                    "Service impeccable ! Ma pièce d'aspirateur a été parfaitement reproduite et livrée en 3 jours. Je
	                    recommande vivement."
	                </p>
	            </div>
	
	            <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
	                <div className="flex items-center mb-3 md:mb-4">
	                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full mr-3 md:mr-4 overflow-hidden flex items-center justify-center">
	                        <span className="material-symbols-outlined text-gray-500">person</span>
	                    </div>
	                    <div>
	                        <h4 className="font-semibold text-sm md:text-base">Thomas Dubois</h4>
	                        <div className="flex text-yellow-400 text-xs md:text-sm">
	                            <span className="material-symbols-outlined">star</span>
	                            <span className="material-symbols-outlined">star</span>
	                            <span className="material-symbols-outlined">star</span>
	                            <span className="material-symbols-outlined">star</span>
	                            <span className="material-symbols-outlined">star_half</span>
	                        </div>
	                    </div>
	                </div>
	                <p className="text-sm md:text-base text-gray-600 italic">
	                    "J'ai pu réparer mon meuble IKEA dont une pièce était cassée. Le prix était raisonnable et la
	                    qualité au rendez-vous."
	                </p>
	            </div>
	
	            <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
	                <div className="flex items-center mb-3 md:mb-4">
	                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full mr-3 md:mr-4 overflow-hidden flex items-center justify-center">
	                        <span className="material-symbols-outlined text-gray-500">person</span>
	                    </div>
	                    <div>
	                        <h4 className="font-semibold text-sm md:text-base">Léa Petit</h4>
	                        <div className="flex text-yellow-400 text-xs md:text-sm">
	                            <span className="material-symbols-outlined">star</span>
	                            <span className="material-symbols-outlined">star</span>
	                            <span className="material-symbols-outlined">star</span>
	                            <span className="material-symbols-outlined">star</span>
	                            <span className="material-symbols-outlined">star</span>
	                        </div>
	                    </div>
	                </div>
	                <p className="text-sm md:text-base text-gray-600 italic">
	                    "Excellent service ! Le jouet préféré de mon fils est comme neuf grâce à la pièce que PrintFix3D a
	                    reproduite. Service client très réactif."
	                </p>
	            </div>
	            {/* Next: "Add testimonial slider for mobile" */}
	        </div>
	    </section>
	
	    <footer className="pt-8 pb-6 border-t border-gray-200">
	        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
	            <div>
	                <div className="flex items-center mb-4">
	                    <svg
	                        className="w-8 h-8 text-primary-600 mr-2"
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
	                    <span className="text-xl font-bold">PrintFix3D</span>
	                </div>
	                <p className="text-sm text-gray-600 mb-4">
	                    Service de réparation et reproduction d'objets par impression 3D.
	                </p>
	                <div className="flex space-x-4">
	                    <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors duration-300">
	                        <span className="material-symbols-outlined">facebook</span>
	                    </a>
	                    <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors duration-300">
	                        <span className="material-symbols-outlined">mail</span>
	                    </a>
	                    <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors duration-300">
	                        <span className="material-symbols-outlined">call</span>
	                    </a>
	                </div>
	            </div>
	
	            <div>
	                <h3 className="font-semibold mb-4">Liens rapides</h3>
	                <ul className="space-y-2 text-sm">
	                    <li>
	                        <a
	                            href="#services"
	                            className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
	                        >
	                            Services
	                        </a>
	                    </li>
	                    <li>
	                        <a
	                            href="#how-it-works"
	                            className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
	                        >
	                            Comment ça marche
	                        </a>
	                    </li>
	                    <li>
	                        <a
	                            href="#gallery"
	                            className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
	                        >
	                            Galerie
	                        </a>
	                    </li>
	                    <li>
	                        <a
	                            href="#pricing"
	                            className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
	                        >
	                            Tarifs
	                        </a>
	                    </li>
	                    <li>
	                        <a
	                            href="#contact"
	                            className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
	                        >
	                            Contact
	                        </a>
	                    </li>
	                </ul>
	            </div>
	
	            <div>
	                <h3 className="font-semibold mb-4">Informations</h3>
	                <ul className="space-y-2 text-sm">
	                    <li>
	                        <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors duration-300">
	                            À propos de nous
	                        </a>
	                    </li>
	                    <li>
	                        <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors duration-300">
	                            FAQ
	                        </a>
	                    </li>
	                    <li>
	                        <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors duration-300">
	                            Conditions générales
	                        </a>
	                    </li>
	                    <li>
	                        <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors duration-300">
	                            Politique de confidentialité
	                        </a>
	                    </li>
	                </ul>
	            </div>
	
	            <div>
	                <h3 className="font-semibold mb-4">Contact</h3>
	                <ul className="space-y-2 text-sm">
	                    <li className="flex items-start">
	                        <span className="material-symbols-outlined text-primary-600 mr-2 mt-1">location_on</span>
	                        <span className="text-gray-600">
	                            123 Rue de l'Innovation
	                            <br />
	                            75001 Paris, France
	                        </span>
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-primary-600 mr-2">phone</span>
	                        <span className="text-gray-600">+33 1 23 45 67 89</span>
	                    </li>
	                    <li className="flex items-center">
	                        <span className="material-symbols-outlined text-primary-600 mr-2">email</span>
	                        <span className="text-gray-600">contact@printfix3d.fr</span>
	                    </li>
	                </ul>
	            </div>
	        </div>
	
	        <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-200">
	            <p>© {new Date().getFullYear()} PrintFix3D. Tous droits réservés.</p>
	        </div>
	    </footer>
	</div> 
        </div>
  )
}

 