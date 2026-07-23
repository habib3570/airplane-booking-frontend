import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import PageHero from "../../components/public/PageHero";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import { isValidEmail } from "../../utils/validators";
import { useSiteSettings } from "../../context/SiteSettingsContext";
import contactApi from "../../api/contactApi";

export default function Contact() {
  const siteSettings = useSiteSettings();

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      lines: ["+880 1700-000000", "+880 2-9876543"],
    },
    {
      icon: Mail,
      title: "Email",
      lines: [siteSettings.supportEmail || "support@skybook.com"],
    },
    {
      icon: MapPin,
      title: "Office",
      lines: ["Gulshan Avenue, Dhaka", "Bangladesh 1212"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      lines: ["24/7 Customer Support", "Office: Sun-Thu, 9AM-6PM"],
    },
  ];

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(form.email)) newErrors.email = "Enter a valid email";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

async function handleSubmit(e) {
  e.preventDefault();
  if (!validate()) return;

  setIsSubmitting(true);
  try {
    await contactApi.send({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
    toast.success("Message sent! Our team will get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  } catch (err) {
    toast.error(
      err?.response?.data?.message || "Failed to send message. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <div>
      <PageHero
        icon={MessageCircle}
        title="Get In Touch"
        subtitle="Have a question about your booking or need help planning your trip? We're here for you."
      />

      <section className="bg-soft py-14 sm:py-20">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((info) => (
                <Card
                  key={info.title}
                  className="group flex items-start gap-4 cursor-default transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-gold/30"
                >
                  <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-gold">
                    <info.icon
                      className="text-navy transition-colors duration-200"
                      size={18}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-sm mb-1">
                      {info.title}
                    </h3>
                    {info.lines.map((line) => (
                      <p key={line} className="text-muted text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Form */}
            <Card className="lg:col-span-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-xs font-semibold text-gold-dark uppercase tracking-wide">
                    Contact Form
                  </span>
                </div>
                <h2 className="text-lg font-heading font-semibold text-navy mb-5">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                    />
                  </div>
                  <Input
                    label="Subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    required
                  />
                  <Textarea
                    label="Message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    error={errors.message}
                    required
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={Send}
                    isLoading={isSubmitting}
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}