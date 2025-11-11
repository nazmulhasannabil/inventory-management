import { SignIn } from "@stackframe/stack";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <SignIn fullPage={true} />
        <Link href="/" className="bg-gray-900 text-sm rounded px-2 py-1 mt-4 text-white hover:bg-gray-900/80 transition">
          ← Back to Home
        </Link>
    </div>
  )
};
