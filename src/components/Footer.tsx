import { Link } from "react-router-dom";
import footer from "@/data/footer.json";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>{footer.copyright}</p>
          <Link to={footer.privacy_link} className="hover:text-primary transition-colors">
            {footer.privacy_text}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
