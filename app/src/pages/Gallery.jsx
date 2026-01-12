import { useState, useEffect, useRef } from 'react';
import { ref as dbRef, push, onValue, remove } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
    const { user } = useUser();
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // For Lightbox
    const fileInputRef = useRef(null);

    useEffect(() => {
        const photosRef = dbRef(db, 'fotos');
        const unsubscribe = onValue(photosRef, (snapshot) => {
            const val = snapshot.val();
            const list = [];
            if (val) Object.keys(val).forEach(k => list.push({ id: k, ...val[k] }));
            setImages(list.reverse());
        });
        return () => unsubscribe();
    }, []);

    // Helper: Compress and convert image to Base64
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

                    const MAX_SIZE = 1024;
                    if (width > height) {
                        if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
                    } else {
                        if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(dataUrl);
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) return alert("Arquivo muito grande (Máx 5MB).");

        setUploading(true);
        let timeoutId;

        try {
            const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_').toLowerCase();
            const filename = `gallery/${Date.now()}_${cleanName}`;
            const imgRef = storageRef(storage, filename);

            console.log('Tentando upload via Storage...');

            const uploadPromise = uploadBytes(imgRef, file);
            const timeoutPromise = new Promise((_, reject) =>
                timeoutId = setTimeout(() => reject(new Error('TIMEOUT')), 10000)
            );

            await Promise.race([uploadPromise, timeoutPromise]);
            clearTimeout(timeoutId);

            const url = await getDownloadURL(imgRef);
            console.log('Upload Storage Sucesso:', url);
            await saveToDb(url);

        } catch (error) {
            clearTimeout(timeoutId);
            console.warn("Storage falhou. Tentando modo de compatibilidade...", error);

            try {
                const base64 = await compressImage(file);
                await saveToDb(base64);
                alert("Foto salva (Modo Compatibilidade)!");
            } catch (fallbackError) {
                console.error(fallbackError);
                alert("Erro total ao salvar a foto.");
            }
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const saveToDb = async (url) => {
        await push(dbRef(db, 'fotos'), {
            url,
            date: new Date().toLocaleDateString(),
            user: user.name,
            timestamp: Date.now()
        });
        await push(dbRef(db, 'historico'), {
            date: new Date().toLocaleDateString(),
            user: user.name,
            desc: '📸 Foto Nova',
            xp: 5,
            tipo: 'foto'
        });
    };

    const deleteImage = async (e, id) => {
        e.stopPropagation();
        if (confirm("Tem certeza que deseja apagar esta foto para sempre?")) {
            await remove(dbRef(db, `fotos/${id}`));
            if (selectedImage?.id === id) setSelectedImage(null);
        }
    };

    const cancelUpload = () => {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
        alert("Envio cancelado manualmente.");
    };

    // Navigation logic with Swipe
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const handleNext = (e) => {
        if (e) e.stopPropagation();
        const currentIndex = images.findIndex(img => img.id === selectedImage.id);
        if (currentIndex < images.length - 1) {
            setSelectedImage(images[currentIndex + 1]);
        }
    };

    const handlePrev = (e) => {
        if (e) e.stopPropagation();
        const currentIndex = images.findIndex(img => img.id === selectedImage.id);
        if (currentIndex > 0) {
            setSelectedImage(images[currentIndex - 1]);
        }
    };

    return (
        <div className="p-4 pb-24 min-h-screen">

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 bg-black/98 backdrop-blur-xl" onClick={() => setSelectedImage(null)}>

                        {/* Close Button - Moved Down for Safety */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-20 right-4 z-[110] bg-white/10 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white backdrop-blur-md pt-[env(safe-area-inset-top)]"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        {/* Delete Button (Lightbox) - Moved Down for Safety */}
                        <button
                            onClick={(e) => deleteImage(e, selectedImage.id)}
                            className="absolute top-20 right-20 z-[110] bg-red-500/10 w-12 h-12 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors backdrop-blur-md pt-[env(safe-area-inset-top)]"
                        >
                            <i className="fas fa-trash-alt"></i>
                        </button>

                        {/* Navigation Arrows (Visual Hint) */}
                        {images.findIndex(img => img.id === selectedImage.id) > 0 && (
                            <button onClick={handlePrev} className="absolute left-2 z-50 p-4 text-white/30 hover:text-white transition-opacity"><i className="fas fa-chevron-left text-4xl"></i></button>
                        )}
                        {images.findIndex(img => img.id === selectedImage.id) < images.length - 1 && (
                            <button onClick={handleNext} className="absolute right-2 z-50 p-4 text-white/30 hover:text-white transition-opacity"><i className="fas fa-chevron-right text-4xl"></i></button>
                        )}

                        <motion.div
                            key={selectedImage.id}
                            initial={{ opacity: 0, x: 0, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}

                            // Gestures
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    handleNext();
                                } else if (swipe > swipeConfidenceThreshold) {
                                    handlePrev();
                                }
                            }}

                            className="relative w-full h-full flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.url}
                                className="w-full max-h-[80vh] object-contain shadow-2xl pointer-events-none" // pointer-events-none prevents dragging container instead of motion
                                alt="Zoom"
                            />

                            <div className="absolute bottom-10 text-center w-full z-10 pb-[env(safe-area-inset-bottom)]">
                                <p className="text-white font-bold text-lg drop-shadow-md">{selectedImage.user}</p>
                                <p className="text-white/60 text-sm drop-shadow-md">{selectedImage.date}</p>
                                <p className="text-white/30 text-[10px] mt-2 animate-pulse">Deslize para navegar ↔</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-serif text-brand-gold">Galeria</h1>

                {uploading ? (
                    <button onClick={cancelUpload} className="bg-red-500/20 text-red-500 border border-red-500/50 px-4 py-2 rounded-xl text-xs font-bold animate-pulse">
                        Cancelar Envio
                    </button>
                ) : (
                    <label className="btn-primary py-2 px-4 shadow-lg active:scale-95 cursor-pointer flex items-center gap-2">
                        <i className="fas fa-camera"></i>
                        <span>Nova Foto</span>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>
                )}
            </div>

            <div className="columns-2 gap-4 space-y-4">
                {images.map((img) => (
                    <motion.div
                        key={img.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="break-inside-avoid relative group rounded-xl overflow-hidden glass mb-4 cursor-pointer active:scale-95 transition-transform"
                        onClick={() => setSelectedImage(img)}
                    >
                        <img src={img.url} className="w-full object-cover" loading="lazy" />

                        {/* Overlay with details */}
                        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                            <span className="text-[10px] text-white/80">{img.date}</span>

                            {/* Delete Button (Grid) */}
                            <button
                                onClick={(e) => deleteImage(e, img.id)}
                                className="bg-red-500/80 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg active:scale-90"
                            >
                                <i className="fas fa-times text-[10px]"></i>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {images.length === 0 && <p className="text-center text-white/30 mt-20">Nenhuma foto ainda.</p>}
        </div>
    );
}
