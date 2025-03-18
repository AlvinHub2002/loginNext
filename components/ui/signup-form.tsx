// import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from 'next/navigation'

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  // Form state
  // const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  // Handle form submission
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Success")

    // Basic validation
    if (password !== confirmPassword) {
      // setError('Passwords do not match');
      toast.error("Password doesn't match", { position: "bottom-right" })
      return;
    }

    setLoading(true);
    // setError(null);

    try {
      await axios.post(process.env.NEXT_PUBLIC_SERVER_DOMAIN + '/api/v1/users',
        {
          "email": email,
          "password": password,
          "first_name": firstName,
          "last_name": lastName
        });
      router.push("/login");

      setSuccess(true);
      setFirstName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error.response.data.message || error.message || 'An error occurred', { position: "bottom-right" })
      // setError(error.message || 'An error occurred');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`flex flex-col gap-4 w-full max-w-sm ${className}`}
      onSubmit={onSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to register
        </p>
      </div>

      <div className="grid gap-4">
        {/* Name Field */}
        <div className="grid gap-2">
          <Label htmlFor="name">First name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        {/* Name Field */}
        <div className="grid gap-2">
          <Label htmlFor="name">Last name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        {/* Email Field */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Password Field */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Confirm Password Field */}
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {/* Register Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </div>

      {/* {error && <div className="text-red-500 text-center">{error}</div>} */}
      {success && <div className="text-green-500 text-center">Account created successfully!</div>}

      {/* Login Link */}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}