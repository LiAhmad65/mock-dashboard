"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import AppButton from "@/app/components/button/AppButton";
import AppInput from "@/app/components/input/AppInput";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const handleSubmit = (values: { email: string; password: string }) => {
    console.log("Form submitted:", values);
    // Handle login logic here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 font-sans sm:px-6 lg:px-8">
      <main className="w-full max-w-md">
        <div className="rounded-lg bg-white p-6 shadow-lg sm:p-8 md:p-10">
          <h1 className="mb-6 text-2xl font-semibold text-gray-900 sm:text-3xl">
            Login
          </h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 sm:space-y-5 md:space-y-6">
                <AppInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                />
                <AppInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  showPasswordToggle={true}
                />
                <AppButton
                  label="Sign In"
                  isLoading={isSubmitting}
                  type="submit"
                />
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
}
