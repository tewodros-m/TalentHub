// Custom tooltip component
type ChartData = {
  _id: string;
  title: string;
  Applications: number;
  createdBy: string;
};

type TooltipComponentProps = {
  active?: boolean;
  payload?: Array<{ payload: ChartData }> | undefined;
  label?: string | number;
};

const CustomTooltip = ({ active, payload }: TooltipComponentProps) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload as ChartData;
  return (
    <div
      style={{
        backgroundColor: 'rgb(var(--color-bg))',
        border: '2px solid rgb(var(--color-primary-100))',
        borderRadius: 8,
        padding: 8,
      }}
    >
      <div style={{ color: 'rgb(var(--color-primary-600))', fontWeight: 700 }}>
        {data.title}
      </div>
      <div style={{ color: 'rgb(var(--color-primary-600))', marginTop: 6 }}>
        Application{data.Applications !== 1 ? 's' : ''}: {data.Applications}
      </div>
      <div style={{ color: 'rgb(var(--color-primary-600))', marginTop: 6 }}>
        Employer: {data.createdBy}
      </div>
    </div>
  );
};

export default CustomTooltip;
