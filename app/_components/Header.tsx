"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const menuOptions=[
    {
        name:"Home",
        path:"/"
    },
    {
        name:"Pricing",
        path:'/pricing'
    },
    {
        name:"Contact Us",
        path:"/contact-us"
    }
]

function Header() {
    const{user}=useUser();
    const currentPath=usePathname();
    console.log(currentPath);
    

  return (
    <div className='flex items-center justify-between p-4'>
        <div className='flex gap-2.5 items-center'>
        <Image  src={'./plane.svg'} alt="logo" width={30} height={30}/>
        <h2 className='font-semibold text-2xl'>AI Trip Planner</h2>
        </div>
      {/* Menu options*/}
      <div className='flex gap-8 justify-center items-center'>
        {menuOptions.map((option,index)=>(
            <Link key={index} href={option.path}>
            <h2 className='hover:text-primary hover:scale-105 transition-all text-lg'>{option.name}</h2>
            </Link>

        ))}
      </div>
      {/* Get Started Button */}

     <div className='flex gap-5 items-center'>
      {
      !user?<SignInButton mode='modal'>
        <Button>Get started</Button>
      </SignInButton>:
      currentPath==='/create-new-trip'?
      (<Link  href={'/my-trips'}> 
      <Button className='cursor-pointer' >
       My Trips
      </Button>
      </Link >):(<Link  href={'/create-new-trip'}><Button className='cursor-pointer' >
        Create New Trip
      </Button>
      </Link>)
      
      }
      <UserButton />
      </div>
      
    </div>
  )
}

export default Header;
