
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
import { MessageCircle, User, ChevronDown, TrendingUp, Wallet, CreditCard, BarChart3, Target, Lightbulb } from "lucide-react";
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

const COLORS = ['#FF6B6B', '#48BEFF', '#4ECDC4', '#FFD166', '#FFADAD'];

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
    <div className="min-h-screen p-3 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Hello, Andrew</h1>
            <p className="text-sm md:text-base text-muted-foreground">Your finances are looking good today</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <ChevronDown className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6 md:space-y-8">
          <div className="relative overflow-auto pb-1">
            <TabsList className="inline-flex w-full md:w-auto p-1 gap-1 bg-primary/10 rounded-full overflow-x-auto scrollbar-none">
              <TabsTrigger value="dashboard" className="rounded-full whitespace-nowrap data-[state=active]:tab-active">
                <BarChart3 className="h-4 w-4 mr-1 md:mr-2" />
                <span className="md:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="goals" className="rounded-full whitespace-nowrap data-[state=active]:tab-active">
                <Target className="h-4 w-4 mr-1 md:mr-2" />
                <span className="md:inline">Goals</span>
              </TabsTrigger>
              <TabsTrigger value="investments" className="rounded-full whitespace-nowrap data-[state=active]:tab-active">
                <TrendingUp className="h-4 w-4 mr-1 md:mr-2" />
                <span className="md:inline">Investments</span>
              </TabsTrigger>
              <TabsTrigger value="debt" className="rounded-full whitespace-nowrap data-[state=active]:tab-active">
                <CreditCard className="h-4 w-4 mr-1 md:mr-2" />
                <span className="md:inline">Debt</span>
              </TabsTrigger>
              <TabsTrigger value="scenarios" className="rounded-full whitespace-nowrap data-[state=active]:tab-active">
                <Lightbulb className="h-4 w-4 mr-1 md:mr-2" />
                <span className="md:inline">Scenarios</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6 md:space-y-8 animate-in">
            <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <MetricCard
                title="Net Worth"
                value="$58,000"
                percentage={8}
                color="bg-primary"
              />
              <MetricCard
                title="Monthly Savings"
                value="$2,500"
                percentage={15}
                color="bg-primary"
              />
              <MetricCard
                title="Total Investments"
                value="$25,000"
                percentage={12}
                color="bg-primary"
                className="sm:col-span-2 md:col-span-1"
              />
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
              <Card className="glass-card border-none shadow-lg bg-primary/10">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-2xl">Net Worth Trend</CardTitle>
                  <CardDescription>Your financial growth over time</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="h-[200px] md:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dummyNetWorthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(10, 10, 20, 0.8)', borderColor: 'rgba(49, 111, 246, 0.2)' }}
                          labelStyle={{ color: '#fff' }}
                          formatter={(value) => [`$${value}`, 'Value']}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#316FF6"
                          strokeWidth={3}
                          dot={{ stroke: '#316FF6', strokeWidth: 2, r: 4 }}
                          activeDot={{ stroke: '#316FF6', strokeWidth: 3, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-none shadow-lg bg-primary/10">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-2xl">Expense Breakdown</CardTitle>
                  <CardDescription>
                    Your spending categories this month
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="h-[200px] md:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <Pie
                          data={expenseData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {expenseData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(10, 10, 20, 0.8)', borderColor: 'rgba(49, 111, 246, 0.2)' }}
                          labelStyle={{ color: '#fff' }}
                          formatter={(value) => [`$${value}`, 'Amount']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6 animate-in">
            <div className="grid gap-6">
              {goalData.map((goal, index) => (
                <Card key={index} className="glass-card border-none shadow-lg bg-primary/10 overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>{goal.name}</CardTitle>
                      <span className="text-sm px-3 py-1 rounded-full bg-primary/20">
                        {goal.deadline}
                      </span>
                    </div>
                    <CardDescription>Target: ${goal.target.toLocaleString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Current: ${goal.current.toLocaleString()}</span>
                        <span className="font-medium">{Math.round((goal.current / goal.target) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-2 progress-gradient rounded-full transition-all"
                          style={{ width: `${(goal.current / goal.target) * 100}%` }}
                        />
                      </div>
                      <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="flex gap-2 items-start">
                          <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                          <p className="text-sm">
                            AI Tip: Increase your monthly contribution by $100 to reach your goal 2 months earlier.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="investments" className="animate-in">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass-card border-none shadow-lg bg-primary/10">
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
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {investmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(10, 10, 20, 0.8)', borderColor: 'rgba(49, 111, 246, 0.2)' }}
                          labelStyle={{ color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-none shadow-lg bg-primary/10">
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                  <CardDescription>Portfolio risk metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {investmentData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm text-muted-foreground">${item.value.toLocaleString()} ({item.percentage}%)</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${item.percentage}%`, 
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
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
            <div className="space-y-6">
              <Card className="glass-card border-none shadow-lg bg-primary/10">
                <CardHeader>
                  <CardTitle>Debt Overview</CardTitle>
                  <CardDescription>Track and manage your debts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {debtData.map((debt, index) => (
                      <div key={index} className="space-y-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{debt.name}</h3>
                          <span className="text-sm px-3 py-1 rounded-full bg-primary/20 text-primary-foreground">
                            {debt.interestRate}% APR
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Total Amount</p>
                            <p className="font-medium">${debt.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Monthly Payment</p>
                            <p className="font-medium">${debt.monthlyPayment}</p>
                          </div>
                          <div className="hidden md:block">
                            <p className="text-xs text-muted-foreground">Est. Payoff</p>
                            <p className="font-medium">{Math.ceil(debt.amount / debt.monthlyPayment)} months</p>
                          </div>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-2 progress-gradient rounded-full"
                            style={{ width: "40%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-none shadow-lg bg-primary/10">
                <CardHeader>
                  <CardTitle>Debt Payoff Strategy</CardTitle>
                  <CardDescription>Recommended approach for faster debt repayment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex gap-2 items-start">
                      <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                      <div className="space-y-2">
                        <p className="font-medium">Recommended Strategy: Debt Avalanche (Highest Interest First)</p>
                        <p className="text-sm text-muted-foreground">
                          Focus on paying off your credit card debt first while maintaining minimum payments on other debts.
                          This could save you approximately $1,200 in interest over the next year.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="animate-in">
            <div className="space-y-6">
              <Card className="glass-card border-none shadow-lg bg-primary/10">
                <CardHeader>
                  <CardTitle>Net Worth Projections</CardTitle>
                  <CardDescription>Compare different financial scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={scenarioData}>
                        <XAxis dataKey="month" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(10, 10, 20, 0.8)', borderColor: 'rgba(49, 111, 246, 0.2)' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="baseline" stroke="#48BEFF" name="Baseline" strokeWidth={3} dot={{ stroke: '#48BEFF', strokeWidth: 2, r: 4 }} />
                        <Line type="monotone" dataKey="optimistic" stroke="#4ECDC4" name="Optimistic" strokeWidth={3} dot={{ stroke: '#4ECDC4', strokeWidth: 2, r: 4 }} />
                        <Line type="monotone" dataKey="conservative" stroke="#316FF6" name="Conservative" strokeWidth={3} dot={{ stroke: '#316FF6', strokeWidth: 2, r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-none shadow-lg bg-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    AI Insights
                  </CardTitle>
                  <CardDescription>Generated recommendations based on your scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <h4 className="font-medium mb-2">Optimistic Scenario</h4>
                      <p className="text-sm text-muted-foreground">
                        If you increase your monthly investment by 10% and maintain current spending levels,
                        your net worth could grow to $84,000 by next year.
                      </p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
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
        className="fixed bottom-6 right-6 h-12 w-12 md:h-14 md:w-14 rounded-full ai-chat-button border-none z-50"
        onClick={() => setShowAIChat(!showAIChat)}
      >
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-white" />
      </Button>
    </div>
  );
};

export default Index;
