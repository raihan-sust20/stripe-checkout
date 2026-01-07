import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Order } from '@/lib/types';

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × ${item.price}
                </p>
              </div>
              <p className="font-medium">${item.subtotal}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${order.total_amount}</span>
          </div>
        </div>

        <div className="border-t pt-3 text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium">Customer:</span> {order.user.firstName}{' '}
            {order.user.lastName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {order.user.email}
          </p>
          <p>
            <span className="font-medium">Order ID:</span> {order.id}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
