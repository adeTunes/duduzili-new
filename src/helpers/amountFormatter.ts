export const amountFormatter = (amount, newAmountSetter) => {
    if (amount.length) {
        if (amount.length) {
          let num = "";
          let counter = 0;
          for (let i = amount.length - 1; i >= 0; i--) {
            counter++;
            if (counter % 3 === 0) {
              num += `${amount[i]},`;
            } else num += `${amount[i]}`;
          }
          num = num.split("").reverse().join("");
          if (num[0] === ",") {
            num = num.replace(num[0], "");
          }
          newAmountSetter(num);
        }
      } else newAmountSetter(amount);
}