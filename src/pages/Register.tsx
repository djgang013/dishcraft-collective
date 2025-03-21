
import { RegisterForm } from "@/components/AuthForms";
import Navbar from "@/components/Navbar";

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-16 pt-32">
        <RegisterForm />
      </main>
    </div>
  );
};

export default Register;
