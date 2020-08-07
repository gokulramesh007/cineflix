import React, { Component } from "react";
import { Messages } from "../../constants";
import { lotteryResult } from "../Promotions/Promotions.module.scss";

class LotteryErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }

  render() {
    console.log(this.state.hasError);
    if (this.state.hasError) {
      return (
        <div className={lotteryResult}>
          {Messages.PROMOTIONS.ERROR}
        </div>
      );
    }
    return this.props.children;
  }
}

export default LotteryErrorBoundary;
