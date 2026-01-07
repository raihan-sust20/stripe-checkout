'use client';

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import { apiClient } from '@/lib/api-client';
import type { Order } from '@/lib/types';
import { OrderSummary } from '@/components/checkout/order-summary';
import { PaymentForm } from '@/components/checkout/payment-form';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ApiError } from '@/lib/api-client';
import { useParams } from 'next/navigation';

export default function CheckoutPage() {
  const params = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeCheckout = async () => {
      try {
        const orderResponse = await apiClient.getOrder(params.orderId);

        if (!isMounted) return;
        setOrder(orderResponse.data);

        const paymentResponse = await apiClient.createPaymentIntent({
          orderId: params.orderId,
          provider: 'stripe',
          metadata: {
            customerName: `${orderResponse.data.user.firstName} ${orderResponse.data.user.lastName}`,
            email: orderResponse.data.user.email,
          },
        });

        const secret =
          paymentResponse?.data?.rawResponse?.client_secret;

        if (!secret) {
          throw new Error('Invalid payment intent response');
        }

        if (isMounted) {
          setClientSecret(secret);
        }
      } catch (err: unknown) {
        let message = 'Failed to initialize checkout';

        if (err instanceof ApiError) {
          message = err.message;
        } else if (err instanceof Error) {
          message = err.message;
        }

        if (isMounted) {
          setError(message);
          toast.error(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeCheckout();

    return () => {
      isMounted = false;
    };
  }, [params.orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error ?? 'Failed to load order details'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-600">
            Complete your purchase securely
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <OrderSummary order={order} />

          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#000000',
                  },
                },
              }}
            >
              <PaymentForm
                orderId={order.id}
                amount={order.total_amount}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}
