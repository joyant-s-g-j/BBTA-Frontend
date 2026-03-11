"use client";

import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { navLinks } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';


const MobileNavbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  return (
    <div className='flex lg:hidden items-center space-x-2'>
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu" className="hover:bg-primary hover:text-white">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 glass-strong py-4">
          <div className="flex flex-col h-full">

            {/* Mobile Nav Links */}
            <nav className="flex-1 space-y-1 overflow-y-auto">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center py-2 px-4 rounded-lg text-base font-medium transition-colors text-muted-foreground hover:text-white hover:bg-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNavbar