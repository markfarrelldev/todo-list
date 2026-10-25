import LoginForm from "../ui/components/login-form";

export default function LoginPage() {

    return (
        <main>
            <div className="flex items-center justify-center h-screen">
                <div className="relative flex flex-col max-w-lg p-4">
                    <LoginForm />
                </div>
            </div>
        </main>
    );
}