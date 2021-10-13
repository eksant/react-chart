import { FC } from 'react';
import { Card, Form, Skeleton } from 'antd';

const CustomCard: FC<any> = ({
  style,
  children,
  skeleton,
  bordered,
  actions = [],
}) => {
  return (
    <Card
      bordered={bordered}
      actions={
        skeleton && actions.length > 0
          ? [<Skeleton.Button active style={{ width: 500 }} size="default" />]
          : actions
      }
    >
      <div
        style={{
          maxHeight: 700,
          maxWidth: 800,
          ...style,
          overflow: 'auto',
        }}
      >
        {children}
      </div>
    </Card>
  );
};

const CustomForm: FC<any> = ({
  form,
  name,
  style,
  layout,
  children,
  onFinish,
  skeleton,
  initialValues,
  actions = [],
  bordered = false,
}) => {
  const props = !skeleton ? { form, name, onFinish, initialValues } : undefined;

  return (
    <Form
      {...props}
      labelAlign="left"
      initialValues={{ ...initialValues }}
      {...(typeof layout === 'string' ? (layout = { layout }) : { ...layout })}
    >
      <CustomCard
        style={style}
        actions={actions}
        bordered={bordered}
        skeleton={skeleton}
      >
        {children}
      </CustomCard>
    </Form>
  );
};

export default CustomForm;
