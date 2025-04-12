"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import { registerUser } from "@/lib/actions";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    bio: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const verificationSchema = z.object({
  otp: z.string(),
});

type SignupFormData = z.infer<typeof signupSchema>;
type VerificationFormData = z.infer<typeof verificationSchema>;
export default function SignUpForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [formData, setFormData] = React.useState<SignupFormData | null>(null);
  const [generatedOTP, setGeneratedOTP] = React.useState<string>("");
  const [otpValue, setOtpValue] = React.useState("");
  //   const { toast } = useToast();
  const router = useRouter();

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      bio: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const verificationForm = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const onSignupSubmit = async (values: SignupFormData) => {
    try {
      const otp = generateOTP();
      setGeneratedOTP(otp);
      setFormData(values);

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          name: values.name,
          otp: otp,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send verification email");
      }

      setIsVerifying(true);
      //   toast({
      //     title: "Verification Code Sent",
      //     description: "Please check your email for the verification code.",
      //   });
    } catch (error) {
      //   toast({
      //     title: "Error",
      //     description: "Failed to send verification email. Please try again.",
      //     variant: "destructive",
      //   });
    }
  };

  const onVerificationSubmit = async () => {
    try {
      if (otpValue !== generatedOTP) {
        // toast({
        //   title: "Error",
        //   description: "Invalid verification code. Please try again.",
        //   variant: "destructive",
        // });
        return;
      }

      if (!formData) {
        // toast({
        //   title: "Error",
        //   description: "Something went wrong. Please try again.",
        //   variant: "destructive",
        // });
        return;
      }

      const submitFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && key !== "confirmPassword") {
          submitFormData.append(key, value);
        }
      });

      //   const result = await registerUser(submitFormData);

      //   if (result.success) {
      //     toast({
      //       title: `Logged in as ${result.name}`,
      //       description: "Your account has been created successfully.",
      //     });

      //     setIsVerifying(false);
      //     setFormData(null);
      //     setGeneratedOTP("");
      //     setOtpValue("");
      //     signupForm.reset();
      //     verificationForm.reset();

      //     //redirect
      //     router.push("/");
      //   } else {
      //     toast({
      //       title: "Sign up failed",
      //       description: result.errorMsg,
      //       variant: "destructive",
      //     });
      //   }
    } catch (error) {
      //   toast({
      //     title: "Sign up failed",
      //     description: "An unknown error occurred",
      //     variant: "destructive",
      //   });
    }
  };

  const resendVerificationCode = async () => {
    if (!formData) return;

    try {
      const newOTP = generateOTP();
      setGeneratedOTP(newOTP);

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          otp: newOTP,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to resend verification code");
      }

      //   toast({
      //     title: "Verification Code Resent",
      //     description: "Please check your email for the new verification code.",
      //   });
    } catch (error) {
      //   toast({
      //     title: "Error",
      //     description: "Failed to resend verification code. Please try again.",
      //     variant: "destructive",
      //   });
    }
  };

  return (
    <Card className="w-sm mt-16 lg:mt-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-bold">
          {isVerifying ? "Verify Email" : "Create an Account"}
        </CardTitle>
        <CardDescription>Start sharing your cooking skills</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(onSignupSubmit)}
            className="mt-2 space-y-6"
          >
            <FormField
              control={signupForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      {...field}
                      className="rounded-2xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      type="email"
                      className="rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••••••••••"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="pr-10 rounded-full"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••••••••••"
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        className="pr-10 rounded-full"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={signupForm.formState.isSubmitting}
            >
              {signupForm.formState.isSubmitting ? (
                <>
                  <span>Sending otp</span>
                  <span className="animate-spin">
                    <Loader2 className="h-4 w-4" />
                  </span>
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
