'use client'
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Label, Pie, PieChart, Sector } from "recharts"
import { Area, AreaChart, CartesianGrid, XAxis, Bar, BarChart, YAxis } from 'recharts';
import { ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
// import { getData } from '@/actions/auth';

const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
];
const desktopData = [
    { month: "january", desktop: 186, fill: "var(--color-january)" },
    { month: "february", desktop: 305, fill: "var(--color-february)" },
    { month: "march", desktop: 237, fill: "var(--color-march)" },
    { month: "april", desktop: 173, fill: "var(--color-april)" },
    { month: "may", desktop: 209, fill: "var(--color-may)" },
]
const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--chart-1))',
    },
    mobile: {
        label: 'Mobile',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig;


const PieChartConfig = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Desktop",
    },
    mobile: {
        label: "Mobile",
    },
    january: {
        label: "January",
        color: "hsl(var(--chart-1))",
    },
    february: {
        label: "February",
        color: "hsl(var(--chart-2))",
    },
    march: {
        label: "March",
        color: "hsl(var(--chart-3))",
    },
    april: {
        label: "April",
        color: "hsl(var(--chart-4))",
    },
    may: {
        label: "May",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

const browserData = [
    { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
    { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
    { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
    { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
    { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];


const Dashboard = () => {
    const id = "pie-interactive"
    const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month)
    const activeIndex = React.useMemo(
        () => desktopData.findIndex((item) => item.month === activeMonth),
        [activeMonth]
    )
    const months = React.useMemo(() => desktopData.map((item) => item.month), [])

    // useEffect(() => {
    //     const data = getData()
    //     console.log(data)
    // })
    
    return (
        <div className="min-h-screen bg-white text-black flex">


            {/* Main Content */}
            <main className="flex-1 p-8">
                <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[{
                        title: 'Total Earnings',
                        value: 'USD 75,820',
                        change: '+40% from last month'
                    }, {
                        title: 'Total Enrollments',
                        value: '8,930',
                        change: '+30% from last month'
                    }, {
                        title: 'Total Users',
                        value: '16,780',
                        change: '+25% from last month'
                    }].map((stat, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{stat.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold">{stat.value}</p>
                                <p className="text-green-500 mt-2">{stat.change}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Chart Section using Shadcn */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Area Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Visitors</CardTitle>
                            <p>in the last 6 months</p>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{ left: 12, right: 12 }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                    <Area dataKey="mobile" type="natural" fill="var(--color-mobile)" fillOpacity={0.4} stroke="var(--color-mobile)" stackId="a" />
                                    <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" stackId="a" />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Bar Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Browser Usage</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <BarChart data={browserData} layout="vertical">
                                    <YAxis dataKey="browser" type="category" tickLine={false} axisLine={false} tickMargin={10} />
                                    <XAxis dataKey="visitors" type="number" hide />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Bar dataKey="visitors" layout="vertical" radius={5} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>


                    {/* Pie Chart */}
                    <Card data-chart={id} className="flex flex-col">
                        <ChartStyle id={id} config={PieChartConfig} />
                        <CardHeader className="flex-row items-start space-y-0 pb-0">
                            <div className="grid gap-1">
                                <CardTitle>Pie Chart</CardTitle>
                                <CardDescription>January - June 2024</CardDescription>
                            </div>
                            <Select value={activeMonth} onValueChange={setActiveMonth}>
                                <SelectTrigger
                                    className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                                    aria-label="Select a value"
                                >
                                    <SelectValue placeholder="Select month" />
                                </SelectTrigger>
                                <SelectContent align="end" className="rounded-xl">
                                    {months.map((key) => {
                                        const config = chartConfig[key as keyof typeof chartConfig]
                                        if (!config) {
                                            return null
                                        }
                                        return (
                                            <SelectItem
                                                key={key}
                                                value={key}
                                                className="rounded-lg [&_span]:flex"
                                            >
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span
                                                        className="flex h-3 w-3 shrink-0 rounded-sm"
                                                        style={{
                                                            backgroundColor: `var(--color-${key})`,
                                                        }}
                                                    />
                                                    {config?.label}
                                                </div>
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                        </CardHeader>
                        <CardContent className="flex flex-1 justify-center pb-0">
                            <ChartContainer
                                id={id}
                                config={chartConfig}
                                className="mx-auto aspect-square w-full max-w-[300px]"
                            >
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Pie
                                        data={desktopData}
                                        dataKey="desktop"
                                        nameKey="month"
                                        innerRadius={60}
                                        strokeWidth={5}
                                        activeIndex={activeIndex}
                                        activeShape={({
                                            outerRadius = 0,
                                            ...props
                                        }: PieSectorDataItem) => (
                                            <g>
                                                <Sector {...props} outerRadius={outerRadius + 10} />
                                                <Sector
                                                    {...props}
                                                    outerRadius={outerRadius + 25}
                                                    innerRadius={outerRadius + 12}
                                                />
                                            </g>
                                        )}
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className="fill-foreground text-3xl font-bold"
                                                            >
                                                                {desktopData[activeIndex].desktop.toLocaleString()}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) + 24}
                                                                className="fill-muted-foreground"
                                                            >
                                                                Visitors
                                                            </tspan>
                                                        </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
