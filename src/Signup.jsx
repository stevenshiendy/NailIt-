import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthContext';

const Signup = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isSignUp, setIsSignUp] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [awaitingMagicLink, setAwaitingMagicLink] = useState(false);
    const [resendMessage, setResendMessage] = useState(null);

    // Redirect if already authenticated
    useEffect(() => {
      if (user) {
        navigate('/');
      }
    }, [user, navigate]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Entrance animation for form elements
            gsap.from(".form-elem", {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.1
            });

            // Subtle parallax on the background image
            gsap.to(".auth-bg", {
                scale: 1.05,
                duration: 10,
                ease: "none",
                repeat: -1,
                yoyo: true
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMsg(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Client-side validation for Sign Up
        if (isSignUp) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setErrorMsg("Please enter a valid email address.");
                return;
            }
            if (formData.password.length < 8) {
                setErrorMsg("Password must be at least 8 characters long.");
                return;
            }
            if (!/\d/.test(formData.password) || !/[a-zA-Z]/.test(formData.password)) {
                setErrorMsg("Password must contain a combination of letters and numbers.");
                return;
            }
        }

        setLoading(true);
        setErrorMsg(null);

        try {
            if (isSignUp) {
                const { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: { emailRedirectTo: window.location.origin }
                });
                if (error) throw error;
                
                // If the user is created but there is no session, email confirmation is required
                if (data.user && !data.session) {
                    setAwaitingMagicLink(true);
                    return; // Don't navigate yet
                }
                
                navigate('/');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (error) throw error;
                navigate('/');
            }
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setLoading(true);
        setErrorMsg(null);
        setResendMessage(null);
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: formData.email,
                options: { emailRedirectTo: `${window.location.origin}/success` }
            });
            if (error) throw error;
            setResendMessage("We've sent another confirmation link. Please check your spam folder in your email app.");
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setErrorMsg(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: window.location.origin }
            });
            if (error) throw error;
        } catch (error) {
            setErrorMsg(error.message);
            setLoading(false);
        }
    };

    return (
        <div ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-primary flex flex-col justify-center">
            {/* Background with Noise & Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                <img
                    src="/cloud_aesthetic_bg.png"
                    alt="Atmospheric dark organic texture"
                    className="w-full h-full object-cover opacity-60 auth-bg mix-blend-overlay grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-primary/40"></div>
            </div>

            {/* Back Link positioned nicely outside the square */}
            <div className="absolute top-6 left-6 md:top-12 md:left-12 z-20">
                <Link to="/" className="inline-flex items-center gap-2 text-background/60 hover:text-accent transition-colors font-mono text-xs uppercase tracking-wider group interactive">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Return Home</span>
                </Link>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 w-full max-w-sm md:max-w-md mx-auto px-6 mt-16 md:mt-0">
                <div className="bg-background/5 backdrop-blur-xl border border-background/10 rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                    {/* subtle flare */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-[80px]"></div>

                    <div className="text-center mb-10 form-elem">
                        <h1 className="font-sans font-bold text-3xl md:text-4xl text-background tracking-tight mb-2">
                            {awaitingMagicLink ? 'Verify Identity' : 'Nail It!'}
                        </h1>
                        <h2 className="font-drama italic text-xl md:text-2xl text-accent/90">
                            {awaitingMagicLink 
                                ? "We've sent a magic link to your email address." 
                                : (isSignUp ? 'Initialize your protocol.' : 'Resume your protocol.')}
                        </h2>
                    </div>

                    {errorMsg && (
                        <div className="form-elem bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm font-sans">
                            {errorMsg}
                        </div>
                    )}

                    {awaitingMagicLink ? (
                        <div className="flex flex-col gap-6 text-center">
                            <div className="form-elem">
                                <p className="text-background/70 font-sans text-sm md:text-base leading-relaxed">
                                    Please check your inbox (and spam folder) for a message from Supabase. Click the secure link inside to activate your account.
                                </p>
                            </div>
                            
                            {resendMessage && (
                                <div className="form-elem bg-background/10 border border-background/20 text-background/80 px-4 py-3 rounded-xl text-sm font-sans text-center">
                                    {resendMessage}
                                </div>
                            )}
                            
                            <div className="flex flex-col gap-4 mt-2 form-elem">
                                <button type="button" disabled={loading} onClick={handleResendOTP} className="w-full bg-accent/20 text-accent hover:bg-accent/30 border border-accent/20 transition-colors rounded-full px-8 py-3 font-bold text-base font-sans disabled:opacity-50 disabled:cursor-not-allowed">
                                    {loading ? 'Sending...' : 'Resend Magic Link'}
                                </button>
                                
                                <button type="button" disabled={loading} onClick={() => {
                                    setAwaitingMagicLink(false);
                                    setResendMessage(null);
                                }} className="text-background/50 hover:text-background text-sm font-sans underline underline-offset-4 decoration-background/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                                    Use a different email address
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="form-elem">
                                <label className="block font-mono text-xs text-background/50 uppercase tracking-widest mb-3 pl-1">
                                    Email Address
                                </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="biology@domain.com"
                                className="w-full bg-background/10 border border-background/20 rounded-2xl px-6 py-4 text-background placeholder:text-background/30 focus:outline-none focus:border-accent focus:bg-background/15 transition-all font-sans"
                                required
                            />
                        </div>

                        <div className="form-elem">
                            <label className="block font-mono text-xs text-background/50 uppercase tracking-widest mb-3 pl-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full bg-background/10 border border-background/20 rounded-2xl px-6 py-4 text-background placeholder:text-background/30 focus:outline-none focus:border-accent focus:bg-background/15 transition-all font-sans font-mono"
                                required
                            />
                        </div>

                            <button type="submit" disabled={loading} className="form-elem w-full bg-white text-black hover:bg-gray-200 transition-colors rounded-full px-8 py-3 font-bold text-base mt-2 font-sans flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl">
                                {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                                {!loading && <ArrowRight className="w-4 h-4" />}
                            </button>
                        </form>
                    )}

                    {!awaitingMagicLink && (
                        <>
                            <div className="mt-5 form-elem relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-background/20"></div>
                                </div>
                                <span className="relative z-10 bg-dark px-4 font-mono text-xs uppercase tracking-widest text-background/50">OR</span>
                            </div>

                            <div className="mt-5 form-elem">
                                <button onClick={handleGoogleLogin} disabled={loading} className="w-full btn-magnetic bg-background text-primary rounded-full px-8 py-3 font-semibold text-base font-sans flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed border border-primary/10 shadow-sm hover:shadow-md transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                    Continue with Google
                                </button>
                            </div>

                            <div className="mt-8 text-center form-elem">
                                <button onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(null); }} className="font-sans text-sm text-background/80 hover:text-accent transition-colors">
                                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                </button>
                                <p className="font-mono text-xs text-background/40 mt-4">
                                    By authenticating, you accept standard biological and aesthetic protocol agreements.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
