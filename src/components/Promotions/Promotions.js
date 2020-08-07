import React, { useState } from "react";
import { Button } from "../../components";
import { checkForPrize } from "../../services";
import { Messages } from "../../constants";
import { useLotteryReducer } from "../../hooks";
import styles from "./Promotions.module.scss";

const Promotions = () => {
  const [value, setValue] = useState("");
  const [state, dispatch] = useLotteryReducer();

  const handleClick = () => {
    if (value.length !== 10) {
      alert("There should be 10 digits");
    } else {
      checkForPrize(value)
        .then(response => {
          dispatch({ type: "SUCCESS", payload: response.prize });
        })
        .catch(error => {
          dispatch({ type: "FAILURE" });
        });
    }
  };

  if (!state.isLoading && state.response === "") {
    throw new DOMException(Messages.PROMOTIONS.ERROR);
  }

  const handleEnter = event => {
    if (event.keyCode === 13) handleClick();
  };

  return (
    <div>
      {state.response === "" && state.error === ""
        ? <div className={styles.promotionsWrapper}>
            <div className={styles.text}>
              {Messages.PROMOTIONS.MOBILE}
            </div>
            <div className={styles.checkingWrapper}>
              <input
                type="number"
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleEnter}
                placeholder="Enter Mobile Number"
              />
              <Button
                text="I'm Feeling lucky"
                size="medium"
                color="purple"
                onClick={() => handleClick()}
              />
            </div>
          </div>
        : <div className={styles.lotteryResult}>
            {state.response}
          </div>}
    </div>
  );
};

export default React.memo(Promotions);
