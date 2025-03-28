import {
  CheckCircle,
  Circle,
  LucideIcon,
  Package,
  RotateCcw,
  Truck,
} from "lucide-react";
import { Order, OrderStatus, PaymentStatus } from "@/types.ts";
import { addHours, addMinutes, format } from "date-fns";
import { formatNumbers, getPaymentMethodText } from "@/lib/utils.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";

interface OrderTimelineProps {
  order?: Order;
  isLoading: boolean;
}

const dateFormat = "MMMM d, yyyy - hh:mm a";

interface OrderTimelineSteps {
  status: string;
  date: string;
  description: string;
  icon: LucideIcon;
  completed: boolean;
  current?: boolean;
}

function buildTimeline(order?: Order) {
  if (!order) return [];

  const timeline: OrderTimelineSteps[] = [
    {
      status: "Order Placed",
      date: format(new Date(order.orderDate), dateFormat),
      description: `Order #${order.orderNumber} was placed by ${order.user.firstName} ${order.user.lastName}`,
      icon: Circle,
      completed: true,
    },
  ];

  const steps = [
    {
      condition: order.paymentStatus === PaymentStatus.Paid,
      step: {
        status: "Payment Confirmed",
        date: format(addMinutes(new Date(order.orderDate), 2), dateFormat),
        description: `Payment of ${formatNumbers(true, order.totalAmount)} was confirmed via ${getPaymentMethodText(order.paymentMethod)}`,
        icon: CheckCircle,
        completed: true,
      },
    },
    {
      condition: order.status >= OrderStatus.Processing,
      step: {
        status: "Processing",
        date: format(addHours(new Date(order.orderDate), 7), dateFormat),
        description: "Order is being prepared for shipping",
        icon: Package,
        completed: true,
      },
    },
    {
      condition: order.status >= OrderStatus.Shipped,
      step: {
        status: "Shipped",
        date: format(addHours(new Date(order.orderDate), 15), dateFormat),
        description: "Order will be shipped via Express Delivery",
        icon: Truck,
        completed: true,
      },
    },
    {
      condition: order.status >= OrderStatus.Delivered,
      step: {
        status: "Delivered",
        date: order.deliveryDate
          ? format(new Date(order.deliveryDate), dateFormat)
          : format(new Date(), dateFormat),
        description: `Order delivered to: ${order.shippingAddress.split(",").slice(1, 3).join(", ")}`,
        icon: CheckCircle,
        completed: true,
      },
    },
    {
      condition: order.status === OrderStatus.Returned,
      step: {
        status: "Returned",
        date: order.deliveryDate
          ? format(new Date(order.deliveryDate), dateFormat)
          : format(new Date(), dateFormat),
        description: "Order returned",
        icon: RotateCcw,
        completed: true,
      },
    },
  ];

  steps.forEach(({ condition, step }) => {
    if (condition) timeline.push(step);
  });

  timeline[timeline.length - 1]["current"] = true;

  return timeline;
}

export function OrderTimeline({ order, isLoading }: OrderTimelineProps) {
  if (isLoading) return <OrderTimelineSkeleton />;

  const timeline = buildTimeline(order);

  return (
    <div className="space-y-8">
      {timeline.map((item, index) => (
        <div key={index} className="flex">
          <div className="flex flex-col items-center mr-4">
            <div
              className={`rounded-full p-1 ${
                item.completed
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground bg-muted"
              } ${item.current ? "ring-2 ring-primary ring-offset-2" : ""}`}
            >
              <item.icon className="h-5 w-5" />
            </div>
            {index < timeline.length - 1 && (
              <div
                className={`h-full w-px mt-1 ${item.completed ? "bg-primary" : "bg-muted"}`}
              />
            )}
          </div>
          <div className="pb-8">
            <div className="flex items-baseline">
              <p className="font-medium">{item.status}</p>
              <span className="ml-2 text-sm text-muted-foreground">
                {item.date}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrderTimelineSkeleton() {
  const dummyTimeline = Array(5).fill({
    status: "Loading...",
    date: "Loading...",
    description: "Fetching data...",
    icon: Circle,
    completed: false,
    current: false,
  });

  return (
    <div className="space-y-8">
      {dummyTimeline.map((item, index) => (
        <div key={index} className="flex">
          {/* Icon and Line */}
          <div className="flex flex-col items-center mr-4">
            <div
              className={`rounded-full p-1 text-muted-foreground bg-muted ${
                item.current ? "ring-2 ring-primary ring-offset-2" : ""
              }`}
            >
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            {index < dummyTimeline.length - 1 && (
              <div className="h-full w-px mt-1 bg-muted" />
            )}
          </div>

          {/* Content */}
          <div className="pb-8">
            <div className="flex items-baseline">
              <Skeleton className="w-32 h-5" />
              <Skeleton className="ml-2 w-20 h-4" />
            </div>
            <Skeleton className="w-48 h-4 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
