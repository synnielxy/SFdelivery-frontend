import { Layout, Dropdown, Menu, Button, Card, Row } from "antd";
import { Tabs } from "antd";
import React from "react";
import MyOrders from "./components/MyOrders";
import NewPackagePage from './components/NewPackagePage';
import background02 from './image/background02.jpg';
// import MyOrders from "./components/MyOrders";
 


class OrderMainPage extends React.Component{
  render(){

    const { Header, Content } = Layout;
    const { TabPane } = Tabs;

    function callback(key) {

      console.log('tab: ',key);

    }

    return (
      // <Layout style={{ height: "100vh" }}>
       <Card bordered={false}
       style={{backgroundImage:`url(${background02})`, height:"calc(100%)", overflow: "auto"}}
      >
         <Tabs  tabBarStyle={{color:"white", fontWeight:500}} defaultActiveKey="1" onChange={callback} destroyInactiveTabPane={true}>
            <TabPane  tab="New Order" key="1" >
               <NewPackagePage/>;
            </TabPane>
            <TabPane  tab="Package Status" key="2" >
               <MyOrders />;
            </TabPane>
          </Tabs>
       </Card>
    // </Layout>

    );
  }
  
}

export default OrderMainPage;
