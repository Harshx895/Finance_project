
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

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Hello, Andrew</h1>
          <p className="text-muted-foreground">Welcome back</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="debt">Debt Management</TabsTrigger>
            <TabsTrigger value="scenarios">What-If Scenarios</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
              <MetricCard
                title="Total Sales Today"
                value="$500.20"
                percentage={55}
                color="bg-[#ff9f87]"
              />
              <MetricCard
                title="# of Orders"
                value="938"
                percentage={30}
                color="bg-[#8b5cf6]"
              />
              <MetricCard
                title="Net Profit"
                value="$162.50"
                percentage={70}
                color="bg-[#6ee7b7]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Net Worth Trend</CardTitle>
                  <CardDescription>Your financial growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* We'll add charts in the next iteration */}
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Chart coming soon...
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
                  {/* We'll add charts in the next iteration */}
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Chart coming soon...
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals">
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

          <TabsContent value="investments">
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

          <TabsContent value="debt">
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

          <TabsContent value="scenarios">
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
    </div>
  );
};

export default Index;
