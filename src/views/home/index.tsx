import { WalletMultiButton } from "@solana/wallet-adapter-ant-design";
import { Button, Col, Row, Card } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { TokenIcon } from "../../components/TokenIcon";
import { useConnectionConfig } from "../../contexts/connection";
import { useMarkets } from "../../contexts/market";
import { useUserBalance, useUserTotalBalance } from "../../hooks";
import { WRAPPED_SOL_MINT } from "../../utils/ids";
import { formatUSD } from "../../utils/utils";

export const HomeView = () => {
  const { marketEmitter, midPriceInUSD } = useMarkets();
  const { tokenMap } = useConnectionConfig();
  const SRM_ADDRESS = "J4D6LT4YqaZBF4snQskq8sYbxjx5P9pXHyXKBcaGbq98";
  const GRT_ADDRESS = "2QyXrDw26mq3Pw3C2Fswz22qPMVLSLg9BfqPy6PqmsMt";
  const SRM = useUserBalance(SRM_ADDRESS);
  const GRT = useUserBalance(GRT_ADDRESS);
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  const { balanceInUSD: totalBalanceInUSD } = useUserTotalBalance();

  useEffect(() => {
    const refreshTotal = () => { };

    const dispose = marketEmitter.onMarket(() => {
      refreshTotal();
    });

    refreshTotal();

    return () => {
      dispose();
    };
  }, [marketEmitter, midPriceInUSD, tokenMap]);

  return (
    <Row gutter={[16, 16]} align="middle">

      <Col span={8}>
        <h2 style={{ textTransform: "uppercase" }}>Your balances:</h2>
        <br></br>
        <Card style={{ backgroundColor: "black" }}>
          <h2>
            SOL: {SOL.balance} ({formatUSD.format(SOL.balanceInUSD / 1000000)})
          </h2>
        </Card>
        <Card style={{ backgroundColor: "#300707" }} >
          <h2 style={{ display: "inline-flex", alignItems: "center" }}>
            GREAT: {SRM?.balance} 
          </h2>
        </Card>
        <Card style={{ backgroundColor: "#091839" }}>
          <h2 style={{ display: "inline-flex", alignItems: "center" }}>
            GREAT LT: {GRT?.balance} (
            {formatUSD.format(GRT.balance*0.12)})
          </h2>
        </Card>
      </Col>
      <Col span={12}>
      </Col>
      {/* <TokenIcon mintAddress={SRM_ADDRESS} /> */}
      {/* {formatUSD.format(SRM?.balanceInUSD)}) */}
      {/* <Col span={24}>
        <WalletMultiButton type="ghost" />
      </Col> */}
      {/* <Col span={12}>
        <Link to="/faucet">
          <Button>Faucet</Button>
        </Link>
      </Col> */}
      <Col span={24}>
        <div className="builton" />
      </Col>
    </Row>
  );
};
