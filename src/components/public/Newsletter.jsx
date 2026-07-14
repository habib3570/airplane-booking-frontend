import { useState } from "react";
import { Mail, Send } from "lucide-react";
import toast from "react-hot-toast";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { isValidEmail } from "../../utils/validators";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !isValidEmail(email)) {
      setError("Enter a valid email");
      return;
    }
    // NOTE: No Newsletter API endpoint exists in the provided spec.
    // Wire this to a real endpoint once available.
    toast.success("Subscribed! We'll keep you updated.");
    setEmail("");
    setError("");
  }

  return (
    <section className="bg-navy py-14 sm:py-16">
      <div className="container-app max-w-2xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-gold flex items-center justify-center mx-auto mb-5">
          <Mail className="text-navy" size={24} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Get Exclusive Deals in Your Inbox
        </h2>
        <p className="text-white/60 text-sm mb-7">
          Subscribe to our newsletter and never miss a great flight deal
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              error={error}
              className="bg-white"
            />
          </div>
          <Button type="submit" variant="gold" icon={Send} className="sm:w-auto">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}