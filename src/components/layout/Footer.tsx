import { Github } from 'lucide-react';
import { Coffee, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
  return (
    <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-1000 flex items-center space-x-4" style={{fontFamily: "Inter, sans-serif"}}>
      <p className="text-sm text-muted-foreground flex items-center">
        made with <Heart className="h-4 w-4 mx-1" />
      </p>
      <Separator orientation="vertical" />
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" asChild>
          <a 
            href="https://github.com/dwnppoalt" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </Button>
        
        <Button variant="ghost" size="icon" asChild>
          <a 
            href="https://www.buymeacoffee.com/dwnpp0" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Buy Me a Coffee"
          >
            <Coffee className="h-5 w-5" />
          </a> 
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
