// client/src/components/layout/Header.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavItem = {
  name: string;
  href?: string;
  children?: { name: string; href: string }[];
};

const NAV: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Call for paper",
    children: [
      { name: "Track Details", href: "/call-for-paper/track-details" },
      { name: "Important Dates", href: "/important-dates" },
      { name: "Author Guidelines", href: "/author-guidelines" },
      { name: "Paper Template", href: "/paper-template" },
      { name: "Paper Submission", href: "/paper-submission" },
    ],
  },
  {
    name: "Committee",
    children: [
      { name: "Advisory Committee", href: "/committee/advisory" },
      { name: "Organising Committee", href: "/committee/organising" },
      { name: "TPC Committees", href: "/committee/tpc" },
    ],
  },
  { name: "Speakers", href: "/speakers" },
  {
    name: "Registration",
    children: [
      { name: "Registration Fee Details", href: "/registration/fees" },
      { name: "Registration Guidelines", href: "/registration/guidelines" },
    ],
  },
  { name: "Contact Us", href: "/contact-us" },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpenGroups, setMobileOpenGroups] = useState<
    Record<number, boolean>
  >({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  // Close desktop dropdowns on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current as any);
        closeTimer.current = null;
      }
    };
  }, []);

  // Mobile Group toggle function
  const toggleMobileGroup = (i: number) =>
    setMobileOpenGroups((s) => ({ ...s, [i]: !s[i] }));

  // Close mobile menu when location changes
  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      setMobileOpenGroups({}); // Reset open groups too
    }
  }, [location]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full shadow-sm">
      {/* Bluish navbar with slight transparency and blur */}
      <nav
        className="mx-auto flex max-w-full items-center justify-between gap-4 px-4 sm:px-10 py-3 
                   bg-white text-[#1F3A93] border-b border-gray-100"
        aria-label="Primary"
      >
        {/* LEFT: Logo + Title */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center">
            {/* Using a darker blue for text for a professional look */}
            <img
              src="/gnit-conference-logo.png"
              alt="GNIT Conference logo"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-sm object-cover border border-blue-200/50 bg-white "
            />
          </Link>

          <div className="flex flex-col leading-none">
            <Link href="/" className="hover:opacity-90">
              {/* Conference Name: Prominent and Bold */}
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1F3A93]">
                ICETT-2026
              </span>
            </Link>
            {/* Sub-text: Lighter and smaller */}
            <span className="text-xs text-gray-600/90">
              GNIT Conference • Student Chapter
            </span>
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((s) => !s)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="text-[#1F3A93] hover:bg-blue-100"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:flex justify-center">
          <div className="hidden lg:flex lg:items-center lg:gap-x-1">
            {NAV.map((item, idx) => {
              const isActive = item.href ? location === item.href : false;
              const hasChildren = !!item.children?.length;

              // add small delay on close to allow cursor to reach submenu
              const handleOpen = (i: number) => {
                if (closeTimer.current) {
                  clearTimeout(closeTimer.current as any);
                  closeTimer.current = null;
                }
                setOpenIndex(i);
              };

              const scheduleClose = () => {
                if (closeTimer.current) clearTimeout(closeTimer.current as any);
                closeTimer.current = setTimeout(() => {
                  setOpenIndex(null);
                  closeTimer.current = null;
                }, 180); // 180ms delay
              };

              // Desktop Navigation Item Styling
              const baseClasses =
                "relative rounded-md px-3 py-2 text-sm font-semibold transition-all duration-300 ease-in-out whitespace-nowrap";
              const activeClasses =
                "bg-[#1F3A93] text-white ";
              const hoverClasses =
                "text-[#1F3A93] hover:bg-blue-50/70 hover:underline hover:underline-offset-4";
              const defaultClasses = `text-gray-700 ${hoverClasses}`;
              const linkClasses = isActive ? activeClasses : defaultClasses;

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (hasChildren) handleOpen(idx);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  {item.href ? (
                    <Link href={item.href}>
                      <button className={`${baseClasses} ${linkClasses}`}>
                        {item.name}
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() =>
                        setOpenIndex((cur) => (cur === idx ? null : idx))
                      }
                      aria-haspopup={hasChildren ? "menu" : undefined}
                      aria-expanded={openIndex === idx}
                      className={`flex items-center gap-1 ${baseClasses} ${defaultClasses}`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openIndex === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}

                  {/* Dropdown (desktop) */}
                  {hasChildren && openIndex === idx && (
                    <div
                      className="absolute left-1/2 top-full mt-3 -translate-x-1/2 w-auto min-w-[250px] rounded-lg bg-white text-slate-800 ring-1 ring-gray-200 shadow-xl z-50 animate-fade-in-down"
                      role="menu"
                      aria-label={`${item.name} submenu`}
                    >
                      <div className="py-2">
                        {item.children!.map((ch) => {
                            // Check if a submenu item is the active link
                            const isChildActive = location === ch.href;
                            return (
                                <Link
                                    key={ch.name}
                                    href={ch.href}
                                    className={`block px-4 py-2 text-sm transition-colors duration-200 
                                              ${isChildActive 
                                                ? 'bg-blue-100 text-[#1F3A93] font-bold' 
                                                : 'text-gray-700 hover:bg-blue-50/70'
                                              }`}
                                >
                                    {ch.name}
                                </Link>
                            );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>



        {/* Right CTA / External Links */}
        <div className="hidden lg:flex flex-row items-center gap-3">
          {/* <Link href="/registration" className="shrink-0">
            <Button className="bg-[#1F3A93] hover:bg-[#15307a] text-white font-bold px-5 py-2.5 rounded-full transition-colors duration-300">
              Register Now
            </Button>
          </Link> */}
            <img
            src="/nirf.jpg"
            alt="GNIT Conference logo (TBD)"
            className="h-14 w-26 rounded-sm object-cover "
          />
          <img
            src="/naac.png"
            alt="GNIT Conference logo (TBD)"
            className="h-14 w-20 rounded-sm object-cover bg-white "
          />
        </div>
      </nav>
     

      {/* Mobile stacked menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-[#1F3A93] text-white transition-all duration-300 ease-in-out">
          <div className="space-y-1 px-4 pb-4 pt-3">
            {NAV.map((item, idx) => {
              const hasChildren = !!item.children?.length;
              const isActive = item.href ? location === item.href : false;

              if (!hasChildren) {
                return (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start text-base font-medium transition-colors ${
                        isActive 
                          ? 'bg-blue-300 text-[#1F3A93] hover:bg-blue-300/80' 
                          : 'text-white hover:bg-[#284A9E]'
                      }`}
                    >
                      {item.name}
                    </Button>
                  </Link>
                );
              }

              const open = !!mobileOpenGroups[idx];
              return (
                <div key={item.name} className="w-full">
                  <button
                    onClick={() => toggleMobileGroup(idx)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-base font-medium hover:bg-[#284A9E]"
                    aria-expanded={open}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`h-5 w-5 transform transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {open && (
                    <div className="mt-1 space-y-1 pl-4 border-l border-blue-400">
                      {item.children!.map((ch) => {
                        const isChildActive = location === ch.href;
                        return (
                            <Link
                              key={ch.name}
                              href={ch.href}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Button
                                className={`w-full justify-start text-sm transition-colors ${
                                    isChildActive 
                                      ? 'bg-blue-300 text-[#1F3A93] hover:bg-blue-300/80' 
                                      : 'text-white hover:bg-[#284A9E]'
                                  }`}
                                variant="ghost"
                              >
                                {ch.name}
                              </Button>
                            </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <Link href="/registration" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-4 bg-sky-400 text-[#1F3A93] font-bold hover:bg-sky-500">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

