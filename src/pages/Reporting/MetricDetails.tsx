import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data generator for charts
const generateChartData = (metric: string, days: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    let value;
    switch (metric) {
      case 'travelers':
        value = 300 + Math.floor(Math.random() * 100);
        break;
      case 'trip-cost':
        value = 2500 + Math.floor(Math.random() * 1500);
        break;
      case 'compliance':
        value = 90 + Math.floor(Math.random() * 10);
        break;
      case 'spend':
        value = 75000 + Math.floor(Math.random() * 20000);
        break;
      default:
        value = Math.floor(Math.random() * 100);
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: value
    });
  }
  
  return data;
};

const metricConfigs = {
  travelers: {
    title: 'Active Travelers',
    description: 'Number of employees currently traveling',
    valuePrefix: '',
    valueSuffix: '',
    color: '#3B82F6',
  },
  'trip-cost': {
    title: 'Average Trip Cost',
    description: 'Average cost per business trip',
    valuePrefix: '$',
    valueSuffix: '',
    color: '#10B981',
  },
  compliance: {
    title: 'Policy Compliance',
    description: 'Percentage of trips compliant with travel policy',
    valuePrefix: '',
    valueSuffix: '%',
    color: '#6366F1',
  },
  spend: {
    title: 'Monthly Spend',
    description: 'Total travel expenditure',
    valuePrefix: '$',
    valueSuffix: '',
    color: '#F59E0B',
  },
};

export default function MetricDetails() {
  const { metric } = useParams<{ metric: keyof typeof metricConfigs }>();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('30');
  const [department, setDepartment] = useState('all');

  if (!metric || !metricConfigs[metric]) {
    return <div>Metric not found</div>;
  }

  const config = metricConfigs[metric];
  const chartData = generateChartData(metric, parseInt(dateRange));

  const formatValue = (value: number) => {
    if (metric === 'spend' || metric === 'trip-cost') {
      return `$${value.toLocaleString()}`;
    }
    if (metric === 'compliance') {
      return `${value}%`;
    }
    return value.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
            <p className="mt-1 text-sm text-gray-500">{config.description}</p>
          </div>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="180">Last 180 days</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
          >
            <option value="all">All Departments</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="engineering">Engineering</option>
            <option value="finance">Finance</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              />
              <YAxis
                tickFormatter={(value) => {
                  if (metric === 'spend') return `$${(value / 1000).toFixed(0)}k`;
                  if (metric === 'trip-cost') return `$${(value / 1000).toFixed(1)}k`;
                  if (metric === 'compliance') return `${value}%`;
                  return value;
                }}
              />
              <Tooltip
                formatter={(value: number) => [formatValue(value), config.title]}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={config.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Average</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {formatValue(chartData.reduce((acc, curr) => acc + curr.value, 0) / chartData.length)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Minimum</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {formatValue(Math.min(...chartData.map(d => d.value)))}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Maximum</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {formatValue(Math.max(...chartData.map(d => d.value)))}
          </p>
        </div>
      </div>
    </div>
  );
}