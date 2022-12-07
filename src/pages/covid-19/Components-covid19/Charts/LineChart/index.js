import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Button, ButtonGroup } from "@mui/material";

const generateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));

  return {
    chart: {
      height: 500,
    },
    title: {
      text: 'Tổng số ca nhiễm',
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['#F3585B'],
    yAxis: {
      min: 0,
      title: {
        text: null,
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Tổng ca nhiễm',
        data: data.map((item) => item.Confirmed),
      },
    ],
  };
};

const LineChart = ({ data }) => {
  console.log('LineChart', { data });
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState('all');

  useEffect(() => {
    let customData = [];
    switch (reportType) {
      case 'all':
        customData = data;
        break;
      case '30':
        customData = data.slice(data.length - 30);
        break;
      case '7':
        customData = data.slice(data.length - 7);
        break;
      default:
        customData = data;
        break;

    }
    setOptions(generateOptions(customData));
  }, [data, reportType]);

  return (
    <div>
      <center>
        <ButtonGroup size='small' style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            color={reportType === 'all' ? 'secondary' : ''}
            onClick={() => setReportType('all')}
          >
            Tất cả
          </Button>
          <Button
            color={reportType === '30' ? 'secondary' : ''}
            onClick={() => setReportType('30')}
          >
            30 ngày
          </Button>
          <Button
            color={reportType === '7' ? 'secondary' : ''}
            onClick={() => setReportType('7')}
          >
            7 ngày
          </Button>
        </ButtonGroup>
      </center>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default React.memo(LineChart);