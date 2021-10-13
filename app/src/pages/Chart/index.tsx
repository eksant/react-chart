import '@/pages/Chart/index.less';
import moment from 'moment';
import ChartSideLayout from '@/pages/Chart/side';
import ChartContentLayout from '@/pages/Chart/content';
import { util } from '@/utils';
import { useAuth, useData } from '@/contexts';
import { FC, useEffect, useState } from 'react';
import { Button, Col, Layout, message, Row } from 'antd';

const ChartPage: FC<any> = () => {
  const { onFetchData } = useData();
  const { user, hasToken, onLogout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);

  const onFilter = async (value: any | undefined) => {
    setLoading(true);
    let params = 'vault';

    if (value.name) {
      params = params.concat(`?name=${value.name}`);
    }

    if (value.period && value.period.length) {
      const dateStart = moment(
        value.period[0],
        'YYYY-MM-DD HH:mm:ss',
        'UTC'
      ).format();
      const dateEnd = moment(
        value.period[1],
        'YYYY-MM-DD HH:mm:ss',
        'UTC'
      ).format();

      params = params.concat(`?date_start=${dateStart}&date_end=${dateEnd}`);
    }

    const response = await onFetchData(util.normalizeParams(params));
    if (!response.error) {
      const data = response.data.map((item: any) => {
        return { ...item, key: item.id };
      });
      setDataSource(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await onFetchData('vault');
      if (!response.error) {
        const data = response.data.map((item: any) => {
          return { ...item, key: item.id };
        });
        setDataSource(data);
      }

      setLoading(false);
    })();
  }, [onFetchData]);

  useEffect(() => {
    (() => {
      if (hasToken) {
        message.success(
          `Welcome ${user.email}, you are now on the dashboard page. You can use side layout to filtering data.`,
          5
        );
      }
    })();
  }, [hasToken, user.email]);

  return (
    <Layout>
      <ChartSideLayout loading={loading} onFilter={onFilter} />

      <Layout>
        <Layout.Header style={{ background: '#dd6b20', padding: '0 34px' }}>
          <Row
            align="middle"
            justify="end"
            style={{ textAlign: 'end', marginTop: '-10px' }}
          >
            <Col span={24}>
              <Button
                type="text"
                size="small"
                onClick={() => onLogout()}
                style={{ textAlign: 'end', color: '#fff' }}
              >
                {user.email}
                <br />
                <strong>Logout</strong>
              </Button>
            </Col>
          </Row>
        </Layout.Header>
        <ChartContentLayout loading={loading} dataSource={dataSource} />
      </Layout>
    </Layout>
  );
};

export default ChartPage;
