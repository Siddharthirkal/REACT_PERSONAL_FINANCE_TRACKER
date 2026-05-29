import React from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";

function AddExpenseModal({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) {
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      open={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please enter the expense amount!",
            },
          ]}
        >
          <Input className="custom-input" type="number" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please select the expense type!",
            },
          ]}
        >
          <Select className="select-input-2">
            <Select.Option value="cash">Cash</Select.Option>
            <Select.Option value="card">Card</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter the expense name!",
            },
          ]}
        >
          <Input className="custom-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select the expense date!",
            },
          ]}
        >
          <DatePicker
            className="custom-input"
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item
          label="Tag"
          name="tag"
          style={{ fontWeight: 600 }}
          rules={[
            {
              required: true,
              message: "Please select a tag!",
            },
          ]}
        >
          <Select className="select-input-2">
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">
              Education
            </Select.Option>
            <Select.Option value="office">
              Office
            </Select.Option>
            {/* Add more tags here */}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            className="btn btn-blue"
            type="primary"
            htmlType="submit"
          >
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpenseModal;