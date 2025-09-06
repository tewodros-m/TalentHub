import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import CustomTooltip, { type ChartData } from './CustomTooltip';
import { useDarkMode } from '../../hooks/useDarkMode';

type ChartProps = {
  jobs: ChartData[];
};

const Chart = ({ jobs }: ChartProps) => {
  const { isDark } = useDarkMode();

  return (
    <div className='p-3 bg-bg shadow-md'>
      <h3 className='text-xl text-primary-800 font-semibold mb-4'>
        Applications per Job for Latest 20 Jobs
      </h3>

      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={jobs}>
          <XAxis dataKey='_id' tick={false} />
          <YAxis
            allowDecimals={false}
            tickFormatter={(value) => Math.floor(value).toString()}
          />

          <Tooltip
            cursor={false}
            content={<CustomTooltip />}
            contentStyle={{
              backgroundColor: 'rgb(var(--color-bg))',
              border: '2px solid rgb(var(--color-primary-100))',
              borderRadius: '8px',
            }}
            itemStyle={{
              color: 'rgb(var(--color-primary-600))',
            }}
            labelStyle={{
              color: 'rgb(var(--color-primary-600))',
              fontWeight: 600,
            }}
          />
          <Bar
            dataKey='Applications'
            fill={
              isDark
                ? 'rgb(var(--color-primary-300))'
                : 'rgb(var(--color-primary-500))'
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
