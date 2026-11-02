"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { pricing } from "@/content/site-content";
import { contactPageHref } from "@/lib/contact-form";
import {
  paypalCheckoutReady,
  paypalConfig,
  paypalPlanForInterest,
  paypalPlanId,
  type PaypalPlanKey,
} from "@/lib/paypal";

type PayPalButtonsInstance = {
  render: (container: HTMLElement) => Promise<void>;
  close: () => Promise<void> | void;
};

type PayPalNamespace = {
  Buttons: (options: {
    style: { shape: "pill"; color: "gold"; layout: "vertical"; label: "subscribe" };
    createSubscription: (
      data: unknown,
      actions: {
        subscription: {
          create: (options: { plan_id: string }) => Promise<string>;
        };
      },
    ) => Promise<string>;
    onApprove: (data: { subscriptionID?: string }) => void;
    onError: () => void;
  }) => PayPalButtonsInstance;
};

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

type CheckoutState =
  | { status: "idle" }
  | { status: "approved"; subscriptionId: string }
  | { status: "error" };

let sdkPromise: Promise<void> | null = null;

function loadPayPalSdk(clientId: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }
  if (window.paypal) {
    return Promise.resolve();
  }
  if (!sdkPromise) {
    sdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&vault=true&intent=subscription`;
      script.async = true;
      script.dataset.paypalSdk = "subscription";
      script.onload = () => resolve();
      script.onerror = () => {
        sdkPromise = null;
        reject(new Error("PayPal SDK failed to load"));
      };
      document.body.appendChild(script);
    });
  }
  return sdkPromise;
}

function QuestionsLink({ interestKey }: { interestKey: string }) {
  return (
    <Link
      href={contactPageHref(interestKey)}
      className="mt-3 block text-center text-sm text-foreground/70 underline-offset-2 hover:text-foreground hover:underline"
    >
      {pricing.subscribe.questions}
    </Link>
  );
}

function SubscribePlaceholder({ noteId }: { noteId: string }) {
  return (
    <>
      <button
        type="button"
        disabled
        aria-describedby={noteId}
        className="flex h-[45px] w-full cursor-not-allowed items-center justify-center rounded-full bg-[#ffc439] px-4 text-sm font-semibold text-[#111] opacity-60"
      >
        {pricing.subscribe.placeholderLabel}
      </button>
      <p id={noteId} className="mt-2 text-center text-xs text-muted-foreground">
        {pricing.subscribe.placeholderNote}
      </p>
    </>
  );
}

export function PayPalSubscribeButton({ interestKey }: { interestKey: string }) {
  const plan: PaypalPlanKey | undefined = paypalPlanForInterest(interestKey);
  const planId = paypalPlanId(plan);
  const ready = paypalCheckoutReady(planId);
  const noteId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CheckoutState>({ status: "idle" });

  useEffect(() => {
    if (!ready || !paypalConfig.clientId || !planId) {
      return;
    }
    const clientId = paypalConfig.clientId;
    const container = containerRef.current;
    if (!container) {
      return;
    }
    let alive = true;
    let buttons: PayPalButtonsInstance | undefined;

    loadPayPalSdk(clientId)
      .then(() => {
        if (!alive || !window.paypal || !container.isConnected) {
          return;
        }
        buttons = window.paypal.Buttons({
          style: { shape: "pill", color: "gold", layout: "vertical", label: "subscribe" },
          createSubscription: (_data, actions) => actions.subscription.create({ plan_id: planId }),
          onApprove: (data) => {
            setState({
              status: "approved",
              subscriptionId: data.subscriptionID ?? "",
            });
          },
          onError: () => {
            setState({ status: "error" });
          },
        });
        return buttons.render(container);
      })
      .catch(() => {
        if (alive) {
          setState({ status: "error" });
        }
      });

    return () => {
      alive = false;
      void buttons?.close();
    };
  }, [planId, ready]);

  return (
    <div>
      {state.status === "approved" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
          <p>{pricing.subscribe.thankYou}</p>
          {state.subscriptionId ? (
            <p className="mt-2 break-all text-xs text-emerald-900">
              Subscription ID: {state.subscriptionId}
            </p>
          ) : null}
        </div>
      ) : null}
      {state.status === "error" ? (
        <p className="mb-3 text-sm text-red-700" role="alert">
          {pricing.subscribe.error}
        </p>
      ) : null}
      {state.status !== "approved" && !ready ? <SubscribePlaceholder noteId={noteId} /> : null}
      {state.status !== "approved" && ready ? (
        <div ref={containerRef} className="min-h-[45px] w-full" />
      ) : null}
      <QuestionsLink interestKey={interestKey} />
    </div>
  );
}
