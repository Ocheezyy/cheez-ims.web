import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const deliveryData = [
  { month: "Jan", onTime: 95, late: 5 },
  { month: "Feb", onTime: 92, late: 8 },
  { month: "Mar", onTime: 98, late: 2 },
  { month: "Apr", onTime: 90, late: 10 },
  { month: "May", onTime: 95, late: 5 },
  { month: "Jun", onTime: 97, late: 3 },
];

const qualityData = [
  { month: "Jan", accepted: 98, rejected: 2 },
  { month: "Feb", accepted: 97, rejected: 3 },
  { month: "Mar", accepted: 99, rejected: 1 },
  { month: "Apr", accepted: 96, rejected: 4 },
  { month: "May", accepted: 98, rejected: 2 },
  { month: "Jun", accepted: 99, rejected: 1 },
];

const priceData = [
  { month: "Jan", price: 100 },
  { month: "Feb", price: 102 },
  { month: "Mar", price: 101 },
  { month: "Apr", price: 103 },
  { month: "May", price: 105 },
  { month: "Jun", price: 104 },
];

const kpis = [
  { name: "On-Time Delivery", value: "95%", change: "+2%", status: "positive" },
  {
    name: "Quality Acceptance",
    value: "98%",
    change: "+1%",
    status: "positive",
  },
  {
    name: "Price Competitiveness",
    value: "A",
    change: "Same",
    status: "neutral",
  },
  { name: "Response Time", value: "4hrs", change: "-1hr", status: "positive" },
];

export function SupplierPerformance() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p
                className={`text-xs ${
                  kpi.status === "positive"
                    ? "text-green-600"
                    : kpi.status === "negative"
                      ? "text-red-600"
                      : "text-muted-foreground"
                }`}
              >
                {kpi.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="delivery">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="delivery">Delivery Performance</TabsTrigger>
          <TabsTrigger value="quality">Quality Performance</TabsTrigger>
          <TabsTrigger value="price">Price Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="delivery" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>On-Time Delivery Rate</CardTitle>
              <CardDescription>
                Percentage of orders delivered on time vs. late deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deliveryData} stackOffset="expand">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Bar
                      dataKey="onTime"
                      name="On Time"
                      stackId="a"
                      fill="#22c55e"
                    />
                    <Bar
                      dataKey="late"
                      name="Late"
                      stackId="a"
                      fill="#ef4444"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quality" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Acceptance Rate</CardTitle>
              <CardDescription>
                Percentage of products accepted vs. rejected due to quality
                issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={qualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Bar dataKey="accepted" name="Accepted" fill="#22c55e" />
                    <Bar dataKey="rejected" name="Rejected" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="price" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Index Trend</CardTitle>
              <CardDescription>
                Price index trend over time (base: 100)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[95, 110]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="price"
                      name="Price Index"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
