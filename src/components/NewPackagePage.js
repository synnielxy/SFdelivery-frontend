import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Divider,
  DatePicker,
  message,
  Card,
  Modal,
} from 'antd';
import {uploadPackage, succeed} from "../utils";
 
 
class NewPackagePage extends React.Component {
  // formRef = React.createRef();
    state = {
      // authed: false,
      loading: false,
    };

    handleSubmit = async (query) => {
      this.setState({
        loading: true,
      });
   
      try {
        // toJSON(){return this.Name + "\t" + this.Price}
        const res = await uploadPackage(query);
        message.success("Submit Successfully");
        //const name = JSON.stringify(res.receiver_name);
        // console.log(JSON.stringify({ Name: res.receiver_name, DeliveryTime: res.delivery_time, Price: res.total_price}, null, '\t'));
        Modal.confirm({
          title: 'Do you want to schedule it?',
          content: JSON.stringify({ Name: res.receiver_name, DeliveryTime: res.delivery_time, Price: res.total_price, toJSON(){return "Receiver Name: " + this.Name + " Delivery Time: " + this.DeliveryTime + " " + " Price: $" + this.Price}}, null, '\t'),
          okText: "confirm",
          onOk: () => {
            succeed(res);
          },
        });
        //calling back succeed request to backend
        // if(res){
        //   await succeed(res);
        //   //reset();
        // }
      } catch (error) {
        message.error(error.message);
      } finally {
        this.setState({
          loading: false,
        });
      }
    };

    //  printOut = (data) => {
    //    'Receiver name: ', data.receiver_name;
    //  };
 
 
    render() {
      const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      
      const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };
      
      const { Option } = Select;
  
      function onChange(date, dateString) {
        console.log(date, dateString);
      }

  
      const prefixSelector = (
        <Form.Item name='prefix' noStyle>
          <Select style={{ width: 70 }}>
            <Option value="1">+1</Option>
            <Option value="86">+86</Option>
          </Select>
        </Form.Item>
      );

      return (
        <Card className="OrderCard">

          <Form {...layout} className="OrderInfo" onFinish={this.handleSubmit} validateMessages={validateMessages} labelCol={{ span: 9 }} wrapperCol={{ span: 8 }} >

            <p className="FormText">SENDER</p>
            {/* <Divider /> */}
            {/* <Form.Item name={['sender', 'name']} label="Name" rules={[{ required: true }]}>
                <Input/>    
            </Form.Item>
            <Form.Item name={['sender', 'phone']}  label="Phone" rules={[{ required: true }]}>
                  <Input addonBefore={prefixSelector} style={{ width: '100%' }}/>
            </Form.Item> */}
            <Form.Item name='pickupaddress' label="Pick Up Address" rules={[{ required: true }]}>
                <Input/>
               
            </Form.Item>
  
            <p className="FormText">RECIPIENT</p>
            {/* <Divider /> */}

            <Form.Item  name="recipientname" label="Receiver Name" rules={[{ required: true }]}>

              <Input />
            </Form.Item>
            {/* <Form.Item name={['recipient', 'phone']} label="Phone" >
              <Input.Group compact >
                <Form.Item noStyle name={['recipient','prefix']}>
                    <Select style={{ width: 70 }}>
                      <Option value="1">+1</Option>
                      <Option value="86">+86</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item noStyle name={['recipient','phoneNo']}>
                    <Input style={{ width: '85%' }}/>
                  </Form.Item>
              </Input.Group>
            </Form.Item> */}
            <Form.Item name='deliveryaddress' label="Shipping Address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
  
            <p className="FormText">PARCEL</p>
            {/* <Divider /> */}
            <Form.Item name='weight' label="Weight" rules={[{ required: true }]}>
              <InputNumber addonAfter="lb"/>
            </Form.Item>
            <Form.Item name='length' label="Length" rules={[{ required: true }]}>
              <InputNumber addonAfter="in"/>
            </Form.Item>
            <Form.Item name='width' label="Width" rules={[{ required: true }]}>
              <InputNumber addonAfter="in" />
            </Form.Item>
            <Form.Item name='height' label="Height" rules={[{ required: true }]}>
              <InputNumber addonAfter="in" />
            </Form.Item>
            <Form.Item name='pickuptime' label="Shipping Date" rules={[{ required: true }]}>

              <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={true}/>
            </Form.Item>
  
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>

              <Button type="primary" htmlType="submit" disabled={this.state.loading} >
                Submit
              </Button>
            </Form.Item>
          </Form>
          </Card>
      );
    };
  }
   
//const NewPackagePage = Form.create({name:'newOederInfo'})(NewOrderForm) 
export default NewPackagePage;
