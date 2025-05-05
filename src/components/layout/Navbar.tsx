import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Coffee, Github, Heart, Menu } from "lucide-react";

import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <header
            className="w-full h-12 md:h-16 sticky top-0 flex justify-between px-5 md:px-10 items-center z-[9999] bg-white shadow-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            <div className="flex items-center">
                <h1
                    className="text-3xl md:text-4xl font-bold"
                    style={{ fontFamily: "Reenie Beanie, cursive" }}
                >
                    nocturne
                </h1>
            </div>
            <NavigationMenu className="hidden md:flex items-center">
                <NavigationMenuList className="flex">
                    <NavigationMenuItem>
                        <Link to="/" className={navigationMenuTriggerStyle()}>
                            Home
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/search" className={navigationMenuTriggerStyle()}>
                            Browse
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/new" className={navigationMenuTriggerStyle()}>
                            New note
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Drawer>
                <DrawerTrigger asChild className="md:hidden">
                    <Button
                        variant="outline"
                        className="flex items-center justify-center h-8 w-8"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="z-[10000]">
                    <DrawerHeader>
                        <DrawerTitle>
                            <p
                                className="text-4xl text-center"
                                style={{ fontFamily: "Reenie Beanie, cursive" }}
                            >
                                menu
                            </p>
                        </DrawerTitle>
                    </DrawerHeader>
                    <nav className="flex flex-col items-center space-y-4 mt-8">
                        <Link
                            to="/"
                            className="text-lg font-medium text-neutral-900 hover:text-neutral-700"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/browse"
                            className="text-lg font-medium text-neutral-900 hover:text-neutral-700"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Browse
                        </Link>
                        <Link
                            to="/new"
                            className="text-lg font-medium text-neutral-900 hover:text-neutral-700"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            New note
                        </Link>
                    </nav>
                    <DrawerFooter>
                    
                        <div className="flex items-center justify-center space-x-2 mt-4">
                        <p className="text-sm text-muted-foreground flex items-center justify-center">
                          made with <Heart className="h-4 w-4 mx-1" />
                        </p>
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
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </header>
    );
};

export default Navbar;