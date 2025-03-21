
import { LoginForm } from "@/components/AuthForms";
import Navbar from "@/components/Navbar";

const Login = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-16 pt-32">
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;
