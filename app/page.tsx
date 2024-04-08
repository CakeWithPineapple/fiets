"use client";

import Image from "next/image";
import { toast } from "sonner";
import Timeline from "@mui/lab/Timeline";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import { BookCopy, Loader2, Lock, Star } from "lucide-react";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from "@clerk/nextjs";

import { useLegenda } from "@/lib/use-legenda";
import { dummies } from "@/lib/get-the-dummies";
import { ScrollArea } from "@/components/ui/scroll-area";
import { colors, confiscatie, secondaryColors, straffen } from "@/lib/straffen";
import { fiveMinutesEarlier } from "@/lib/five-minutes-earlier.utils";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { addHoursToTimestamp } from "@/lib/add-to-time.utils";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  const data = dummies;
  const matches = useMediaQuery('(min-width: 1100px)');
  const medium = useMediaQuery('(min-width: 768px)');

  const legenda = useLegenda((state) => state);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-full ml-0 md:ml-80">
      <ClerkLoading>
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <div className="flex items-center justify-center h-[calc(100%-104px)] md:h-[calc(100%-64px)]">
            <div className="flex-col flex gap-y-2 text-center items-center justify-center">
              <Lock />
              <p className="text-sm text-center">
                Oei! Eerst even <a href="/sign-in" className="font-bold underline text-sky-500" onClick={() => toast.success("Succesvol doorgestuurd naar de inlogpagina.")}>inloggen</a> om de data te kunnen bekijken.
              </p>
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-start justify-start h-[calc(100%-104px)] md:h-[calc(100%-64px)]">
            <div className="p-4 flex flex-col space-y-2 h-full overflow-scroll">
              <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">
                  Fietsen buiten de schuur
                </h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-x-2 gap-y-2">
                {data.map((item) => (
                  <Dialog key={item.idx}>
                    <DialogTrigger>
                      <div className="flex flex-col items-center justify-center">
                        <div className={`bg-${colors[item.number] || "rose-500"} rounded-md w-[100px] h-[100px] p-2 flex items-center justify-center cursor-pointer hover:bg-${secondaryColors[item.number] || "rose-400"} transition-colors`}>
                          <div className="rounded-full border-4 border-white px-5 p-4 overflow-hidden text-center flex flex-col justify-center">
                            <p className="text-white font-semibold text-lg tracking-wider text-center flex flex-row justify-center">
                              {item.short} <span className="text-xs flex items-center">({item.number}&times;)</span>
                            </p>
                            <p className="text-center text-[7px] truncate text-white">
                              {item.name}
                            </p>
                          </div>
                        </div>
                        <p className="text-[9px] text-center truncate text-slate-500">
                          Straf ({item.name}): <br />
                          {straffen[item.number]}
                        </p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="h-full overflow-auto">
                      <DialogTitle>
                        Overtreding {item.number} van {item.name}
                      </DialogTitle>
                      <div className="flex flex-row gap-x-4">
                        <div className="flex flex-col gap-y-2">
                          <p className="text-xs text-muted-foreground flex flex-row items-center gap-x-2"><Star /> BESTE FOTO</p>
                          <Image 
                            src="/dummy/best.jpg"
                            alt="Best"
                            width={160}
                            height={90}
                          />
                        </div>
                        <ScrollArea>
                          <Timeline>
                            {item.minutes.map((minute: any, i: number) => (
                              <TimelineItem key={minute}>
                                <TimelineOppositeContent>
                                  {minute}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                  <TimelineDot />
                                  {i !== (item.minutes.length - 1) && (
                                    <TimelineConnector />
                                  )}
                                </TimelineSeparator>
                                <TimelineContent>
                                  <Image 
                                    src={item.photos[minute] || "/unavailable.png"}
                                    alt={minute}
                                    width={160}
                                    height={90}
                                  />
                                </TimelineContent>
                              </TimelineItem>
                            ))}
                          </Timeline>
                        </ScrollArea>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <p className="text-xs text-muted-foreground flex flex-row items-center gap-x-2">
                          <BookCopy /> ACHTERGRONDINFORMATIE
                        </p>
                        <div className="flex flex-row justify-between items-center">
                          <p className="font-bold text-xs">Op welke tijdstip is het voertuig gelaten?</p>
                          <p>tussen {fiveMinutesEarlier(item.minutes[0])} en {item.minutes[0]}</p>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                          <p className="font-bold text-sm">Wie heeft het voertuig gelaten?</p>
                          <p>{item.gender} {item.name}</p>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                          <p className="font-bold text-sm">Op welke datum is het voertuig gelaten?</p>
                          <p>{item.date}</p>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                          <p className="font-bold text-xs">Tijdstippen van confiscatie & vrijlating</p>
                          <p className="text-xs">{item.date} 19:30 - {addHoursToTimestamp(`${item.date} 19:30`, confiscatie[item.number])}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>
        </SignedIn>
      </ClerkLoaded>
      {medium && !legenda.hidden && (
        <div className="p-4 fixed right-0 bottom-[64px] bg-white/40 rounded-md">
          <div className="flex flex-col">
            <p className="text-center font-bold">
              Legenda
            </p>
            <div className="flex flex-row text-center items-center">
              <div className="bg-green-500 w-4 h-2 rounded-sm mr-2" />
              Waarschuwing
            </div>
            <div className="flex flex-row text-center items-center">
              <div className="bg-amber-500 w-4 h-2 rounded-sm mr-2" />
              2<sup>e</sup> &nbsp;waarschuwing
            </div>
            <div className="flex flex-row text-center items-center">
              <div className="bg-rose-500 w-4 h-2 rounded-sm mr-2" />
              Confiscatie
            </div>
          </div>
        </div>
      )}
      {matches && (
        <footer className="bg-slate-400 w-full h-16 fixed">
          <span className="text-black h-full flex flex-row items-center pl-8 gap-x-4 text-xs">
            © Product van het Ministerie van ICT-technologieën van de Republiek Hikeland. &nbsp;&nbsp; Gemaakt met<Image 
              src="/next.svg"
              alt="Next.js"
              width={64}
              height={64}
            />van<Image 
              src="/vercel.svg"
              alt="Vercel"
              width={64}
              height={64}
            /> 
          </span>
        </footer>
      )}
    </div>
  );
}
