import { useState, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { useAppData } from '../hooks/useAppData';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, login } = useUser();
    const { xp, level, history } = useAppData();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    // Helper: Compress Image to Base64 (Same as Gallery)
    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const MAX_SIZE = 500; // Smaller for profile
                    if (width > height) {
                        if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
                    } else {
                        if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.8));
                };
            };
            reader.onerror = reject;
        });
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);

        try {
            // Compress and save directly to User object (LocalStorage for now)
            // In a real app with Auth, we'd save to Auth Profile. 
            // Here we save to Context which persists to LocalStorage.
            const base64 = await compressImage(file);

            // Update Context
            const updatedUser = { ...user, photoURL: base64 };
            login(updatedUser); // Reuse login to update state/storage

            alert("Foto de perfil atualizada!");
        } catch (err) {
            console.error(err);
            alert("Erro ao salvar foto.");
        } finally {
            setUploading(false);
        }
    };

    // Stats
    const joinDate = new Date("2024-01-01"); // Example start date
    const daysTogether = Math.floor((new Date() - joinDate) / (1000 * 60 * 60 * 24));
    const myActions = history ? history.filter(h => h.user === user.name).length : 0;

    return (
        <div className="p-4 pb-24 min-h-screen">
            <button onClick={() => navigate('/')} className="mb-4 text-white/50 hover:text-white flex items-center gap-2">
                <i className="fas fa-arrow-left"></i> Voltar
            </button>

            <div className="flex flex-col items-center">
                <div className="relative group">
                    <div className={`w-32 h-32 rounded-full border-4 border-brand-gold shadow-2xl overflow-hidden flex items-center justify-center bg-black/40 ${uploading ? 'animate-pulse' : ''}`}>
                        {user.photoURL ? (
                            <img src={user.photoURL} alt="Perfil" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl">{user.name === 'Marcelo' ? '🧔🏻' : '👩🏻'}</span>
                        )}
                    </div>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="absolute bottom-0 right-0 bg-brand-blue text-white w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#1a1a1a] shadow-lg active:scale-95 transition-transform"
                    >
                        <i className="fas fa-camera"></i>
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </div>

                <h1 className="text-2xl font-bold text-white mt-4">{user.name}</h1>
                <p className="text-brand-gold text-sm font-serif italic">Nível {level?.nome || 'Iniciante'}</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="glass p-4 rounded-xl text-center">
                    <h3 className="text-xs text-white/50 uppercase">Dias Juntos</h3>
                    <p className="text-2xl font-bold text-white">{daysTogether}</p>
                </div>
                <div className="glass p-4 rounded-xl text-center">
                    <h3 className="text-xs text-white/50 uppercase">XP Contribuído</h3>
                    <p className="text-2xl font-bold text-white">~</p>
                </div>
                <div className="glass p-4 rounded-xl text-center col-span-2">
                    <h3 className="text-xs text-white/50 uppercase">Atividades Registradas</h3>
                    <p className="text-2xl font-bold text-white">{myActions}</p>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-serif text-white mb-4">Conquistas</h3>
                <div className="grid grid-cols-4 gap-2">
                    {/* Badges Placeholder */}
                    <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center text-2xl opacity-50"><i className="fas fa-medal"></i></div>
                    <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center text-2xl opacity-50"><i className="fas fa-star"></i></div>
                    <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center text-2xl opacity-50"><i className="fas fa-heart"></i></div>
                    <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center text-2xl opacity-50"><i className="fas fa-trophy"></i></div>
                </div>
            </div>
        </div>
    );
}
