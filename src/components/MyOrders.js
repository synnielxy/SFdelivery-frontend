import React from "react";
import { message, Tabs, List, Typography, Button, Modal, Card } from "antd";
import { getOrders} from "../utils";
 
const { TabPane } = Tabs;
const { Text } = Typography;

export const checkStatus = (status) => {
  if(status === 0){
    return Modal.info({
      title: 'Your Package Status',
      content: 'Order Status: Wait for pick up',
    });
  }else if(status === 1){
    return Modal.info({
      title: 'Your Package Status',
      content: 'Order Status: Shipping',
    });
  }else if(status === 2){ 
    return Modal.success({
      title: 'Your Package Status',
      content: 'Order Status: Delivered',
    });
  }else{
    return Modal.error({
      title: 'Your Package Status',
      content: 'Order Status: Not Found',
    });
  }
}

class CheckStatusButton extends React.Component {
  state = {
    loading: false,
    // status: 0,
  };

  loadStatus = async () => {
    const { order } = this.props;
    const { order_status} = order;
    this.setState({
      loading: true,
    });
 
    try {
      // const resp = await getOrders();
      // console.log(resp.order_status);
      await checkStatus(order_status);
      // this.setState({
      //   status: order_status,
      // });
      message.success("Successfully get status!");
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
    
  render() {
    return (
      <Button
        loading={this.state.loading}
        onClick={this.loadStatus}
        // danger={true}
        shape="round"
        type="primary"
      >
        Order Status
      </Button>
    );
  }
}
 
class MyOrders extends React.Component {
  state = {
    loading: false,
    data: [],
    // status:0,
  };
 
  componentDidMount() {
    this.loadData();
  }
  
  // componentDidUpdate(){
  //   this.loadData();
  // }
 
  loadData = async () => {
    this.setState({
      loading: true,
    });
 
    try {
      const resp = await getOrders();
      this.setState({
        data: resp,
        // status: resp.order_status,
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

 
  render() {
    return (
      <List
        style={{ width: 1000, margin: "auto" }}
        
        loading={this.state.loading}
        dataSource={this.state.data}
        renderItem={(item) => (
            <Card className="OrderCard" width="1500">
            <List.Item actions={[<CheckStatusButton order={item} />]}>
            <List.Item.Meta
              title={<Text>Your Package ID: {item.orderID}</Text>}
              description={
                <>
                  <Text><strong>Estimate Delivered Time: {item.delivery_time}</strong></Text>
                  <br />
                  <Text><strong>Delivery Address: {item.delivery_address}</strong></Text>
                  <br />
                  <Text><strong>Delivery Price: ${item.total_price}</strong></Text>
                </>
              }
            />
          </List.Item>
          </ Card>
        )}
      />
    );
  }
}


export default MyOrders;