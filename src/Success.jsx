import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Success = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // If somehow landed here without auth, send to signup
    React.useEffect(() => {
        if (!user) {
            const timer = setTimeout(() => {
                navigate('/signup');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [user, navigate]);

    return (
        <div className="relative h-[100dvh] w-full overflow-hidden bg-primary flex flex-col justify-center items-center px-6">
            {/* Background with Noise & Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                <img
                    src="/cloud_aesthetic_bg.png"
                    alt="Atmospheric dark organic texture"
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-primary/40"></div>
            </div>

            <div className="relative z-10 w-full max-w-sm md:max-w-md bg-background/5 backdrop-blur-xl border border-background/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-center overflow-hidden">
                {/* subtle flare */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-[80px]"></div>

                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30 shadow-[0_0_30px_rgba(204,88,51,0.3)]">
                        <CheckCircle className="w-10 h-10 text-accent" />
                    </div>
                </div>

                <h1 className="font-sans font-bold text-3xl md:text-4xl text-background tracking-tight mb-3">
                    Protocol Verified
                </h1>
                
                <p className="text-background/70 font-sans leading-relaxed mb-8">
                    Your identity has been successfully authenticated. Welcome to the system.
                </p>

                <Link to="/" className="w-full bg-white text-black hover:bg-gray-200 transition-colors rounded-full px-8 py-3 font-bold text-base font-sans inline-flex items-center justify-center gap-3 shadow-xl">
                    Enter Dashboard
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

export default Success;
