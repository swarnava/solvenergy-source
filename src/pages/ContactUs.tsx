
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

const ContactUs = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const scriptUrl = "https://tally.so/widgets/embed.js";
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.onload = () => {
        if (typeof window.Tally !== "undefined") {
          window.Tally!.loadEmbeds();
        } else {
          const iframes = document.querySelectorAll("iframe[data-tally-src]:not([src])") as NodeListOf<HTMLIFrameElement>;
          iframes.forEach((iframe) => {
            iframe.src = iframe.dataset.tallySrc!;
          });
        }
      };
      script.onerror = () => {
        const iframes = document.querySelectorAll("iframe[data-tally-src]:not([src])") as NodeListOf<HTMLIFrameElement>;
        iframes.forEach((iframe) => {
          iframe.src = iframe.dataset.tallySrc!;
        });
      };
      document.body.appendChild(script);
    } else {
      if (typeof window.Tally !== "undefined") {
        window.Tally!.loadEmbeds();
      } else {
        const iframes = document.querySelectorAll("iframe[data-tally-src]:not([src])") as NodeListOf<HTMLIFrameElement>;
        iframes.forEach((iframe) => {
          iframe.src = iframe.dataset.tallySrc!;
        });
      }
    }
  }, []);

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submitted:", data);
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    form.reset();
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 transition-colors duration-500">

        {/* Contact Section */}
        <section className="solar-section bg-gray-50 dark:bg-gray-900">
          <div className="solar-container">
            <iframe data-tally-src="https://tally.so/embed/QKoBLk?alignLeft=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="1643" frameborder="0" marginheight="0" marginwidth="0" title="Contact us"></iframe>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;
