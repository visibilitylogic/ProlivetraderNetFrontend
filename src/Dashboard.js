import React, { useState, useEffect, Component } from "react";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import Stock from "../Component/Stock";
import Orders from "../Component/Orders";

import TradingViewWidget, { Themes } from "react-tradingview-widget";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fx: ["EURUSD", "USDGBP", "USDJPY"],
      fxPrice: [],
      iex: [],
      crypto: [],
      cum: [],
      hideIbox: true,
      currentItem: [],
      num: 1,
      addCurrentItemC: [],
      addCurrentItemFx: [],
      addCurrentItemCum: [],
      addCurrentItemIex: [],
      fillArr: [],

      nullF: "",
      setView: [],
      setViewM: [],
      orderIsh: [],
      unitP: "",
      user: this.props.user,
      redirect: "/",
      data: {},
      deposit: {},
      orders: [],
      history: [],
      disA1: true,
      disA2: true,
      btcP: [],
      market: false,
      board: true,
      port: false,
      manager: false,
      levIsh: false,
      admin: false,
      VView: false,
      selectedFiles: [],
      fileUp: {},
      forexShow: false,
      verifyS: this.props.user.user ? this.props.user.user.user.verify : "",
      activeS: "BTCUSD",
      all: true,
      allC: false,
      allF: false,
      allCum: false,
      allS: false,
      totalUp: "",
      gasP: [],
      aaplP: [],
      tslaP: [],
      ethP: [],
    };
    this.myRef3 = this.props.user.user ? React.createRef() : "";
    this.textInput = this.props.user.user ? React.createRef() : "";
    this.myRef4 = this.props.user.user ? React.createRef() : "";
  }
  token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";

  componentDidMount() {
    

    (async () => {
      let response = await fetch(
        `https://prolivetrader-netbackend-vhgys.ondigitalocean.app/api/trade/${
          this.state.user.user ? this.state.user.user.user._id : ""
        }`
      );
      let data = await response.json();
      this.setState({
        orders: data,
      });
      let a = { orders: data };

      localStorage.setItem("orders", JSON.stringify(a));
    })();

    (async () => {
      let response = await fetch(
        `https://prolivetrader-netbackend-vhgys.ondigitalocean.app/api/trade/his/${
          this.state.user.user ? this.state.user.user.user._id : ""
        }`
      );
      let data = await response.json();
      this.setState({
        history: data,
      });
      let a = { history: data };

      localStorage.setItem("historys", JSON.stringify(a));
    })();

    (async () => {
      let response = await fetch(
        `https://prolivetrader-netbackend-vhgys.ondigitalocean.app/api/trade/user/${
          this.state.user.user ? this.state.user.user.user._id : ""
        }`
      );
      let user = await response.json();

      this.setState({
        user: user,
      });
    })();

    if (this.props.user.user) {
      const script3 = document.createElement("script");
      script3.src = "https://cdn.jsdelivr.net/gh/codabae/hostjs/dashUPPER15.js";
      script3.async = true;

      this.myRef3.current.appendChild(script3);
    }

    // GET Request.
    fetch(
      `https://cloud.iexapis.com/stable/fx/latest?symbols=${this.state.fx}&token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({ fxPrice: json });
      }); //print data to console

    //crytp
    fetch(
      `https://cloud.iexapis.com/stable/crypto/BTCUSD/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({ crypto: [...this.state.crypto, ...[json]] });
        this.setState({ bitP: json });

        this.setState({
          orderIsh: json.price,

          setView: json,
          setViewM: json.price,
        });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/crypto/ETHUSD/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({ crypto: [...this.state.crypto, ...[json]] });
        this.setState({ ethP: json });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/crypto/LTCUSD/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({ crypto: [...this.state.crypto, ...[json]] });
      }); //print data to console
    // Catch errors

    //stock

    fetch(
      `https://cloud.iexapis.com/stable/stock/AAPL/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          iex: [...this.state.iex, ...[{ price: json, symbol: "AAPL" }]],
        });
        this.setState({ aaplP: { price: json, symbol: "AAPL" } });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/stock/TSLA/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          iex: [...this.state.iex, ...[{ price: json, symbol: "TSLA" }]],
        });
        this.setState({ tslaP: { price: json, symbol: "TSLA" } });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/stock/GOOGL/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          iex: [...this.state.iex, ...[{ price: json, symbol: "GOOGL" }]],
        });
      }); //print data to console
    // Catch errors

    fetch(`https://cloud.iexapis.com/stable/stock/FB/price?token=${this.token}`)
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          iex: [...this.state.iex, ...[{ price: json, symbol: "FB" }]],
        });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/stock/MSFT/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          iex: [...this.state.iex, ...[{ price: json, symbol: "MSFT" }]],
        });
      }); //print data to console
    // Catch errors

    //commdity

    fetch(
      `https://cloud.iexapis.com/stable/data-points/market/DCOILWTICO?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          cum: [...this.state.cum, ...[{ price: json, symbol: "Propane" }]],
        });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/data-points/market/DHHNGSP?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          cum: [...this.state.cum, ...[{ price: json, symbol: "Diesel" }]],
        });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/data-points/market/DCOILWTICO?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          cum: [...this.state.cum, ...[{ price: json, symbol: "Jet Fuel" }]],
        });
      }); //print data to console
    // Catch errors
    fetch(
      `https://cloud.iexapis.com/stable/data-points/market/DJFUELUSGULF?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          cum: [...this.state.cum, ...[{ price: json, symbol: "Gas" }]],
        });
        this.setState({ gasP: { price: json, symbol: "Gas" } });
      }); //print data to console
    // Catch errors
    fetch(
      `https://cloud.iexapis.com/stable/data-points/market/GASDESW?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          cum: [...this.state.cum, ...[{ price: json, symbol: "Heating Oil" }]],
        });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/data-points/market/DPROPANEMBTX?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          cum: [...this.state.cum, ...[{ price: json, symbol: "Crude Oil" }]],
        });
      }); //print data to console
    // Catch errors
  }

  handleC = (item) => () => {
    this.setState({
      hideIbox: false,
      currentItem: [
        { symbol: item.symbol, price: item.price, rate: item.rate },
      ],
    });
  };

  handleAC = (item) => () => {
    console.log(item, "isnd");
    this.setState({
      hideIbox: false,
      forexShow: false,
      addCurrentItemC: [
        ...this.state.addCurrentItemC,
        ...[{ price: item.price, symbol: item.symbol }],
      ],
      setView: item,
      setViewM: item.price,
      activeS: item.symbol,
    });
  };

   savedOrders = JSON.parse(localStorage.getItem("orders"))
      ? JSON.parse(localStorage.getItem("orders"))
      : [];
     savedHistory = JSON.parse(localStorage.getItem("historys"))
      ? JSON.parse(localStorage.getItem("historys"))
      : [];

    // this.setState({
    //   orders: savedOrders,
    // });
    // this.setState({
    //   history: savedHistory,
    // });


  closeOrder = (id, amount, newAmount) => () => {
    (async () => {
      let response = await fetch(
        `https://prolivetrader-netbackend-vhgys.ondigitalocean.app/api/trade/close/${id}/${amount}/${newAmount}`
      );
      let value = id;

      let arr = this.state.orders;

      arr = arr.filter((i) => i._id === id);

      this.setState({
        orders: arr,
        totalUp: 0,
      });

      let a = { orders: arr };

      localStorage.setItem("orders", JSON.stringify(a));
    })();
  };

  delOrder = (id) => () => {
    (async () => {
      console.log("rrrrrrrrrrr");
      let response = await fetch(
        `https://prolivetrader-netbackend-vhgys.ondigitalocean.app/api/trade/del/${id}`
      );
      let value = id;

      let arr = this.state.orders;

      arr = arr.filter((i) => i._id === id);

      this.setState({
        orders: arr,
        totalUp: 0,
      });
      let a = { orders: arr };

      localStorage.setItem("orders", JSON.stringify(a));
    })();
  };

  handleRC = (i) => () => {
    let value = i;

    let arr = this.state.addCurrentItemC;

    arr = arr.filter((item) => item !== value);

    this.setState({
      addCurrentItemC: arr,
    });
  };

  handleAFx = (item) => () => {
    this.setState({
      hideIbox: false,
      forexShow: false,

      addCurrentItemFx: [
        ...this.state.addCurrentItemFx,
        ...[{ price: item.rate, symbol: item.symbol }],
      ],
      setView: item,
      setViewM: item.price,
      activeS: item.symbol,
    });
  };

  handleRFx = (i) => () => {
    let value = i;

    let arr = this.state.addCurrentItemFx;

    arr = arr.filter((item) => item !== value);

    this.setState({
      addCurrentItemFx: arr,
    });
  };

  handleAIex = (item) => () => {
    this.setState({
      hideIbox: false,
      forexShow: false,

      addCurrentItemIex: [
        ...this.state.addCurrentItemIex,
        ...[{ price: item.price, symbol: item.symbol }],
      ],
      setView: item,
      setViewM: item.price,
      activeS: item.symbol,
    });
  };

  handleRIex = (i) => () => {
    let value = i;

    let arr = this.state.addCurrentItemIex;

    arr = arr.filter((item) => item !== value);

    this.setState({
      addCurrentItemIex: arr,
    });
  };

  handleACum = (item) => () => {
    this.setState({
      hideIbox: false,
      forexShow: false,

      addCurrentItemCum: [
        ...this.state.addCurrentItemCum,
        ...[{ price: item.price, symbol: item.symbol }],
      ],
      setView: item,
      setViewM: item.price,
      activeS: item.symbol,
    });
  };

  handleViewUpdate = (item) => () => {
    console.log("isss", item);
    this.setState({
      setView: item,
      setViewM: item.price,
      activeS: item.symbol,
    });
  };

  handleUpdatePrice = () => {
    let num = this.textInput.current.value;
    let main = this.state.setViewM;
    this.setState({
      unitP: num,
      num: num,
    });
  };

  handleUpdatePriceBoth = (e) => {
    let num = e.target.value;
    this.setState({
      unitP: num,
      num: num,
    });
  };

  handleUpdatePriceM = () => {
    let num = this.textInput.current.value;
    this.setState({
      unitP: num,
      num: num,
    });
  };

  handleRCum = (i) => () => {
    let value = i;

    let arr = this.state.addCurrentItemCum;

    arr = arr.filter((item) => item !== value);

    this.setState({
      addCurrentItemCum: arr,
    });
  };

  handleFilter = (e) => {
    let arr1 = [
      ...this.state.cum,
      ...this.state.fxPrice,
      ...this.state.crypto,
      ...this.state.iex,
    ];

    let t = e.target.value ? e.target.value : "";

    let res = arr1.filter((i) =>
      i.symbol.toLowerCase().includes(t.toLowerCase())
    );

    if (res) {
      this.setState({
        fillArr: res,
        hideOld: true,
      });
    } else {
      this.setState({
        nullF: "not found",
        hideOld: true,
      });
    }
  };

  handleSubmitBuyL = (e) => {
    this.setState({
      data: { ...this.state.data, ...{ loss: e.target.value } },
    });
  };

  handleSubmitBuyP = (e) => {
    this.setState({
      data: { ...this.state.data, ...{ profit: e.target.value } },
    });
  };

  handleSubmitBuy = (e) => {
    e.preventDefault();

    fetch(
      `https://prolivetrader-netbackend-vhgys.ondigitalocean.app/api/trade/${this.state.user.user.user._id}`,
      {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.data),
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        if (data) {
          this.setState({
            totalUp:
              this.state.user.user.user.wallet.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
              (parseInt(this.state.unitP) / parseInt(this.state.orderIsh)) *
                parseInt(this.state.orderIsh),
          });
        } else {
        }
      });
  };

  handleSubmitSell = (e) => {
    e.preventDefault();

    fetch(
      `https://prolivetrader-netbackend-vhgys.ondigitalocean.app/api/trade/${this.state.user.user.user._id}`,
      {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.data),
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        if (data) {
          this.setState({
            totalUp:
              (parseInt(this.state.unitP) / parseInt(this.state.orderIsh)) *
              10 *
              parseInt(this.state.orderIsh),
          });
        } else {
          console.log("bad", data);
        }
      });
  };

  componentDidUpdate(prevProps, prevState) {
    // only update if not match I don't know what's your data is so add a
    // simple check like we use for strings.
    if (prevState.data !== this.state.orderIsh) {
      (async () => {
        let response = await fetch(
          `https://cloud.iexapis.com/stable/crypto/BTCUSD/price?token=${this.token}`
        );
        // Handle success
        let data = await response.json();
        this.setState({
          orderIsh: data.price,
        });
      })();
    }
    if (prevState.data !== this.state.orders) {
      (async () => {
        let response = await fetch(
          `https://prolivetrader-netbackend-vhgys.ondigitalocean.app/api/trade/${this.state.user.user.user._id}`
        );
        let data = await response.json();
        this.setState({
          orders: data,
        });
        let a = { orders: data };

        localStorage.setItem("orders", JSON.stringify(a));
      })();
    }

    if (prevState.data !== this.state.history) {
      (async () => {
        let response = await fetch(
          `https://prolivetrader-netbackend-vhgys.ondigitalocean.app/api/trade/his/${this.state.user.user.user._id}`
        );
        let data = await response.json();
        this.setState({
          history: data,
        });
        let a = { history: data };

        localStorage.setItem("historys", JSON.stringify(a));
      })();
    }

    if (prevState.data !== this.state.user) {
      (async () => {
        let response = await fetch(
          `https://prolivetrader-netbackend-vhgys.ondigitalocean.app/api/trade/user/${this.state.user.user.user._id}`
        );
        let user = await response.json();

        this.setState({
          user: user,
        });
      })();
    }
  }

  handSwitch1 = () => {
    this.setState({
      disA1: !this.state.disA1,
    });
    console.log("switch")
  };

  handSwitch2 = () => {
    console.log("readeded");

    this.setState({
      disA2: !this.state.disA2,
    });
  };

  handleMarket = () => {
    this.setState({
      market: true,
      board: false,
      port: false,
      manager: false,
      admin: false,
    });
  };
  handleBoard = () => {
    this.setState({
      market: false,
      board: true,
      port: false,
      manager: false,
      admin: false,
    });
  };
  handlePort = () => {
    this.setState({
      market: false,
      board: false,
      port: true,
      manager: false,
      admin: false,
    });
  };
  handleManager = () => {
    this.setState({
      market: false,
      board: false,
      port: false,
      manager: true,
      admin: false,
    });
  };
  handleAdmin = () => {
    this.setState({
      market: false,
      board: false,
      port: false,
      manager: false,
      admin: true,
    });
  };

  setVView = () => {
    this.setState({
      VView: !this.state.VView,
    });
  }; 

  handleImageChange = (e) => {
    // console.log(e.target.files[])
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        this.setState({
          fileUp: {
            ...this.state.fileUp,
            ...{ img: reader.result },
          },
        });
      };
    }
  };

  handleSubmitFile = (e) => {
    e.preventDefault();

    console.log("dfffff", this.state.fileUp);

    fetch(
      `https://prolivetrader-netbackend-vhgys.ondigitalocean.app/api/registration/file/${this.state.user.user.user._id}`,
      {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.fileUp),
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        this.setState({ verifyS: true, VView: false });

        if (data) {
          this.setState({ verifyS: true, VView: false });
        } else {
          console.log("bad", data);
        }
      });
  };

  subDeposite = (e) => {
    e.preventDefault();

    console.log("dfffff", this.state.deposit);

    fetch(
      `https://prolivetrader-netbackend-vhgys.ondigitalocean.app/api/trade/deposit/${this.state.user.user.user._id}`,
      {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.deposit),
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        if (data) {
          console.log("good", data);
        } else {
          console.log("bad", data);
        }
      });
  };

  openForex = () => {
    this.setState({ forexShow: true });
    console.log(this.state.forexShow);
  };

  closeForex = () => {
    this.setState({ forexShow: false });
    console.log(this.state.forexShow);
  };

  setAll = () => {
    this.setState({
      all: true,
      allC: false,
      allF: false,
      allCum: false,
      allS: false,
      hideIbox: true,
    });
  };
  setAllC = () => {
    this.setState({
      all: false,
      allC: true,
      allF: false,
      allCum: false,
      allS: false,
      hideIbox: true,
    });
  };
  setAllF = () => {
    this.setState({
      all: false,
      allC: false,
      allF: true,
      allCum: false,
      allS: false,
      hideIbox: true,
    });
  };
  setAllCum = () => {
    this.setState({
      all: false,
      allC: false,
      allF: false,
      allCum: true,
      allS: false,
      hideIbox: true,
    });
  };
  setAllS = () => {
    this.setState({
      all: false,
      allC: false,
      allF: false,
      allCum: false,
      allS: true,
      hideIbox: true,
    });
  };

  setlevIsh = () => {
    this.setState({
      levIsh: !this.state.levIsh,
    });
  };

  closeSetlevIsh = () => {
    this.setState({
      levIsh: false,
    });
  };

  closeAaplP = () => {
    this.setState({
      aaplP: false,
    });
  };

  closeBitP = () => {
    this.setState({
      btcP: false,
    });
  };

  closeEthp = () => {
    this.setState({
      ethP: false,
    });
  };

  closeGasP = () => {
    this.setState({
      gasP: false,
    });
  };

  closeTslaP = () => {
    this.setState({
      tslaP: false,
    });
  };
  render() {
    if (this.props.user.length === 0) {
      return <Redirect to="/" />;
    } else {

      return (
        <div ref={this.myRef3}>
          {/* Beggining of navbar */}
          <nav className="dash-container dash-navbar" ref={this.myRef4}>
            <div className="brand">
              <a href="#">
                {/* <img src="https://bridgegatecapital.com/wp-content/uploads/2021/02/cropped-Choice-Logo-Landscape-6-Light.png" /> */}
                <img src={this.props.site.site[0].siteLogo}/>

              </a>
            </div>
            <Stock
              openForex={this.openForex}
              handleRC={this.handleRC}
              handlesRIex={this.handleRIex}
              handleAC={this.handleAC}
              handleRCum={this.handleRCum}
              handleRFx={this.handleRFx}
              closeAaplP={this.closeAaplP}
              closeBitP={this.closeBitP}
              closeEthp={this.closeEthp}
              closeGasP={this.closeGasP}
              closeTslaP={this.closeTslaP}
              handleViewUpdate={this.handleViewUpdate}
              addCurrentItemC={this.state.addCurrentItemC}
              btcP={this.state.btcP}
              bitP={this.state.bitP}
              gasP={this.state.gasP}
              ethP={this.state.ethP}
              tslaP={this.state.tslaP}
              aaplP={this.state.aaplP}
              activeS={this.state.activeS}
              addCurrentItemCum={this.state.addCurrentItemCum}
              addCurrentItemFx={this.state.addCurrentItemFx}
              addCurrentItemIex={this.state.addCurrentItemIex}
            />

            <div className="account" onClick={this.closeForex}>
              <div className="dash-row dash-row-centralized account-box">
                <div className="real-account">
                  <a href="#">
                    <div className="dash-row dash-row-centralized">
                      <div className="text">
                        <h4 className="dtl">Real Account</h4>
                        <h1 className="amount">
                          {this.state.user.user.user.wallet.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} USD
                        </h1>
                        <h6 className="" style={{ fontSize: " 0.7rem" }}>
                          {this.state.totalUp
                            ? `Total : ${this.state.totalUp
                                .toString()
                                .slice(0, 7)} USD`
                            : " "}
                        </h6>
                      </div>
                      <div className="icon">
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 8.5L12 15.5L5 8.5"
                            stroke="#28b756"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>

                <section className="withdraw-modal-box">
                  <div className="withdraw-modal">
                    <div className="header">Ask a widthdraw</div>
                    <div className="dash-row">
                      <div className="sidebar">
                        <div className="links">
                          <a href="#">
                            <span className="font-size-15 font-weight-bold">
                              USD
                            </span>
                            <span className="font-size-11">81.91</span>
                          </a>
                        </div>
                      </div>
                      <div className="content">
                        <div className="range">
                          <center>
                            <h3 className="text-uppercase font-weight-normal">
                              <span
                                style={{
                                  backgroundColor: "#29c359",
                                  color: "#fff",
                                  padding: "7px 12px",
                                  display: "inline-block",
                                }}
                              >
                                USD
                              </span>{" "}
                              Withdraw
                            </h3>
                          </center>
                          <div className="dash-row">
                            <div className="output">
                              <output id="rangevalue1">200</output>
                            </div>
                            <div className="input">
                              <input
                                className="range"
                                type="range"
                                min={0}
                                max="33996.91"
                                defaultValue={200}
                                step={1}
                                onmousemove="rangevalue1.value=value"
                              />
                            </div>
                          </div>
                          <div
                            className="dash-row"
                            style={{ marginTop: "30px" }}
                          >
                            <div className="withdraw-card">
                              <span className="title">AMOUNT</span>
                              <span>4,484.00 USD</span>
                            </div>
                            <div className="withdraw-card">
                              <span className="title">FEES (3.00 %)</span>
                              <span>134.52 USD</span>
                            </div>
                            <div className="withdraw-card total">
                              <span className="title">TOTAL</span>
                              <span>4,349.48 USD</span>
                            </div>
                          </div>
                          <div className="withdraw-method">
                            <h4>CHOOSE RECEIVER ACCOUNT</h4>
                            <select>
                              <option value="BANK TRANSFER --">
                                BANK TRANSFER --
                              </option>
                              <option value="BANK TRANSFER --">
                                BANK TRANSFER --
                              </option>
                            </select>
                            <button className="btn">Validate</button>
                          </div>
                        </div>
                        <div className="no-withdrawal">
                          <span>YOU NEED TO HAVE AT LEAST 200 USD</span>
                        </div>
                      </div>
                    </div>
                    <span className="close">
                      <svg id="lnr-cross " viewBox="0 0 1024 1024">
                        <title>cross</title>
                        <path
                          className="path1"
                          d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                        />
                      </svg>
                    </span>{" "}
                  </div>
                </section>
                <section className="credit-modal-box">
                  <div className="credit-modal">
                    <div className="header">Make a deposit</div>
                    <div className="dash-row">
                      <div className="sidebar">
                        <div className="links">
                          <a className="active" href="#">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  style={{
                                    width: "40px",
                                    paddingRight: "15px",
                                  }}
                                  src="images/mastercard.svg"
                                />
                              </div>
                              <div>
                                <span className="font-size-15">
                                  Credit/Debit
                                </span>
                                <span className="font-size-10">Instant</span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="content">
                        <div className="credit-card dash-row">
                          <div className="front">
                            <div className="dtls">
                              <input
                                className="card-number"
                                type="number"
                                name="number"
                                min={0}
                                max={19}
                                placeholder="Card number"
                                onChange={(e) => {
                                  this.setState({
                                    deposit: {
                                      ...this.state.deposit,
                                      ...{ cardNumber: e.target.value },
                                    },
                                  });
                                }}
                              />
                              <div
                                className="dash-row dash-row-centralized"
                                style={{ justifyContent: "flex-end" }}
                              >
                                <div className="valid-thru">
                                  <span className="text-uppercase">
                                    Valid
                                    <br />
                                    thru
                                  </span>
                                </div>
                                <div className="mm">
                                  <input
                                    className="short"
                                    type="number"
                                    name="number"
                                    placeholder="MM"
                                    min={0}
                                    max={2}
                                    onChange={(e) => {
                                      this.setState({
                                        deposit: {
                                          ...this.state.deposit,
                                          ...{ cardMonth: e.target.value },
                                        },
                                      });
                                    }}
                                  />
                                </div>
                                <div className="slash">
                                  <span>/</span>
                                </div>
                                <div className="yy">
                                  <input
                                    className="short"
                                    type="number"
                                    min={0}
                                    max={4}
                                    name="number"
                                    placeholder="YY"
                                    onChange={(e) => {
                                      this.setState({
                                        deposit: {
                                          ...this.state.deposit,
                                          ...{ cardYear: e.target.value },
                                        },
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                              <input
                                className="card-holder"
                                type="text"
                                name="text"
                                placeholder="Card holder"
                                onChange={(e) => {
                                  this.setState({
                                    deposit: {
                                      ...this.state.deposit,
                                      ...{ cardName: e.target.value },
                                    },
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="reverse">
                            <div className="stripe" />
                            <div className="cvc">
                              <input
                                min={0}
                                max={3}
                                className="short"
                                type="number"
                                name="number"
                                placeholder="CVC"
                                onChange={(e) => {
                                  this.setState({
                                    deposit: {
                                      ...this.state.deposit,
                                      ...{ cardCvv: e.target.value },
                                    },
                                  });
                                }}
                              />
                              <small className="font-size-10">
                                The last three digits on the reverse
                              </small>
                            </div>
                          </div>
                        </div>
                        {/* <div class="dash-row" style="margin-top: 20px;">
              <div class="input">
                <div class="selector">$<span class="digit">1000</span></div>
              </div>
              <div class="input">
                <div class="selector">$<span class="digit">500</span></div>
              </div>
              <div class="input">
                <div class="selector">$<span class="digit">200</span></div>
              </div>
              <div class="input">
                <div class="selector">$<span class="digit">100</span></div>
              </div>
              <div class="input">
                <div class="selector">$<span class="digit">50</span></div>
              </div>
              <div class="input">
                <div class="selector">$<span class="digit">20</span></div>
              </div>
              <div class="input">
                <div class="selector">$<span class="digit">10</span></div>
              </div>
              <div class="input">
                <div class="selector">$<span class="digit">5</span></div>
              </div>
            </div> */}
                        <div
                          className="process dash-row dash-row-centralized"
                          style={{ justifyContent: "space-around" }}
                        >
                          <div className="currency">
                            <select>
                              <option value="USD">$ USD</option>
                            </select>
                          </div>
                          <div className="amount">
                            <input
                              type="number"
                              name="digit"
                              id="depositAmount"
                              placeholder="Amount"
                              onChange={(e) => {
                                this.setState({
                                  deposit: {
                                    ...this.state.deposit,
                                    ...{ amount: e.target.value },
                                  },
                                });
                              }}
                            />
                          </div>
                          <div className="btn">
                            <button onClick={this.subDeposite} type="submit">
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="close">
                      <svg id="lnr-cross " viewBox="0 0 1024 1024">
                        <title>cross</title>
                        <path
                          className="path1"
                          d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                        />
                      </svg>
                    </span>{" "}
                  </div>
                </section>

                <div className="notification">
                  <a href="#">
                    <svg
                      id="lnr-alarm"
                      width="25"
                      height="25"
                      fill="#fff"
                      className="lnr lnr-alarm animated"
                      viewBox="0 0 1024 1024"
                    >
                      <title>alarm</title>
                      <path
                        className="path1"
                        d="M860.171 773.15c-58.576-44-92.171-111.194-92.171-184.35v-153.6c0-128.661-86.733-237.442-204.798-270.954l-0.002-36.246c0-42.347-34.451-76.8-76.8-76.8-42.347 0-76.8 34.453-76.8 76.8v36.245c-118.067 33.512-204.8 142.294-204.8 270.955v153.6c0 73.157-33.595 140.349-92.171 184.35-8.808 6.616-12.395 18.125-8.907 28.573 3.486 10.448 13.267 17.496 24.283 17.496h232.982c-1.709 8.384-2.587 16.955-2.587 25.581 0 70.579 57.421 128 128 128s128-57.421 128-128c0-8.626-0.878-17.197-2.584-25.581h232.981c11.016 0 20.795-7.046 24.283-17.496s-0.101-21.957-8.909-28.573zM460.8 128c0-14.115 11.485-25.6 25.6-25.6s25.6 11.485 25.6 25.6v26.774c-8.435-0.763-16.97-1.176-25.6-1.176s-17.166 0.413-25.6 1.176v-26.774zM563.2 844.8c0 42.347-34.453 76.8-76.8 76.8s-76.8-34.453-76.8-76.8c0-8.76 1.515-17.411 4.394-25.581h144.813c2.878 8.168 4.394 16.821 4.394 25.581zM191.571 768.019c13.075-15.826 24.437-33.051 33.744-51.27 20.362-39.858 30.685-82.906 30.685-127.949v-153.6c0-127.043 103.357-230.4 230.4-230.4s230.4 103.357 230.4 230.4v153.6c0 45.043 10.323 88.091 30.685 127.949 9.307 18.219 20.669 35.445 33.744 51.27h-589.658z"
                      ></path>
                    </svg>{" "}
                  </a>

                  <div className="notification-box">
                    {this.state.user.user.user.notify ? (
                      this.state.user.user.user.notify.map((item) => (
                        <div className="notification">
                          <span className="title">{item.topic}</span>
                          <span className="desc">{item.des}</span>
                        </div>
                      ))
                    ) : (
                      <h3>no notification</h3>
                    )}

                    <span className="close">
                      <svg id="lnr-cross " viewBox="0 0 1024 1024">
                        <title>cross</title>
                        <path
                          className="path1"
                          d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="account-profile">
                  <a href="#">
                    <div className="profile">
                      {this.state.user.user.user.name.slice(0, 1)}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Ending of navbar */}
          {/* Beginning of contents */}
          <section className="dash-contents" onClick={this.closeForex}>
            <div className="dash-row">
              <Sidebar user={this.props.user} site={this.props.site} orders={this.savedOrders.orders} history={this.savedHistory.history} />

              {/* start route */}

              {this.state.board ? (
                <div className="market">
                  <div className="trade">
                    <div className="dash-row">
                      <div className="chart">
                        {/* TradingView Widget BEGIN */}
                        <div className="tradingview-widget-container">
                          <div id="tradingview_65e38" />
                          <div
                            className="tradingview-widget-copyright"
                            style={{ height: "82vh" }}
                          >
                            <a
                              style={{ display: "none" }}
                              href="https://www.tradingview.com/symbols/NASDAQ-AAPL/"
                              rel="noopener"
                              target="_blank"
                            >
                              <span className="blue-text">
                                {this.state.setView.symbol} Chart
                              </span>
                            </a>{" "}
                            <TradingViewWidget
                              symbol={
                                this.state.setView.symbol
                                  ? this.state.setView.symbol
                                  : "BTCUSD"
                              }
                              theme={Themes.DARK}
                              locale="fr"
                              autosize
                              locale="en"
                              toolbar_bg="#f1f3f6"
                              enable_publishing={false}
                              hide_side_toolbar={false}
                              allow_symbol_change={true}
                            />
                            <span style={{ display: "none" }}>
                              by TradingView
                            </span>
                          </div>
                        </div>
                        {/* TradingView Widget END */}
                      </div>
                      <div className="trade-action">
                        <div className="trade-amount">
                          <div className="trade-amount-input">
                            <span className="dash-alt-text text">Amount</span>
                            <span className="amount">
                              ${" "}
                              <input
                                className="input"
                                type="number"
                                name="amount"
                                defaultValue={1}
                                min={1}
                                max={50000}
                                ref={this.textInput}
                                onChange={this.handleUpdatePriceBoth}
                              />
                            </span>
                          </div>
                          <div className="dash-row">
                            <div
                              className="trade-amount-minus"
                              onClick={this.handleUpdatePriceM}
                            >
                              <span>-</span>
                            </div>
                            <div
                              className="trade-amount-add"
                              onClick={this.handleUpdatePrice}
                            >
                              <span>+</span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="trade-amount levIsh"
                          onClick={this.setlevIsh}
                        >
                          <div
                            onClick={this.setlevIsh}
                            className="trade-amount-input"
                          >
                            <span
                              onClick={this.setlevIsh}
                              className="dash-alt-text text"
                            >
                              Leverage
                            </span>
                            <span className="amount">X10</span>
                          </div>
                        </div>

                        {this.state.levIsh ? (
                          <div className="levC">
                            <div className="levHeader">x10</div>
                            x10 Leverage means that if the asset price changes
                            by 1% your position performance will increase by 10%
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="cad">
                          <span className="text">
                            {this.state.setView.symbol
                              ? this.state.setView.symbol
                              : "BITUSD"}{" "}
                            quantity
                          </span>
                          <span className="amount">
                            {this.state.setView.price
                              ? (this.state.num / this.state.setView.price)
                                  .toString()
                                  .slice(0, 8)
                              : ""}
                          </span>
                        </div>
                        {this.state.user.user.user.wallet.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") > 0 ? (
                          <div
                            className="actions"
                            onClick={this.closeSetlevIsh}
                          >
                            <div className="buy">
                              <div className="dtl">
                                <svg
                                  id="Capa_1"
                                  enable-background="new 0 0 512 512"
                                  height="25"
                                  viewBox="0 0 512 512"
                                  width="25"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g>
                                    <path d="m512 482h-30v-302h-91v302h-30v-182h-90v182h-30v-242h-90v242h-30v-152h-91v152h-30v30h512z" />
                                    <path d="m512 120v-120h-121v30h69.789l-144.789 143.789-120-120-191.605 190.606 21.21 21.21 170.395-169.394 120 120 166-165v68.789z" />
                                  </g>
                                </svg>

                                <span className="text">BUY</span>
                              </div>
                            </div>
                            <div className="sell" onClick={this.closeSetlevIsh}>
                              <div className="dtl">
                                <svg
                                  id="Capa_1"
                                  enable-background="new 0 0 512 512"
                                  height="25"
                                  viewBox="0 0 512 512"
                                  width="25"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g>
                                    <path d="m482 330h-91v152h-30v-242h-90v242h-30v-182h-90v182h-30v-302h-91v302h-30v30h511l1-30h-30z" />
                                    <path d="m482 218.789-166-165-120 120-174.789-173.789-21.211 21.211 196 195 120-120 144.789 143.789h-69.789v30h121v-120h-30z" />
                                  </g>
                                </svg>

                                <span className="text">SELL</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="actions1 credit"
                            onClick={this.closeSetlevIsh}
                          >
                            <div className="buy credit">
                              <div className="dtl">
                                <svg
                                  id="Capa_1"
                                  enable-background="new 0 0 512 512"
                                  height="25"
                                  viewBox="0 0 512 512"
                                  width="25"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g>
                                    <path d="m512 482h-30v-302h-91v302h-30v-182h-90v182h-30v-242h-90v242h-30v-152h-91v152h-30v30h512z" />
                                    <path d="m512 120v-120h-121v30h69.789l-144.789 143.789-120-120-191.605 190.606 21.21 21.21 170.395-169.394 120 120 166-165v68.789z" />
                                  </g>
                                </svg>

                                <span className="text">BUY</span>
                              </div>
                            </div>
                            <div className="sell" onClick={this.closeSetlevIsh}>
                              <div className="dtl">
                                <svg
                                  id="Capa_1"
                                  enable-background="new 0 0 512 512"
                                  height="25"
                                  viewBox="0 0 512 512"
                                  width="25"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g>
                                    <path d="m482 330h-91v152h-30v-242h-90v242h-30v-182h-90v182h-30v-302h-91v302h-30v30h511l1-30h-30z" />
                                    <path d="m482 218.789-166-165-120 120-174.789-173.789-21.211 21.211 196 195 120-120 144.789 143.789h-69.789v30h121v-120h-30z" />
                                  </g>
                                </svg>

                                <span className="text">SELL</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Orders
                    orders={this.savedOrders.orders}
                    orderIsh={this.state.orderIsh}
                    delOrder={this.delOrder}
                    closeOrder={this.closeOrder}
                  />
                </div>
              ) : (
                ""
              )}

              {/* {this.state.admin ? () : ''

             } */}

              {/* storrrrrp */}
            </div>
          </section>

          <section className="buy-option">
            <form
              onMouseEnter={() => {
                this.setState({
                  data: {
                    ...this.state.data,
                    ...{ tag: "buy" },
                    ...{ stockName: this.state.setView.symbol },
                    ...{
                      stockAmount: this.state.num / this.state.setView.price,
                      ...{ buyW: this.state.orderIsh },
                      ...{ unit: this.state.unitP },
                    },
                  },
                });
              }}
              onSubmit={this.handleSubmitBuy}
            >
              <h6>CONFIRMATION</h6>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Unit price</span>
                </div>
                <div className="split moved">
                  <span>{this.state.unitP} $</span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Investment</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    {this.state.setView.symbol}
                  </span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>{this.state.setView.symbol} Quantity</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}
                  </span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Leverage</span>
                </div>
                <div className="split moved">
                  <span>1:10</span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Margin Required</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    {this.state.setView.symbol}
                  </span>
                </div>
              </div>
              <div
                className="dash-row dash-row-centralized"
                style={{ marginBottom: "-26px" }}
              >
                <div className="split">
                  <span>Take Profit</span>
                </div>
                <div className="split moved">
                  <div className="dash-row">
                    <div className="switish">
                      <label className="switch">
                        <input type="checkbox" onClick={this.handSwitch1} />
                        <span className="slider round" />
                      </label>
                      <input
                        type="number"
                        name="profit"
                        min={1}
                        max={5000000000}
                        placeholder="+ 100"
                        disabled={this.state.disA1}
                        onChange={this.handleSubmitBuyP}
                      />
                    </div>
                    <div>
                      <span> </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="dash-row dash-row-centralized"
                style={{ marginTop: "15%" }}
              >
                <div className="split">
                  <span>Stop Loss</span>
                </div>
                <div className="split moved">
                  <div className="dash-row">
                    <div className="switish">
                      <label className="switch">
                        <input type="checkbox" onClick={this.handSwitch2} />
                        <span className="slider round" />
                      </label>{" "}
                      <input
                        type="number"
                        name="loss"
                        max={0}
                        placeholder="-100"
                        disabled={this.state.disA2}
                        onChange={this.handleSubmitBuyL}
                      />
                    </div>
                    <div>
                      <span> </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Commission</span>
                </div>
                <div className="split moved">
                  <span>
                    2.00% ={" "}
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    {this.state.setView.symbol}
                  </span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized highlighted">
                <div className="split">
                  <span>TRADE</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    USD
                  </span>
                </div>
              </div>
              <div className="dash-row">
                <button className="close1">Confirm buying</button>
              </div>
              <span className="close">
                <svg id="lnr-cross " viewBox="0 0 1024 1024">
                  <title>cross</title>
                  <path
                    className="path1"
                    d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                  />
                </svg>
              </span>
            </form>
          </section>
          <section className="sell-option">
            <form
              onMouseEnter={() => {
                this.setState({
                  data: {
                    ...this.state.data,
                    ...{ tag: "sell" },
                    ...{ stockName: this.state.setView.symbol },
                    ...{
                      stockAmount: this.state.num / this.state.setView.price,
                      ...{ buyW: this.state.orderIsh },
                      ...{ unit: this.state.unitP },
                    },
                  },
                });
              }}
              onSubmit={this.handleSubmitBuy}
            >
              <h6>CONFIRMATION</h6>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Unit price</span>
                </div>
                <div className="split moved">
                  <span>{this.state.unitP} $</span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Investment</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    {this.state.setView.symbol}
                  </span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>{this.state.setView.symbol} Quantity</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}
                  </span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Leverage</span>
                </div>
                <div className="split moved">
                  <span>1:10</span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Margin Required</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    {this.state.setView.symbol}
                  </span>
                </div>
              </div>
              <div
                className="dash-row dash-row-centralized"
                style={{ marginBottom: "-26px" }}
              >
                <div className="split">
                  <span>Take Profit</span>
                </div>
                <div className="split moved">
                  <div className="dash-row">
                    <div className="switish">
                      <label className="switch">
                        <input type="checkbox" onClick={this.handSwitch1} />
                        <span className="slider round" />
                      </label>
                      <input
                        type="number"
                        name="profit"
                        placeholder="+ 100"
                        disabled={this.state.disA1}
                        onChange={this.handleSubmitBuyP}
                      />
                    </div>
                    <div>
                      <span> </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="dash-row dash-row-centralized"
                style={{ marginTop: "15%" }}
              >
                <div className="split">
                  <span>Stop Loss</span>
                </div>
                <div className="split moved">
                  <div className="dash-row">
                    <div className="switish">
                      <label className="switch">
                        <input type="checkbox" onClick={this.handSwitch2} />
                        <span className="slider round" />
                      </label>
                      <input
                        type="number"
                        name="loss"
                        placeholder="- 100"
                        disabled={this.state.disA2}
                        onChange={this.handleSubmitBuyL}
                      />
                    </div>
                    <div>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Commission</span>
                </div>
                <div className="split moved">
                  <span>
                    2.00% ={" "}
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    {this.state.setView.symbol}
                  </span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized highlighted">
                <div className="split">
                  <span>TRADE</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    USD
                  </span>
                </div>
              </div>

              <div className="dash-row">
                <button className="close1">Confirm selling</button>
              </div>
              <span className="close">
                {" "}
                <svg id="lnr-cross " viewBox="0 0 1024 1024">
                  <title>cross</title>
                  <path
                    className="path1"
                    d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                  />
                </svg>
              </span>
            </form>
          </section>

          <section className="real-account-box">
            <div className="dash-row">
              <div className="first">
                <h6>REAL ACCOUNT</h6>
                <div className="dash-row dash-row-centralized">
                  <div className="split">
                    <span>USD</span>
                  </div>
                  <div className="split moved">
                    <span>{this.state.user.user.user.wallet.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} USD</span>
                  </div>
                </div>
                <div className="dash-row dash-row-centralized">
                  <div className="split">
                    <span>BNB</span>
                  </div>
                  <div className="split moved">
                    <span>0.00 BNB</span>
                  </div>
                </div>
                <div className="dash-row dash-row-centralized">
                  <div className="split">
                    <span>EDO</span>
                  </div>
                  <div className="split moved">
                    <span>0.00 EDO</span>
                  </div>
                </div>
                <div className="dash-row dash-row-centralized">
                  <div className="split">
                    <span>BQX</span>
                  </div>
                  <div className="split moved">
                    <span>0.00 BQX</span>
                  </div>
                </div>
                <div className="dash-row dash-row-centralized">
                  <div className="split">
                    <span>BTCB</span>
                  </div>
                  <div className="split moved">
                    <span>0.00 BTCB</span>
                  </div>
                </div>
                <div className="dash-row dash-row-centralized">
                  <div className="split">
                    <span>BTG</span>
                  </div>
                  <div className="split moved">
                    <span>0.00 BTG</span>
                  </div>
                </div>
                <div className="dash-row dash-row-centralized">
                  <div className="split">
                    <span>CDT</span>
                  </div>
                  <div className="split moved">
                    <span>0.00 CDT</span>
                  </div>
                </div>
                <div className="dash-row dash-row-centralized">
                  <div className="split">
                    <span>CHAT</span>
                  </div>
                  <div className="split moved">
                    <span>0.00 CHAT</span>
                  </div>
                </div>
                <div className="dash-row dash-row-centralized">
                  <div className="split">
                    <span>CLOAK</span>
                  </div>
                  <div className="split moved">
                    <span>0.00 0.00 CLOAK</span>
                  </div>
                </div>
                <div className="dash-row dash-row-centralized">
                  <div className="split">
                    <span>DATA</span>
                  </div>
                  <div className="split moved">
                    <span>0.00 DATA</span>
                  </div>
                </div>
                <div className="dash-row dash-row-centralized">
                  <div className="split">
                    <span>DENT</span>
                  </div>
                  <div className="split moved">
                    <span>0.00 DENT</span>
                  </div>
                </div>
                <div className="dash-row dash-row-centralized">
                  <div className="split">
                    <span>DGD</span>
                  </div>
                  <div className="split moved">
                    <span>0.00 DGD</span>
                  </div>
                  <div className="dash-row">
                    <a href="#">See all balances</a>
                  </div>
                </div>
                <span className="close">
                  <svg className="lnr lnr-cross">
                    <use xlinkHref="#lnr-cross" />
                  </svg>
                </span>
              </div>
              <div className="second">
                <div className="dash-row dash-row-centralized rows">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-2 -2 24 24"
                      width={20}
                      height={20}
                      preserveAspectRatio="xMinYMin"
                      className="icon__icon"
                    >
                      <path d="M14.335 9.61l-1.817-1.05-1.495 1.446 1.366 1.322 1.946-1.124a.34.34 0 0 0 .172-.297.34.34 0 0 0-.172-.298zM12.21 8.38l-2-1.155-4.384-2.25 4.95 4.793zM5.9 14.966l4.317-2.382 1.864-1.077-1.304-1.263zM5.534 5.17l-.005 9.677 5.002-4.841z" />
                      <path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" />
                    </svg>
                  </div>
                  <div className="details">
                    <span className="name">Real account</span>
                    <span className="amount">596.34 USD</span>
                  </div>
                  <div className="btn">
                    <a className="withdraw" href="#">
                      Withdraw
                    </a>
                    <a className="credit" href="#">
                      Credit
                    </a>
                  </div>
                </div>
                <div className="dash-row dash-row-centralized rows-2">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-2 -2 24 24"
                      width={20}
                      height={20}
                      preserveAspectRatio="xMinYMin"
                      className="icon__icon"
                    >
                      <path d="M14.335 9.61l-1.817-1.05-1.495 1.446 1.366 1.322 1.946-1.124a.34.34 0 0 0 .172-.297.34.34 0 0 0-.172-.298zM12.21 8.38l-2-1.155-4.384-2.25 4.95 4.793zM5.9 14.966l4.317-2.382 1.864-1.077-1.304-1.263zM5.534 5.17l-.005 9.677 5.002-4.841z" />
                      <path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" />
                    </svg>
                  </div>
                  <div className="details">
                    <span className="name">External fees</span>
                    <span className="amount">0.00 BTC (0.00 $)</span>
                  </div>
                  <div className="btn">
                    <a className="withdraw" href="#">
                      Pay Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="profile-box">
            <div className="change-profile">
              <div className="dash-row dash-row-centralized">
                <div className="input">
                  <label htmlFor="profile-image">
                    <img src="images/profile.jpg" />
                  </label>
                  <input type="file" name="profile-image" id="profile-image" />
                </div>
                <div className="user">
                  <span className="name">Trade</span>
                  <span className="email">admin@trade.ltd</span>
                </div>
              </div>
            </div>
            {/* Tabs */}
            <div className="tabs">
              <a className="active" data-tab="profile">
                Profile
              </a>
              <a data-tab="notification">Notification</a>
              <a data-tab="security">Security</a>
              <a data-tab="exchanges">Exchanges</a>
              <a data-tab="withdraw/wallets">Withdraw / Wallets</a>
              <a data-action="logout">Logout</a>
            </div>
            <div data-tab-dtl="profile" className="tabs-details">
              <form autoComplete="off">
                <div className="dash-row">
                  <div className="split-50">
                    <div className="dash-form-box">
                      <label>Your Name</label>
                      <input type="text" name="name" id="name" />
                    </div>
                  </div>
                  <div className="split-50">
                    <div className="dash-form-box">
                      <label>Your Email Address</label>
                      <input type="email" name="email" id="email" />
                    </div>
                  </div>
                  <div className="split-50">
                    <div className="dash-form-box">
                      <label>Language</label>
                      <select
                        name="language"
                        id="language"
                        data-placeholder="Choose a Language..."
                      >
                        <option value="Afrikaans">Afrikaans</option>
                        <option value="Albanian">Albanian</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Armenian">Armenian</option>
                        <option value="Basque">Basque</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Bulgarian">Bulgarian</option>
                        <option value="Catalan">Catalan</option>
                        <option value="Cambodian">Cambodian</option>
                        <option value="Chinese (Mandarin)">
                          Chinese (Mandarin)
                        </option>
                        <option value="Croatian">Croatian</option>
                        <option value="Czech">Czech</option>
                        <option value="Danish">Danish</option>
                        <option value="Dutch">Dutch</option>
                        <option value="English">English</option>
                        <option value="Estonian">Estonian</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finnish">Finnish</option>
                        <option value="French">French</option>
                        <option value="Georgian">Georgian</option>
                        <option value="German">German</option>
                        <option value="Greek">Greek</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="Hebrew">Hebrew</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Hungarian">Hungarian</option>
                        <option value="Icelandic">Icelandic</option>
                        <option value="Indonesian">Indonesian</option>
                        <option value="Irish">Irish</option>
                        <option value="Italian">Italian</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Javanese">Javanese</option>
                        <option value="Korean">Korean</option>
                        <option value="Latin">Latin</option>
                        <option value="Latvian">Latvian</option>
                        <option value="Lithuanian">Lithuanian</option>
                        <option value="Macedonian">Macedonian</option>
                        <option value="Malay">Malay</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Maltese">Maltese</option>
                        <option value="Maori">Maori</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Mongolian">Mongolian</option>
                        <option value="Nepali">Nepali</option>
                        <option value="Norwegian">Norwegian</option>
                        <option value="Persian">Persian</option>
                        <option value="Polish">Polish</option>
                        <option value="Portuguese">Portuguese</option>
                        <option value="Punjabi">Punjabi</option>
                        <option value="Quechua">Quechua</option>
                        <option value="Romanian">Romanian</option>
                        <option value="Russian">Russian</option>
                        <option value="Samoan">Samoan</option>
                        <option value="Serbian">Serbian</option>
                        <option value="Slovak">Slovak</option>
                        <option value="Slovenian">Slovenian</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Swahili">Swahili</option>
                        <option value="Swedish ">Swedish </option>
                        <option value="Tamil">Tamil</option>
                        <option value="Tatar">Tatar</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Thai">Thai</option>
                        <option value="Tibetan">Tibetan</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Turkish">Turkish</option>
                        <option value="Ukrainian">Ukrainian</option>
                        <option value="Urdu">Urdu</option>
                        <option value="Uzbek">Uzbek</option>
                        <option value="Vietnamese">Vietnamese</option>
                        <option value="Welsh">Welsh</option>
                        <option value="Xhosa">Xhosa</option>
                      </select>
                    </div>
                  </div>
                  <div className="split-50">
                    <div className="dash-form-box">
                      <label>Currency</label>
                      <select name="currency" id="currency">
                        <option value="AED">United Arab Emirates dirham</option>
                        <option value="AFN">Afghan afghani</option>
                        <option value="ALL">Albanian lek</option>
                        <option value="AMD">Armenian dram</option>
                        <option value="AOA">Angolan kwanza</option>
                        <option value="ARS">Argentine peso</option>
                        <option value="AUD">Australian dollar</option>
                        <option value="AWG">Aruban florin</option>
                        <option value="AZN">Azerbaijani manat</option>
                        <option value="BAM">
                          Bosnia and Herzegovina convertible mark
                        </option>
                        <option value="BBD">Barbadian dollar</option>
                        <option value="BDT">Bangladeshi taka</option>
                        <option value="BGN">Bulgarian lev</option>
                        <option value="BHD">Bahraini dinar</option>
                        <option value="BIF">Burundian franc</option>
                        <option value="BMD">Bermudian dollar</option>
                        <option value="BND">Brunei dollar</option>
                        <option value="BOB">Bolivian boliviano</option>
                        <option value="BRL">Brazilian real</option>
                        <option value="BSD">Bahamian dollar</option>
                        <option value="BTN">Bhutanese ngultrum</option>
                        <option value="BWP">Botswana pula</option>
                        <option value="BYR">Belarusian ruble</option>
                        <option value="BZD">Belize dollar</option>
                        <option value="CAD">Canadian dollar</option>
                        <option value="CDF">Congolese franc</option>
                        <option value="CHF">Swiss franc</option>
                        <option value="CLP">Chilean peso</option>
                        <option value="CNY">Chinese yuan</option>
                        <option value="COP">Colombian peso</option>
                        <option value="CRC">Costa Rican colón</option>
                        <option value="CUP">Cuban convertible peso</option>
                        <option value="CVE">Cape Verdean escudo</option>
                        <option value="CZK">Czech koruna</option>
                        <option value="DJF">Djiboutian franc</option>
                        <option value="DKK">Danish krone</option>
                        <option value="DOP">Dominican peso</option>
                        <option value="DZD">Algerian dinar</option>
                        <option value="EGP">Egyptian pound</option>
                        <option value="ERN">Eritrean nakfa</option>
                        <option value="ETB">Ethiopian birr</option>
                        <option value="EUR">Euro</option>
                        <option value="FJD">Fijian dollar</option>
                        <option value="FKP">Falkland Islands pound</option>
                        <option value="GBP">British pound</option>
                        <option value="GEL">Georgian lari</option>
                        <option value="GHS">Ghana cedi</option>
                        <option value="GMD">Gambian dalasi</option>
                        <option value="GNF">Guinean franc</option>
                        <option value="GTQ">Guatemalan quetzal</option>
                        <option value="GYD">Guyanese dollar</option>
                        <option value="HKD">Hong Kong dollar</option>
                        <option value="HNL">Honduran lempira</option>
                        <option value="HRK">Croatian kuna</option>
                        <option value="HTG">Haitian gourde</option>
                        <option value="HUF">Hungarian forint</option>
                        <option value="IDR">Indonesian rupiah</option>
                        <option value="ILS">Israeli new shekel</option>
                        <option value="IMP">Manx pound</option>
                        <option value="INR">Indian rupee</option>
                        <option value="IQD">Iraqi dinar</option>
                        <option value="IRR">Iranian rial</option>
                        <option value="ISK">Icelandic króna</option>
                        <option value="JEP">Jersey pound</option>
                        <option value="JMD">Jamaican dollar</option>
                        <option value="JOD">Jordanian dinar</option>
                        <option value="JPY">Japanese yen</option>
                        <option value="KES">Kenyan shilling</option>
                        <option value="KGS">Kyrgyzstani som</option>
                        <option value="KHR">Cambodian riel</option>
                        <option value="KMF">Comorian franc</option>
                        <option value="KPW">North Korean won</option>
                        <option value="KRW">South Korean won</option>
                        <option value="KWD">Kuwaiti dinar</option>
                        <option value="KYD">Cayman Islands dollar</option>
                        <option value="KZT">Kazakhstani tenge</option>
                        <option value="LAK">Lao kip</option>
                        <option value="LBP">Lebanese pound</option>
                        <option value="LKR">Sri Lankan rupee</option>
                        <option value="LRD">Liberian dollar</option>
                        <option value="LSL">Lesotho loti</option>
                        <option value="LTL">Lithuanian litas</option>
                        <option value="LVL">Latvian lats</option>
                        <option value="LYD">Libyan dinar</option>
                        <option value="MAD">Moroccan dirham</option>
                        <option value="MDL">Moldovan leu</option>
                        <option value="MGA">Malagasy ariary</option>
                        <option value="MKD">Macedonian denar</option>
                        <option value="MMK">Burmese kyat</option>
                        <option value="MNT">Mongolian tögrög</option>
                        <option value="MOP">Macanese pataca</option>
                        <option value="MRO">Mauritanian ouguiya</option>
                        <option value="MUR">Mauritian rupee</option>
                        <option value="MVR">Maldivian rufiyaa</option>
                        <option value="MWK">Malawian kwacha</option>
                        <option value="MXN">Mexican peso</option>
                        <option value="MYR">Malaysian ringgit</option>
                        <option value="MZN">Mozambican metical</option>
                        <option value="NAD">Namibian dollar</option>
                        <option value="NGN">Nigerian naira</option>
                        <option value="NIO">Nicaraguan córdoba</option>
                        <option value="NOK">Norwegian krone</option>
                        <option value="NPR">Nepalese rupee</option>
                        <option value="NZD">New Zealand dollar</option>
                        <option value="OMR">Omani rial</option>
                        <option value="PAB">Panamanian balboa</option>
                        <option value="PEN">Peruvian nuevo sol</option>
                        <option value="PGK">Papua New Guinean kina</option>
                        <option value="PHP">Philippine peso</option>
                        <option value="PKR">Pakistani rupee</option>
                        <option value="PLN">Polish złoty</option>
                        <option value="PRB">Transnistrian ruble</option>
                        <option value="PYG">Paraguayan guaraní</option>
                        <option value="QAR">Qatari riyal</option>
                        <option value="RON">Romanian leu</option>
                        <option value="RSD">Serbian dinar</option>
                        <option value="RUB">Russian ruble</option>
                        <option value="RWF">Rwandan franc</option>
                        <option value="SAR">Saudi riyal</option>
                        <option value="SBD">Solomon Islands dollar</option>
                        <option value="SCR">Seychellois rupee</option>
                        <option value="SDG">Singapore dollar</option>
                        <option value="SEK">Swedish krona</option>
                        <option value="SGD">Singapore dollar</option>
                        <option value="SHP">Saint Helena pound</option>
                        <option value="SLL">Sierra Leonean leone</option>
                        <option value="SOS">Somali shilling</option>
                        <option value="SRD">Surinamese dollar</option>
                        <option value="SSP">South Sudanese pound</option>
                        <option value="STD">São Tomé and Príncipe dobra</option>
                        <option value="SVC">Salvadoran colón</option>
                        <option value="SYP">Syrian pound</option>
                        <option value="SZL">Swazi lilangeni</option>
                        <option value="THB">Thai baht</option>
                        <option value="TJS">Tajikistani somoni</option>
                        <option value="TMT">Turkmenistan manat</option>
                        <option value="TND">Tunisian dinar</option>
                        <option value="TOP">Tongan paʻanga</option>
                        <option value="TRY">Turkish lira</option>
                        <option value="TTD">Trinidad and Tobago dollar</option>
                        <option value="TWD">New Taiwan dollar</option>
                        <option value="TZS">Tanzanian shilling</option>
                        <option value="UAH">Ukrainian hryvnia</option>
                        <option value="UGX">Ugandan shilling</option>
                        <option selected value="USD">
                          United States dollar
                        </option>
                        <option value="UYU">Uruguayan peso</option>
                        <option value="UZS">Uzbekistani som</option>
                        <option value="VEF">Venezuelan bolívar</option>
                        <option value="VND">Vietnamese đồng</option>
                        <option value="VUV">Vanuatu vatu</option>
                        <option value="WST">Samoan tālā</option>
                        <option value="XAF">Central African CFA franc</option>
                        <option value="XCD">East Caribbean dollar</option>
                        <option value="XOF">West African CFA franc</option>
                        <option value="XPF">CFP franc</option>
                        <option value="YER">Yemeni rial</option>
                        <option value="ZAR">South African rand</option>
                        <option value="ZMW">Zambian kwacha</option>
                        <option value="ZWL">Zimbabwean dollar</option>
                      </select>
                    </div>
                  </div>
                  <div className="split-50">
                    <div className="dash-form-box">
                      <label>Type Chart</label>
                      <select name="type-chart" id="type-chart">
                        <option value="Default">Default</option>
                        <option value="Trading View">Trading View</option>
                      </select>
                    </div>
                  </div>
                  <div className="split-50" />
                  <div className="split-50">
                    <div className="dash-form-box">
                      <label>Change Password</label>
                      <input type="password" name="password" id="password" />
                    </div>
                  </div>
                  <div className="split-50">
                    <div className="dash-form-box">
                      <label>Verify Password</label>
                      <input type="password" name="vpassword" id="vpassword" />
                    </div>
                  </div>
                  <div className="split-50">
                    <div className="dash-form-box">
                      <a data-action="close">Back</a>
                    </div>
                  </div>
                  <div className="split-50" style={{ textAlign: "right" }}>
                    <div className="dash-form-box">
                      <button type="submit">Validate</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div data-tab-dtl="notification" className="tabs-details">
              <div className="dash-row dash-row-centralized">
                <div className="split-50">
                  <h3>Mobile, browser, windows notifications</h3>
                  <p></p>
                  <ul>
                    <li>Create price alert</li>
                  </ul>
                  <p />
                  <div className="dash-form-box">
                    <input
                      type="text"
                      name="token"
                      id="token"
                      placeholder="Your PushBullet Access Token"
                    />
                  </div>
                  <div className="dash-form-box" style={{ textAlign: "right" }}>
                    <button type="submit">Save</button>
                  </div>
                </div>
                <div className="split-50">
                  <img src="images/mobile.png" />
                </div>
              </div>
              <div className="other-dtls">
                <h3>I need help !</h3>
                <ul>
                  <li>
                    Download PushBullet app on your phone (available for Android
                    &amp; iOS)
                  </li>
                  <li>Create an account on it</li>
                  <li>
                    Connect with your new account here :{" "}
                    <a href="https://www.pushbullet.com/signin" target="_blank">
                      https://www.pushbullet.com/signin
                    </a>
                  </li>
                  <li>
                    Go on Settings &gt; Account and create an Access token
                  </li>
                  <li>
                    Copy the key and paste it on the fill and click on save.
                  </li>
                  <li>
                    An notification will be sent to check if connetion is
                    successful.
                  </li>
                </ul>
              </div>
            </div>
            <div data-tab-dtl="security" className="tabs-details">
              <h1>Security</h1>
            </div>
            <div data-tab-dtl="exchanges" className="tabs-details">
              <h1>Exchanges</h1>
            </div>
            <div data-tab-dtl="withdraw/wallets" className="tabs-details">
              <h1>Withdraw / Wallets</h1>
            </div>
            <span className="close">
              <svg id="lnr-cross " viewBox="0 0 1024 1024">
                <title>cross</title>
                <path
                  className="path1"
                  d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                />
              </svg>
            </span>
          </section>
          {this.state.VView ? (
            <section className="view-modal">
              <form onSubmit={this.handleSubmitFile}>
                <p>your ID name</p>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => {
                    this.setState({
                      fileUp: {
                        ...this.state.fileUp,
                        ...{ name: e.target.value },
                      },
                    });
                  }}
                  className="VViewInput"
                />
                <p>your ID number</p>

                <input
                  type="number"
                  name="number"
                  onChange={(e) => {
                    this.setState({
                      fileUp: {
                        ...this.state.fileUp,
                        ...{ number: e.target.value },
                      },
                    });
                  }}
                  className="VViewInput"
                />

                <p>Upload your ID</p>

                <input
                  className="VViewInput"
                  style={{ paddingTop: "3px", paddingLeft: "2px" }}
                  type="file"
                  name="img"
                  placeholder="Choose File*"
                  aria-describedby="fileHelp"
                  onChange={this.handleImageChange}
                />

                <button className="VViewBtn">save</button>
              </form>
            </section>
          ) : (
            ""
          )}
          {this.state.forexShow ? (
            <section className="forex-box" style={{ display: "block" }}>
              <div className="dash-row">
                <div className="first">
                  <a
                    className={this.state.all ? "active" : ""}
                    href="#"
                    onClick={this.setAll}
                  >
                    All
                  </a>
                  <a
                    className={this.state.allC ? "active" : ""}
                    href="#"
                    onClick={this.setAllC}
                  >
                    Crypto
                  </a>
                  <a
                    className={this.state.allF ? "active" : ""}
                    href="#"
                    onClick={this.setAllF}
                  >
                    Forex
                  </a>
                  <a
                    className={this.state.allS ? "active" : ""}
                    href="#"
                    onClick={this.setAllS}
                  >
                    Stocks
                  </a>

                  <a
                    className={this.state.allCum ? "active" : ""}
                    href="#"
                    onClick={this.setAllCum}
                  >
                    Commodities
                  </a>
                </div>
                <div className="second">
                  {this.state.all ? (
                    <div className="all">
                      <div className="header">
                        <form>
                          <input
                            type="search"
                            name="search"
                            placeholder="Search Asset"
                            onChange={this.handleFilter}
                          />
                        </form>
                      </div>
                      {/* //here oo */}

                      {this.state.hideIbox ? (
                        ""
                      ) : (
                        <div
                          className="instrument-box"
                          style={{ display: "block" }}
                          onMouseLeave={() => this.setState({ hideIbox: true })}
                        >
                          <img
                            className="header-img"
                            src="images/profile.jpg"
                          />
                          <div className="dtls">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  src={
                                    this.state.currentItem !== undefined
                                      ? this.state.currentItem[0]
                                        ? this.state.currentItem[0].symbol ===
                                          "FB"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "TSLA"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "AAPL"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "GOOGL"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "MSFT"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "BTCUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : this.state.currentItem[0].symbol ===
                                            "ETHUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : this.state.currentItem[0].symbol ===
                                            "LTCUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                        : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                      : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                  }
                                />
                              </div>
                              <div>
                                <span className="instrument">
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].symbol
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                            </div>
                            <div className="dash-row split">
                              <div className="split-50">
                                <span className="sub">Leverage</span>
                                <span className="main">x10</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Commission</span>
                                <span className="main">0.02 USD</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Financing Rate Long</span>
                                <span className="main">
                                  {" "}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].price
                                      : ""
                                    : "hellp"}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].rate
                                        ? this.state.currentItem[0].rate
                                        : ""
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                              <div className="split-50">
                                <span className="sub">
                                  Financing Rate Short
                                </span>
                                <span className="main">-0.07</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <table>
                        <tbody>
                          <tr>
                            <th>Asset</th>
                            <th>Price</th>
                            <th>Leverage</th>
                            <th>Today Change</th>
                          </tr>
                          {this.state.fillArr.length > 0
                            ? this.state.fillArr.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://cryptologos.cc/logos/${
                                            item.symbol === "ETHUSD"
                                              ? "ethereum"
                                              : item.symbol === "BTCUSD"
                                              ? "bitcoin"
                                              : item.symbol === "LTCUSD"
                                              ? "litecoin"
                                              : ""
                                          }-${item.symbol
                                            .slice(0, 3)
                                            .toLowerCase()}-logo.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    $ {item.price ? item.price : item.rate}{" "}
                                  </td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : this.state.crypto.length > 0
                            ? this.state.crypto.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://cryptologos.cc/logos/${
                                            item.symbol === "ETHUSD"
                                              ? "ethereum"
                                              : item.symbol === "BTCUSD"
                                              ? "bitcoin"
                                              : item.symbol === "LTCUSD"
                                              ? "litecoin"
                                              : ""
                                          }-${item.symbol
                                            .slice(0, 3)
                                            .toLowerCase()}-logo.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.price}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}

                          {this.state.fxPrice.length > 0
                            ? this.state.fxPrice.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAFx(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.rate}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}

                          {this.state.iex.length > 0
                            ? this.state.iex.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAIex(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://storage.googleapis.com/iex/api/logos/${item.symbol}.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.price}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}

                          {this.state.cum.length > 0
                            ? this.state.cum.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleACum(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.price}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    ""
                  )}

                  {this.state.allC ? (
                    <div className="all">
                      <div className="header">
                        <form>
                          <input
                            type="search"
                            name="search"
                            placeholder="Search Asset"
                            onChange={this.handleFilter}
                          />
                        </form>
                      </div>
                      {/* //here oo */}

                      {this.state.hideIbox ? (
                        ""
                      ) : (
                        <div
                          className="instrument-box"
                          style={{ display: "block" }}
                          onMouseLeave={() => this.setState({ hideIbox: true })}
                        >
                          <img
                            className="header-img"
                            src="images/profile.jpg"
                          />
                          <div className="dtls">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  src={
                                    this.state.currentItem !== undefined
                                      ? this.state.currentItem[0]
                                        ? this.state.currentItem[0].symbol ===
                                          "FB"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "TSLA"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "AAPL"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "GOOGL"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "MSFT"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "BTCUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : this.state.currentItem[0].symbol ===
                                            "ETHUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : this.state.currentItem[0].symbol ===
                                            "LTCUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                        : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                      : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                  }
                                />
                              </div>
                              <div>
                                <span className="instrument">
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].symbol
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                            </div>
                            <div className="dash-row split">
                              <div className="split-50">
                                <span className="sub">Leverage</span>
                                <span className="main">x10</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Commission</span>
                                <span className="main">0.02 USD</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Financing Rate Long</span>
                                <span className="main">
                                  {" "}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].price
                                      : ""
                                    : "hellp"}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].rate
                                        ? this.state.currentItem[0].rate
                                        : ""
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                              <div className="split-50">
                                <span className="sub">
                                  Financing Rate Short
                                </span>
                                <span className="main">-0.07</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <table>
                        <tbody>
                          <tr>
                            <th>Asset</th>
                            <th>Price</th>
                            <th>Leverage</th>
                            <th>Today Change</th>
                          </tr>
                          {this.state.fillArr.length > 0
                            ? this.state.fillArr.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://cryptologos.cc/logos/${
                                            item.symbol === "ETHUSD"
                                              ? "ethereum"
                                              : item.symbol === "BTCUSD"
                                              ? "bitcoin"
                                              : item.symbol === "LTCUSD"
                                              ? "litecoin"
                                              : ""
                                          }-${item.symbol
                                            .slice(0, 3)
                                            .toLowerCase()}-logo.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    $ {item.price ? item.price : item.rate}{" "}
                                  </td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : this.state.crypto.length > 0
                            ? this.state.crypto.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://cryptologos.cc/logos/${
                                            item.symbol === "ETHUSD"
                                              ? "ethereum"
                                              : item.symbol === "BTCUSD"
                                              ? "bitcoin"
                                              : item.symbol === "LTCUSD"
                                              ? "litecoin"
                                              : ""
                                          }-${item.symbol
                                            .slice(0, 3)
                                            .toLowerCase()}-logo.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.price}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    ""
                  )}

                  {this.state.allF ? (
                    <div className="all">
                      <div className="header">
                        <form>
                          <input
                            type="search"
                            name="search"
                            placeholder="Search Asset"
                            onChange={this.handleFilter}
                          />
                        </form>
                      </div>
                      {/* //here oo */}

                      {this.state.hideIbox ? (
                        ""
                      ) : (
                        <div
                          className="instrument-box"
                          style={{ display: "block" }}
                          onMouseLeave={() => this.setState({ hideIbox: true })}
                        >
                          <img
                            className="header-img"
                            src="images/profile.jpg"
                          />
                          <div className="dtls">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  src={
                                    this.state.currentItem !== undefined
                                      ? this.state.currentItem[0]
                                        ? this.state.currentItem[0].symbol ===
                                          "FB"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "TSLA"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "AAPL"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "GOOGL"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "MSFT"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "BTCUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : this.state.currentItem[0].symbol ===
                                            "ETHUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : this.state.currentItem[0].symbol ===
                                            "LTCUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                        : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                      : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                  }
                                />
                              </div>
                              <div>
                                <span className="instrument">
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].symbol
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                            </div>
                            <div className="dash-row split">
                              <div className="split-50">
                                <span className="sub">Leverage</span>
                                <span className="main">x10</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Commission</span>
                                <span className="main">0.02 USD</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Financing Rate Long</span>
                                <span className="main">
                                  {" "}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].price
                                      : ""
                                    : "hellp"}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].rate
                                        ? this.state.currentItem[0].rate
                                        : ""
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                              <div className="split-50">
                                <span className="sub">
                                  Financing Rate Short
                                </span>
                                <span className="main">-0.07</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <table>
                        <tbody>
                          <tr>
                            <th>Asset</th>
                            <th>Price</th>
                            <th>Leverage</th>
                            <th>Today Change</th>
                          </tr>
                          {this.state.fillArr.length > 0
                            ? this.state.fillArr.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://cryptologos.cc/logos/${
                                            item.symbol === "ETHUSD"
                                              ? "ethereum"
                                              : item.symbol === "BTCUSD"
                                              ? "bitcoin"
                                              : item.symbol === "LTCUSD"
                                              ? "litecoin"
                                              : ""
                                          }-${item.symbol
                                            .slice(0, 3)
                                            .toLowerCase()}-logo.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    $ {item.price ? item.price : item.rate}{" "}
                                  </td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : this.state.fxPrice.length > 0
                            ? this.state.fxPrice.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAFx(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.rate}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    ""
                  )}

                  {this.state.allS ? (
                    <div className="all">
                      <div className="header">
                        <form>
                          <input
                            type="search"
                            name="search"
                            placeholder="Search Asset"
                            onChange={this.handleFilter}
                          />
                        </form>
                      </div>
                      {/* //here oo */}

                      {this.state.hideIbox ? (
                        ""
                      ) : (
                        <div
                          className="instrument-box"
                          style={{ display: "block" }}
                          onMouseLeave={() => this.setState({ hideIbox: true })}
                        >
                          <img
                            className="header-img"
                            src="images/profile.jpg"
                          />
                          <div className="dtls">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  src={
                                    this.state.currentItem !== undefined
                                      ? this.state.currentItem[0]
                                        ? this.state.currentItem[0].symbol ===
                                          "FB"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "TSLA"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "AAPL"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "GOOGL"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "MSFT"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "BTCUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : this.state.currentItem[0].symbol ===
                                            "ETHUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : this.state.currentItem[0].symbol ===
                                            "LTCUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                        : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                      : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                  }
                                />
                              </div>
                              <div>
                                <span className="instrument">
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].symbol
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                            </div>
                            <div className="dash-row split">
                              <div className="split-50">
                                <span className="sub">Leverage</span>
                                <span className="main">x10</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Commission</span>
                                <span className="main">0.02 USD</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Financing Rate Long</span>
                                <span className="main">
                                  {" "}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].price
                                      : ""
                                    : "hellp"}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].rate
                                        ? this.state.currentItem[0].rate
                                        : ""
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                              <div className="split-50">
                                <span className="sub">
                                  Financing Rate Short
                                </span>
                                <span className="main">-0.07</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <table>
                        <tbody>
                          <tr>
                            <th>Asset</th>
                            <th>Price</th>
                            <th>Leverage</th>
                            <th>Today Change</th>
                          </tr>
                          {this.state.fillArr.length > 0
                            ? this.state.fillArr.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://cryptologos.cc/logos/${
                                            item.symbol === "ETHUSD"
                                              ? "ethereum"
                                              : item.symbol === "BTCUSD"
                                              ? "bitcoin"
                                              : item.symbol === "LTCUSD"
                                              ? "litecoin"
                                              : ""
                                          }-${item.symbol
                                            .slice(0, 3)
                                            .toLowerCase()}-logo.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    $ {item.price ? item.price : item.rate}{" "}
                                  </td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : this.state.iex.length > 0
                            ? this.state.iex.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAIex(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://storage.googleapis.com/iex/api/logos/${item.symbol}.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.price}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    ""
                  )}

                  {this.state.allCum ? (
                    <div className="all">
                      <div className="header">
                        <form>
                          <input
                            type="search"
                            name="search"
                            placeholder="Search Asset"
                            onChange={this.handleFilter}
                          />
                        </form>
                      </div>
                      {/* //here oo */}

                      {this.state.hideIbox ? (
                        ""
                      ) : (
                        <div
                          className="instrument-box"
                          style={{ display: "block" }}
                          onMouseLeave={() => this.setState({ hideIbox: true })}
                        >
                          <img
                            className="header-img"
                            src="images/profile.jpg"
                          />
                          <div className="dtls">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  src={
                                    this.state.currentItem !== undefined
                                      ? this.state.currentItem[0]
                                        ? this.state.currentItem[0].symbol ===
                                          "FB"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "TSLA"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "AAPL"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "GOOGL"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "MSFT"
                                          ? `https://storage.googleapis.com/iex/api/logos/${this.state.currentItem[0].symbol}.png`
                                          : this.state.currentItem[0].symbol ===
                                            "BTCUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : this.state.currentItem[0].symbol ===
                                            "ETHUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : this.state.currentItem[0].symbol ===
                                            "LTCUSD"
                                          ? `https://cryptologos.cc/logos/${
                                              this.state.currentItem[0]
                                                .symbol === "ETHUSD"
                                                ? "ethereum"
                                                : this.state.currentItem[0]
                                                    .symbol === "BTCUSD"
                                                ? "bitcoin"
                                                : this.state.currentItem[0]
                                                    .symbol === "LTCUSD"
                                                ? "litecoin"
                                                : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                            }-${this.state.currentItem[0].symbol
                                              .slice(0, 3)
                                              .toLowerCase()}-logo.png`
                                          : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                        : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                      : "https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg"
                                  }
                                />
                              </div>
                              <div>
                                <span className="instrument">
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].symbol
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                            </div>
                            <div className="dash-row split">
                              <div className="split-50">
                                <span className="sub">Leverage</span>
                                <span className="main">x10</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Commission</span>
                                <span className="main">0.02 USD</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Financing Rate Long</span>
                                <span className="main">
                                  {" "}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].price
                                      : ""
                                    : "hellp"}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem[0]
                                      ? this.state.currentItem[0].rate
                                        ? this.state.currentItem[0].rate
                                        : ""
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                              <div className="split-50">
                                <span className="sub">
                                  Financing Rate Short
                                </span>
                                <span className="main">-0.07</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <table>
                        <tbody>
                          <tr>
                            <th>Asset</th>
                            <th>Price</th>
                            <th>Leverage</th>
                            <th>Today Change</th>
                          </tr>
                          {this.state.fillArr.length > 0
                            ? this.state.fillArr.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://cryptologos.cc/logos/${
                                            item.symbol === "ETHUSD"
                                              ? "ethereum"
                                              : item.symbol === "BTCUSD"
                                              ? "bitcoin"
                                              : item.symbol === "LTCUSD"
                                              ? "litecoin"
                                              : ""
                                          }-${item.symbol
                                            .slice(0, 3)
                                            .toLowerCase()}-logo.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    $ {item.price ? item.price : item.rate}{" "}
                                  </td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : this.state.cum.length > 0
                            ? this.state.cum.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleACum(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.price}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <span className="close" onClick={this.closeForex}>
                <svg id="lnr-cross " viewBox="0 0 1024 1024">
                  <title>cross</title>
                  <path
                    className="path1"
                    d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                  />
                </svg>
              </span>
            </section>
          ) : (
            ""
          )}
        </div>
      );
    }
  }
}

export default Dashboard;
