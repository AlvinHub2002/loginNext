import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import axios from "axios";
import toast from "react-hot-toast";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  // Handle form submission
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    // setError(null);

    try {
      await axios.post(process.env.NEXT_PUBLIC_SERVER_DOMAIN + '/api/v1/login', {
        "emailId": email,
        password,
      });


      setSuccess(true);
      router.push("/form/upskill2025");
      // Assuming the response contains a token or some other data after successful login
      // You could store the token or redirect the user here
      // Optionally store the token or user data, e.g., in localStorage, or set some state
      // localStorage.setItem('token', data.token);
      // You might want to redirect the user to a protected page
      // For example: router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response.data.message || error.message || 'An error occurred', { position: "bottom-right" })
      // setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={onSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
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
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>

      {/* {error && <div className="text-red-500 text-center">{error}</div>} */}
      {success && <div className="text-green-500 text-center">Login successful!</div>}

      {/* Sign Up Link */}
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
