export const paypalPlanKeys = ["lifestyle", "trader", "realtor"] as const;

export type PaypalPlanKey = (typeof paypalPlanKeys)[number];

function present(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export const paypalConfig = {
  clientId: present(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID),
  plans: {
    lifestyle: present(process.env.NEXT_PUBLIC_PAYPAL_PLAN_LIFESTYLE),
    trader: present(process.env.NEXT_PUBLIC_PAYPAL_PLAN_TRADER),
    realtor: present(process.env.NEXT_PUBLIC_PAYPAL_PLAN_REALTOR),
  },
} as const;

const planByInterest = {
  "get-started-lifestyle-user": "lifestyle",
  "get-started-trader": "trader",
  "get-started-realtor": "realtor",
} as const satisfies Record<string, PaypalPlanKey>;

export function paypalPlanForInterest(interestKey: string): PaypalPlanKey | undefined {
  return planByInterest[interestKey as keyof typeof planByInterest];
}

export function paypalPlanId(plan: PaypalPlanKey | undefined): string | undefined {
  if (!plan) {
    return undefined;
  }
  return paypalConfig.plans[plan];
}

export function paypalCheckoutReady(planId: string | undefined): planId is string {
  return Boolean(paypalConfig.clientId && planId);
}
