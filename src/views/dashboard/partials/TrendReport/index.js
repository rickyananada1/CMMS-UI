import React from 'react'
import { CRow, CCol } from '@coreui/react'
import useTrendReport from './hooks/useTrendReport'
import WellnessCard from '../../card/WellnessCard'
import Card from '../../card/Card'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'

const TrendReport = () => {
  const { currentYear, dataDownToNormal, dataNormalToDown, prepareChartData } = useTrendReport()
  const chartData = prepareChartData()

  return (
    <Card
      title="Trend Wellness Report"
      subtitle={
        <div>
          <span className="text-gray-300">Information displayed for year: </span>
          <span className="text-black font-bold">{currentYear}</span>
        </div>
      }
      cardClass="h-[calc(47vh-72px)]"
    >
      <CRow className="pt-4 w-full h-full" style={{ height: '500px' }}>
        {/* Chart Section */}
        <CCol md={8} className="h-full flex flex-column">
          <div className="flex-grow-1 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 20,
                  left: -10,
                  bottom: 10,
                }}
              >
                <XAxis dataKey="monthName" />
                <YAxis
                  label={{
                    value: 'Equipment',
                    angle: -90,
                    position: 'insideLeft',
                    dx: 15,
                    dy: 30,
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} verticalAlign="bottom" />
                <Line
                  type="monotone"
                  dataKey="normal"
                  name="Normal"
                  stroke="rgba(14, 169, 118, 1)"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="alert"
                  name="Warning"
                  stroke="rgba(255, 162, 41, 1)"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="down"
                  name="Danger"
                  stroke="rgba(255, 86, 86, 1)"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CCol>

        {/* Cards Section */}
        <CCol md={4} className="h-full flex flex-col justify-content-between pr-0">
          <div className="flex flex-wrap items-center mt-2 w-full">
            <p className="text-base text-neutral-text-field font-normal">
              Changes in Asset Within Current Month
            </p>

            <hr className="flex-1 ml-2 h-[1px] mt-[4px] bg-neutral-stroke hidden sm:inline-block" />
          </div>

          <div className="flex flex-col overflow-auto scrollbar-fade gap-2">
            <WellnessCard
              title="Normal"
              description="Assets functioning within normal param."
              value={dataDownToNormal}
            />
            <WellnessCard
              title="Warning & Danger"
              description="Multiple warning and danger assets."
              value={dataNormalToDown}
            />
          </div>
        </CCol>
      </CRow>
    </Card>
  )
}

export default TrendReport
