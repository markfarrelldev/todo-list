import SignUpForm from "../ui/components/sign-up-form";

export default function SignUpPage() {

    return (
        <main>
            <div className="flex items-center justify-center h-screen">
                <div className="relative flex flex-col max-w-lg p-4">
                    <SignUpForm />
                </div>
            </div>
        </main>
    );
}