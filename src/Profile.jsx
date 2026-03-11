import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { ArrowLeft, LogOut, Loader2, Save, User as UserIcon } from 'lucide-react';
import gsap from 'gsap';

const Profile = () => {
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    
    // Form state
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (!user && !loading) {
            navigate('/signup');
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        if (profile) {
            setDisplayName(profile.display_name || '');
            setUsername(profile.username || '');
        }
    }, [profile]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".profile-elem", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.1
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        try {
            const updates = {
                id: user.id,
                display_name: displayName,
                username: username,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                throw error;
            }
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000); // Clear message after 3s
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    // Helper for initials
    const getInitials = () => {
        if (displayName) return displayName.charAt(0).toUpperCase();
        if (profile?.display_name) return profile.display_name.charAt(0).toUpperCase();
        if (user?.email) return user.email.charAt(0).toUpperCase();
        return '?';
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-background animate-spin" />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative min-h-[100dvh] w-full bg-primary flex flex-col justify-center py-20">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
                    alt="Dark texture"
                    className="w-full h-full object-cover opacity-20 mix-blend-overlay grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-primary/80"></div>
            </div>

            {/* Nav */}
            <div className="absolute top-8 left-6 lg:left-12 z-20">
                <Link to="/" className="inline-flex items-center gap-2 text-background/60 hover:text-accent transition-colors font-mono text-xs uppercase tracking-wider group interactive">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Return</span>
                </Link>
            </div>

            {/* Profile Content */}
            <div className="relative z-10 w-full max-w-xl mx-auto px-6">
                <div className="bg-background/5 backdrop-blur-xl border border-background/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="profile-elem flex flex-col items-center mb-10">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 bg-dark border-4 border-background/10 flex items-center justify-center text-4xl font-sans font-bold text-background shadow-xl">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span>{getInitials()}</span>
                            )}
                        </div>
                        <h1 className="font-sans font-bold text-2xl md:text-3xl text-background tracking-tight">
                            Identity Configuration
                        </h1>
                        <p className="font-mono text-xs text-background/50 mt-2">{user.email}</p>
                    </div>

                    {message && (
                        <div className={`profile-elem px-4 py-3 rounded-xl mb-6 text-sm font-sans ${message.includes('success') ? 'bg-accent/20 border border-accent/50 text-accent-content' : 'bg-red-500/10 border border-red-500/50 text-red-200'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={updateProfile} className="flex flex-col gap-6">
                        <div className="profile-elem">
                            <label className="block font-mono text-xs text-background/50 uppercase tracking-widest mb-3 pl-1">
                                Display Name
                            </label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Your Name"
                                className="w-full bg-background/10 border border-background/20 rounded-2xl px-6 py-4 text-background placeholder:text-background/30 focus:outline-none focus:border-accent focus:bg-background/15 transition-all font-sans"
                            />
                        </div>

                        <div className="profile-elem">
                            <label className="block font-mono text-xs text-background/50 uppercase tracking-widest mb-3 pl-1">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="@username"
                                className="w-full bg-background/10 border border-background/20 rounded-2xl px-6 py-4 text-background placeholder:text-background/30 focus:outline-none focus:border-accent focus:bg-background/15 transition-all font-sans"
                            />
                        </div>

                        <div className="profile-elem mt-4">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="w-full btn-magnetic bg-accent text-background rounded-2xl px-6 py-4 font-bold text-lg font-sans flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Save Changes
                            </button>
                        </div>
                    </form>

                    <div className="profile-elem mt-8 pt-6 border-t border-background/10">
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center justify-center gap-3 py-4 text-background/60 hover:text-red-400 font-sans font-medium transition-colors rounded-xl hover:bg-red-500/10"
                        >
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
