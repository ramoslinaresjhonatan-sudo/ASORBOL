import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Css from './Login.module.css';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={Css.loginWrapper}>
            
            {/* PANEL IZQUIERDO: Branding y Mensaje */}
            <div className={Css.brandPanel}>
                <div className={Css.brandOverlay} style={{backgroundImage: "url('https://images.unsplash.com/photo-1510133769068-ad05041f90d9?q=80&w=2000&auto=format&fit=crop')"}}></div>
                <div className={Css.brandContent}>
                    <div className={Css.logoContainer}>
                        <img src="/imagenes/asorbol-crema.png" alt="ASORBOL" />
                    </div>
                    <div className={Css.brandText}>
                        <h2>Crece por dentro<br/>y sirve afuera.</h2>
                        <p>Educación, valores y proyectos de ayuda social en un solo lugar. Únete a lo que Dios está haciendo en nuestra región.</p>
                    </div>
                    
                    {/* Elementos decorativos abstractos */}
                    <div className={Css.glassCard}>
                        <ion-icon name="globe-outline"></ion-icon>
                        <div>
                            <strong>Presencia Nacional</strong>
                            <span>Impactando vidas en cada rincón</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* PANEL DERECHO: Formulario de Login */}
            <div className={Css.formPanel}>
                
                {/* Header solo para móvil */}
                <div className={Css.mobileHeader}>
                    <button className={Css.mobileBackBtn} onClick={() => navigate('/')}>
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </button>
                    <a href="#" className={Css.mobileForgotBtn}>Forgot Password?</a>
                </div>

                <div className={Css.formContainer}>
                    
                    {/* Ilustración solo para móvil */}
                    <div className={Css.mobileIllustration}>
                        <img src="https://images.unsplash.com/photo-1510133769068-ad05041f90d9?q=80&w=2000&auto=format&fit=crop" alt="Inspiring Scene" />
                    </div>

                    <div className={Css.loginHeader}>
                        <h1>Bienvenido de nuevo</h1>
                        <p>Ingresa a tu cuenta para continuar</p>
                    </div>

                    <form className={Css.loginForm} onSubmit={(e) => e.preventDefault()}>
                        <div className={Css.inputGroup}>
                            <label htmlFor="email">Email Address</label>
                            <div className={Css.inputWrapper}>
                                <ion-icon name="mail-outline" className={Css.desktopIcon}></ion-icon>
                                <input type="email" id="email" placeholder="ejemplo@asorbol.org" required />
                            </div>
                        </div>

                        <div className={Css.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <div className={Css.inputWrapper}>
                                <ion-icon name="lock-closed-outline" className={Css.desktopIcon}></ion-icon>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password" 
                                    placeholder="••••••••" 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className={Css.togglePassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <ion-icon name={showPassword ? "eye-off-outline" : "eye-outline"}></ion-icon>
                                </button>
                            </div>
                        </div>

                        <div className={Css.formOptions}>
                            <label className={Css.checkboxLabel}>
                                <span>Remember me next time</span>
                                <input type="checkbox" />
                            </label>
                            <a href="#" className={Css.forgotLink}>¿Olvidaste tu contraseña?</a>
                        </div>

                        <button type="submit" className={Css.submitBtn}>
                            Log in
                        </button>

                        <div className={Css.divider}>
                            <span>o continuar con</span>
                        </div>

                        <button type="button" className={Css.googleBtn}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" alt="Google" />
                            Google
                        </button>
                    </form>

                    <div className={Css.loginFooter}>
                        <p>Don't have an account? <a href="#">Sign up</a></p>
                        <button className={Css.backBtn} onClick={() => navigate('/')}>
                            <ion-icon name="arrow-back-outline"></ion-icon>
                            Volver al sitio principal
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;