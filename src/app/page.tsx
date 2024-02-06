import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./note/Navbar";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect("/note");
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <Navbar />
      <div className="flex items-center gap-4">
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Shera AI
        </span>
      </div>
      <p className="max-w-prose text-center">
        Intelligent note-taking app built with OpenAI, Pinecone, Next.js, and
        authenticated with Clerk.
      </p>
      <Button size="lg" asChild>
        <Link href="/notes">Get Started</Link>
      </Button>
    </main>
  );
}
