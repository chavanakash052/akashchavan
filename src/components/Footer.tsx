import { MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-display font-bold text-primary">
          <MapPin className="h-4 w-4" />
          Akash Chavan
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Akash Dinkar Chavan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
