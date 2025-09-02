import React from 'react'
import useAssetChart from '../hooks/useAssetChart'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const AssetChart = () => {
  const { data, totalData, getLegendItemClass } = useAssetChart()

  return (
    <div className="flex flex-col w-full">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} innerRadius={60} paddingAngle={2} cornerRadius={10} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            style={{ fontSize: '1.5rem', fontWeight: 'bold', fill: 'rgba(77, 94, 128, 1)' }}
          >
            {totalData}
          </text>
          <text
            x="50%"
            y="55%"
            dy={8}
            textAnchor="middle"
            style={{ fontSize: '0.85em', fill: '#7F7F80' }}
          >
            Total Asset
          </text>
        </PieChart>
      </ResponsiveContainer>
      <div className="custom-legend-container">
        {data.map((item) => (
          <div
            key={item.key}
            className={`legend-item item-${(totalData, getLegendItemClass(item.key))}`}
          >
            <span className="legend-color-dot" style={{ backgroundColor: item.color }}></span>
            <div className="flex flex-col">
              <span className="legend-value">{item.value}</span>
              <span className="legend-label text-cmms-grey">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssetChart
