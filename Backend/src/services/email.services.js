import nodemailer from "nodemailer";
import { crearTemplateHtml } from "../utils/templatesEmail.js";
import { crearTemplateAviso } from "../utils/templatesAviso.js";
import { crearTemplateGastosComunes } from "../utils/templateGastoComun.js";

const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
    },
});

export const createMailOptions = (email, asunto, token, username) =>{

    let asuntoCorreo = null

    if(asunto === "registro"){
        asuntoCorreo = "Bienvenido a Proyecto GDP "
    }else{
        asuntoCorreo = "Recuperación Contraseña"
    }


    const mailOptions = {
            from: "Backspace Support",
            to: `${email}`,
            subject: asuntoCorreo,
            html: crearTemplateHtml(email, asunto, token, username )
        };

    return mailOptions
}


export const sendEmail = (email, asunto, username, token=null ) =>{
    
    const mailOptions = createMailOptions(email, asunto, token, username)
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error al enviar el correo:", error);
        } else {
            console.log("Correo enviado:", info.response);
        }
});
}

export const enviarMailAviso = (email, asunto, titulo, nombreCompleto, mensaje)=>{
    try {
        const mailOptions = {
            from: "Comunidad Habitacional Salvador 1050",
            to: `${email}`,
            subject: asunto,
            html: crearTemplateAviso(titulo, nombreCompleto, mensaje)
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error al enviar el correo:", error);
            } else {
                console.log("Correo enviado:", info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const enviarMailGastoComun = (email, asunto, nombreCompleto, rutaPdf, mes, año)=>{
    try {
        const fecha = new Date();
        fecha.toLocaleDateString("es-CL", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        const mailOptions = {
            from: "Comunidad Habitacional Salvador 1050",
            to: `${email}`,
            subject: asunto,
            html: crearTemplateGastosComunes(nombreCompleto, mes, año, fecha),
            attachments: [
                {
                    filename: `Gasto_Comun_${mes}_${año}.pdf`,
                    path: rutaPdf,
                    contentType: "application/pdf"
                }
            ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error al enviar el correo:", error);
            } else {
                console.log("Correo enviado:", info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}