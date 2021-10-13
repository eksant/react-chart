import { FC } from 'react';
import { Form, Skeleton } from 'antd';

const CustomFormItem: FC<any> = ({
  name,
  label,
  layout,
  noStyle,
  children,
  skeleton,
  rules = [],
  wrapperCol,
  labelCol,
  valuePropName,
  style,
}) => {
  return (
    <Form.Item
      {...layout}
      name={name}
      rules={rules}
      noStyle={noStyle}
      label={
        skeleton ? (
          <Skeleton.Input active style={{ width: 100 }} size="default" />
        ) : (
          label
        )
      }
      wrapperCol={wrapperCol}
      labelCol={labelCol}
      valuePropName={valuePropName}
      style={style}
    >
      {skeleton ? (
        <Skeleton.Input active style={{ width: 300 }} size="default" />
      ) : (
        children
      )}
    </Form.Item>
  );
};

export default CustomFormItem;
