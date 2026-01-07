export interface Order {
  id: string;
  user_id: string;
  total_amount: string;
  status: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: {
    id: string;
    sku: string;
    name: string;
    description: string;
    price: string;
  };
  price: string;
  quantity: number;
  subtotal: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: Order;
}

export interface CreatePaymentIntentRequest {
  orderId: string;
  provider: 'stripe';
  metadata: {
    customerName: string;
    email: string;
  };
}

export interface PaymentIntentResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    orderId: string;
    provider: string;
    transactionId: string;
    status: string;
    amount: string;
    rawResponse: {
      client_secret: string;
      id: string;
      amount: number;
      currency: string;
      status: string;
    };
  };
}
