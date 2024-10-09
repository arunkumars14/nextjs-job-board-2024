"use client"

import { AlignJustify, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import {useState} from "react"

function Header({ user, profileInfo }) {
    const { theme, setTheme } = useTheme()
    const [openSidebar, setOpenSidebar] = useState(false)

    const menuItems = [
        {
            label: "Home",
            path: "/",
            show: true,
        },
        {
            label: "Feed",
            path: "/feed",
            show: profileInfo,
        },
        {
            label: "Login",
            path: "/sign-in",
            show: !user,
        },
        {
            label: "Register",
            path: "/sign-up",
            show: !user,
        },
        {
            label: "Jobs",
            path: "/jobs",
            show: profileInfo,
        },
        {
            label: "Activity",
            path: "/activity",
            show: profileInfo?.role === "candidate",
        },
        {
            label: "Company",
            path: "/company",
            show: profileInfo?.role === "candidate",
        },
        {
            label: "Membership",
            path: "/membership",
            show: profileInfo,
        },
        {
            label: "Account",
            path: "/account",
            show: profileInfo,
        },
    ]

    return (
        <div>
            <header className="flex h-16 w-full shrink-0 items-center">
                <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
                    <SheetTrigger asChild>
                        <Button className="lg:hidden">
                            <AlignJustify className="h-6 w-6" />
                            <span className="sr-only">Toggle Navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetTitle className="sr-only">Mobile View</SheetTitle>
                        <Link className="mr-6 hidden lg:flex" href={"#"}><h3>JOBSCO</h3></Link>

                        <div className="gird gap-2 py-6">
                            {
                                menuItems.map(menuitem => menuitem.show ? <Link key={menuitem.label} href={menuitem.path} className="flex w-full items-center py-2 text-lg font-semibold" onClick={() => {
                                    sessionStorage.removeItem("filterParams")
                                    setOpenSidebar(false)
                                }}>
                                    {menuitem.label}
                                </Link> : null)
                            }
                            <Moon className="cursor-pointer mb-3" fill={theme === "dark" ? "light" : "dark"} onClick={() => {
                                setTheme(theme === "light" ? "dark" : "light")
                                setOpenSidebar(false)
                            }} />
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SheetContent>

                </Sheet>

                <Link href={"/"} className="hidden lg:flex mr-6 font-bold text-3xl">JOBSCO</Link>

                <nav className="ml-auto hidden lg:flex gap-6 items-center">
                    {
                        menuItems.map(menuItem => menuItem.show ? <Link key={menuItem.label} href={menuItem.path} className="group inline-flex h-9 w-max items-center rounded-md px-4 py-2 text-sm font-medium" onClick={() => sessionStorage.removeItem("filterParams")}>
                            {menuItem.label}
                        </Link> : null)
                    }
                    <Moon className="cursor-pointer" fill={theme === "dark" ? "light" : "dark"} onClick={() => setTheme(theme === "light" ? "dark" : "light")} />
                    <UserButton afterSignOutUrl="/" />
                </nav>

            </header>
        </div>
    );
}

export default Header;