import './App.css';
import AdminPage from './components/AdminPage';
import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import LoginPage from "./components/LoginPage";
import OrderMainPage from './OrderMainPage';
import React from "react";
import background01 from './image/background01.jpg';
 
const { Header, Content } = Layout;
 
class App extends React.Component {
  state = {
    authed: false,
    asHost: false,
  };
 
  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    const asHost = localStorage.getItem("asHost") === "true";
    this.setState({
      authed: authToken !== null,
      asHost,
    });
  }
 
  handleLoginSuccess = (token, asHost) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asHost", asHost);
    this.setState({
      authed: true,
      asHost,
    });
  };
 
  handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asHost");
    this.setState({
      authed: false,
    });
  };
 
  renderContent = () => {
    if (!this.state.authed) {
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    }

    if (this.state.asHost) {
      return <AdminPage />;
    }
 
    return <OrderMainPage />;
  };
 
  userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );
 
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="TitleText" style={{ fontSize: 16, fontWeight: 600 }}>
            SF Delivery
          </div>
          {this.state.authed && (
            <div>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          )}
        </Header>
        <Content
          style={{ backgroundImage:`url(${background01})`, height: "calc(100% - 64px)", overflow: "auto" }}
        >
          {this.renderContent()}
        </Content>
      </Layout>
    );
  }
}
 
export default App;
