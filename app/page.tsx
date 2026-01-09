import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-6">
      <main className="w-full max-w-3xl">
        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold tracking-tight">
              E-Commerce
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-6 text-center text-zinc-600 dark:text-zinc-400">
            <p>
              This application demonstrates a simple and secure e-commerce
              payment flow built with modern web technologies.
            </p>

            <p>
              To proceed with an order payment, please paste your{" "}
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                orderId
              </span>{" "}
              at the end of the current URL.
            </p>

            <div className="rounded-md bg-zinc-100 dark:bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-800 dark:text-zinc-200">
              https://your-domain.com/<span className="text-primary">orderId</span>
            </div>

            <p>
              You will be automatically navigated to the order payment page,
              where you can complete the checkout securely.
            </p>

            <div className="flex justify-center pt-2">
              <Button variant="outline" disabled>
                Waiting for Order ID
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
