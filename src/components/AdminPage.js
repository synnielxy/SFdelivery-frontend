import {
    message,
    Tabs,
    List,
    Card,
    Button,
    Tooltip,
    Menu, 
    Dropdown,
    Space,
    Modal,
  } from "antd";
// import { DownOutlined } from '@ant-design/icons';
import Text from "antd/lib/typography/Text";
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import {adminStatus, adminOps } from "../utils";
import React from "react";

const { TabPane } = Tabs;  

export class OrderInfoButton extends React.Component {
  state = {
      modalVisible: false,
    };
    
    openModal = () => {
      this.setState({
        modalVisible: true,
      });
    };
    
    handleCancel = () => {
      this.setState({
        modalVisible: false,
      });
    };    
  
  
  render() {
    const { order } = this.props;
    const { orderID, delivery_time, pick_up_time} = order;
    const { modalVisible } = this.state;
    return (
      <>
        <Tooltip title="View Order Details">
          <Button
            onClick={this.openModal}
            style={{ border: "none" }}
            size="large"
            icon={<InfoCircleOutlined />}
          />
        </Tooltip>
        {modalVisible && (
          <Modal
            centered={true}
            visible={modalVisible}
            closable={false}
            footer={null}
            onCancel={this.handleCancel}
          >
            <Space direction="vertical">
              <Text strong={true}>Order ID</Text>
              <Text type="secondary">{orderID}</Text>
              <Text strong={true}>Scheduled pick up time</Text>
              <Text type="secondary">{pick_up_time}</Text>
              <Text strong={true}>Estimate deliverd time</Text>
              <Text type="secondary">{delivery_time}</Text>
            </Space>
          </Modal>
        )}
      </>
    );
  }
}


class PickedUpButton extends React.Component {
  state = {
    loading: false,
  };

  handleOrderPickUp = async () => {
    const { order } = this.props;
    const { orderID} = order;
    this.setState({
      loading: true,
    });

    try{
      // console.log(order.orderID);
      await adminOps(orderID, 1);
      message.success("Successfully update operation pick up!");
    }catch (error) {
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
        onClick={this.handleOrderPickUp}
        danger={true}
        shape="round"
        type="primary"
      >
        Order Picked Up
      </Button>
    );
  }
}
// class ShippedButton extends React.Component {
//     state = {
//         loading: false,
//       };
     
//       render() {
//         return (
//           <Button
//             loading={this.state.loading}
//             onClick={this.handleOrderShipped}
//             danger={true}
//             shape="round"
//             type="secondary"
//           >
//             Order Shipped
//           </Button>
//         );
//       }
//     }

class DeliveredButton extends React.Component {
  state = {
    loading: false,
  };

  handleOrderDelivered = async () => {
    const { order } = this.props;
    const { orderID} = order;
    this.setState({
      loading: true,
    });

    try{
      await adminOps(orderID, 2);
      message.success("Successfully update operation delivered!");
    }catch (error) {
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
        onClick={this.handleOrderDelivered}
        danger={true}
        shape="round"
        // type="secondary"
        type="primary"
      >
        Order Delivered
      </Button>
    );
  }
}


// class ActionButton extends React.Component {
//   state = {
//       loading: false,
//   };
    
//   render() {
//     const {onMenuClick} = (e) => {
//         console.log('click', e);
//       };
      
//     const menu = (
//       <Menu
//         onClick={onMenuClick}
//         items={[
//           // {
//           //   key: '1',
//           //   label: 'Order Shipped',
//           // },
//           {
//             key: '1',
//             label: ('Order Picked Up'),
//           },
//           {
//             key: '2',
//             label: (<button onClick={DeliveredButton}>Order Delivered</button>),
//           },
//         ]}
//       />
//     );
    
//     return (
//         <Dropdown.Button overlay={menu} >
//           <a onClick={e => e.preventDefault()}>
//             Actions
//             {/* <DownOutlined /> */}
//           </a>
//         </Dropdown.Button>
//     );
//   }
// }

class Orders extends React.Component {
  state = {
    loading: false,
    data: [],
  };
  
  componentDidMount() {
    this.loadData();
  }
  
  loadData = async () => {
    this.setState({
      loading: true,
    });
  
    try {
      const resp = await adminStatus();
      this.setState({
        data: resp,
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
        loading={this.state.loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1,
          xxl: 1,
        }}
        dataSource={this.state.data}
        renderItem={(item) => (
          <List.Item>
            <Card
              key={item.id}
              // bordered={false}
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text ellipsis={true} style={{ maxWidth: 300 }}>
                    Delivery address: {item.delivery_address}
                  </Text>
                  <OrderInfoButton order={item} />
                </div>
              }
              // extra={<PickedUpButton order={item}/> }
              actions={[<PickedUpButton order={item}/>, <DeliveredButton order={item} />]}
              // actions={[<ActionButton order={item} />]}
            >
              <p><b>Receiver Name:  {item.receiver_name}</b></p>
              <p>Package Weight:  {item.weight}</p>
              <p>Package Length:  {item.length}</p>
              <p>Package Width:  {item.width}</p>
              <p>Package Height:  {item.height}</p>
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

class AdminPage extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1"  destroyInactiveTabPane={false}>
        <TabPane tab="Order List" key="1" >
        <Orders/>
        </TabPane>
      </Tabs>
    );
}
}
 
export default AdminPage;