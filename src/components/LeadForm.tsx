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
  phone: z.string().min(10, "Please enter a valid phone number"),
  bhkPreference: z.string().min(1, "Please select a preference"),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  className?: string;
}

const LeadForm = ({ className = "" }: LeadFormProps) => {
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Send lead to your Vercel backend
      const response = await fetch(
        "https://sunworth-api.vercel.app/api/leads",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            bhkPreference: data.bhkPreference,
            project: "Provident Sunworth",
            source: "Landing Page",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API submission failed");
      }

      // Open WhatsApp with a prefilled message
      const whatsappMessage = encodeURIComponent(
        `Hi, I just filled the form for Provident Sunworth. My name is ${data.name}, I'm looking for ${data.bhkPreference} and would like personalised guidance on best units and pricing.`
      );
      const whatsappUrl = `https://wa.me/919379822010?text=${whatsappMessage}`;
      
      window.open(whatsappUrl, "_blank");

      toast({
        title: "Thank you!",
        description: "Opening WhatsApp to connect you with an advisor.",
      });

      reset();
    } catch (error) {
      console.error("Lead form submission error:", error);

      // Fallback: open WhatsApp even if API fails
      const whatsappMessage = encodeURIComponent(
        `Hi, I just filled the form for Provident Sunworth. My name is ${data.name}, I'm looking for ${data.bhkPreference} and would like personalised guidance on best units and pricing.`
      );
      const whatsappUrl = `https://wa.me/919379822010?text=${whatsappMessage}`;
      
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
        Get personalised guidance on best units, views & pricing.
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
            placeholder="Your phone number"
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
          {isSubmitting ? "Submitting..." : "Get Personalised Guidance"}
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
