
import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const dummyNetWorthData = [
  { month: 'Jan', value: 50000 },
  { month: 'Feb', value: 52000 },
  { month: 'Mar', value: 51000 },
  { month: 'Apr', value: 54000 },
  { month: 'May', value: 55000 },
  { month: 'Jun', value: 58000 },
];

const expenseData = [
  { name: 'Housing', value: 1500 },
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 300 },
  { name: 'Utilities', value: 200 },
  { name: 'Entertainment', value: 150 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAIChat, setShowAIChat] = useState(false);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Hello, Andrew</h1>
          <p className="text-muted-foreground">Welcome back</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="debt">Debt Management</TabsTrigger>
            <TabsTrigger value="scenarios">What-If Scenarios</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8 animate-in">
            <div className="grid gap-4 md:grid-cols-3">
              <MetricCard
                title="Net Worth"
                value="$58,000"
                percentage={8}
                color="bg-[#0088FE]"
              />
              <MetricCard
                title="Monthly Savings"
                value="$2,500"
                percentage={15}
                color="bg-[#00C49F]"
              />
              <MetricCard
                title="Total Investments"
                value="$25,000"
                percentage={12}
                color="bg-[#FFBB28]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Net Worth Trend</CardTitle>
                  <CardDescription>Your financial growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dummyNetWorthData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#0088FE"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription>
                    Your spending categories this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {expenseData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="animate-in">
            <Card>
              <CardHeader>
                <CardTitle>Financial Goals</CardTitle>
                <CardDescription>Track your financial objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Goals feature coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="animate-in">
            <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>
                  Track your investment performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Investment tracking coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="debt" className="animate-in">
            <Card>
              <CardHeader>
                <CardTitle>Debt Management</CardTitle>
                <CardDescription>Track your debt repayment progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Debt management feature coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scenarios" className="animate-in">
            <Card>
              <CardHeader>
                <CardTitle>What-If Scenarios</CardTitle>
                <CardDescription>
                  Simulate different financial scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Scenario simulation coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Assistant Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={() => setShowAIChat(!showAIChat)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Index;
