import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import '../styles/contact.css';


const serviceId = "service_3vunxur";
const templateId = "template_tu8lx8o";
const publicKey = "aHosem01UCZ6JLpSY";

function Contact() {
    console.log("Contact renderizado");
    const form = useRef();
    const [messageSent, setMessageSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsLoading(true); // Activamos el estado de carga

        emailjs.sendForm(
            serviceId,
            templateId,
            form.current,
            publicKey
        )
            .then((result) => {
                console.log(result.text);
                setMessageSent(true);
                form.current.reset();
                setIsLoading(false);
                setTimeout(() => setMessageSent(false), 3000);
                toast.success("Se ha enviado el mensaje correctamente", {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                })
            }, (error) => {
                console.log(error.text);
                setIsLoading(false);
                toast.error("Ha ocurrido un error", {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                })
            });
    };
    return (
        <>
                <form className="form" ref={form} onSubmit={sendEmail}>
                    <div className="input_container">
                        <span>Nombre
                            <small>*</small>
                        </span>
                        <input type="text" name="user_name" placeholder='Jhon Perez' required />
                    </div>
                    <div className="input_container">
                        <span>Email
                            <small>*</small>
                        </span>
                        <input type="email" name="user_email" placeholder='ayresdecalafate@gmail.com' required />
                    </div>
                    <div className="input_container">
                        <span>Teléfono
                            <small>*</small>
                        </span>
                        <input type="tel" name="user_phone" placeholder='+549123654489' required />
                    </div>
                    <div className="input_container">
                        <span>Mensaje
                            <small>*</small>
                        </span>
                        <textarea name="message" placeholder='Esribe tu mensaje aquí...' required></textarea>
                    </div>
                    <div className="input_container">
                        <span>Check-In</span>
                        <input name="user_checkin" type="date" />
                    </div>
                    <div className="input_container">
                        <span>Check-Out</span>
                        <input name="user_checkout" type="date" />
                    </div>

                    {!isLoading ? (
                        <div className="submit_button">
                            <input aria-label='enviar una consulta' type="submit" value="Enviar" style={{ cursor: "pointer" }} />
                        </div>
                    ) : (
                        <div className="spinner">
                            <svg className="throbber" viewBox="0 0 100 100">
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#d4af3733" />   {/* tono más transparente */}
                                        <stop offset="40%" stopColor="#d4af37cc" />  {/* tono medio */}
                                        <stop offset="100%" stopColor="#d4af37" />   {/* tono sólido */}
                                    </linearGradient>
                                </defs>
                                <circle
                                    className="arc"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="url(#grad1)"
                                    fill="none"
                                />
                            </svg>

                        </div>
                    )}
                </form>
                <Toaster
                    position="top-center"
                />
        </>
    )
}

export default Contact