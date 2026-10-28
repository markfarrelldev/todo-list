'use client';

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/todo-list';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-3 bg-sky-400 px-6 py-10 shadow-lg">
        <h1 className="mb-3 text-2xl text-sky-900">Login</h1>
        <div>
          <label htmlFor="email" className="text-sky-800">Email</label>
          <input id="email" name="email" type="text" className="rounded-md border border-sky-900 p-2 bg-white w-full text-sky-800" placeholder="Enter your email address" />
        </div>
        <div>
          <label htmlFor="password" className="text-sky-800">Password</label>
          <input id="password" name="password" type="password" className="rounded-md border border-sky-900 p-2 bg-white w-full text-sky-800" placeholder="Enter password" />
        </div>
        <div>
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <button type="submit" disabled={isPending} className="w-full rounded-md text-sky-200 bg-sky-900 py-2 mt-2 hover:bg-sky-700">
            {isPending ? "Logging In..." : "Login"}
          </button>
        </div>
        <div aria-live="polite" aria-atomic="true">
          {errorMessage && <p className="text-sm text-red-700">{errorMessage}</p>}
        </div>
      </div>
    </form>
  );
}