import { Github } from 'lucide-react';
import { Coffee, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="w-full hidden md:flex bottom-0 left-0 z-1000 items-center space-x-4 justify-center p-4" style={{ fontFamily: "Inter, sans-serif", position: "fixed" }}>
      <p className="text-sm text-muted-foreground flex items-center">
        made with <Heart className="h-4 w-4 mx-1" />
      </p>
      <Separator orientation="vertical" />
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="https://github.com/dwnppoalt/nocturne">
            <Github className="h-5 w-5" />
          </Link>

        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link to="https://ko-fi.com/dwnpp0">
            <Coffee className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
