import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  bhkPreference: z.string().min(1, "Please select a preference"),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  className?: string;
  onSuccess?: () => void;
}

const LeadForm = ({ className = "", onSuccess }: LeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // ----- GA / Meta Tracking -----
  const trackConversion = () => {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-17754016716/abcd1234", // Replace with your conversion ID
        event_category: "lead_form",
        event_label: "Provident_Sunworth_Lead",
      });
    }
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
    }
  };

  // ----- WhatsApp URL Helper -----
  const generateWhatsAppUrl = (data: FormData) =>
    `https://wa.me/919379822010?text=${encodeURIComponent(
      `Hi, I just filled the form for Provident Sunworth. My name is ${data.name}, I'm looking for ${data.bhkPreference} and would like best units and pricing.`
    )}`;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      trackConversion();

      // Send lead to Privyr CRM
      await fetch(
        "https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/5xrM2juN",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: `Project: Provident Sunworth\nBHK Preference: ${data.bhkPreference}\nSource: Landing Page`,
          }),
        }
      );

      // Send email notification via Resend
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": "Bearer re_P4XDm6qv_NpbRtAMXhABWTKkgbWy3UzVt",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "PropYouLike <noreply@propyoulike.com>",
          to: ["propyoulike@gmail.com"],
          subject: `New Lead – Provident Sunworth`,
          html: `
            <h3>New Lead Received</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>BHK Preference:</strong> ${data.bhkPreference}</p>
            <p><strong>Project:</strong> Provident Sunworth</p>
            <p><strong>Source:</strong> Landing Page</p>
          `,
        }),
      });

      // Open WhatsApp
      const whatsappUrl = generateWhatsAppUrl(data);
      window.open(whatsappUrl, "_blank");

      toast({
        title: "Thank you!",
        description: "Opening WhatsApp to connect you with an advisor.",
      });

      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Lead form submission error:", error);

      const whatsappUrl = generateWhatsAppUrl({
        ...data,
        bhkPreference: data.bhkPreference || "Not Sure",
      });

      toast({
        title: "Opening WhatsApp",
        description: "We'll connect you directly with an advisor.",
        action: (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline text-sm"
          >
            Click here if WhatsApp didn't open
          </a>
        ),
      });

      window.open(whatsappUrl, "_blank");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`bg-card rounded-2xl p-6 lg:p-8 ${className}`}
      style={{ boxShadow: "var(--shadow-medium)" }}
    >
      <h3 className="text-2xl font-bold mb-2 text-foreground">
        Best units, <span className="text-primary">views & pricing.</span>
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
        <div>
          <Label htmlFor="name" className="text-foreground">
            Name *
          </Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Your full name"
            className="mt-1.5"
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-foreground">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Your email address"
            className="mt-1.5"
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-foreground">
            Phone *
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="Your 10-digit phone number"
            className="mt-1.5"
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="bhkPreference" className="text-foreground">
            BHK Preference *
          </Label>
          <Select onValueChange={(value) => setValue("bhkPreference", value)}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select your preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2 BHK">2 BHK</SelectItem>
              <SelectItem value="3 BHK Regular">3 BHK Regular</SelectItem>
              <SelectItem value="3 BHK Royale">3 BHK Royale</SelectItem>
              <SelectItem value="Not Sure">Not Sure</SelectItem>
            </SelectContent>
          </Select>
          {errors.bhkPreference && (
            <p className="text-sm text-destructive mt-1">
              {errors.bhkPreference.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full btn-gradient text-lg py-6 rounded-full font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>

        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          No spam. A PropYouLike advisor will call or WhatsApp you to understand
          your plans and guide you to the right unit.
        </p>
      </form>
    </div>
  );
};

export default LeadForm;

