import moment from 'moment';
import Chart from 'react-google-charts';
import { FC, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Tag,
  Card,
  Spin,
  Table,
  Layout,
  Divider,
  Typography,
} from 'antd';

const ChartContentLayout: FC<any> = (props: any) => {
  const { loading, dataSource = [] } = props;
  const [dataPieChart, setDataPieChart] = useState<any>([['', 0]]);
  const [dataAreaChart, setDataAreaChart] = useState<any>([['', 0, 0]]);

  const columns = [
    {
      title: 'Created At',
      dataIndex: 'date_time',
      render: (val: any) => moment(val).format('YYYY-MM-DD'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (val: any) => {
        const color = val === 'Bitcoin' ? '#108ee9' : '#f50';
        return <Tag color={color}>{val}</Tag>;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (val: any) => <Typography.Text>{val} USD</Typography.Text>,
    },
  ];

  useEffect(() => {
    (() => {
      let result: any = [];
      if (dataSource && dataSource.length) {
        const sumBTC = dataSource
          .filter((item: any) => item.name.toLowerCase() === 'bitcoin')
          .reduce((a: any, b: any) => {
            return a + b.price;
          }, 0);

        const sumETH = dataSource
          .filter((item: any) => item.name.toLowerCase() === 'ethereum')
          .reduce((a: any, b: any) => {
            return a + b.price;
          }, 0);

        result = [
          ['Bitcoin', sumBTC],
          ['Ethereum', sumETH],
        ];
      }

      setDataPieChart(result);
    })();
  }, [dataSource]);

  useEffect(() => {
    (() => {
      let result: any = [];
      if (dataSource && dataSource.length) {
        const dataBTC = dataSource
          .filter((item: any) => item.name.toLowerCase() === 'bitcoin')
          .sort((a: any, b: any) => a.date_time - b.date_time);

        const dataETH = dataSource
          .filter((item: any) => item.name.toLowerCase() === 'ethereum')
          .sort((a: any, b: any) => a.date_time - b.date_time);

        result = dataBTC.map((btc: any) => {
          const filterETHs = dataETH.filter(
            (item: any) => item.date_time === btc.date_time
          );

          return [
            moment(btc.date_time).format('YYYY-MM-DD'),
            btc.price || 0,
            filterETHs.length ? filterETHs[0].price : 0,
          ];
        });
      }

      setDataAreaChart(result);
    })();
  }, [dataSource]);

  return (
    <Layout.Content className="layout-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card size="small">
            <Chart
              width={350}
              height={'200px'}
              chartType="PieChart"
              loader={<Spin size="small" />}
              columns={[
                { type: 'string', label: 'Name' },
                { type: 'number', label: 'Price' },
              ]}
              rows={dataPieChart}
              options={{
                is3D: true,
                title: 'Vault - Price Percentage',
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small">
            <Chart
              legendToggle
              width={350}
              height={'200px'}
              chartType="AreaChart"
              loader={<Spin size="small" />}
              columns={[
                { type: 'string', label: 'Date' },
                { type: 'number', label: 'Bitcoin' },
                { type: 'number', label: 'Ethereum' },
              ]}
              rows={dataAreaChart}
              options={{
                title: 'Vault - Price',
                hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
                vAxis: { minValue: 0 },
                chartArea: { width: '50%', height: '70%' },
              }}
            />
          </Card>
        </Col>

        <Divider />
        <Col span={24}>
          <Table
            size="small"
            columns={columns}
            loading={loading}
            dataSource={dataSource}
          />
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default ChartContentLayout;
