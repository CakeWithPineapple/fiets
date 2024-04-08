"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLegenda } from "@/lib/use-legenda";
import { cn } from "@/lib/utils";
import { SignedOut, ClerkLoaded, ClerkLoading, UserButton, SignedIn, useUser } from "@clerk/nextjs"
import { ArrowLeft, Bike, CircleDashed, LayoutDashboard, Loader2, Lock, Radical, Siren } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { toast } from "sonner"

export const Sidebar = () => {
  const pathname = usePathname();
  const user = useUser();

  const legenda = useLegenda((state) => state);

  return (
    <div className="h-full w-80 flex flex-col bg-slate-500 p-4 justify-between fixed">
      <Link href="/" onClick={() => toast.success("Succesvol doorgestuurd naar de hoofdpagina.")}>
        <h1 className="text-xl font-bold text-rose-500 text-center flex flex-row justify-between">
          <div className="flex flex-row space-x-2">
            <Bike className="stroke-white" /> <span className="font-bold text-white">Fiets-OEI!</span>
          </div> ADMIN 
        </h1>    
        <p className="text-xs text-center text-gray-300">BEDACHT EN GEMAAKT DOOR DE POLITIEKE PARTIJ LUCHTBALLON</p>
      </Link>
      <div>
        <ClerkLoading>
          <div className="flex justify-center">
            <Loader2 className="h-4 w-4 animate-spin text-gray-300" />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <div className="flex-col flex gap-y-2 text-center items-center justify-center">
              <Lock className="text-gray-300" />
              <p className="text-sm text-gray-300 text-center">
                Oei! Eerst even <a href="/sign-in" className="font-bold underline text-sky-500" onClick={() => toast.success("Succesvol doorgestuurd naar de inlogpagina.")}>inloggen</a> om de beelden van overtredingen te kunnen bekijken.
              </p>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex flex-col justify-center gap-y-6">
              <div className="flex flex-col gap-y-2">
                <h3 className="font-bold text-lg text-center text-white">
                  Dashboards
                </h3>
                <Link href="/" className="group">
                  <div className={cn(
                    "bg-white text-rose-500 rounded-md p-3 flex flex-row gap-x-2 text-center items-center hover:bg-rose-500 transition-colors hover:text-white",
                    pathname === "/" && "bg-rose-500 text-white"
                  )}>
                    <Bike className="group-hover:animate-bounce" /> <p className="font-bold">Fiets-OEIs</p>
                  </div>
                </Link>
                <Link href="/crashes" className="group">
                  <div className={cn(
                    "bg-white text-rose-500 rounded-md p-3 flex flex-row gap-x-2 text-center items-center hover:bg-rose-500 transition-colors hover:text-white",
                    pathname === "/crashes" && "bg-rose-500 text-white"
                  )}>
                    <Siren className="group-hover:animate-bounce" /> <p className="font-bold">Botsingen</p>
                  </div>
                </Link>
              </div>
              <div className="flex flex-col gap-y-2">
                <h3 className="font-bold text-lg text-center text-white">
                  Uitvoeringen
                </h3>
                <Link href="/matrix" className="group">
                  <div className={cn(
                    "bg-white text-rose-500 rounded-md p-3 flex flex-row gap-x-2 text-center items-center hover:bg-rose-500 transition-colors hover:text-white",
                    pathname === "/matrix" && "bg-rose-500 text-white"
                  )}>
                    <Bike className="group-hover:animate-spin" /> <p className="font-bold text-center">Fotomatrix</p>
                  </div>
                </Link>
                <Link href="/hiw-crash" className="group">
                  <div className={cn(
                    "bg-white text-rose-500 rounded-md p-3 flex flex-row gap-x-2 text-center items-center hover:bg-rose-500 transition-colors hover:text-white",
                    pathname === "/hiw-crash" && "bg-rose-500 text-white"
                  )}>
                    <Siren className="group-hover:animate-spin" /> <p className="font-bold text-center">Botsingen</p>
                  </div>
                </Link>
              </div>
              <div className="flex flex-col gap-y-2 rounded-md bg-white p-3">
                <h3 className="font-bold text-lg text-center">
                  Instellingen
                </h3>
                <div className="hidden md:flex flex-row justify-between items-center">
                  <Label>
                    Legenda verbergen?
                  </Label>
                  <Switch 
                    checked={legenda.hidden}
                    onCheckedChange={legenda.onToggle}
                  />
                </div>
                {user.user?.id && (
                  // <span className="text-white flex flex-row items-center gap-x-2 justify-center mb-2">
                  //   <UserButton /> 
                  //   <span className="flex flex-row gap-x-1 items-center">
                  //     <ArrowLeft className="h-4 w-4" /> Uitloggen en accountbeheer
                  //   </span>
                  // </span>
                  <div className="flex flex-row justify-between items-center">
                    <Label>
                      Uitloggen en accountbeheer
                    </Label>
                    <UserButton 
                      afterSignOutUrl="/"
                    />
                  </div>
                )}
              </div>
            </div>
          </SignedIn>
        </ClerkLoaded>
      </div>
      <div>
        <p className="text-xs text-gray-300 text-center">
          © Gemaakt door het frontenddepartament van het Ministerie van ICT-technologieën van Hikeland, dat volledig beheerd wordt door de Politieke Partij &quot;Luchtballon&quot; en waarvan &quot;Luchtballon&quot; de enige medewerkers zijn.
        </p>
      </div>
    </div>
  )
}