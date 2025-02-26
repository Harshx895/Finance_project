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
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
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

const goalData = [
  { name: 'Emergency Fund', current: 8000, target: 10000, deadline: 'Dec 2024' },
  { name: 'House Down Payment', current: 25000, target: 50000, deadline: 'Jun 2025' },
  { name: 'Vacation Fund', current: 2000, target: 5000, deadline: 'Aug 2024' },
];

const investmentData = [
  { category: 'Stocks', value: 15000, percentage: 60 },
  { category: 'Bonds', value: 5000, percentage: 20 },
  { category: 'Real Estate', value: 3000, percentage: 12 },
  { category: 'Crypto', value: 2000, percentage: 8 },
];

const debtData = [
  { name: 'Credit Card', amount: 5000, interestRate: 18.99, monthlyPayment: 500 },
  { name: 'Student Loan', amount: 25000, interestRate: 5.5, monthlyPayment: 300 },
  { name: 'Car Loan', amount: 15000, interestRate: 4.5, monthlyPayment: 400 },
];

const scenarioData = [
  { month: 'Current', baseline: 58000, optimistic: 58000, conservative: 58000 },
  { month: '+3mo', baseline: 61000, optimistic: 63000, conservative: 59000 },
  { month: '+6mo', baseline: 64000, optimistic: 69000, conservative: 60000 },
  { month: '+9mo', baseline: 67000, optimistic: 76000, conservative: 61000 },
  { month: '+12mo', baseline: 70000, optimistic: 84000, conservative: 62000 },
];

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
            <div className="grid gap-4">
              {goalData.map((goal, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{goal.name}</CardTitle>
                    <CardDescription>Target Date: {goal.deadline}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Progress: ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                        <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div
                          className="h-2 bg-primary rounded-full transition-all"
                          style={{ width: `${(goal.current / goal.target) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>AI Tip: Increase your monthly contribution by $100 to reach your goal 2 months earlier.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="investments" className="animate-in">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Allocation</CardTitle>
                  <CardDescription>Current investment distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={investmentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {investmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                  <CardDescription>Portfolio risk metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investmentData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="debt" className="animate-in">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Debt Overview</CardTitle>
                  <CardDescription>Track and manage your debts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {debtData.map((debt, index) => (
                      <div key={index} className="space-y-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Type</p>
                            <p className="font-medium">{debt.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Amount</p>
                            <p className="font-medium">${debt.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Interest Rate</p>
                            <p className="font-medium">{debt.interestRate}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Monthly Payment</p>
                            <p className="font-medium">${debt.monthlyPayment}</p>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full"
                            style={{ width: "40%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Debt Payoff Strategy</CardTitle>
                  <CardDescription>Recommended approach for faster debt repayment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>Recommended Strategy: Debt Avalanche (Highest Interest First)</p>
                    <p className="text-muted-foreground">
                      Focus on paying off your credit card debt first while maintaining minimum payments on other debts.
                      This could save you approximately $1,200 in interest over the next year.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="animate-in">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Net Worth Projections</CardTitle>
                  <CardDescription>Compare different financial scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={scenarioData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="baseline" stroke="#0088FE" name="Baseline" strokeWidth={2} />
                        <Line type="monotone" dataKey="optimistic" stroke="#00C49F" name="Optimistic" strokeWidth={2} />
                        <Line type="monotone" dataKey="conservative" stroke="#FF8042" name="Conservative" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>Generated recommendations based on your scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Optimistic Scenario</h4>
                      <p className="text-sm text-muted-foreground">
                        If you increase your monthly investment by 10% and maintain current spending levels,
                        your net worth could grow to $84,000 by next year.
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Risk Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Even in a conservative scenario, your emergency fund provides 4 months of coverage,
                        maintaining financial stability.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

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
