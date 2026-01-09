"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const router = useRouter();

  const [authToken, setAuthToken] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [orderId, setOrderId] = useState("");

  // Check for JWT token in localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  const handleSaveToken = () => {
    if (!tokenInput.trim()) return;
    localStorage.setItem("authToken", tokenInput.trim());
    setAuthToken(tokenInput.trim());
    setTokenInput("");
  };

  const handleOrderSubmit = () => {
    if (!orderId.trim()) return;
    router.push(`/${orderId.trim()}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-6">
      <main className="w-full max-w-3xl">
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-md">
          <CardHeader className="text-center space-y-3">
            <CardTitle className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              E-Commerce Checkout
            </CardTitle>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              Secure and streamlined payment experience
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-10">
            {/* Intro */}
            <p className="text-lg leading-8 text-zinc-700 dark:text-zinc-300 text-center">
              This checkout flow allows you to complete payments securely using
              a valid authentication token and a unique order reference.
            </p>

            {/* Auth Token Section */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-6 py-6 space-y-4">
              <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                Authentication Status
              </p>

              {authToken ? (
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    A valid JWT access token is available.
                  </p>
                  <Badge variant="secondary">Authenticated</Badge>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Please provide your JWT access token to continue.
                  </p>
                  <Input
                    placeholder="Paste JWT access token"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                  />
                  <Button onClick={handleSaveToken} className="w-full">
                    Save Token
                  </Button>
                </div>
              )}
            </div>

            {/* Order ID Section */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-6 py-6 space-y-4">
              <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                Order Payment
              </p>

              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Enter your order ID below. You will be redirected to the secure
                payment page automatically.
              </p>

              <Input
                placeholder="Enter order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />

              <Button
                size="lg"
                className="w-full"
                onClick={handleOrderSubmit}
                disabled={!orderId}
              >
                Proceed to Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
