import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-6">
      <main className="w-full max-w-3xl">
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="text-center space-y-3">
            <CardTitle className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              E-Commerce Checkout
            </CardTitle>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              A simple and secure payment experience
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-8 text-center">
            <p className="text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              This application demonstrates a modern e-commerce checkout flow
              built using Next.js and Stripe. It allows users to securely
              complete payments using a unique order reference.
            </p>

            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-6 py-5">
              <p className="mb-3 text-base font-medium text-zinc-900 dark:text-zinc-100">
                How to continue with your payment
              </p>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Please copy your <span className="font-medium">orderId</span>{" "}
                and paste it at the end of the current URL in your browser’s
                address bar.
              </p>

              <div className="mt-4 rounded-md bg-white dark:bg-black px-4 py-3 font-mono text-sm text-zinc-900 dark:text-zinc-100">
                https://stripe-checkout-beta.vercel.app/
                <span className="text-primary">orderId</span>
              </div>
            </div>

            <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Once the order ID is added, you will be automatically redirected
              to the secure payment page where you can complete your checkout.
            </p>

            <div className="flex justify-center pt-2">
              <Button variant="outline" size="lg" disabled>
                Waiting for Order ID
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
