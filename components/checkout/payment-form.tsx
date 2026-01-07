"use client";

import { useState, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface PaymentFormProps {
  orderId: string;
  amount: string;
}

export function PaymentForm({ orderId, amount }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || isProcessing) return;

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success?orderId=${orderId}`,
        },
        redirect: "always",
      });

      if (error) {
        toast.error(error.message ?? "Payment failed. Please try again.");
        setIsProcessing(false);
        return;
      }

      setIsProcessing(false);

      // If no redirect happened, payment succeeded instantly
      toast.success("Payment successful!");
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!stripe || !elements || isProcessing}
            aria-busy={isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Processing...
              </span>
            ) : (
              `Pay $${amount}`
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Your payment is securely processed by Stripe.
            We do not store your card details.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
