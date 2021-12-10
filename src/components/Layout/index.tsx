import React from "react";
import "./../../App.less";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { WalletModalProvider } from "@solana/wallet-adapter-ant-design";

import { LABELS } from "../../constants";
import { AppBar } from "../AppBar";

const { Header, Content } = Layout;

export const AppLayout = React.memo(({ children }) => {
  return (
    <WalletModalProvider>
      <div className="App wormhole-bg">
        <Layout title={LABELS.APP_TITLE}>
          <Header className="App-Bar">
            <Link to="/">
              <div className="app-title">
              <img style={{ margin:  5 }} src="logo_tr.png" alt="Logo" width="200px"/>
              </div>
            </Link>
            <AppBar />
          </Header>
          <Content style={{ padding: "0 50px" }}>{children}</Content>
        </Layout>
      </div>
    </WalletModalProvider>
  );
});
