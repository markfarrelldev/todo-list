import LoginForm from "../ui/components/login-form";
import { Suspense } from "react";

export default function LoginPage() {

    return (
        <main>
            <div className="flex items-center justify-center h-screen">
                <div className="relative flex flex-col max-w-lg p-4">
                    <Suspense>
                        <LoginForm />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}