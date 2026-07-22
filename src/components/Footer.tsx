import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolio } from "@/hooks/usePortfolio";

const Footer = () => {
  const { data } = usePortfolio();
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-display font-bold text-primary">
          <MapPin className="h-4 w-4" />
          {data.name}
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {data.name}. All rights reserved.
        </p>
        <Link to="/admin" className="text-xs text-muted-foreground/60 hover:text-primary">
          Admin
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
