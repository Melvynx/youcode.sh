'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';

export const NewUserCharts = ({
  data,
}: {
  data: {
    date: string;
    newUsersCount: number;
    canceledUsersCount: number;
  }[];
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Users course activity</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            width={350}
            height={150}
            data={data}
            margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
          >
            <Bar
              dataKey="newUsersCount"
              type="monotone"
              radius={[4, 4, 0, 0]}
              style={
                {
                  fill: 'hsl(var(--primary) / 1)',
                } as React.CSSProperties
              }
            />
            <Bar
              dataKey="canceledUsersCount"
              type="monotone"
              radius={[4, 4, 0, 0]}
              style={
                {
                  fill: 'hsl(var(--secondary) / 1)',
                } as React.CSSProperties
              }
            />
            {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="newUsersCount"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length > 0) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Date
                          </span>
                          <span className={cn('font-bold')}>
                            {payload[0].payload.date}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            New Users
                          </span>
                          <span className={cn('font-bold')}>
                            {payload[0].payload.newUsersCount}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Canceled Users
                          </span>
                          <span className={cn('font-bold')}>
                            {payload[0].payload.canceledUsersCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              }}
            />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
};
