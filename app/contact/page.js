"use client";
import Layout from "@/components/layout/Layout";
import { Toaster, toast } from "react-hot-toast";
import emailjs from '@emailjs/browser';
import { useEffect } from 'react';


export default function Contact() {
    useEffect(() => {
        emailjs.init('VFzy7wrSu4j6To3ya'); // Replace with your EmailJS Public Key
    }, []);

    const sendMail = (e) => {
        e.preventDefault();

        const form = e.target;

        emailjs.sendForm(
            'service_zq7frxh', // Replace with your EmailJS Service ID
            'template_chi85i4', // Replace with your EmailJS Template ID
            form,
            'VFzy7wrSu4j6To3ya' // Replace with your EmailJS Public Key
        )
        .then((result) => {
            console.log(result.text);
            toast.success('Message sent successfully!');
            form.reset(); // Reset the form after successful submission
        }, (error) => {
            console.log('Failed to send the message:', error);
            toast.error('Failed to send the message, please try again.');
        });
    }

    return (
        <>
            <Layout headerStyle={6} footerStyle={1}>
                <Toaster />
                <div>
                    <section className="contact-area pt-80 pb-80">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-12">
                                    <div className="tpcontact__right mb-40">
                                        <div className="tpcontact__shop mb-30">
                                            <h4 className="tpshop__title mb-25">Get In Touch</h4>
                                            <div className="tpshop__info">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-map-marker-alt" />
                                                        SUDHA COLONYN<br />STREET NO 520<br />PEDDAPURAM - 533437 <br />
                                                        KAKINADA DISTRICT<br />
                                                        ANDHRA PRADESH
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-12">
                                    <div className="tpcontact__form">
                                        <div className="tpcontact__info mb-35">
                                            <h4 className="tpcontact__title">Make Custom Request</h4>
                                            <p>Must-have pieces selected every month want style Ideas and Treats?</p>
                                        </div>
                                        <form id="contact-form" onSubmit={sendMail}>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="name" type="text" placeholder="Full name" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="email" type="email" placeholder="Email address" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="phone_number" type="text" placeholder="Phone number" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="subject" type="text" placeholder="Subject" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="tpcontact__input mb-30">
                                                        <textarea name="message" placeholder="Enter message" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tpcontact__submit">
                                                <button type="submit" className="tp-btn tp-color-btn tp-wish-cart">Get A Quote <i className="fal fa-long-arrow-right" /></button>
                                            </div>
                                        </form>
                                        <p className="ajax-response mt-30" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}