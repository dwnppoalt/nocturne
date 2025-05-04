import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <header className="w-full h-16 sticky top-0 flex justify-between px-10 items-center z-[2000] shadow-sm">
            <div className="flex items-center">
                <h1 className="text-4xl font-bold" style={{ fontFamily: "Reenie Beanie, cursive" }}>nocturne</h1>
            </div>
            <NavigationMenu className="flex items-center">
                <NavigationMenuList className="flex">
                <NavigationMenuItem>
                        <NavigationMenuLink>
                            <Link to="/" className={navigationMenuTriggerStyle()}>
                                Home
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <Link to="/browse" className={navigationMenuTriggerStyle()}>
                                Browse
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <Link to="/new" className={navigationMenuTriggerStyle()}>
                                New note
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    
                </NavigationMenuList>
            </NavigationMenu>
        </header>

    );
}

export default Navbar;